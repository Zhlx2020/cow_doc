---
outline: deep
---

# <ruby>技能蓝图 <rt>Growth Roadmap</rt></ruby>

> “不积跬步，无以至千里。” 这里的每一条分支，都是一段深耕的岁月。

<script setup>
import { ref } from 'vue'

const skillData = ref([
      {
    title: '云原生基础与进阶',
    icon: '🎨',
    skills: [
      { 
        status: 'learning', tag: '学习中', title: 'sre网站稳定性', 
        desc: '深入响应式原理、虚拟 DOM 及组合式 API 实战。',
        link: '/cloud/sre/01-网站的不稳定因素' // 🔗 添加跳转链接
      },
      { 
        status: 'learning', tag: '学习中', title: 'Vite 构建艺术', 
        desc: '探索 HMR 机制、插件开发及极致的打包优化。',
        link: '/frontend/vite'
      }
    ]
  },
  {
    title: '前端基石与框架',
    icon: '🎨',
    skills: [
      { 
        status: 'mastered', tag: '精通', title: 'Vue 3 核心生态', 
        desc: '深入响应式原理、虚拟 DOM 及组合式 API 实战。',
        link: '/frontend/vue3' // 🔗 添加跳转链接
      },
      { 
        status: 'learning', tag: '研习中', title: 'Vite 构建艺术', 
        desc: '探索 HMR 机制、插件开发及极致的打包优化。',
        link: '/frontend/vite'
      }
    ]
  },
  {
    title: '计算机底层修行',
    icon: '💻',
    skills: [
      { 
        status: 'mastered', tag: '精通', title: 'Linux 系统运维', 
        desc: '熟练掌握 Shell 脚本、进程管理及网络协议栈调优。',
        link: '/os/01-操作系统介绍.html'
      },
      { 
        status: 'todo', tag: '探索', title: 'Rust 系统编程', 
        desc: '计划深入内存安全模型，构建高性能底层组件。' 
        // 💡 没有 link 属性则不可点击
      }
    ]
  }
])
</script>

<div class="skill-tree">
  <div v-for="branch in skillData" :key="branch.title" class="skill-branch">
    <div class="branch-title">
      <span class="branch-icon">{{ branch.icon || '📍' }}</span>
      <h3>{{ branch.title }}</h3>
    </div>
    <div class="skill-nodes">
      <div v-for="node in branch.skills" :key="node.title" :class="['skill-node', node.status || 'todo']">
        <div :class="['node-dot', { pulse: node.status === 'learning' }]"></div>
        <!-- 🌟 核心改动：使用动态组件，根据是否有 link 决定渲染 a 还是 div -->
        <component 
          :is="node.link ? 'a' : 'div'" 
          :href="node.link" 
          :class="['node-content', { 'is-link': node.link }]"
        >
          <div v-if="node.tag" class="node-tag">{{ node.tag }}</div>
          <h4 v-if="node.title">{{ node.title }}</h4>
          <p v-if="node.desc">{{ node.desc }}</p>
        </component>
      </div>
    </div>
  </div>
</div>

<style scoped>
.skill-tree { position: relative; padding: 40px 0; margin-top: 20px; }
.skill-tree::before { content: ''; position: absolute; left: 20px; top: 0; bottom: 0; width: 2px; background: linear-gradient(180deg, #FF9419, #FF021D, #E600FF, transparent); opacity: 0.3; }
.skill-branch { margin-bottom: 50px; position: relative; }
.branch-title { display: flex; align-items: center; margin-bottom: 25px; z-index: 1; }
.branch-icon { width: 42px; height: 42px; background: var(--vp-c-bg-soft); border: 2px solid #FF9419; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-right: 15px; box-shadow: 0 0 15px rgba(255, 148, 25, 0.3); }
.branch-title h3 { margin: 0 !important; font-size: 1.4rem; background: linear-gradient(90deg, #fc8600, #f45524); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 800; border: none; }
.skill-nodes { padding-left: 45px; }
.skill-node { position: relative; margin-bottom: 30px; display: flex; align-items: flex-start; }
.node-dot { position: absolute; left: -33px; top: 8px; width: 14px; height: 14px; border-radius: 50%; background: var(--vp-c-bg); border: 3px solid #ccc; z-index: 2; }
.mastered .node-dot { border-color: #FF9419; background: #FF9419; }
.learning .node-dot { border-color: #FF021D; }
.todo .node-dot { border-color: var(--vp-c-divider); }
@keyframes pulse-red { 0% { box-shadow: 0 0 0 0 rgba(255, 2, 29, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(255, 2, 29, 0); } 100% { box-shadow: 0 0 0 0 rgba(255, 2, 29, 0); } }
.pulse { animation: pulse-red 2s infinite; }

/* 节点卡片样式 */
.node-content { 
  background: var(--vp-c-bg-soft); padding: 15px 20px; border-radius: 12px; border: 1px solid var(--vp-c-divider); 
  transition: all 0.3s ease; width: 100%; text-decoration: none !important; color: inherit !important;
}
/* 只有当它是链接时才显示手型 */
.node-content.is-link { cursor: pointer; }
.node-content.is-link:hover { transform: translateX(10px); border-color: #FF9419; background: var(--vp-c-bg-mute); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

.node-tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; text-transform: uppercase; margin-bottom: 8px; }
.mastered .node-tag { background: rgba(255, 148, 25, 0.1); color: #FF9419; }
.learning .node-tag { background: rgba(255, 2, 29, 0.1); color: #FF021D; }
.todo .node-tag { background: var(--vp-c-default-soft); color: var(--vp-c-text-2); }
.node-content h4 { margin: 0 0 5px 0 !important; font-size: 1.1rem; color: var(--vp-c-text-1); }
.node-content p { margin: 0 !important; font-size: 0.9rem; color: var(--vp-c-text-2); line-height: 1.6; }
@media (max-width: 640px) { .branch-title h3 { font-size: 1.2rem; } .node-content h4 { font-size: 1rem; } }
</style>