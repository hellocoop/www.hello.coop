import defaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'
import './vars.css'

export default {
  ...defaultTheme,
  Layout: MyLayout
}