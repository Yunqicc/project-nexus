import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * 获取 Supabase 客户端；若环境变量未配置返回 null
 * @returns SupabaseClient 或 null
 */
export function getSupabase(): SupabaseClient | null {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
  if (!url || !anonKey) return null
  return createClient(url, anonKey)
}
