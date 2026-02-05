import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件所在目录的绝对路径
const __dirname = path.dirname(fileURLToPath(import.meta.url))
// 锁定文档根目录：当前文件是在 .vitepress 目录下，所以其父目录就是文档根目录
const DOCS_ROOT = path.resolve(__dirname, '..')

const IGNORE_FILES = ['.vitepress', 'node_modules', 'public', 'index.md']

/**
 * 自动生成侧边栏
 * @param {string} subDir 想要扫描的子目录（相对于 docs 根目录）
 */
export function getSidebar(subDir = '') {
  // 拼接出要扫描的绝对路径
  const scanDir = path.join(DOCS_ROOT, subDir)
  
  // 检查目录是否存在，不存在则返回空数组，防止报错
  if (!fs.existsSync(scanDir)) {
    console.warn(`[Sidebar Script] Warning: Directory not found: ${scanDir}`)
    return []
  }

  const files = fs.readdirSync(scanDir)
  const sidebar = []

  files.forEach((file) => {
    const filePath = path.join(scanDir, file)
    const stat = fs.statSync(filePath)

    if (IGNORE_FILES.includes(file)) return

    if (stat.isDirectory()) {
      const items = getSidebar(path.join(subDir, file))
      if (items.length > 0) {
        sidebar.push({
          text: formatTitle(file),
          collapsed: false,
          items: items
        })
      }
    } else if (file.endsWith('.md')) {
      const fileName = file.replace('.md', '')
      // 处理 index.md 的特殊情况（如果是子目录下的 index.md）
      const linkName = fileName === 'index' ? '' : fileName
      
      const title = getMarkdownTitle(filePath) || formatTitle(fileName)
      
      sidebar.push({
        text: title,
        link: `/${path.join(subDir, linkName).replace(/\\/g, '/')}`
      })
    }
  })

  // 排序：文件夹在前，文件在后，并按名称排序
  return sidebar.sort((a, b) => {
    if (a.items && !b.items) return -1
    if (!a.items && b.items) return 1
    return 0
  })
}

function formatTitle(name) {
  return name
    .replace(/^\d+-/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
}

function getMarkdownTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const match = content.match(/^#\s+(.*)/m)
    return match ? match[1].trim() : null
  } catch (err) {
    return null
  }
}