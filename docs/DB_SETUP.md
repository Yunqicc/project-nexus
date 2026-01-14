# Project Nexus 数据库接入指南

## 步骤一：在 Supabase 创建项目
- 登录 https://supabase.com 并创建新项目
- 记录 Project URL 与 anon 公钥（Settings → API）

## 步骤二：执行初始化 SQL
- 打开 SQL 编辑器，将 [db/init.sql](../db/init.sql) 内容粘贴并执行
- 若之前执行过旧策略，建议先删除后重建

示例（删除旧策略并重建）：

```sql
DROP POLICY IF EXISTS "Allow anon insert" ON public.guestbook;
DROP POLICY IF EXISTS "Allow anon select" ON public.guestbook;

CREATE POLICY "Allow anon insert"
ON public.guestbook FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow anon select"
ON public.guestbook FOR SELECT
TO anon
USING (true);
```

> 如果希望匿名与已登录用户都可访问，将 `TO anon` 改为 `TO public` 即可。

## 步骤三：配置本地环境变量
- 在项目根目录创建 .env.local（不提交到仓库）

```bash
VITE_SUPABASE_URL=你的项目URL
VITE_SUPABASE_ANON_KEY=你的匿名密钥
```

- 重启本地开发（npm run dev）

## 步骤四：功能联调
- 打开 http://localhost:5173/ → The Vibe Wall
- 输入昵称与留言后点击发送：
  - 前端校验（长度与基础敏感词）
  - 成功插入后列表刷新并显示最新 20 条
- 测试边界：
  - 长度超限应被前端阻止；即便绕过也会被服务端约束拒绝

## 常见问题
- 未配置环境变量：页面将提示“未配置 Supabase 环境变量”，请检查 .env.local
- 权限错误：确保 RLS 已启用且 anon 策略包含 insert 与 select
- 速率限制/防刷：MVP 暂不启用，可后续通过 Edge Functions 或验证码增强
