## 目标
- 启用 GitHub Pages，生成在线访问链接（Live Demo）
- 解决 SPA（单页应用）在 GitHub Pages 刷新 404 的问题
- 配置 Vite 构建输出路径，使其适配 GitHub Pages

## 问题分析
你提到的“没有 GitHub 访问链接”通常指没有**部署**成一个可预览的网站。GitHub 仓库本身只是代码托管。我们需要配置 **GitHub Actions** 或 **GitHub Pages** 来构建并托管前端页面。

## 实施方案
1. **调整 Vite 配置**
   - 修改 `vite.config.ts` 的 `base` 路径为 `/project-nexus/`（仓库名），否则资源路径会错误
2. **添加部署工作流**
   - 创建 `.github/workflows/deploy.yml`
   - 配置自动化构建：`npm run build` -> 发布到 `gh-pages` 分支
3. **提交代码**
   - 将配置推送到 `main` 分支
4. **启用 Pages**
   - 推送后，GitHub Action 会自动运行，你需要到仓库 Settings -> Pages 确认源分支为 `gh-pages`

## 执行步骤
1. 修改 `vite.config.ts` 添加 base 路径
2. 创建 `.github/workflows/deploy.yml`
3. 提交并推送代码
4. 引导你在 GitHub Settings 中查看最终链接

确认后，我将立即配置自动化部署。