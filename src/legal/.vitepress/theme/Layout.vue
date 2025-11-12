<script setup>
  import DefaultTheme from 'vitepress/theme'
  import { onMounted } from 'vue'
  const { Layout } = DefaultTheme
  
  onMounted(() => {
    const root = document.getElementsByTagName( 'html' )[0];
  
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.setAttribute( 'class', 'dark' );
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
    });
  })
  </script>
  
  <template>
    <Layout>
      <template #layout-top>
        <div style="z-index: 10; position: fixed; width: 100%;">
          <header>
            <div style="max-width: 88rem; width: 100%; padding: 0rem 1rem;">
              <a href="/" class="vp-raw">Hellō</a>
            </div>
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
      text-decoration: underline;
    }
  </style>