<template>
  <div class="flashcard-wrapper">
    <!-- 头部信息 -->
    <div class="card-header">
      <div class="header-left">
        <span class="category-badge">{{ icon || '📖' }}</span>
        <h3 class="category-name">{{ title }}</h3>
      </div>
      <div class="header-right">
        <span class="progress-text">{{ idx + 1 }} / {{ cards.length }}</span>
        <div class="theme-picker">
          <button 
            v-for="t in themes" 
            :key="t.value"
            :class="['theme-dot', { active: theme === t.value }]"
            :style="{ background: t.color }"
            @click="theme = t.value"
            :title="t.name"
          ></button>
        </div>
      </div>
    </div>

    <!-- 卡片主体 -->
    <div class="card-viewport">
      <transition name="slide-fade" mode="out-in">
        <div 
          :key="idx + '-' + flipped"
          :class="['flashcard', flipped ? 'answer-mode' : 'question-mode']"
          :data-theme="theme"
          @click="flip"
        >
          <!-- 问题面 -->
          <div v-if="!flipped" class="card-content">
            <div class="content-header">
              <span class="mode-badge q-badge">Q</span>
              <span class="mode-text">问题</span>
            </div>
            <div class="content-body">{{ cards[idx].q }}</div>
            <div class="flip-indicator">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
              <span>Tap to reveal</span>
            </div>
          </div>

          <!-- 答案面 -->
          <div v-else class="card-content">
            <div class="content-header">
              <span class="mode-badge a-badge">A</span>
              <span class="mode-text">答案</span>
            </div>
            <div class="content-body answer-text">{{ cards[idx].a }}</div>
          </div>
        </div>
      </transition>
    </div>

    <!-- 底部控制 -->
    <div class="card-controls">
      <button class="ctrl-btn" @click="prev" :disabled="cards.length <= 1">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      
      <div class="dots-group">
        <span 
          v-for="(_, i) in cards.slice(0, 10)" 
          :key="i"
          :class="['mini-dot', { current: i === idx }]"
          @click="jumpTo(i)"
        ></span>
        <span v-if="cards.length > 10" class="dot-more">+{{ cards.length - 10 }}</span>
      </div>
      
      <button class="ctrl-btn shuffle-btn" @click="next">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>
        </svg>
      </button>
      
      <button class="ctrl-btn" @click="nextCard" :disabled="cards.length <= 1">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  title: String,
  icon: String,
  cards: { type: Array, required: true }
})

const idx = ref(0)
const flipped = ref(false)
const theme = ref('slate')

const themes = [
  { value: 'slate', name: 'Slate', color: '#64748b' },
  { value: 'sage', name: 'Sage', color: '#84a98c' },
  { value: 'sand', name: 'Sand', color: '#c9ada7' },
  { value: 'ink', name: 'Ink', color: '#2d3748' },
]

function flip() { flipped.value = !flipped.value }
function next() {
  if (props.cards.length <= 1) return
  let newIdx
  do { newIdx = Math.floor(Math.random() * props.cards.length) }
  while (newIdx === idx.value)
  idx.value = newIdx
  flipped.value = false
}
function prev() {
  idx.value = idx.value > 0 ? idx.value - 1 : props.cards.length - 1
  flipped.value = false
}
function nextCard() {
  idx.value = idx.value < props.cards.length - 1 ? idx.value + 1 : 0
  flipped.value = false
}
function jumpTo(i) {
  idx.value = i
  flipped.value = false
}
watch(() => props.cards, () => { idx.value = 0; flipped.value = false })
</script>

<style scoped>
.flashcard-wrapper {
  max-width: 640px;
  margin: 48px auto;
  padding: 0 20px;
}

/* ========== 头部 ========== */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.category-badge {
  font-size: 24px;
  line-height: 1;
}

.category-name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: -0.02em;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-text {
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.theme-picker {
  display: flex;
  gap: 6px;
}

.theme-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
}

.theme-dot:hover {
  transform: scale(1.15);
}

.theme-dot.active {
  border-color: #1a1a1a;
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba(0,0,0,0.1);
}

/* ========== 卡片视口 ========== */
.card-viewport {
  margin-bottom: 20px;
  min-height: 320px;
  display: flex;
  align-items: center;
}

.flashcard {
  width: 100%;
  min-height: 320px;
  border-radius: 20px;
  padding: 40px 32px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.flashcard:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

.flashcard:active {
  transform: translateY(-2px);
}

/* ========== 主题配色 - 低饱和护眼 ========== */

/* Slate 灰蓝 - 默认推荐 */
.flashcard[data-theme="slate"].question-mode {
  background: #f8fafc;
  border-color: #cbd5e1;
}
.flashcard[data-theme="slate"].answer-mode {
  background: #f1f5f9;
  border-color: #94a3b8;
}
.flashcard[data-theme="slate"] .card-content {
  color: #1e293b;
}
.flashcard[data-theme="slate"] .mode-badge {
  background: #e2e8f0;
  color: #475569;
}
.flashcard[data-theme="slate"].answer-mode .mode-badge {
  background: #cbd5e1;
  color: #334155;
}

/* Sage 绿灰 - 护眼 */
.flashcard[data-theme="sage"].question-mode {
  background: #f7f9f7;
  border-color: #d4e0d4;
}
.flashcard[data-theme="sage"].answer-mode {
  background: #f0f5f0;
  border-color: #a8c7a8;
}
.flashcard[data-theme="sage"] .card-content {
  color: #2d3e2d;
}
.flashcard[data-theme="sage"] .mode-badge {
  background: #e3ede3;
  color: #52734d;
}
.flashcard[data-theme="sage"].answer-mode .mode-badge {
  background: #d4e0d4;
  color: #3e5839;
}

/* Sand 米棕 - 温暖 */
.flashcard[data-theme="sand"].question-mode {
  background: #faf9f7;
  border-color: #e5dcd5;
}
.flashcard[data-theme="sand"].answer-mode {
  background: #f5f0eb;
  border-color: #d4c4b8;
}
.flashcard[data-theme="sand"] .card-content {
  color: #3e3532;
}
.flashcard[data-theme="sand"] .mode-badge {
  background: #ebe3dc;
  color: #6b5d55;
}
.flashcard[data-theme="sand"].answer-mode .mode-badge {
  background: #e0d5cc;
  color: #4a3f37;
}

/* Ink 墨黑 - 极简 */
.flashcard[data-theme="ink"].question-mode {
  background: #ffffff;
  border-color: #e2e8f0;
}
.flashcard[data-theme="ink"].answer-mode {
  background: #f8fafc;
  border-color: #cbd5e1;
}
.flashcard[data-theme="ink"] .card-content {
  color: #0f172a;
}
.flashcard[data-theme="ink"] .mode-badge {
  background: #f1f5f9;
  color: #475569;
}
.flashcard[data-theme="ink"].answer-mode .mode-badge {
  background: #e2e8f0;
  color: #334155;
}

/* ========== 内容区 ========== */
.card-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

.content-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mode-badge {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
}

.mode-text {
  font-size: 0.8rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 600;
}

.content-body {
  font-size: 1.35rem;
  line-height: 1.6;
  font-weight: 500;
  word-wrap: break-word;
  white-space: pre-wrap;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;
}

.content-body::-webkit-scrollbar {
  width: 4px;
}

.content-body::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 2px;
}

.content-body::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.25);
}

.answer-text {
  font-weight: 400;
  font-size: 1.2rem;
}

.flip-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  opacity: 0;
  transition: opacity 0.3s;
  margin-top: auto;
}

.flashcard:hover .flip-indicator {
  opacity: 0.5;
}

/* ========== 控制栏 ========== */
.card-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.ctrl-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1.5px solid #e2e8f0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  color: #64748b;
}

.ctrl-btn:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #cbd5e1;
  color: #475569;
  transform: translateY(-1px);
}

.ctrl-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.shuffle-btn {
  border-color: #334155;
  background: #334155;
  color: #fff;
}

.shuffle-btn:hover {
  background: #475569;
  border-color: #475569;
}

.dots-group {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 8px;
}

.mini-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #cbd5e1;
  cursor: pointer;
  transition: all 0.2s;
}

.mini-dot:hover {
  background: #94a3b8;
  transform: scale(1.3);
}

.mini-dot.current {
  background: #475569;
  width: 18px;
  border-radius: 3px;
}

.dot-more {
  font-size: 0.7rem;
  color: #94a3b8;
  margin-left: 2px;
}

/* ========== 动画 ========== */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px) scale(0.95);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px) scale(0.95);
}

/* ========== 响应式 ========== */
@media (max-width: 640px) {
  .flashcard-wrapper {
    padding: 0 16px;
    margin: 32px auto;
  }

  .category-name {
    font-size: 1.1rem;
  }

  .flashcard {
    padding: 32px 24px;
    min-height: 280px;
  }

  .content-body {
    font-size: 1.15rem;
  }

  .answer-text {
    font-size: 1.05rem;
  }

  .card-controls {
    gap: 12px;
  }

  .ctrl-btn {
    width: 36px;
    height: 36px;
  }

  .dots-group {
    gap: 4px;
  }
}

@media (max-width: 480px) {
  .header-right {
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
  }

  .content-body {
    font-size: 1.05rem;
  }
}
</style>