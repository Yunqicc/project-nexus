/**
 * 简单敏感词过滤与长度校验
 * @param nickname 昵称（1-20）
 * @param content 留言内容（1-50）
 * @returns 通过校验后的 { nickname, content }
 * @throws 当内容不合法时抛出错误
 */
export function sanitizeMessage(nickname: string, content: string) {
  const words = ["傻", "垃圾", "辱骂"] // MVP 示例词，可扩展或改为更完善的词库

  const n = nickname.trim()
  const c = content.trim()
  if (n.length < 1 || n.length > 20) throw new Error("昵称长度需在 1-20 字符之间")
  if (c.length < 1 || c.length > 50) throw new Error("留言长度需在 1-50 字符之间")

  const lowered = c.toLowerCase()
  for (const w of words) {
    if (lowered.includes(w)) {
      throw new Error("包含不合适词语，请友善留言")
    }
  }
  return { nickname: n, content: c }
}
