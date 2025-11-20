<script setup>
import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, ref, onUnmounted } from 'vue'
const { Layout } = DefaultTheme
import { useRouter } from 'vitepress';

const router = useRouter()
const mobileNavOpen = ref(false)

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

const toggleMobileNav = () => {
  mobileNavOpen.value = !mobileNavOpen.value
  if (mobileNavOpen.value) {
    document.body.classList.add('overflow-y-hidden')
  } else {
    document.body.classList.remove('overflow-y-hidden')
  }
}

const handleResize = () => {
  if (window.innerWidth > 768) {
    mobileNavOpen.value = false
    document.body.classList.remove('overflow-y-hidden')
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

  window.addEventListener('resize', handleResize)

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

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <Layout>
    <template #layout-top>
      <header class="header-nav">
        <div class="header-container">
          <div class="header-left">
            <a href="/" class="vp-raw header-logo">Hellō</a>
            <ul class="header-nav-list">
              <li class="nav-item nav-item-group">
                <a href="/products.html" class="vp-raw nav-link">
                  <span>Products</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" class="nav-chevron">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </a>
                <div class="nav-dropdown">
                  <div class="nav-dropdown-content">
                    <ul class="nav-dropdown-list">
                      <li class="nav-dropdown-item">
                        <a href="/products.html#hello-b2c-sso" class="vp-raw nav-dropdown-link">
                          <span>Hellō B2C SSO</span>
                          <span class="nav-dropdown-desc">Give users choice of 17 providers</span>
                        </a>
                      </li>
                      <li class="nav-dropdown-item">
                        <a href="/products.html#hello-b2b-sso" class="vp-raw nav-dropdown-link">
                          <span>Hellō B2B SSO</span>
                          <span class="nav-dropdown-desc">Zero configuration enterprise SSO</span>
                        </a>
                      </li>
                      <li class="nav-dropdown-item">
                        <a href="/products.html#hello-lifecycle" class="vp-raw nav-dropdown-link">
                          <span>Hellō Lifecycle</span>
                          <span class="nav-dropdown-desc">Add offboarding to your B2B App</span>
                        </a>
                      </li>
                      <li class="nav-dropdown-item">
                        <a href="/products.html#github-offboarding" class="vp-raw nav-dropdown-link">
                          <span>GitHub Offboarding</span>
                          <span class="nav-dropdown-desc">Simplify & automate compliance</span>
                        </a>
                      </li>
                      <li class="nav-dropdown-item">
                        <a href="/products.html#coding-platforms" class="vp-raw nav-dropdown-link">
                          <span>Coding Platforms</span>
                          <span class="nav-dropdown-desc">Let devs add identity in seconds</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li class="nav-item nav-item-group">
                <div class="nav-link">
                  <span>Dev Resources</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" class="nav-chevron">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
                <div class="nav-dropdown">
                  <div class="nav-dropdown-content">
                    <ul class="nav-dropdown-list">
                      <li class="nav-dropdown-item">
                        <a href="https://hello.dev/" target="_blank" class="vp-raw nav-dropdown-link">
                          <span class="ext-link-icon">Developer Documentation</span>
                          <span class="nav-dropdown-desc">Guides, APIs, and tutorials</span>
                        </a>
                      </li>
                      <li class="nav-dropdown-item">
                        <a href="https://console.hello.coop/" target="_blank" class="vp-raw nav-dropdown-link">
                          <span class="ext-link-icon">Developer Console</span>
                          <span class="nav-dropdown-desc">Create and manage applications</span>
                        </a>
                      </li>
                      <li class="nav-dropdown-item">
                        <a href="https://playground.hello.dev/" target="_blank" class="vp-raw nav-dropdown-link">
                          <span class="ext-link-icon">Playground</span>
                          <span class="nav-dropdown-desc">Try Hellō features interactively</span>
                        </a>
                      </li>
                      <li class="nav-dropdown-item">
                        <a href="https://www.hello.dev/docs/admin-mcp/" target="_blank" class="vp-raw nav-dropdown-link">
                          <span class="ext-link-icon">MCP Server</span>
                          <span class="nav-dropdown-desc">Manage apps from your IDE</span>
                        </a>
                      </li>
                      <li class="nav-dropdown-item">
                        <a href="https://status.hello.coop/" target="_blank" class="vp-raw nav-dropdown-link">
                          <span class="ext-link-icon">Status Page</span>
                          <span class="nav-dropdown-desc">System status and uptime</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li class="nav-item nav-item-group">
                <div class="nav-link">
                  <span>Company</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" class="nav-chevron">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
                <div class="nav-dropdown">
                  <div class="nav-dropdown-content">
                    <ul class="nav-dropdown-list">
                      <!-- <li class="nav-dropdown-item">
                        <a href="/resources/about.html" class="vp-raw nav-dropdown-link">
                          <span>About</span>
                          <span class="nav-dropdown-desc">Placeholder text</span>
                        </a>
                      </li> -->
                      <li class="nav-dropdown-item">
                        <a href="/pages/cooperative.html" class="vp-raw nav-dropdown-link">
                          <span>Cooperative Approach</span>
                          <span class="nav-dropdown-desc">Our identity solution explained</span>
                        </a>
                      </li>
                      <li class="nav-dropdown-item">
                        <a href="/pages/laws-of-identity.html" class="vp-raw nav-dropdown-link">
                          <span>Protecting Privacy</span>
                          <span class="nav-dropdown-desc">Following the Laws of Identity</span>
                        </a>
                      </li>
                      <li class="nav-dropdown-item">
                        <a href="/resources/standards.html" class="vp-raw nav-dropdown-link">
                          <span>Open Standards</span>
                          <span class="nav-dropdown-desc">Creating a #BetterInternet</span>
                        </a>
                      </li>
                      <li class="nav-dropdown-item">
                        <a href="https://blog.hello.coop/" target="_blank" class="vp-raw nav-dropdown-link">
                          <span class="ext-link-icon">Hellō News</span>
                          <span class="nav-dropdown-desc">blog.hello.coop</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li class="nav-item nav-item-group">
                <div class="nav-link">
                  <span>Social</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" class="nav-chevron">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
                <div class="nav-dropdown">
                  <div class="nav-dropdown-content">
                    <ul class="nav-dropdown-list">
                      <li class="nav-dropdown-item">
                        <a href="https://hello-community.slack.com/join/shared_invite/zt-1eccnd2np-qJoOWBkHGnpxvBpCTtaH9g" target="_blank" class="vp-raw nav-dropdown-link">
                          <div class="flex space-x-2">
                            <svg role="img" class="w-3.5" fill="currentColor" viewBox="0 0 24 24">
                              <title>Slack</title>
                              <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
                            </svg>
                            <span class="ext-link-icon">Slack</span>
                          </div>
                          <span class="nav-dropdown-desc">Join our community channel</span>
                        </a>
                      </li>
                      <li class="nav-dropdown-item">
                        <a href="https://github.com/HelloCoop" target="_blank" class="vp-raw nav-dropdown-link">
                          <div class="flex space-x-2">
                            <svg role="img" class="w-3.5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <title>GitHub</title>
                              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                            <span class="ext-link-icon">GitHub</span>
                          </div>
                          <span class="nav-dropdown-desc">github.com/HelloCoop</span>
                        </a>
                      </li>
                      <li class="nav-dropdown-item">
                        <a href="https://www.linkedin.com/company/HelloCoop/" target="_blank" class="vp-raw nav-dropdown-link">
                          <div class="flex space-x-2">
                            <svg class="w-3.5" fill="currentColor" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <title>LinkedIn</title>
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            <span class="ext-link-icon">LinkedIn</span>
                          </div>
                          <span class="nav-dropdown-desc">linkedin.com/company/HelloCoop</span>
                        </a>
                      </li>
                      <li class="nav-dropdown-item">
                        <a href="https://x.com/HelloCoop" target="_blank" class="vp-raw nav-dropdown-link">
                          <div class="flex space-x-2">
                            <svg role="img" class="w-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <title>X</title>
                              <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
                            </svg>
                            <span class="ext-link-icon">Twitter</span>
                          </div>
                          <span class="nav-dropdown-desc">x.com/HelloCoop</span>
                        </a>
                      </li>
                      <li class="nav-dropdown-item">
                        <a href="https://www.youtube.com/@HelloCoop" target="_blank" class="vp-raw nav-dropdown-link">
                          <div class="flex space-x-2">
                            <svg role="img" class="w-3.5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <title>YouTube</title>
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                            <span class="ext-link-icon">YouTube</span>
                          </div>
                          <span class="nav-dropdown-desc">youtube.com/@HelloCoop</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="header-right">
            <a href="mailto:contact@hello.coop?subject=Hellō Inquiry" class="vp-raw header-contact">Contact</a>
            <button @click="toggleMobileNav" class="mobile-nav-toggle" aria-label="Toggle mobile menu">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mobile-nav-icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            </button>
          </div>
        </div>
        <div v-show="mobileNavOpen" class="mobile-nav-dropdown">
          <div class="mobile-nav-contact">
            <a href="mailto:contact@hello.coop?subject=Hellō Inquiry" class="vp-raw">Contact</a>
          </div>
          <div class="mobile-nav-content">
            <div class="mobile-nav-section">
              <span class="mobile-nav-title">Products</span>
              <ul class="mobile-nav-list">
                <li><a href="/products.html#hello-b2c-sso" class="vp-raw">Hellō B2C SSO</a></li>
                <li><a href="/products.html#hello-b2b-sso" class="vp-raw">Hellō B2B SSO</a></li>
                <li><a href="/products.html#hello-lifecycle" class="vp-raw">Hellō Lifecycle</a></li>
                <li><a href="/products.html#github-offboarding" class="vp-raw">GitHub Offboarding</a></li>
                <li><a href="/products.html#coding-platforms" class="vp-raw">Coding Platforms</a></li>
              </ul>
            </div>
            <div class="mobile-nav-section">
              <span class="mobile-nav-title">Dev Resources</span>
              <ul class="mobile-nav-list">
                <li><a href="https://hello.dev/" target="_blank" class="vp-raw ext-link-icon">Developer Documentation</a></li>
                <li><a href="https://console.hello.coop/" target="_blank" class="vp-raw ext-link-icon">Developer Console</a></li>
                <li><a href="https://playground.hello.dev/" target="_blank" class="vp-raw ext-link-icon">Playground</a></li>
                <li><a href="https://www.hello.dev/docs/admin-mcp/" target="_blank" class="vp-raw ext-link-icon">MCP Server</a></li>
                <li><a href="https://status.hello.coop/" target="_blank" class="vp-raw ext-link-icon">Status Page</a></li>
              </ul>
            </div>
            <div class="mobile-nav-section">
              <span class="mobile-nav-title">Company</span>
              <ul class="mobile-nav-list">
                <!-- <li><a href="/resources/about.html" class="vp-raw">About</a></li> -->
                <li><a href="/pages/cooperative.html" class="vp-raw">Cooperative Approach</a></li>
                <li><a href="/pages/laws-of-identity.html" class="vp-raw">Protecting Privacy</a></li>
                <li><a href="/resources/standards.html" class="vp-raw">Open Standards</a></li>
                <li><a href="https://blog.hello.coop/" target="_blank" class="vp-raw ext-link-icon">Hellō News</a></li>
              </ul>
            </div>
            <div class="mobile-nav-section">
              <span class="mobile-nav-title">Social</span>
              <ul class="mobile-nav-list">
                <li>
                  <a href="https://hello-community.slack.com/join/shared_invite/zt-1eccnd2np-qJoOWBkHGnpxvBpCTtaH9g" target="_blank" class="vp-raw inline-flex items-center space-x-2">
                    <svg role="img" class="w-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <title>Slack</title>
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
                    </svg>
                    <span class="ext-link-icon">Slack</span>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/HelloCoop" target="_blank" class="vp-raw inline-flex items-center space-x-2">
                    <svg role="img" class="w-3.5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <title>GitHub</title>
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    <span class="ext-link-icon">GitHub</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/HelloCoop" target="_blank" class="vp-raw inline-flex items-center space-x-2">
                    <svg class="w-3.5" fill="currentColor" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <title>LinkedIn</title>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span class="ext-link-icon">LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a href="https://x.com/HelloCoop" target="_blank" class="vp-raw inline-flex items-center space-x-2">
                    <svg role="img" class="w-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <title>X</title>
                      <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
                    </svg>
                    <span class="ext-link-icon">Twitter</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@HelloCoop" target="_blank" class="vp-raw inline-flex items-center space-x-2">
                    <svg role="img" class="w-3.5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <title>YouTube</title>
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span class="ext-link-icon">YouTube</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </template>

    <template #layout-bottom>
      <div style="z-index: 50;">
        <wc-footer v-pre/>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
  /* Header base styles */
  .header-nav {
    background-color: #303030;
    width: 100%;
    height: 48px;
    position: sticky;
    top: 0;
    z-index: 50;
    color: white;
  }

  @media (prefers-color-scheme: dark) {
    .header-nav {
      color: #d4d4d4;
    }
  }

  .header-container {
    max-width: 88rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 1rem;
    position: relative;
  }

  .header-left {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .header-logo {
    font-weight: 600;
    text-align: center;
    font-size: 1.25rem;
    line-height: 1.75rem;
    margin-right: 2rem;
    color: inherit;
    text-decoration: none;
  }

  .header-logo:hover {
    text-decoration: none;
  }

  .header-nav-list {
    display: none;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  @media (min-width: 768px) {
    .header-nav-list {
      display: flex;
    }
  }

  .nav-item {
    position: relative;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .nav-link {
    opacity: 0.75;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    transition: all 0.2s;
    border-radius: 0.375rem 0.375rem 0 0;
    padding: 0.25rem 0.75rem 0.75rem 0.75rem;
    margin-bottom: -0.5rem;
    padding-top: 0.25rem;
    color: inherit;
    text-decoration: none;
  }

  .nav-item-group:hover .nav-link {
    opacity: 1;
    background-color: #434343;
  }

  .nav-chevron {
    width: 0.75rem;
    height: 0.75rem;
    margin-top: 0.125rem;
    opacity: 0.5;
    transition: all 0.2s;
  }

  .nav-item-group:hover .nav-chevron {
    opacity: 1;
    transform: rotate(180deg);
  }

  .nav-dropdown {
    visibility: hidden;
    position: absolute;
    top: 1.5rem;
    left: 0;
    width: 17.5rem;
  }

  .nav-item-group:hover .nav-dropdown {
    visibility: visible;
  }

  .nav-dropdown-content {
    background-color: #434343;
    padding: 1rem;
    margin-top: 1.5rem;
    opacity: 0;
    border-radius: 0 0 0.125rem 0.375rem 0 0;
    perspective: 1000px;
    perspective-origin: top;
    transform: rotateX(75deg);
    transform-origin: top;
    transition: all 0.2s;
  }

  .nav-item-group:hover .nav-dropdown-content {
    opacity: 1;
    transform: rotateX(0deg);
  }

  .nav-dropdown-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .nav-dropdown-item {
    display: flex;
    flex-direction: column;
  }

  .nav-dropdown-link {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    margin: -0.5rem;
    border-radius: 0.125rem;
    transition: all 0.2s;
    color: inherit;
    text-decoration: none;
  }

  .nav-dropdown-link:hover {
    background-color: #303030;
  }

  .nav-dropdown-desc {
    font-size: 0.875rem;
    line-height: 1.25rem;
    opacity: 0.5;
    transition: all 0.2s;
  }

  .nav-dropdown-link:hover .nav-dropdown-desc {
    opacity: 1;
  }

  .header-right {
    text-align: right;
  }

  .header-contact {
    display: none;
    color: inherit;
    text-decoration: none;
  }

  @media (min-width: 768px) {
    .header-contact {
      display: inline-block;
    }
  }

  .mobile-nav-toggle {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.2s;
    background: none;
    border: none;
    padding: 0;
    color: inherit;
  }

  .mobile-nav-toggle:hover {
    opacity: 1;
  }

  @media (min-width: 768px) {
    .mobile-nav-toggle {
      display: none;
    }
  }

  .mobile-nav-icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .mobile-nav-dropdown {
    display: block;
    padding: 0 1rem;
    max-width: 72rem;
    margin: 0 auto;
    padding-bottom: 3rem;
    padding-top: 0;
    background-color: #303030;
    position: fixed;
    height: 100vh;
    width: 100%;
    overflow-y: auto;
    top: 48px;
    left: 0;
    right: 0;
    z-index: 40;
  }

  @media (min-width: 768px) {
    .mobile-nav-dropdown {
      display: none;
    }
  }

  .mobile-nav-content {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  @media (min-width: 768px) {
    .mobile-nav-content {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }

  .mobile-nav-section {
    display: flex;
    flex-direction: column;
  }

  .mobile-nav-title {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .mobile-nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .mobile-nav-list a {
    color: inherit;
    text-decoration: none;
  }

  .mobile-nav-contact {
    text-align: right;
    margin-top: 1rem;
  }

  .mobile-nav-contact a {
    text-align: right;
    opacity: 1 !important;
    color: inherit;
    text-decoration: none;
  }

  /* Utility classes */
  .flex {
    display: flex;
  }

  .space-x-2 {
    gap: 0.5rem;
  }

  .inline-flex {
    display: inline-flex;
  }

  .items-center {
    align-items: center;
  }

  .w-3 {
    width: 0.75rem;
  }

  .w-3\.5 {
    width: 0.875rem;
  }

  .ext-link-icon::after {
    content: "↗";
    display: inline-block;
    margin-left: 4px;
  }
</style>