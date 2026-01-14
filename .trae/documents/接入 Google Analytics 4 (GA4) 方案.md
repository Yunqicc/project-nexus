## 目标
- 接入 Google Analytics 4 (GA4)
- 使用 `react-ga4` 库进行初始化与页面浏览追踪
- 将 GA Measurement ID 配置为环境变量（支持 GitHub Secrets）
- 提交代码到 GitHub 并触发自动部署

## 实施方案
1. **安装依赖**：引入 `react-ga4`
2. **环境变量配置**：
   - 在 `.env.local` 添加 `VITE_GA_ID=G-P06Y77RQGR`
   - 更新 `.env.example`
3. **初始化 GA**：
   - 在 `src/lib/analytics.ts` 中封装初始化逻辑
   - 在 `App.tsx` 中调用初始化，并添加路由监听（如有必要，当前为单页滚动，可只追踪初始化）
4. **CI/CD 配置**：
   - 更新 `.github/workflows/deploy.yml`，注入 `VITE_GA_ID`
5. **提交与推送**：
   - 提交代码变更
   - 提醒用户在 GitHub Secrets 中添加 `VITE_GA_ID`

## 预期效果
- 网站加载时自动初始化 GA
- 你的 Google Analytics 后台开始接收实时数据

确认后，我将安装依赖并开始集成。