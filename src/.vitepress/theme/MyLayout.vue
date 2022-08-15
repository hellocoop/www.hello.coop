<!--.vitepress/theme/MyLayout.vue-->
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
  <Layout/>
  <div style="position: fixed; width: 100%; left: 0; bottom: 0; z-index: 100" v-pre>
    <wc-footer/>
  </div>
</template>

<style>
  @media (max-width: 768px) { 
    .Layout{
      padding-bottom: 50px;
    }
  }
</style>