# <ruby>技能蓝图 <rt>Growth Roadmap</rt></ruby>

> “不积跬步，无以至千里。” 这里的每一条分支，都是一段深耕的岁月。

<script setup>
import { ref } from 'vue'

// 支持折叠分支，分级配色
const skillData = ref([
  {
    title: '云原生基础与进阶',
    icon: '🧩',
    skills: [
      {
        status: 'learning', tag: '学习中', title: 'sre网站稳定性',
        desc: '深入响应式原理、虚拟 DOM 及组合式 API 实战。',
        link: '/cloud/01_sre/01-网站的不稳定因素'
      },
      {
        status: 'learning', tag: '学习中', title: 'Vite 构建艺术',
        desc: '探索 HMR 机制、插件开发及极致的打包优化。',
        link: '/frontend/vite'
      }
    ]
  },
  {
    title: 'GO语言学习',
    icon: '🎨',
    skills: [
      {
        status: 'mastered', tag: '熟练掌握', title: 'Go基础实战',
        desc: '深入响应式原理、虚拟 DOM 及组合式 API 实战。',
        link: '/golang/01_base/02-go基础语法'
      },
      {
        status: 'learning', tag: '学习中', title: 'Go进阶实战',
        desc: '探索 HMR 机制、插件开发及极致的打包优化。',
        link: '/golang/master'
      }
    ]
  },
  {
    title: '计算机底层修行',
    icon: '💻',
    skills: [
      {
        status: 'mastered', tag: '熟练掌握', title: 'Linux 系统运维',
        desc: '熟练掌握 Shell 脚本、进程管理及网络协议栈调优。',
        link: '/os/01-操作系统介绍.html'
      },
      {
        status: 'todo', tag: '未涉及', title: 'Rust 系统编程',
        desc: '计划深入内存安全模型，构建高性能底层组件。'
      }
    ]
  }
])
// 分支展开收起
const expanded = ref(skillData.value.map(() => true))
const toggle = i => (expanded.value[i] = !expanded.value[i])
</script>

<div class="skill-tree">
  <div v-for="(branch, i) in skillData" :key="branch.title" class="skill-branch">
    <div class="branch-title" @click="toggle(i)">
      <span class="branch-icon">{{ branch.icon || '📍' }}</span>
      <h3>{{ branch.title }}</h3>
      <span :class="['toggle-arrow', { open: expanded[i] }]">▼</span>
    </div>
    <transition name="fold">
      <div v-if="expanded[i]" class="skill-nodes">
        <div v-for="node in branch.skills" :key="node.title" :class="['skill-node', node.status]">
          <div :class="['node-dot', node.status, { pulse: node.status==='learning' }]"></div>
          <!-- a/div 动态渲染 -->
          <component :is="node.link ? 'a' : 'div'" :href="node.link" :class="['node-content', node.status, { 'is-link': node.link }]">
            <div class="node-tag">{{ node.tag }}</div>
            <h4 v-if="node.title">{{ node.title }}</h4>
            <p v-if="node.desc">{{ node.desc }}</p>
          </component>
        </div>
      </div>
    </transition>
  </div>
</div>

<style scoped>
.skill-tree { position: relative; padding: 32px 0 0 0; margin-top: 18px; }
.skill-tree::before {
  content: ''; position: absolute; left: 22px; top: 0; bottom: 0; width: 2px;
  background: black;
  opacity: 0.18;
}
.skill-branch { margin-bottom: 38px; position: relative;}
.branch-title { display: flex; align-items: center; margin-bottom: 11px; cursor: pointer; user-select: none; transition:.2s;}
.branch-title h3 {
  margin: 0 8px 0 0 !important; font-size: 1.1rem;
  background: black;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700;
}
.branch-title:hover { opacity: .88; }
.branch-icon { width: 34px; height: 34px; background: #f1fff5;
  border: 2px solid black; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 20px; margin-right: 13px; box-shadow: 0 0 10px #0eae8522; }
.toggle-arrow { font-size: 1rem; margin-left: 6px; transition: transform 0.28s; color: black; }
.toggle-arrow.open { transform: rotate(180deg);}
.skill-nodes { padding-left: 45px; }
.skill-node { position: relative; margin-bottom: 19px; display: flex; align-items: flex-start; }
.node-dot { position: absolute; left: -29px; top: 12px; width: 12px; height: 12px; border-radius: 50%; border: 3px solid #b5bbb7; z-index: 2; background: #fff;}
.mastered .node-dot { border-color: #40e57d; background: #40e57d; }
.learning .node-dot { border-color: #399dce; background: #399dce;}
.todo .node-dot    { border-color: #9ba6ad; background: #ececec;}
.pulse { animation: pulse-blue 2s infinite; }
@keyframes pulse-blue { 0% { box-shadow: 0 0 0 0 #399dce60; } 70% { box-shadow: 0 0 0 13px #399dce00; } 100% { box-shadow: 0 0 0 0 #399dce00; } }

.node-content {
  background: var(--vp-c-bg-soft, #fafcfb); padding: 13px 18px; border-radius: 11px; border: 1px solid var(--vp-c-divider, #e6eeec);
  transition: all 0.21s; width: 100%; text-decoration: none !important; color: inherit !important; font-size: 0.98rem;
}
.node-content.is-link { cursor: pointer; }
.node-content.is-link:hover { border-color: #189954; box-shadow: 0 0 16px #8bf3bb23; background: #f3fefa; }
.node-content.mastered { border-color: #40e57d; background: #f5fff0 }
.node-content.learning { border-color: #399dce; background: #f1f6fa }
.node-content.todo     { border-color: #bfc4c9; background: #f8f9fa }

.node-tag { display: inline-block; padding: 2px 7px; border-radius: 3px; font-size: 10px; font-weight: 700; margin-bottom: 5px;}
.mastered .node-tag { background: #eef9f1; color: #189954;}
.learning .node-tag { background: #e5f0fa; color: #2879b7; }
.todo .node-tag     { background: #eceeef; color: #adb3ba;}
.node-content h4 { margin: 0 0 3px 0; font-size: 1.03rem; color: #232; }
.node-content p { margin: 0; font-size: 0.93rem; color: #474d54; line-height: 1.55; }

@media (max-width: 640px) {
  .branch-title h3 { font-size: 0.97rem;}
  .node-content h4 { font-size: .95rem;}
}
.fold-enter-active, .fold-leave-active { transition: max-height 0.29s, opacity 0.22s; overflow: hidden;}
.fold-enter-from, .fold-leave-to { max-height: 0; opacity:0;}
.fold-enter-to, .fold-leave-from { max-height: 1200px; opacity:1; }
</style>