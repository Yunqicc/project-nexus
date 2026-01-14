## 技术栈与总体架构
- 前端：Vite + React + TypeScript + Tailwind CSS（轻量、快速搭建、易于动效与暗黑模式）
- 后端：Supabase（Postgres + 行级安全 RLS），前端通过 supabase-js 直接读写
- 数据传输：前端直连 Supabase（匿名/公共表 + 受控策略），不引入自建后端以满足 MVP 快速交付
- 配置：使用环境变量 import.meta.env.VITE_SUPABASE_URL、VITE_SUPABASE_ANON_KEY（不提交私钥）

## 项目目录结构
- 根目录
  - src/
    - components/Hero.tsx、ProjectGallery.tsx、VibeWall.tsx、ThemeToggle.tsx
    - lib/supabase.ts（Supabase 客户端封装）
    - data/projects.ts（项目卡片数据）
    - utils/filter.ts（本地敏感词过滤与长度限制）
    - App.tsx、main.tsx
  - public/
    - resume.pdf（简历静态资源）
  - tailwind.config.ts、postcss.config.cjs、tsconfig.json、index.html、package.json
  - .env.local（本地开发环境变量）

## 数据库设计（Supabase）
- 表：guestbook
  - id: bigint primary key
  - nickname: text not null（长度 1–20）
  - content: text not null（长度 1–50）
  - created_at: timestamptz default now()
- 安全策略（RLS）：
  - 启用 RLS；允许匿名角色 insert/select；对列长度在前端校验，后端不存 IP
  - 可选：限制单行最大长度、简单敏感词后端校验（MVP 暂以前端）
- 索引：created_at 倒序查询（无需额外索引，默认即可）

## 关键模块实现方案
- Hero Section
  - 使用 typewriter-effect 或自实现轮播（setInterval +渐变）
  - 极简导航锚点：Projects / About / Contact（跳转到对应区块）
  - 社交图标：GitHub/Bilibili/Email，Tailwind hover: scale/opacity
- Project Gallery
  - Grid 卡片布局，标签徽章（Supabase/React/AI）
  - hover 上浮与按钮（查看源码/在线体验），按钮使用外链
- Vibe Wall（核心）
  - 表单：nickname + content，受控组件；长度限制 20/50；
  - 提交：supabase.from('guestbook').insert([{nickname, content}])
  - 列表：useEffect 初次加载 + 轮询/插入后刷新；按 created_at desc 限 20
  - 敏感词过滤：utils/filter.ts（本地数组匹配 + 替换或阻止）
- 暗黑模式
  - Tailwind dark class 切换，localStorage 记忆，首屏闪烁处理（class 注入）
- 简历下载
  - public/resume.pdf 静态资源，一键下载按钮

## 方法与注释规范
- 所有导出方法、hook、工具函数使用 TSDoc 标注参数、返回值、异常说明
- 组件内部关键处理（提交、过滤、加载）采用清晰函数拆分并注释

## 开发步骤
1. 初始化项目：Vite + React + TS、配置 Tailwind、基础页面骨架
2. Supabase 客户端封装：lib/supabase.ts，从环境变量读取，严禁硬编码
3. Hero 与导航、社交图标与动效
4. Project Gallery 组件与数据文件
5. Vibe Wall：表单校验、敏感词过滤、insert/select 流程、列表渲染
6. 暗黑模式切换与状态持久化
7. 简历下载与静态资源放置
8. 质量保障：类型检查、ESLint、基本组件测试（可选）与手动验收

## 验收与测试
- 功能验收：
  - F-01/F-02/F-03/F-04/F-05/F-06 逐条演示
  - 用户流：进入主页→浏览项目→留言→即时显示→满意离开
- 测试策略：
  - 前端：单元测试（过滤函数）、集成测试（提交后列表刷新）
  - 手动：暗黑切换、简历下载、移动端视图

## 安全与合规
- 不提交私密环境变量；仅使用 anon key
- RLS 保护表；前端校验与限制输入长度、防止无意义刷屏（后续可加速率限制/验证码）

## 未来扩展（V1.1）
- 接入 AI Agent 自动回复；事件埋点：简历下载点击次数

## 需要你确认的事项
- 是否采用 Vite + React + TS + Tailwind + Supabase 的技术栈
- guestbook 表结构与前端长度限制是否符合预期
- typewriter-effect 库可用，或改为自实现轮播
- 暗黑模式与简历下载的实现路径是否 OK

请确认以上方案，我将按该方案开始编码并为每个方法补充规范注释。