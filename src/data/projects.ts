export type ProjectItem = {
  title: string
  description: string
  tags: string[]
  source?: string
  demo?: string
}

export const projects: ProjectItem[] = [
  {
    title: "SnapLog 记账工具",
    description: "一个简单优雅的记账应用，支持分类与统计。",
    tags: ["React", "Tailwind"],
    source: "https://github.com/your/snaplog",
    demo: "https://snaplog.example.com"
  },
  {
    title: "提示词管理站",
    description: "管理和分享高质量提示词的轻量平台。",
    tags: ["Supabase", "React", "AI"],
    source: "https://github.com/your/prompt-hub"
  }
]
