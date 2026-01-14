## 问题原因
- 报错：ERROR: 42601 only WITH CHECK expression allowed for INSERT
- 解析：在 PostgreSQL 的行级安全（RLS）中，INSERT 策略不支持 USING 子句，INSERT 仅允许 WITH CHECK 表达式；USING 仅用于 SELECT/DELETE/UPDATE

## 修复思路
- 删除 INSERT 策略中的 USING 子句，仅保留 WITH CHECK
- SELECT 策略保留 USING(true)
- 若希望匿名与登录用户都可访问，可改为 to public；当前继续使用 to anon 满足 MVP

## 替换后的完整脚本
建议先删除旧策略再重建：
```sql
-- 删除旧策略（若存在）
DROP POLICY IF EXISTS "Allow anon insert" ON public.guestbook;
DROP POLICY IF EXISTS "Allow anon select" ON public.guestbook;

-- 重建策略
CREATE POLICY "Allow anon insert"
ON public.guestbook FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow anon select"
ON public.guestbook FOR SELECT
TO anon
USING (true);
```

如需同时允许匿名与已登录用户访问，可改为：
```sql
CREATE POLICY "Allow public insert" ON public.guestbook FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public select" ON public.guestbook FOR SELECT TO public USING (true);
```

## 执行步骤
1. 在 Supabase SQL 编辑器中粘贴“删除旧策略 + 重建策略”的脚本并执行
2. 保留你已创建的表与约束，无需变更
3. 在前端刷新页面，验证留言墙的读取与插入是否可用

## 文档与脚本更新计划
- 更新 db/init.sql：去除 INSERT 策略的 USING，保持 WITH CHECK
- 更新 docs/DB_SETUP.md：同步更正示例策略与说明

确认后我将更新仓库中的 init.sql 与文档，同时进行端到端联调