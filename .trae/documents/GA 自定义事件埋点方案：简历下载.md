## 目标
- 追踪“简历下载”点击事件并上报到 Google Analytics

## 实施方案
1. **TypeScript 类型定义**：
   - 创建 `src/types/global.d.ts`，为 `window` 对象添加 `gtag` 方法定义，防止 TS 报错。

2. **添加事件追踪**：
   - 修改 `src/components/Hero.tsx`
   - 在“Download Resume”按钮上添加 `onClick` 处理函数
   - 调用 `window.gtag('event', 'download_resume', { ... })`

3. **提交与部署**：
   - 提交代码并推送，触发自动部署

## 事件详情
- Event Name: `download_resume`
- Parameters: `{ file_name: 'resume.pdf', event_category: 'engagement' }`

确认后，我将立即执行。