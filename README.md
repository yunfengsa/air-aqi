# Air AQI - 空气质量指数展示

`Air AQI` 是一个基于 Next.js 开发的现代化空气质量指数（AQI）展示平台。它提供实时数据监控、深度指标分析以及针对性健康建议，旨在帮助用户直观地了解周边空气质量状况。

## 🚀 核心功能

- **实时数据监控**：接入 WAQI API，实时获取济南及周边地区的空气质量指数。
- **动态更新机制**：服务端每小时缓存优化，客户端每 4 小时静默自动刷新，无需手动刷新页面。
- **深度污染物百科**：点击 PM2.5、PM10、O3 等指标卡片，即可查看科学定义、来源、健康影响及具体的预防建议。
- **可视化分级**：根据国家 AQI 标准，通过 6 色视觉编码直观展示污染等级。
- **精简预报系统**：展示未来数日的空气趋势，自动过滤历史过期数据。
- **PWA 支持**：支持在 Android/iOS 设备上“添加到主屏幕”安装应用，支持 Service Worker 缓存，具备离线访问能力。
- **卓越的移动适配**：针对窄屏设备优化了主数值显示与预报列表（卡片化布局），确保一屏内展示核心内容。

## 🛠 技术栈

- **框架**: Next.js 16 (App Router)
- **UI 库**: React 19
- **语言**: TypeScript (严格模式)
- **样式**: Tailwind CSS v4
- **工具**: Biome (Linting & Formatting)
- **缓存**: Next.js Fetch Cache (Server-side) & Service Worker (Client-side)

## 📦 快速开始

### 1. 环境准备

在项目根目录下创建 `.env.local` 文件，并填入您的 [WAQI API Token](https://aqicn.org/data-platform/token/):

```bash
AQI_API_TOKEN=your_token_here
```

### 2. 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 `http://localhost:3000` 即可预览。

### 3. 构建与部署

```bash
# 构建生产版本
npm run build

# 启动生产服务
npm run start
```

## 🔐 安全与隐私

- **API 代理**：所有敏感 API 请求均通过 Next.js 后端路由转发，不向客户端暴露 Token。
- **来源限制**：后端接口具备严格的 Origin 与 Referer 校验，防止被第三方外部站点盗刷。

## 📱 PWA 安装

在 Android 手机上通过 Chrome 浏览器访问，点击“添加到主屏幕”，即可像原生 App 一样快速启动并拥有沉浸式体验。