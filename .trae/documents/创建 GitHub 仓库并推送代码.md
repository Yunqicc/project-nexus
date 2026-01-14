## 目标
- 在 GitHub 上创建名为 `project-nexus` 的新仓库
- 将本地 `Project Nexus` 项目初始化为 git 仓库（如果尚未初始化）
- 将本地代码提交并推送到 GitHub 远程仓库

## 执行步骤
1. **检查与初始化 Git**
   - 检查本地是否已有 `.git` 目录
   - 若无，执行 `git init`，并创建 `.gitignore`（确保包含 node_modules, .env.local 等）
   - 执行 `git add .` 和 `git commit -m "Initial commit"`

2. **创建远程仓库**
   - 使用 `mcp_GitHub_create_repository` 创建公开仓库 `project-nexus`
   - 获取仓库的 clone_url 或 html_url

3. **关联与推送**
   - 添加远程仓库地址：`git remote add origin <repo_url>`
   - 推送代码：`git push -u origin main`（或 master）

4. **验证**
   - 返回仓库 URL 给用户，确认推送成功

## 注意事项
- 确保 `.env.local` 被忽略，不推送到 GitHub
- 仓库名称若冲突，将自动添加随机后缀或请求用户确认（本方案优先尝试 `project-nexus`）

确认后，我将按顺序执行这些操作。