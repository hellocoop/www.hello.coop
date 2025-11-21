import defaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import '../../../pages/.vitepress/theme/vars.css'

export default {
  ...defaultTheme,
  Layout: Layout
}