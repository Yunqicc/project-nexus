## 目标
- 全面升级 UI/UX，打造“Vibe”风格的极光深色主题
- 实现极致的移动端适配

## 实施方案

### 1. 配置 Tailwind (tailwind.config.ts)
- 添加自定义动画关键帧：`blob` (用于背景极光流动)、`float` (用于卡片悬浮)
- 扩展颜色面板，适应深色磨砂风格

### 2. 全局样式升级 (index.css)
- 重写 `body` 背景：使用深色渐变 + CSS 动画实现流动的极光效果
- 定义全局的“毛玻璃”工具类，方便复用

### 3. 组件重构
- **App.tsx (Header)**:
  - 导航栏改为全透明毛玻璃，移除生硬的边框
  - 适配深色模式文字
- **Hero.tsx**:
  - 增强标题视觉冲击力
  - 按钮添加发光 Hover 效果
- **ProjectGallery.tsx**:
  - 卡片改为磨砂玻璃风格 (`bg-white/5` + `backdrop-blur`)
  - 添加 Hover 上浮与发光动画
  - 强制移动端单列布局
- **VibeWall.tsx**:
  - 留言卡片样式统一为磨砂玻璃
  - 输入框与按钮交互优化

## 执行顺序
1. 修改 `tailwind.config.ts` 添加动画配置
2. 修改 `index.css` 实现极光背景
3. 依次重构 `App.tsx`, `Hero.tsx`, `ProjectGallery.tsx`, `VibeWall.tsx`
4. 提交代码并推送

确认后，我将从 Tailwind 配置开始。