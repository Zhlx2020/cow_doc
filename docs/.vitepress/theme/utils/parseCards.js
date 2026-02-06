export function parseCardsFromMarkdown(markdown) {
  const lines = markdown.split('\n')
  const cards = []
  let currentQ = ''
  let currentA = ''
  let inAnswer = false

  for (let line of lines) {
    // 跳过frontmatter
    if (line.trim().startsWith('---')) continue
    
    // 检测问题（以 # 开头）
    if (line.trim().startsWith('# ')) {
      // 保存上一个卡片
      if (currentQ && currentA) {
        cards.push({ q: currentQ.trim(), a: currentA.trim() })
      }
      currentQ = line.replace(/^#\s*/, '').trim()
      currentA = ''
      inAnswer = true
      continue
    }

    // 累积答案
    if (inAnswer && line.trim()) {
      currentA += line + '\n'
    }
  }

  // 最后一张卡片
  if (currentQ && currentA) {
    cards.push({ q: currentQ.trim(), a: currentA.trim() })
  }

  return cards
}