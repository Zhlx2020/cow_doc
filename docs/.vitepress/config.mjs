import { defineConfig } from 'vitepress'

import { getSidebar } from './sidebar-auto.js'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  // base: '/cow_doc/', 
  title: "小赵在学习ing",
  description: "小赵的学习笔记站",
  themeConfig: {
    logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/about' },
      // {
      //   text: '下拉菜单',
      //   items: [
      //     { text: 'Item A', link: '/item-1' },
      //     { text: 'Item B', link: '/item-2' },
      //     { text: 'Item C', link: '/item-3' }
      //   ]
      // }

    ],

    sidebar: {
      '/os/': getSidebar('./os'),
      '/cloud/': getSidebar('./cloud'),
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    search: {
      provider: 'local'
    }
  },
  markdown: {

    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    config: (md) => {
      md.core.ruler.after('inline', 'replace-punctuation', (state) => {
        state.tokens.forEach((token) => {
          if (token.type === 'inline') {
            let inLink = false; // 链接状态锁

            token.children.forEach((child) => {
              // 【安全锁 1】：跳过行内代码，如 `obj, arg` 里的逗号不会被换
              if (child.type === 'code_inline') return;

              // 【安全锁 2】：跳过链接地址和链接文字
              if (child.type === 'link_open') { inLink = true; return; }
              if (child.type === 'link_close') { inLink = false; return; }

              // 只处理非链接内容的纯文本
              if (child.type === 'text' && !inLink) {
                child.content = child.content
                  .replace(/,/g, '，')
                  .replace(/:/g, '：')
                  .replace(/;/g, '；')
                  .replace(/\?(?!\?)/g, '？')
                  .replace(/!(?!!)/g, '！')
                  .replace(/\(/g, '（')
                  .replace(/\)/g, '）');
                // 💡 句号替换已移除，确保了 v1.0 或 file.js 的绝对安全
              }
            });
          }
        });
      });
    }
  },
  
  lastUpdated: true
})
