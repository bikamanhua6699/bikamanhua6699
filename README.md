<div align="center">

# 哔咔漫画 · PicACG

**随时随地，畅享漫画世界**

一个用于 GitHub Pages 托管的哔咔漫画客户端官方下载站 —— 纯静态、零依赖、开箱即用。

[![License](https://img.shields.io/badge/license-MIT-ff6b9d?style=flat-square)](./LICENSE)
[![Version](https://img.shields.io/badge/version-v3.0.0-a855f7?style=flat-square)](./CHANGELOG.md)
[![Pages](https://img.shields.io/badge/GitHub%20Pages-ready-22d3ee?style=flat-square)](https://pages.github.com/)
[![No Dependencies](https://img.shields.io/badge/dependencies-0-34d399?style=flat-square)](#-技术说明)
[![HTML5](https://img.shields.io/badge/HTML-5-f59e0b?style=flat-square)](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-f43f5e?style=flat-square)](#-参与贡献)

[功能特色](#-功能特色) · [快速开始](#-快速开始) · [目录结构](#-目录结构) · [**如何更新**](#-后期更新指南重点) · [部署](#-部署到-github-pages) · [常见问题](#-常见问题)

</div>

---

## 📖 项目简介

本项目是一个**纯静态**的产品落地页 / 软件下载站，用于展示 **哔咔漫画（PicACG）** 客户端的功能特性、界面预览、版本号、更新日志与下载入口。

页面采用深色主题 + 渐变霓虹风格，全站响应式，无任何构建步骤、无框架、无第三方 CDN 依赖 —— 把整个文件夹丢进 GitHub 仓库，开启 Pages 就能跑。

> **设计目标：** 让「发一个新版本」这件事，从「改十个地方」变成「改一个文件」。

---

## ✨ 功能特色

### 网页本身

| 特性 | 说明 |
|---|---|
| 🎨 **现代深色 UI** | 渐变霓虹配色，毛玻璃导航，卡片悬浮反馈 |
| 📱 **完全响应式** | 桌面 / 平板 / 手机三档断点，移动端抽屉式菜单 |
| ⚡ **零依赖** | 不引入 jQuery / Bootstrap / 任何 CDN，加载极快 |
| 🔄 **数据驱动** | 版本号、下载链接、更新日志全部由 JS 配置文件驱动 |
| 📝 **自带更新日志** | 时间线布局，支持展开/收起、分类筛选、分页加载 |
| 🔍 **SEO 友好** | 完整的 meta 描述、关键词与 Open Graph 标签 |
| ♿ **无障碍** | 语义化标签、`aria` 属性、尊重 `prefers-reduced-motion` |
| 🛡️ **XSS 防护** | 所有动态文本经 HTML 转义后渲染 |
| 🧩 **零构建** | 双击 `index.html` 就能本地预览，无需 npm / node |

### 客户端

- 🚀 **极速加载** —— 多线程预加载 + 智能图片压缩，翻页几乎零等待
- 📥 **离线缓存** —— 整本批量下载，支持后台任务与断点续传
- 🌐 **多图源切换** —— 内置多条线路，异常自动切换备用
- 📐 **多阅读模式** —— 左右翻页 / 上下滚动 / 双页对开
- ☁️ **收藏与同步** —— 本地书架 + 云端同步，进度多设备互通
- 🔒 **隐私安全** —— 应用锁、无痕模式、本地数据加密

---

## 🚀 快速开始

### 本地预览

不需要任何环境，直接打开即可：

```bash
# 方式一：直接双击
index.html

# 方式二：起个本地服务（推荐，路径行为与线上一致）
python -m http.server 8080
# 然后访问 http://localhost:8080
```

```powershell
# Windows PowerShell 用户也可以用
python -m http.server 8080
# 或
npx serve .
```

> ⚠️ 直接双击 `index.html` 时用的是 `file://` 协议，功能完全正常，但如果后续你想加 `fetch()` 读取 JSON 的逻辑，就必须用本地服务器。

### 克隆仓库

```bash
git clone https://github.com/<你的用户名>/<仓库名>.git
cd <仓库名>
```

---

## 📁 目录结构

```
哔咔漫画/
├── index.html              # 主页面（唯一入口，一般不用改）
├── 404.html                # 自定义 404 页面
├── README.md               # 本文件
├── CHANGELOG.md            # 更新日志（Markdown 版，给人看的）
├── LICENSE                 # MIT 开源协议
├── .gitignore              # Git 忽略规则
├── .nojekyll               # 告诉 GitHub Pages 跳过 Jekyll 处理
│
└── assets/
    ├── css/
    │   └── style.css       # 全站样式（主题色变量集中在 :root）
    ├── js/
    │   ├── config.js       # ⭐ 站点配置：版本号 / 下载链接 / 链接
    │   ├── changelog.js    # ⭐ 更新日志数据：发新版改这里
    │   └── main.js         # 渲染逻辑（一般不用改）
    └── img/
        └── favicon.svg     # 站点图标
```

**只需要记住两个文件：**

| 我想改… | 改哪个文件 |
|---|---|
| 版本号、下载链接、GitHub 地址 | `assets/js/config.js` |
| 更新日志内容 | `assets/js/changelog.js` |
| 配色、字体、间距 | `assets/css/style.css` 顶部的 `:root` |

---

## 🔧 后期更新指南（重点）

### 一、发布新版本（最常见的操作）

**第 1 步：改 `assets/js/config.js` 的版本信息**

```js
const SITE = {
  version: 'v3.1.0',        // ← 改这里，全站 6 处版本号自动同步
  build:   '20261001',      // ← 构建号
  date:    '2026-10-01',    // ← 发布日期
  // ...
};
```

改完后，以下位置会**自动更新**，你不需要手动找：

- 导航栏的版本徽章
- 首屏「最新版本 vX.X.X」胶囊
- 首屏底部统计卡片（版本 / 安装包大小 / 最近更新）
- 更新日志第一条是否为「最新」标记
- 底部 CTA 区域的版本号
- 页脚的 `Version x.x.x · Build xxxxxxxx`

---

**第 2 步：改 `assets/js/changelog.js`，在最顶部插入一条记录**

```js
const CHANGELOG = [

  // 👇 复制这段模板，粘贴到数组最上面
  {
    version: 'v3.1.0',
    date:    '2026-10-01',
    build:   '20261001',
    tag:     'latest',                        // latest / stable / beta / hotfix
    highlight: '一句话概括这次更新，会显示在卡片顶部。',
    changes: [
      { type: 'feature', text: '新增 xxx 功能' },
      { type: 'improve', text: '优化 xxx 体验' },
      { type: 'fix',     text: '修复 xxx 问题' }
    ]
  },

  // ↓ 旧版本保持在下面，不要删
  { version: 'v3.0.0', /* ... */ },
];
```

**字段说明：**

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `version` | string | ✅ | 版本号，建议保持 `v` 前缀 |
| `date` | string | ✅ | 发布日期，格式必须是 `YYYY-MM-DD`，页面会转成「2026年10月1日」|
| `build` | string | ⬜ | 构建号，可留空 |
| `tag` | string | ⬜ | `latest` 最新 / `stable` 稳定 / `beta` 测试 / `hotfix` 紧急，默认 `stable` |
| `highlight` | string | ⬜ | 高亮摘要，显示在展开区顶部 |
| `changes` | array | ✅ | 变更列表 |
| `changes[].type` | string | ✅ | 只能是 `feature` / `improve` / `fix` |
| `changes[].text` | string | ✅ | 变更描述 |

> 💡 **按时间倒序排列**，最新的放最前面。忘了顺序也没关系，页面按数组顺序渲染。

---

**第 3 步：改 `assets/js/config.js` 的下载链接**

```js
downloads: {
  android: {
    label: 'Android 版',
    href:  'https://github.com/你/仓库/releases/download/v3.1.0/app-release.apk',  // ← 换这里
    size:  '28.6 MB',              // ← 安装包大小，会显示在首屏统计
    req:   'Android 6.0 及以上'
  },
  ios:     { href: '#', /* ... */ },
  windows: { href: '#', /* ... */ }
}
```

> 如果 `href` 还是 `#`，点击时会弹提示「下载地址尚未配置」，不会跳转到空白页。

---

**第 4 步：提交**

```bash
git add .
git commit -m "release: v3.1.0"
git push
```

GitHub Pages 会在 1～2 分钟内自动重新部署。

---

### 二、同步维护 CHANGELOG.md

`assets/js/changelog.js` 是**给网页读的**，`CHANGELOG.md` 是**给人读的**（GitHub 仓库页面直接渲染）。

发版时顺手在 `CHANGELOG.md` 顶部加一段：

```markdown
## [v3.1.0] - 2026-10-01

### 新增
- 新增 xxx 功能

### 优化
- 优化 xxx 体验

### 修复
- 修复 xxx 问题
```

---

### 三、换主题色

打开 `assets/css/style.css`，改最顶部的变量即可全站生效：

```css
:root{
  --pink:   #ff6b9d;    /* 主色 */
  --purple: #a855f7;    /* 辅色 */
  --bg:     #0f0d15;    /* 背景 */
  --grad:   linear-gradient(120deg, #ff6b9d 0%, #a855f7 55%, #6366f1 100%);
}
```

---

### 四、修改页面文案

直接编辑 `index.html`。常用位置：

| 内容 | 大致位置 |
|---|---|
| 网站标题 / SEO 描述 | `<head>` 里的 `<title>` 和 `<meta name="description">` |
| 首屏大标题、副标题 | `<section class="hero">` |
| 功能卡片 | `<section id="features">` |
| 常见问题 | `<section id="faq">` |
| 免责声明 | `<section class="disclaimer">` |

---

### 五、配置 404 页面路径（部署后第一次要做）

打开 `404.html`，找到第 60 行左右的这一行：

```js
var SITE_ROOT = '/';
```

按你的部署方式改：

| 部署方式 | 地址长这样 | 应该填 |
|---|---|---|
| **用户站点** | `https://用户名.github.io/` | `'/'` |
| **项目站点** | `https://用户名.github.io/picacg/` | `'/picacg/'` |
| **自定义域名** | `https://你的域名.com/` | `'/'` |

> 只有 404 页面需要这个配置。`index.html` 全部使用相对路径，任何部署方式都不用改。

---

## 🌐 部署到 GitHub Pages

### 步骤

1. 在 GitHub 新建一个仓库，例如 `picacg`（想用 `https://用户名.github.io` 就直接命名为 `用户名.github.io`）

2. 把本项目所有文件推上去（**注意：`index.html` 必须在仓库根目录**）

   ```bash
   git init
   git add .
   git commit -m "init: 哔咔漫画下载站"
   git branch -M main
   git remote add origin https://github.com/<用户名>/<仓库名>.git
   git push -u origin main
   ```

3. 进入仓库 **Settings → Pages**

4. **Source** 选择 `Deploy from a branch`，**Branch** 选 `main` + `/ (root)`，点 **Save**

5. 等待 1～2 分钟，访问：

   ```
   https://<用户名>.github.io/<仓库名>/
   ```

### 部署检查清单

- [ ] `index.html` 在仓库根目录（不是在子文件夹里）
- [ ] 文件名大小写正确（GitHub Pages 区分大小写，`Style.css` ≠ `style.css`）
- [ ] `.nojekyll` 文件已上传（避免 Jekyll 忽略某些文件）
- [ ] 所有资源用相对路径引用（本项目已全部使用 `assets/...` 相对路径）
- [ ] `404.html` 里的 `SITE_ROOT` 已按站点类型改好
- [ ] `assets/js/config.js` 里的 `links.repo` / `links.issues` 已换成你的仓库地址
- [ ] 推送后等待 1～2 分钟再刷新

### 绑定自定义域名（可选）

1. 在仓库 **Settings → Pages → Custom domain** 填入你的域名
2. 到域名服务商添加 DNS 记录：
   - 根域名 → 4 条 `A` 记录指向 GitHub Pages IP
   - 子域名 → 1 条 `CNAME` 记录指向 `<用户名>.github.io`
3. 勾选 **Enforce HTTPS**

---

## 🧩 技术说明

| 项目 | 说明 |
|---|---|
| **技术栈** | 原生 HTML5 + CSS3 + Vanilla JavaScript (ES5 兼容写法) |
| **依赖** | 无。零 npm 包，零 CDN |
| **构建** | 无。改完直接推 |
| **兼容性** | Chrome / Edge / Firefox / Safari 最近两个大版本；不支持 IE |
| **JS 加载顺序** | `config.js` → `changelog.js` → `main.js`（**顺序不能改**） |
| **CSS 特性** | CSS 变量、Grid、`color-mix()`、`aspect-ratio`、`backdrop-filter` |
| **图标方案** | 全部内联 SVG，无图标字体，无外部请求 |

### 为什么不用框架？

这是一个**单页展示站**，交互只有「展开折叠 / 筛选 / 滚动动画」。引入 React 或 Vue 只会带来构建步骤和体积负担，而不会带来任何实际收益。用原生写，任何人（包括几个月后的你自己）打开 `index.html` 就能看懂、就能改。

---

## ❓ 常见问题

<details>
<summary><b>为什么点了下载没反应？</b></summary>

`assets/js/config.js` 里的 `href` 还是默认的 `#`。把它换成真实下载地址即可。
</details>

<details>
<summary><b>更新日志不显示 / 显示不全？</b></summary>

检查 `changelog.js` 里的 JSON 语法：每条记录之间要有逗号，最后一条后面**不要**有逗号，字符串引号要成对。打开浏览器 F12 控制台，语法错误会直接报出来。
</details>

<details>
<summary><b>改了文件但网页没变化？</b></summary>

三连排查：

1. **强制刷新** —— `Ctrl + F5`（浏览器缓存）
2. **等部署** —— GitHub Pages 有 1～2 分钟延迟，可在仓库 **Actions** 标签页看进度
3. **看路径大小写** —— GitHub Pages 是 Linux 环境，区分大小写
</details>

<details>
<summary><b>为什么本地打开和线上不一样？</b></summary>

大概率是路径大小写问题，或者直接双击用了 `file://` 协议。用 `python -m http.server 8080` 起本地服务再对比。
</details>

<details>
<summary><b>更新日志最多能放多少条？</b></summary>

没有硬性上限。页面默认每页显示 4 条（`config.js` 里的 `changelogPageSize`），点「加载更早的版本」继续展开。建议保留最近 20～30 条，更早的归档到 `CHANGELOG.md`。
</details>

<details>
<summary><b>如何加一个新的功能卡片？</b></summary>

在 `index.html` 的 `<section id="features">` 里复制一个 `<article class="card reveal">` 块，改图标 SVG、标题和描述即可。注意外层 `<div class="grid grid--3">` 是三列布局。
</details>

<details>
<summary><b>能加统计代码（如 Google Analytics）吗？</b></summary>

可以。把统计脚本粘到 `index.html` 的 `</body>` 前面即可，不影响现有功能。
</details>

---

## 🤝 参与贡献

欢迎提交 Issue 和 PR：

1. Fork 本仓库
2. 新建分支 `git checkout -b feature/你的功能`
3. 提交改动 `git commit -m "feat: 添加了 xxx"`
4. 推送分支 `git push origin feature/你的功能`
5. 发起 Pull Request

**Commit 信息建议遵循：**

| 前缀 | 含义 |
|---|---|
| `feat:` | 新功能 |
| `fix:` | 修复问题 |
| `docs:` | 文档变更 |
| `style:` | 样式调整（不影响逻辑） |
| `release:` | 发布新版本 |

---

## 📄 开源协议

本项目基于 [MIT License](./LICENSE) 开源。

你可以自由使用、修改、分发本项目的**代码**，包括商业用途，只需保留原始版权声明。

> **注意：** MIT 协议仅覆盖**本仓库的网页源代码**，不覆盖任何漫画内容、第三方素材或「哔咔漫画」相关的名称与标识。

---

## ⚠️ 免责声明

- 本项目**仅提供客户端软件的展示与下载信息**，不存储、不制作、不传播任何漫画内容。
- 页面中出现的所有内容均来自第三方网络，**版权归原作者及原出版方所有**。
- 本项目仅供**个人学习与技术交流**使用，请于下载后 24 小时内删除。
- 本软件包含成人向内容，**未满 18 周岁请勿下载使用**。
- 若您认为本项目侵犯了您的合法权益，请通过 Issue 联系，我们会尽快处理。

---

<div align="center">

**如果这个项目对你有帮助，欢迎点一个 ⭐ Star**

Made with ❤️ for manga lovers

<sub>Version v3.0.0 · Build 20260913</sub>

</div>
