import React, { useEffect, useState } from "react"
import { getSupabase } from "../lib/supabase"
import { sanitizeMessage } from "../utils/filter"
import type { SupabaseClient } from "@supabase/supabase-js"

type Message = {
  id: number
  nickname: string
  content: string
  created_at: string
}

/**
 * 读取最新留言
 * @returns 最新的留言列表（按时间倒序，最多 20 条）
 * @throws 当网络或服务异常时抛出错误
 */
async function fetchMessages(client: SupabaseClient): Promise<Message[]> {
  const { data, error } = await client
    .from("guestbook")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20)
  if (error) throw error
  return data ?? []
}

/**
 * 提交一条留言
 * @param nickname 昵称
 * @param content 留言内容
 * @returns 插入的行信息（用于确认）
 * @throws 当校验或插入异常时抛出错误
 */
async function submitMessage(client: SupabaseClient, nickname: string, content: string) {
  const { nickname: n, content: c } = sanitizeMessage(nickname, content)
  const { data, error } = await client
    .from("guestbook")
    .insert([{ nickname: n, content: c }])
    .select()
  if (error) throw error
  return data
}

export default function VibeWall() {
  const [messages, setMessages] = useState<Message[]>([])
  const [nickname, setNickname] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      const client = getSupabase()
      if (!client) {
        setError("未配置 Supabase 环境变量，留言墙暂不可用")
        return
      }
      try {
        const list = await fetchMessages(client)
        setMessages(list)
      } catch (e: any) {
        setError(e?.message ?? "加载失败")
      }
    })()
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const client = getSupabase()
      if (!client) throw new Error("未配置 Supabase 环境变量")
      await submitMessage(client, nickname, content)
      
      // GA Event Tracking
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'submit_guestbook_message', {
          event_category: 'engagement',
          event_label: 'success'
        });
      }

      setNickname("")
      setContent("")
      const list = await fetchMessages(client)
      setMessages(list)
    } catch (e: any) {
      setError(e?.message ?? "提交失败")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">The Vibe Wall</h2>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        匿名留言墙（最多显示最新 20 条）
      </p>

      <form onSubmit={onSubmit} className="mt-6 flex flex-col sm:grid sm:grid-cols-[200px,1fr,auto] gap-3">
        <input
          className="border rounded px-3 py-2 bg-white dark:bg-neutral-800"
          placeholder="昵称（1-20）"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={20}
        />
        <input
          className="border rounded px-3 py-2 bg-white dark:bg-neutral-800"
          placeholder="想说的话（1-50）"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={50}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-brand text-white disabled:opacity-60 active:scale-95 transition-transform"
        >
          {loading ? "发送中..." : "发送"}
        </button>
      </form>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <ul className="mt-8 space-y-3">
        {messages.map((m) => (
          <li key={m.id} className="border rounded p-3">
            <div className="text-sm text-neutral-500">
              {m.nickname} • {new Date(m.created_at).toLocaleString()}
            </div>
            <div className="mt-1 break-all">{m.content}</div>
          </li>
        ))}
        {messages.length === 0 && (
          <li className="text-sm text-neutral-500">还没有留言，来当第一位访客吧！</li>
        )}
      </ul>
    </div>
  )
}
