## 目标
- 追踪“留言发送成功”事件并上报到 Google Analytics

## 实施方案
1. **修改 VibeWall 组件**：
   - 定位 `src/components/VibeWall.tsx` 中的 `handleSubmit` 函数
   - 在 Supabase 插入成功后的逻辑中，插入 `window.gtag` 调用

2. **事件设计**：
   - Event Name: `submit_guestbook_message`
   - Parameters: `{ event_category: 'engagement', event_label: 'success' }`

3. **提交与部署**：
   - 提交代码并推送，触发自动部署

## 代码逻辑
在 `error` 检查通过且数据插入成功后，执行：
```typescript
if (typeof window.gtag === 'function') {
  window.gtag('event', 'submit_guestbook_message', {
    event_category: 'engagement',
    event_label: 'success'
  });
}
```

确认后，我将立即执行。