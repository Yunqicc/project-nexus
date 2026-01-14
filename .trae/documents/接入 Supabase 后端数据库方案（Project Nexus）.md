## 目标与范围
- 接入 Supabase 作为后端数据库，实现匿名留言墙的持久化读写与安全访问
- 保持前端直连架构（无自建后端），满足 PRD 的 MVP 要求

## 环境变量配置
- 在项目根目录创建 .env.local（不提交到仓库）：
  - VITE_SUPABASE_URL=https://你的项目.supabase.co
  - VITE_SUPABASE_ANON_KEY=你的匿名密钥
- 前端使用惰性初始化的 getSupabase() 读取变量，未配置时显示提示

## 数据库与表设计
- 表：public.guestbook
  - id bigint identity primary key
  - nickname text not null（1–20）
  - content text not null（1–50）
  - created_at timestamptz default now()
- 约束（服务端强约束，避免仅依赖前端）：
  - check (char_length(nickname) between 1 and 20)
  - check (char_length(content) between 1 and 50)

### 初始化 SQL（在 Supabase SQL 编辑器执行）
```sql
create table if not exists public.guestbook (
  id bigint generated always as identity primary key,
  nickname text not null,
  content text not null,
  created_at timestamptz not null default now(),
  constraint nickname_len check (char_length(nickname) between 1 and 20),
  constraint content_len check (char_length(content) between 1 and 50)
);

alter table public.guestbook enable row level security;

create policy "Allow anon insert"
on public.guestbook for insert to anon
using (true) with check (true);

create policy "Allow anon select"
on public.guestbook for select to anon
using (true);
```

## 安全策略（RLS）
- 启用 RLS，允许 anon 角色 insert/select，仅限于 guestbook 表
- 不记录 IP 等敏感信息；后续可在 Edge Functions/触发器上增加更严格校验与速率限制

## 索引与查询
- 主要查询为按 created_at 倒序 + 限制 20 条，默认即可满足
- 如后续量增大，可考虑在 created_at 建索引

## 前端接入点（已实现）
- lib/supabase.ts：getSupabase() 惰性初始化
- VibeWall.tsx：
  - fetchMessages(client): 读取最新 20 条，倒序
  - submitMessage(client, nickname, content): 前端校验后插入，并刷新列表
- utils/filter.ts：前端敏感词与长度校验（与服务端约束协同）
- 方法注释：均采用 TSDoc，包含参数、返回值、异常说明

## 验收与测试
- 环境：将 URL 与 ANON KEY 写入 .env.local 并重启 dev
- 测试：
  - 打开 http://localhost:5173/ 在 Vibe Wall 输入昵称与留言
  - 提交后应即时显示在列表（最新 20 条）
  - 测试长度边界与敏感词提示；服务端约束应拒绝超限

## 后续扩展（可选）
- 速率限制与防刷：基于 Edge Function + KV/存储计数，或 ReCAPTCHA
- 敏感词后端校验：数据库触发器或 Edge Function 更完善的词库
- Realtime 订阅：留言墙实时推送更新，无需轮询

## 执行清单
1. 在 Supabase 控制台执行初始化 SQL（建表、RLS、策略、约束）
2. 在本地配置 .env.local（URL 与 ANON KEY）
3. 启动本地 dev 并完成留言墙端到端验证

请确认以上方案，我将据此执行数据库初始化与本地环境配置，并完成端到端联调与演示。