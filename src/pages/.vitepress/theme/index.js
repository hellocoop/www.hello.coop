import defaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'
import './vars.css'
import { onMounted } from 'vue'

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

export default {
  ...defaultTheme,
  Layout: MyLayout
}