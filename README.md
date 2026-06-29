# 鸣潮代肝 — Wuthering Waves Boost

> 简约 · 暗色 · 可直接部署到 Cloudflare Pages

一个为《鸣潮》（Wuthering Waves）游戏代肝服务设计的静态品牌落地页。纯前端，无后端依赖，开箱即部署。

---

## 目录

- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [自定义指南](#自定义指南)
- [部署到 Cloudflare Pages](#部署到-cloudflare-pages)
- [技术栈](#技术栈)
- [许可](#许可)

---

## 快速开始

```bash
# 克隆本项目
git clone <your-repo-url>
cd wuwa-boost

# 无需安装任何依赖
# 直接用浏览器打开 index.html 即可预览
open index.html
```

项目为纯静态文件，**零依赖**，不需要 `npm install` 或构建步骤。

---

## 项目结构

```
├── index.html            # 主页面（全部内容在此）
├── css/
│   └── style.css         # 样式表（暗色主题）
├── js/
│   ├── particles.js      # 背景粒子动画
│   └── main.js           # 交互逻辑
├── _redirects            # Cloudflare Pages 路由规则
├── _headers              # HTTP 安全响应头
└── package.json          # 仅用于标识项目
```

| 文件 | 用途 |
|------|------|
| `index.html` | 页面主体：导航、Hero、服务卡片、定价、FAQ、联系表单 |
| `css/style.css` | 全局样式：暗色背景、紫蓝渐变主题、响应式布局 |
| `js/particles.js` | Canvas 粒子连接动画，营造科幻氛围 |
| `js/main.js` | 导航栏滚动效果、滚入动画、FAQ 手风琴、表单拦截、数字递增动画 |
| `_redirects` | SPA 回退：所有路径指向 `index.html` |
| `_headers` | 安全头：`X-Content-Type-Options`、`X-Frame-Options` 等 |

---

## 自定义指南

### 1. 修改品牌信息

编辑 `index.html` 中的以下部分：

- **标题 / 描述** — `<title>` 和 `<meta name="description">`
- **Hero 文案** — 第 38–55 行的标题和描述文字
- **统计数字** — `data-target` 属性（第 58–66 行）
- **联系方式** — 第 258–281 行的微信 / 邮箱 / QQ
- **版权信息** — 第 302 行 footer

### 2. 修改服务与价格

- **服务卡片** — 第 73–115 行的 `.service-card` 块。每张卡片含图标（emoji）、标题、描述、标签
- **定价方案** — 第 137–183 行的 `.pricing-card` 块。修改价格数字和 `pricing-features` 列表

### 3. 修改 FAQ

第 190–231 行，每个 `.faq-item` 为一个问答对。修改 `faq-question`（问题）和 `faq-answer`（答案）即可。

### 4. 修改主题色

编辑 `css/style.css` 中的 CSS 变量：

```css
:root {
  --accent: #7c5cfc;           /* 主色：紫色 */
  --accent-secondary: #4fc3f7; /* 辅色：蓝色 */
  --bg-primary: #0b0d15;       /* 背景色 */
  --bg-card: #16182a;          /* 卡片背景 */
  --border: #242750;           /* 边框色 */
}
```

### 5. 修改粒子效果

编辑 `js/particles.js`：

- `COUNT = 60` — 粒子数量（性能敏感，移动端建议 30–40）
- `140`（连接距离阈值） — 两个粒子之间连线的最大像素距离

### 6. 表单提交

当前表单提交仅为前端演示，提交后按钮显示"已提交"3 秒后重置。

**要接入真实通知**，修改 `js/main.js` 中 `form.addEventListener('submit', ...)` 部分，将数据发送到你的 Webhook / 邮箱 API / 企业微信机器人。

---

## 部署到 Cloudflare Pages

### 方式一：直接上传（推荐快速体验）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** → **Pages** → **创建项目**
3. 选择 **"直接上传"**
4. 将项目文件夹（包含 `index.html`、`css/`、`js/` 等）拖拽上传
5. 点击 **"部署站点"** ✅

部署完成后你会获得一个 `xxxxx.pages.dev` 的域名。

### 方式二：连接 Git 仓库（推荐持续维护）

1. 将代码推送到 GitHub / GitLab
2. Cloudflare Pages → **"连接到 Git"**
3. 选择你的仓库
4. 构建设置：

   | 配置项 | 值 |
   |--------|-----|
   | 框架预设 | **None** |
   | 构建命令 | *留空* |
   | 构建输出目录 | *留空或 `/`* |
   | 根目录 | *留空* |

5. 点击 **"保存并部署"**

之后每次推送 Git 仓库，Cloudflare Pages 会自动重新部署。

### 方式三：Wrangler CLI

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录
wrangler login

# 部署
npx wrangler pages deploy .

# 指定项目名称
npx wrangler pages deploy . --project-name wuwa-boost
```

### 绑定自定义域名

1. 在 Pages 项目页面 → **"自定义域"**
2. 输入你的域名（如 `dg.example.com`）
3. Cloudflare 会自动添加 DNS 记录并签发 SSL 证书

---

## 技术栈

| 层面 | 技术 |
|------|------|
| HTML | 语义化 HTML5 |
| CSS | 原生 CSS（CSS 变量、Grid、Flexbox） |
| JS | 原生 JavaScript（ES6+，无框架） |
| 动画 | CSS `transition` + IntersectionObserver |
| 部署 | Cloudflare Pages（全球 CDN） |

**零外部依赖** — 没有 React / Vue / jQuery，没有 CDN 字体库，没有 npm 包。加载即渲染。

---

## 许可

MIT © 2025
