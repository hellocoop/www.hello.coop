import defaultTheme from 'vitepress/theme'
import Layout from '../../../pages/.vitepress/theme/Layout.vue'
import '../../../pages/.vitepress/theme/vars.css'

export default {
  ...defaultTheme,
  Layout: Layout
}