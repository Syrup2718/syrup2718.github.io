## Development

When starting the dev server, use background mode:

```
npx astro dev --background
```

Manage the background server with `npx astro dev stop`, `npx astro dev status`, and `npx astro dev logs`.

## Build & Verify

```
npm run build
```

## Project Structure

- **Framework**: Astro v7 (static output)
- **Styling**: Global CSS (`src/styles/global.css`) with CSS custom properties — no Tailwind
- **Font**: Setofont Variable (self-hosted in `public/fonts/setofont/`)
- **Content Collections**: `src/content.config.ts`
  - `blog` — 筆記文章 (`src/content/blog/`)
  - `projects` — 專案作品 (`src/content/projects/`)
- **Pages**:
  - `/` — 首頁 (`src/pages/index.astro`)
  - `/blog/` — 筆記列表 (`src/pages/blog/index.astro`)
  - `/blog/[slug]/` — 筆記詳細頁 (`src/pages/blog/[...slug].astro` + `src/layouts/BlogPost.astro`)
  - `/projects/` — 專案列表 (`src/pages/projects/index.astro`)
  - `/projects/[slug]/` — 專案詳細頁 (`src/pages/projects/[...slug].astro` + `src/layouts/ProjectLayout.astro`)
  - `/about/` — 關於頁 (`src/pages/about.astro`)

## Key Files

| Purpose | File |
|---------|------|
| Global styles & design tokens | `src/styles/global.css` |
| Header (nav + logo) | `src/components/Header.astro` |
| Footer (copyright + uptime counter) | `src/components/Footer.astro` |
| Base HTML head + font preload | `src/components/BaseHead.astro` |
| Site constants | `src/consts.ts` |
| Content schemas | `src/content.config.ts` |

## Design System (CSS Variables)

```css
--bg: #fdfbf7;        /* 暖米白背景 */
--fg: #2d2a26;        /* 主文字色 */
--muted: #8a847c;     /* 次要文字 */
--border: #efe8e0;    /* 分隔線 */
--accent: #d4a5a5;    /* 粉灰玫瑰強調色 */
--accent-light: #f5e6e6; /* 選取/標籤背景 */
--font-seto: 'Setofont Variable', system-ui, sans-serif;
```

## Conventions

- **極簡 + 少女風**：大量留白、無陰影、無動畫、單一強調色
- 字體大小：基礎 20px，行高 1.8
- 內容最大寬度：800px
- 連結 hover 才變色，無底線
- 狀態標籤：`status` 欄位（已完成/進行中/維護中/封存）對應粉色標籤
- 專案/文章日期格式：繁中長格式 (2026年7月22日)

## Adding Content

**新增筆記**：在 `src/content/blog/` 建立 `.md` 或 `.mdx`，frontmatter 需包含 `title`、`description`、`pubDate`、`heroImage` (可選)、`updatedDate` (可選)

**新增專案**：在 `src/content/projects/` 建立 `.md`，frontmatter 需包含 `title`、`description`、`pubDate`、`tags`、`status` (四選一)、`github`/`demo` (可選)、`heroImage` (可選)

## Gotchas

- 使用 `npx astro` 指令（非全域安裝）
- 開發工具列只在 dev 模式出現，正式建構不會包含
- 圖片優化自動處理（`astro:assets`）
- 中文編碼在 PowerShell 終端機可能顯示亂碼，瀏覽器正常