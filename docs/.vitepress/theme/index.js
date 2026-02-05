// https://vitepress.dev/guide/custom-theme
import { h, onMounted } from 'vue' // 新增：导入 onMounted
import DefaultTheme from 'vitepress/theme-without-fonts'
import './style.css'
import './my-fonts.css'
import './logo.css'
import './global.css'
import './table.css'
import './panel.css'
import CowPet from './components/CowPet.vue' // 引入组件
import mediumZoom from 'medium-zoom'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,

  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 🚩 删掉之前的 'doc-after': () => h(CowPet),
      // 只保留 layout-bottom，这是全站唯一的全局底部插槽
      'layout-bottom': () => h(CowPet)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  },
  // 新增：添加 setup 函数，挂载 medium-zoom 逻辑
  setup() {
    // 组件挂载完成后执行（确保能获取到页面中的 img 元素）
    onMounted(() => {
      // 只对正文区域的图片生效（.vp-doc 是 VitePress 正文容器类名）
     mediumZoom('.vp-doc img', {
  
      margin: 24,
      scrollOffset: 0,
      zIndex: 9999 // 新增：提高放大图片的层级，确保覆盖所有元素
    })
    })
  }
}

