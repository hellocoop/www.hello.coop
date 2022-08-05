<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout/>
  <div style="position: fixed; width: 100%; left: 0; bottom: 0; z-index: 100" v-pre>
    <wc-footer/>
  </div>
</template>

<style>
  .Layout{
    padding-bottom: 50px;
  }
</style>