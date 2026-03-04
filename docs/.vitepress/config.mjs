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
      { text: '笔记', link: '/nav' },
      { text: '卡片', link: '/card' },
      { text: '导航', link: '/tools' },
      
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
      { icon: 'github', link: 'https://github.com/Zhlx2020/cow_doc#' },
      { icon:  {
          svg: '<svg t="1770356024665" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5551" width="200" height="200"><path d="M360.896 183.968l-90.912-88.096s-14.208-17.472 9.824-37.248c24.16-19.648 25.376-10.912 33.504-5.472s135.2 130.816 135.2 130.816h-87.616z m301.952 3.264l90.912-88.096s14.208-17.472-9.824-37.248c-24.032-19.648-25.376-10.912-33.504-5.472s-135.2 130.816-135.2 130.816h87.616zM1004 350.336c-3.264-137.984-123.168-164.192-123.168-164.192s-614.336-4.96-742.496 0C10.176 222.304 20 350.336 20 350.336s1.696 274.272-0.128 413.12c13.824 138.848 120.864 160.928 120.864 160.928s42.72 0.864 73.92 0.864c3.264 8.992 5.696 52.544 54.24 52.544 48.416 0 54.24-52.544 54.24-52.544s354.88-1.696 384.352-1.696c1.696 14.816 8.992 54.976 57.536 54.24 48.416-0.864 51.712-57.536 51.712-57.536s16.384-1.696 65.664 0C997.344 898.88 1004 764.192 1004 764.192s-1.568-275.872 0-413.856z m-98.912 439.232c0 21.728-17.248 39.456-38.464 39.456H167.2c-21.248 0-38.464-17.6-38.464-39.456V326.336c0-21.728 17.248-39.456 38.464-39.456h699.424c21.248 0 38.464 17.6 38.464 39.456v463.232zM202.4 457.152l205.344-39.456 15.52 77.184-203.648 39.456z m638.976 0l-205.344-39.456-15.648 77.184 203.776 39.456z m-418.08 191.392s45.152 81.312 95.264-26.336c48.416 105.088 101.824 27.904 101.824 27.904l30.336 19.776s-56.672 91.136-131.424 22.208c-63.232 68.928-129.728-21.952-129.728-21.952l33.728-21.6z" fill="#D4237A" p-id="5552"></path></svg>'
        }
        , link: 'https://space.bilibili.com/352313328' },
    ],
    search: {
      provider: 'local'
    },
        editLink: {
      pattern: 'https://github.com/Zhlx2020/cow_doc#',
      text: 'Edit this page on GitHub'
    }
  },
  markdown: {
breaks: true, // 启用自动换行（兼容 GFM）
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
