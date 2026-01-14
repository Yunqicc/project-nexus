## 目标
- 将 Google Analytics 代码直接嵌入 index.html
- 清理之前的 react-ga4 实现
- 重新部署以通过 GA 检测

## 执行步骤
1. **修改 index.html**
   - 在 `<head>` 中插入用户提供的 `gtag.js` 脚本
   - 使用 `.env` 中的 `VITE_GA_ID` 替换硬编码 ID（或者根据用户意愿直接硬编码，鉴于用户提供了具体代码块，直接嵌入可能更稳妥，但我会保留环境变量的灵活性）
     *修正策略*：为了确保与用户提供的代码完全一致从而通过检测，我将直接把代码块写入 `index.html`，但 ID 部分我还是建议用 EJS 注入或者直接硬编码。鉴于这是纯 Vite 项目，`index.html` 不支持运行时环境变量注入（除非用插件）。为了最快解决问题，我将**硬编码**用户提供的代码到 `index.html`。

2. **清理旧代码**
   - 删除 `src/lib/analytics.ts`
   - 移除 `App.tsx` 中的 `initGA` 调用
   - 卸载 `react-ga4`

3. **提交与部署**
   - 推送代码到 GitHub
   - 提醒用户手动触发或等待自动部署

## 预期效果
- 源码中包含原生 GA 脚本
- Google Analytics 能成功检测到代码安装

确认后立即执行。