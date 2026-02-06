<script setup>
import MemoryFlashcards from './.vitepress/theme/components/MemoryFlashcards.vue'
import { parseCardsFromMarkdown } from './.vitepress/theme/utils/parseCards.js'
import networkMd from './cards/network.md?raw'

const networkCards = parseCardsFromMarkdown(networkMd)
</script>

<MemoryFlashcards title="计算机网络" icon="🌐" :cards="networkCards" />