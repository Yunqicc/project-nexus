import React, { useEffect, useState } from "react"
import { getSupabase } from "../lib/supabase"
import { sanitizeMessage } from "../utils/filter"
import type { SupabaseClient } from "@supabase/supabase-js"
import { MessageSquare, Send, Loader2 } from "lucide-react"

type Message = {
  id: number
  nickname: string
  content: string
  created_at: string
}

async function fetchMessages(client: SupabaseClient): Promise<Message[]> {
  const { data, error } = await client
    .from("guestbook")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20)
  if (error) throw error
  return data ?? []
}

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
    <div className="glass-card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-2">
        <MessageSquare className="text-brand" size={24} />
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">The Vibe Wall</h2>
      </div>
      <p className="text-sm text-neutral-400 mb-6">
        留下你的足迹，与世界分享你的想法（匿名 • 最新20条）
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-4">
          <input
            className="glass-input"
            placeholder="你的昵称"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={20}
            required
          />
          <div className="relative">
            <input
              className="glass-input w-full pr-12"
              placeholder="写下你的想法..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={50}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-brand text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </div>
        </div>
        {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">{error}</p>}
      </form>

      <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
        {messages.map((m, i) => (
          <div 
            key={m.id} 
            className="group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all animate-in slide-in-from-bottom-2"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-brand-glow text-blue-400">{m.nickname}</span>
              <span className="text-xs text-neutral-500">
                {new Date(m.created_at).toLocaleString()}
              </span>
            </div>
            <p className="text-neutral-200 break-all leading-relaxed">{m.content}</p>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center py-12 text-neutral-500">
            <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
            <p>还没有留言，来当第一位访客吧！</p>
          </div>
        )}
      </div>
    </div>
  )
}
