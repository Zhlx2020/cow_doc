---
# 关闭侧边栏和右侧大纲
sidebar: false
aside: false
---

# 我的网站导航

<script setup>
import { h } from 'vue'

const toolList = [
  { title: 'MDN Web Docs', desc: '前端开发权威文档，包含 JS/HTML/CSS', category: '官方文档', url: 'https://developer.mozilla.org' },
  { title: 'GitHub', desc: '全球最大的代码托管与开源协作平台', category: '效率工具', url: 'https://github.com' },
  { title: 'VitePress', desc: '笔记、知识库静态生成工具工具', category: '效率工具', url: 'https://vitepress.dev/zh/' },
  { title: 'V2EX', desc: '创意工作者们的社区，讨论技术与生活', category: '社区资讯', url: 'https://v2ex.com' },
  { title: 'ChatGPT', desc: 'OpenAI 开发的强大 AI 对话助手', category: '效率工具', url: 'https://chat.openai.com' },
  { title: 'Vue.js', desc: '渐进式 JavaScript 框架，易学强大', category: '官方文档', url: 'https://vuejs.org' },
  { title: 'Iconify', desc: '海量矢量图标库，支持多种前端框架', category: '设计素材', url: 'https://iconify.design' },
  { title: 'Unsplash', desc: '高品质免费无版权图片素材库', category: '设计素材', url: 'https://unsplash.com' },
  { title: 'SpaceShip', desc: '便宜的国外域名购买网站', category: '网站建设', url: 'https://www.spaceship.com/' },
  { title: 'CloudFlare', desc: '免费静态托管，DNS托管，CDN加速', category: '网站建设', url: 'https://www.cloudflare.com/' },
  { title: 'LinuxDo', desc: '新的理想型社区', category: '社区资讯', url: 'https://linux.do/' },

];

// 自动获取图标，优先使用 unavatar，备用 iowen
const getIcon = (url) => {
  try {
    const domain = new URL(url).hostname;
    return `https://unavatar.io/${domain}?fallback=https://api.iowen.cn/favicon/${domain}.png`;
  } catch (e) {
    return 'https://api.iowen.cn/favicon/default.png';
  }
}

const categories = [...new Set(toolList.map(t => t.category))];
const getTools = (cat) => toolList.filter(t => t.category === cat);
</script>

<div class="tools-wrapper">
  <div v-for="cat in categories" :key="cat" class="category-section">
    <h2 class="tools-category">{{ cat }}</h2>
    <div class="tools-grid">
      <a v-for="tool in getTools(cat)" :key="tool.title" :href="tool.url" target="_blank" class="tool-card">
        <div class="tool-icon-wrapper">
          <img :src="getIcon(tool.url)" class="tool-icon" loading="lazy" />
        </div>
        <div class="tool-info">
          <div class="tool-title">{{ tool.title }}</div>
          <div class="tool-desc" :title="tool.desc">{{ tool.desc }}</div>
        </div>
      </a>
    </div>
  </div>
</div>

<style scoped>
/* --- 1. 核心：强制拉伸 VitePress 内容区宽度 --- */
:deep(.VPDoc .container) {
  max-width: 100% !important;
  padding: 0 40px !important;
}

:deep(.VPDoc .content) {
  max-width: 100% !important;
  padding: 0 !important;
}

:deep(.VPDoc .content-container) {
  max-width: 100% !important; /* 破解默认的 688px 或 700px 限制 */
}

/* --- 2. 布局样式 --- */
.tools-wrapper {
  margin-top: 24px;
}

.category-section {
  margin-bottom: 40px;
}

.tools-category {
  border: none;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 16px 4px;
  color: var(--vp-c-text-1);
}

.tools-grid {
  display: grid;
  /* minmax(240px, 1fr) 确保在大多数电脑屏幕上能横排 4-6 个 */
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

/* --- 3. 卡片样式（参考 UISDC UI 风格） --- */
.tool-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.tool-card:hover {
  background-color: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.15);
}

.tool-icon-wrapper {
  width: 44px;
  height: 44px;
  margin-right: 14px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 10px;
  padding: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.tool-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.tool-info {
  flex: 1;
  overflow: hidden;
}

.tool-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tool-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>