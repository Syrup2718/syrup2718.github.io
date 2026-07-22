# 糖漿の小窩

個人部落格 + 專案作品集，使用 Astro v7 建構，部署於 GitHub Pages。

## ✨ 特色

- **極簡 + 少女風** 設計：暖米白背景、粉灰玫瑰強調色、Setofont Variable 字體
- **靜態生成**：零 JS、極速載入、100/100 Lighthouse
- **內容集合**：筆記、專案分離管理，支援 MDX
- **自動優化**：圖片優化、Sitemap、RSS Feed、Open Graph

## 📁 專案結構

```text
├── public/
│   └── fonts/setofont/          # Setofont Variable (woff2/woff)
├── src/
│   ├── assets/                  # 圖片素材
│   ├── components/              # Astro 元件
│   │   ├── Header.astro         # 導覽列 + Logo
│   │   ├── Footer.astro         # 版權 + 陪伴天數計時器
│   │   ├── BaseHead.astro       # HTML head + 字體預載
│   │   ├── FormattedDate.astro  # 繁中日期格式化
│   │   └── HeaderLink.astro     # 導覽連結 (含 active 狀態)
│   ├── content/
│   │   ├── blog/                # 筆記文章 (.md/.mdx)
│   │   └── projects/            # 專案作品 (.md)
│   ├── layouts/
│   │   ├── BlogPost.astro       # 筆記詳細頁版型
│   │   └── ProjectLayout.astro  # 專案詳細頁版型
│   ├── pages/
│   │   ├── index.astro          # 首頁
│   │   ├── about.astro          # 關於頁
│   │   ├── blog/
│   │   │   ├── index.astro      # 筆記列表
│   │   │   └── [...slug].astro  # 筆記詳細頁
│   │   └── projects/
│   │       ├── index.astro      # 專案列表
│   │       └── [...slug].astro  # 專案詳細頁
│   ├── styles/
│   │   └── global.css           # 全域樣式 + 設計變數
│   ├── consts.ts                # 站點常數
│   └── content.config.ts        # 內容集合 Schema
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🛠️ 指令

| 指令 | 說明 |
|------|------|
| `npm install` | 安裝依賴 |
| `npx astro dev --background` | 背景啟動開發伺服器 (localhost:4321) |
| `npx astro dev stop` | 停止背景伺服器 |
| `npm run build` | 建構生產站點至 `./dist/` |
| `npm run preview` | 本地預覽建構結果 |

## 📝 內容管理

### 新增筆記
在 `src/content/blog/` 建立 `.md` 或 `.mdx`：
```yaml
---
title: "文章標題"
description: "摘要描述"
pubDate: 2026-07-22
heroImage: ./cover.jpg  # 可選
updatedDate: 2026-07-23 # 可選
---
```

### 新增專案
在 `src/content/projects/` 建立 `.md`：
```yaml
---
title: "專案名稱"
description: "專案簡介"
pubDate: 2026-07-22
tags: ["Astro", "TypeScript"]
status: "已完成"  # 已完成/進行中/維護中/封存
github: "https://github.com/..."  # 可選
demo: "https://demo.example.com"  # 可選
heroImage: ./cover.jpg            # 可選
---
```

## 🎨 設計系統

```css
--bg: #fdfbf7;        /* 暖米白背景 */
--fg: #2d2a26;        /* 主文字色 */
--muted: #8a847c;     /* 次要文字 */
--border: #efe8e0;    /* 分隔線 */
--accent: #d4a5a5;    /* 粉灰玫瑰強調色 */
--accent-light: #f5e6e6; /* 選取/標籤背景 */
--font-seto: 'Setofont Variable', system-ui, sans-serif;
```

- 基礎字體：20px / 行高 1.8
- 內容最大寬度：800px
- 無陰影、無動畫、連結僅 hover 變色

## 🚀 部署

靜態檔案輸出至 `dist/`，推送至 GitHub Pages 即可。

## 📄 授權

MIT License — 基於 [Astro Blog Template](https://github.com/withastro/astro/tree/main/packages/create-astro/templates/blog) 與 [Bear Blog](https://github.com/HermanMartinus/bearblog/) 改造。