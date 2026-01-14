## 目标
- 全面优化 Project Nexus 的 SEO 配置，提升搜索引擎收录与社交分享体验
- 解决当前仅使用 Vite 默认 TDK（Title/Description/Keywords）的问题

## 实施方案
1. **安装依赖**：引入 `react-helmet-async` 用于动态管理 Head 标签
2. **SEO 组件封装**：创建 `components/SEO.tsx`
   - 支持自定义 title, description, keywords
   - 自动生成 Open Graph (OG) 和 Twitter Card 标签
   - 支持 canonical URL 规范化
3. **页面集成**：在 `App.tsx` 或各页面组件中接入 SEO 组件
   - 首页：配置核心关键词（Project Showcase, Portfolio, Vibe Wall）
4. **静态文件优化**：
   - 更新 `index.html` 的默认兜底 Meta
   - 生成 `public/robots.txt`
   - 生成 `public/sitemap.xml`（针对单页应用提供基础索引）

## 预期效果
- 浏览器标签页显示准确的项目名称
- 分享到微信/Twitter/Discord 时显示精美的卡片预览（标题+描述+图片）
- 搜索引擎能抓取到正确的站点描述与关键词

确认后，我将安装依赖并开始编码。