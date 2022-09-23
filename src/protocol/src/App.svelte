<script>
  import {fly, fade} from "svelte/transition"
  import One from "./assets/one.svg?raw"
  import Two from "./assets/two.svg?raw"
  import Three from "./assets/three.svg?raw"
  import Four from "./assets/four.svg?raw"
  import Five from "./assets/five.svg?raw"
  import Six from "./assets/six.svg?raw"
  import Seven from "./assets/seven.svg?raw"
  import Eight from "./assets/eight.svg?raw"
  import Nine from "./assets/nine.svg?raw"
  import Ten from "./assets/ten.svg?raw"
  import Diagram from "./lib/Diagram.svelte"
  import PagesConfig from "../../pages/.vitepress/config.js"
  import LegendExampleAppSvg from "./assets/legend-exampleapp.svg?url"
  import LegendOpExampleSvg from "./assets/legend-opexample.svg?url"
  import LegendTokenServiceSvg from "./assets/legend-tokenservice.svg?url"
  import LegendStorageServiceSvg from "./assets/legend-storageservice.svg?url"
  
  const sidebarItems = PagesConfig.themeConfig.sidebar[0].items
  const protocolLinkIndex = sidebarItems.findIndex(i=>i.link.includes("protocol"))
  const previousLink = sidebarItems[protocolLinkIndex - 1]
  const nextLink = sidebarItems[protocolLinkIndex + 1]

  let showMobileMenu = false
</script>

{#if showMobileMenu}
  <div transition:fly={{x: -100}} class="lg:hidden h-screen w-[85%] bg-[#303030] fixed" style="z-index: 99;">
    <nav class="px-8 py-9">
      <ul class="space-y-1">
        {#each sidebarItems as item}
          <li>
            <a href={"/pages" + item.link + ".html"} class="text-sm {item.link.includes("protocol") ? "text-white" : "text-[#ebebeb] opacity-60"} hover:opacity-90 focus-visible:opacity-90 duration-150 transition">{item.text}</a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
  <div transition:fade on:click={()=>showMobileMenu=false} class="bg-black lg:hidden bg-opacity-50 h-screen w-screen fixed" style="z-index: 90;"></div>
{/if}

<header class="h-12 sticky top-0 md:relative z-50 w-full bg-[#303030] flex items-center justify-center">
  <a href="/" class="text-xl hover:underline focus-visible:underline text-white dark:text-[#d4d4d4]">Hellō</a>
</header>
<div class="lg:hidden sticky top-12 z-50 flex px-6 md:px-8 items-center justify-between h-12 w-full border-b border-black dark:border-white border-opacity-10 dark:border-opacity-10 bg-white dark:bg-[#151515]">
  <button on:click={()=>showMobileMenu=!showMobileMenu} class="dark:text-[#ebebeb] text-[#303030] opacity-60 text-xs hover:opacity-100 focus-visible:opacity-100 inline-flex items-center duration-150 transition">
    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 24 24" class="h-4 w-4 mr-2" data-v-41615dd2="">
        <path d="M17,11H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h14c0.6,0,1,0.4,1,1S17.6,11,17,11z"></path>
        <path d="M21,7H3C2.4,7,2,6.6,2,6s0.4-1,1-1h18c0.6,0,1,0.4,1,1S21.6,7,21,7z"></path>
        <path d="M21,15H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h18c0.6,0,1,0.4,1,1S21.6,15,21,15z"></path>
        <path d="M17,19H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h14c0.6,0,1,0.4,1,1S17.6,19,17,19z"></path>
    </svg>
    <span>Menu</span>
  </button>
  <button on:click={() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }} class="dark:text-[#ebebeb] text-[#303030] opacity-60 text-xs hover:opacity-100 focus-visible:opacity-100 duration-150 transition">Return to top</button>
</div>
<main class="flex flex-col justify-center items-center leading-7">
  <div class="w-full flex bg-[#303030]">
    <aside class="hidden lg:flex flex-shrink-0 bg-transparent sticky top-12 self-start">
      <nav>
        <ul>
          {#each sidebarItems as item}
            <li>
              <a href={"/pages" + item.link + ".html"} class="text-sm {item.link.includes("protocol") ? "text-white" : "text-[#ebebeb] opacity-60"} hover:opacity-90 focus-visible:opacity-90 duration-150 transition">{item.text}</a>
            </li>
          {/each}
        </ul>
      </nav>
    </aside>
    <div class="px-6 w-full lg:pl-[4rem] xl:pl-[7rem] pt-10 bg-white dark:bg-[#151515]">
      <div class="space-y-6 md:max-w-[688px]">
        <h1 class="font-medium" style="font-size: 32px; font-weight: 600;">Hellō Protocol</h1>
        <p>
          The Hellō Protocol ensures that Hellō can not impersonate a user, and that no component can arbitrarily access user data.
          </p><p>
            These assurances are provided transparently to external systems. Hellō provides a standard <a href="https://openid.net/specs/openid-connect-core-1_0.html" target="_blank" class="inline-flex items-center text-black dark:text-white">OpenID Connect <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-1">
              <path class="stroke-black dark:stroke-white" stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            </a> interface to applications,
          and a standard relying party to issuers.
        </p><p>
          The following sequence of diagrams incrementally show how the Hellō Protocol achieves its goals. The final diagram is a complete sequence of the protocol for a simple login operation. 
          An understanding of the OpenID Connect protocol and ID Tokens is required to appreciate how the Hellō Protocol cheives its goals.
        </p>
        
        <blockquote class="border-l-2 border-[#303030] dark:border-[#d4d4d4] border-opacity-25 dark:border-opacity-25 text-[#303030] dark:text-[#d4d4d4] text-opacity-60 dark:text-opacity-60 text-left">
          <p class="pl-6 opacity-60">
            Currently, the Hellō service is a monolithic architecture operated directly by the cooperative. Once we have product market fit, we will migrate to using the protocol.
          </p>
        </blockquote>
        <div>
          <h2>
            Legend
          </h2>
          <p class="mt-4 gap-4 flex flex-row flex-wrap">
            <img src={LegendExampleAppSvg} alt="Signed by example.app"/>
            <img src={LegendOpExampleSvg} alt="Signed by op.example"/>
            <img src={LegendTokenServiceSvg} alt="Signed by Token Service"/>
            <img src={LegendStorageServiceSvg} alt="Signed by Storage Service"/>
          </p>
        </div>
      </div>
    </div>
  </div>
  <section
    class="px-6 mx-auto w-full max-w-7xl divide-y divide-black dark:divide-white divide-opacity-20 dark:divide-opacity-20"
  >
    <div class="pb-16 pt-10 lg:py-20">
      <div class="md:max-w-[688px] lg:max-w-full md:mx-auto mr-auto">
      <h2>
        Diagram 1 - Interactions with External Systems
      </h2>
      <p
      class="mt-4 w-full lg:w-3/5"
      >
        One way to think of what the Hellō Protocol is accomplishing is to transform the application's Request Token and the ID Token from the user's preferred provider
      into a Hellō ID Token in a trusted and repeatable manner.
      </p><p
        class="mt-4 w-full lg:w-3/5"
      >
        In this diagram, we show how an application (example.app) requests a Hellō ID Token. Steps (01) and (99) are a standard OpenID Connect flow from the perspective of the application. 
      </p><p
      class="mt-4 w-full lg:w-3/5"
    >
        In step (10), Hellō is acting as a standard RP / client from the perspective of the user's preferred login provider.
      </p><p
      class="mt-4 mb-10 w-full lg:w-3/5"
    >
        Steps (01), (10), & (99) are the same in all diagrams.
      </p>
    </div>
      <Diagram svg={One} />
    </div>

    <div class="py-16 lg:py-20">
      <div class="md:max-w-[688px] lg:max-w-full md:mx-auto mr-auto">
      <h2>
        Diagram 2 - New User - Two Components
      </h2>
      <p
        class="mt-4 mb-10 w-full lg:w-3/5"
      >
        We separate the functionality between the Orchestration Service and the Token Service.
        Only the Orchestration Service can interact with external systems. 
        As it is a new user in this case, the Token Service generates a random identifier for the user and a subject record binding the OpenID Providers identifiers to the Hellō user identifier, and mints an ID Token containing the new user identifier.
      </p>
      </div>
      <Diagram svg={Two} />
    </div>

    <div class="py-16 lg:py-20">
      <div class="md:max-w-[688px] lg:max-w-full md:mx-auto mr-auto">
      <h2>
        Diagram 3 - Returning User - Impersonation Not Possible
      </h2>
      <p
        class="mt-4 mb-10 w-full lg:w-3/5"
      >
        The only way for the Token Service to generate an ID Token with the same user identifier is to be presented
        an OpenID Provider ID Token with the same identifiers and the subject record generated in Diagram 2. 
      </p>
    </div>
      <Diagram svg={Three} />
    </div>

    <div class="py-16 lg:py-20">
      <div class="md:max-w-[688px] lg:max-w-full md:mx-auto mr-auto">
      <h2>
        Diagram 4 - New User - Three Components
      </h2>
      <p
        class="mt-4 mb-10 w-full lg:w-3/5"
      >
        In Diagram 2, the Orchestration Service can access the database at will, and can choose to not present a subject record for an existing user, causing the Token Service to generate a new user.
        Introducing the Storage Service addresses these issues. 
        The Orchestration can now only perform CRUD operations when it has acquired an access token, and can only have a user created if the Storage Service provides a token that there is no record for the user.
      </p>
    </div>
      <Diagram svg={Four} />
    </div>

    <div class="py-16 lg:py-20">
      <div class="md:max-w-[688px] lg:max-w-full md:mx-auto mr-auto">
      <h2>
        Diagram 5 - Returning User - Three Components
      </h2>
      <p
        class="mt-4 mb-10 w-full lg:w-3/5"
      >
        Diagram 3 with the three components and access tokens.
      </p>
      </div>
      <Diagram svg={Five} />
    </div>

    <div class="py-16 lg:py-20">
      <div class="md:max-w-[688px] lg:max-w-full md:mx-auto mr-auto">
          <h2>
            Diagram 6 - New User - Directed Identifier
          </h2>
          <p
            class="mt-4 mb-10 w-full lg:w-3/5"
          >
            So far, we have provided each application the same identifier for the same user.
            To address this, we create a layer of abstraction with a Release Record that links the Hellō identifier with a new, directed identifier specific to the application and user.
          </p>
      </div>
      <Diagram svg={Six} />
    </div>

    <div class="py-16 lg:py-20">
      <div class="md:max-w-[688px] lg:max-w-full md:mx-auto mr-auto">
        <h2>
          Diagram 7 - Returning User - Directed Identifier
        </h2>
        <p
          class="mt-4 mb-10 w-full lg:w-3/5"
        >
          Diagram 5 with a directed identifier. The extra layer of abstraction requires an additional request from 
          the Orchestration Service to the Storage Service.
        </p>
      </div>
      <Diagram svg={Seven} />
    </div>

    <div class="py-16 lg:py-20">
      <div class="md:max-w-[688px] lg:max-w-full md:mx-auto mr-auto">
        <h2>
          Diagram 8 - Creating Hashed Keys and Encrypted Records
        </h2>
        <p
          class="mt-4 mb-10 w-full lg:w-3/5"
        >
          While neither the Token Service, nor the Orchestration Service can arbitrarily access user data, the Storage Service can access data for all users.
          We address this issue by hashing all identifiers used to retrieve records, and encrypting the records with the fourth component, the Encryption Service.
        </p>
      </div>
      <Diagram svg={Eight} />
    </div>

    <div class="py-16 lg:py-20">
      <div class="md:max-w-[688px] lg:max-w-full md:mx-auto mr-auto">
        <h2>
          Diagram 9 - Reading Encrypted Records
        </h2>
        <p
          class="mt-4 mb-10 w-full lg:w-3/5"
        >
          The Encryption Service decrypts records retrieved from the Storage Service.
        </p>
      </div>
      <Diagram svg={Nine} />
    </div>

    <div class="py-16 lg:py-20">
      <div class="md:max-w-[688px] lg:max-w-full md:mx-auto mr-auto">
        <h2>
          Diagram 10 - Four Components and Session Token
        </h2>
        <p
          class="mt-4 mb-10 w-full lg:w-3/5"
        >
          Requiring the Orchestration Service to pass all tokens and records with each request to the Token Service does not scale to more complex requests. 
          The Token Service can capture state in a Session Token so that the Orchestration only needs to pass newly acquired tokens or records when making a request of the Token Service.
        </p>
      </div>
      <Diagram svg={Ten} />
    </div>

    <div class="py-16 lg:py-20">
      <div class="md:max-w-[688px] lg:max-w-full md:mx-auto mr-auto">
        <h2>
          Other Transactions
        </h2>
        <p
          class="mt-4 w-full lg:w-3/5"
        >
        We have shown the building blocks for verifying token transformation, and ensuring no custodian has credentials that can be used to access user data with colluding with another custodian.
        </p><p
          class="mt-4 mb-10 w-full lg:w-3/5"
        >
        Additional flows will support other transactions such as linking additional claims and subjects to the user, recoverying a Hellō wallet with recovery providers, and merging wallets.
        </p>
      </div>

      <div class="mt-16">
        <a class="edit-link-button text-black dark:text-red-500" href="https://github.com/hellocoop/www.hello.coop/edit/main/src/protocol/src/App.svelte" target="_blank" rel="noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="edit-link-icon"><path d="M18,23H4c-1.7,0-3-1.3-3-3V6c0-1.7,1.3-3,3-3h7c0.6,0,1,0.4,1,1s-0.4,1-1,1H4C3.4,5,3,5.4,3,6v14c0,0.6,0.4,1,1,1h14c0.6,0,1-0.4,1-1v-7c0-0.6,0.4-1,1-1s1,0.4,1,1v7C21,21.7,19.7,23,18,23z"></path><path d="M8,17c-0.3,0-0.5-0.1-0.7-0.3C7,16.5,6.9,16.1,7,15.8l1-4c0-0.2,0.1-0.3,0.3-0.5l9.5-9.5c1.2-1.2,3.2-1.2,4.4,0c1.2,1.2,1.2,3.2,0,4.4l-9.5,9.5c-0.1,0.1-0.3,0.2-0.5,0.3l-4,1C8.2,17,8.1,17,8,17zM9.9,12.5l-0.5,2.1l2.1-0.5l9.3-9.3c0.4-0.4,0.4-1.1,0-1.6c-0.4-0.4-1.2-0.4-1.6,0l0,0L9.9,12.5z M18.5,2.5L18.5,2.5L18.5,2.5z"></path></svg>
          Propose changes to this page
        </a>

        <div class="flex flex-col md:flex-row justify-between items-center pt-6 mt-4 border-t border-black dark:border-white border-opacity-20 dark:border-opacity-20">
          {#if previousLink}
            <a href={"/pages" + previousLink.link + ".html"} class="w-full md:w-80 pager border border-black dark:border-white border-opacity-20 dark:border-opacity-20 hover:border-opacity-100 focus-visible:border-opacity-100">
                <span class="desc">Previous page</span>
                <span class="title">{previousLink.text}</span>
            </a>
          {/if}
          {#if nextLink}
            <a href={"/pages" + nextLink.link + ".html"} class="w-full md:w-80 mt-2 md:mt-0 pager border border-black dark:border-white border-opacity-20 dark:border-opacity-20 hover:border-opacity-100 focus-visible:border-opacity-100 text-right">
                <span class="desc">Next page</span>
                <span class="title">{nextLink.text}</span>
            </a>
          {/if}
        </div>
      </div>
    </div>
  </section>
</main>

<wc-footer/>

<style>
  * {
    font-family: 'Inter var experimental', 'Inter var', ui-sans-serif,
    system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Helvetica, Arial, 'Noto Sans', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    font-weight: 500;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
  @media (prefers-color-scheme: dark) {
    p{
      color: rgba(255, 255, 255, 0.87);
      color: #213547;
    }
  }
  header a {
    font-weight: bold !important;
  }
  p {
    color: #213547;
    font-weight: 400;
  }
  h1 {
    color: #303030;
  }
  h2 {
    font-weight: 600;
    letter-spacing: -0.02em;
    font-size: 24px;
    color: #303030;
  }
  a:not(nav a):not(header a){
    text-decoration: underline;
    color: #303030;
    font-weight: 500;
  }

  @media (prefers-color-scheme: dark) {
    a:not(nav a):not(header a){
      color: white;
    } 
    h1, h2{
      color: white;
    }
    p {
      color: #ffffffde;
    }
  }

  aside {
    padding: 32px 32px 96px;
    width: calc(100vw - 64px);
    max-width: 320px;
    opacity: 0;
    overflow-x: hidden;
    overflow-y: auto;
    transform: translateX(-100%);
    transition: opacity 0.5s, transform 0.25s ease;
    font-weight: 500;
  }

  aside a {
    letter-spacing: 0.08px;
  }

  .pager {
    display: block;
    border-radius: 8px;
    padding: 11px 16px 13px;
    height: 100%;
    transition: border-color 0.25s
  }
  a.pager {
    text-decoration: none;
  }

  .desc {
    display: block;
    line-height: 20px;
    font-size: 12px;
    font-weight: 500;
    opacity: 0.5;
  }

  .title {
    display: block;
    line-height: 20px;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.25s;
  }

  .edit-link-button {
    text-decoration: none;
    display: flex;
    align-items: center;
    border: 0;
    line-height: 32px;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.25s;
  }

  .edit-link-icon {
    margin-right: 8px;
    width: 14px;
    height: 14px;
    fill: currentColor;
  }
  
  @media (min-width: 960px) {
    aside {
      z-index: 1;
      padding-top: 36px;
      padding-bottom: 36px;
      /* padding-bottom: 128px; */
      width: 272px;
      max-width: 100%;
      opacity: 1;
      visibility: visible;
      box-shadow: none;
      transform: translateX(0);
    }
  }
  
  @media (min-width: 1440px) {
    aside {
      padding-left: max(32px, calc((100% - (1440px - 64px)) / 2));
      width: calc((100% - (1440px - 64px)) / 2 + 272px - 32px);
    }
  }
  </style>
  