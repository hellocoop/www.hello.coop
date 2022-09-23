<script setup>
import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, onUpdated } from 'vue'
const { Layout } = DefaultTheme
import { useRouter } from 'vitepress';

const router = useRouter()
const sendEvent = async() => {
  if (localStorage.plausible_ignore) {
    console.warn("Ignoring Event: localStorage flag")
    return;
  }
  const _body = {
      w: window.innerWidth,
      d: "hello.coop",
      n: "pageview",
      r: document.referrer || null,
      u: window.location.href
  };
  try {
      const endpoint = new URL('/api/event', window.location.origin + window.location.pathname)
      await fetch(endpoint.href, {
          method: "POST",
          body: JSON.stringify(_body),
      });
      console.info(`Event sent: ${_body.u} (${_body.n})`);
  } catch (err) {
      console.error(err);
  }
}

onMounted(() => {
  const root = document.getElementsByTagName( 'html' )[0]
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute( 'class', 'dark' )
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const newColorScheme = event.matches ? "dark" : "light";
    switch(newColorScheme){
      case 'light': {
        root.setAttribute( 'class', 'light' );
        break;
      }
      case 'dark': {
        root.setAttribute( 'class', 'dark' );
        break;
      }
    }
  })

  // Only run this on the client. Not during build.
  if (typeof window !== 'undefined') {
    watch(() => router.route.data.relativePath, (path) => {
      //wait for content to load      
      setTimeout(()=>{
        //override default spa behavior for protocol links
        document.querySelectorAll("a").forEach(elem => {
          if(elem.href.includes("protocol.html")) {
            //adding this class prevents router's event handler
            //https://github.com/vuejs/vitepress/pull/1104
            elem.classList.add('vp-raw')
          }
        })
      }, 250)

      //send plausible event on route change
      sendEvent()
    }, { immediate: true });
  }
})
</script>

<template>
  <Layout>
    <template #layout-top>
      <div style="z-index: 10; position: fixed; width: 100%;">
        <header>
          <a href="/" class="vp-raw">Hellō</a>
        </header>
      </div>
    </template>

    <template #layout-bottom>
      <div style="z-index: 50;">
        <wc-footer v-pre/>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
  header {
    height: 48px;
    width: 100%;
    background-color: #303030;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  header a {
    font-weight: bold;
    font-size: 1.22rem;
    line-height: 1.75rem;
    color: white;
  }
  @media (prefers-color-scheme: dark) {
    header a {
      color: #d4d4d4;
    }
  }
  header a:hover, header a:focus-visible {
    text-decoration: underline
  }
</style>