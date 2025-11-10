# GreenConnect RTEM Dashboard

This is a Next.js 16 + Tailwind CSS v4 powered frontend dashboard for displaying a portfolio of buildings with energy compliance metrics. It uses a sidebar layout and responsive cards, rendering images from the `/public/images` folder.

---

## ✅ Stack

- **Next.js 16** (with Turbopack)
- **Tailwind CSS v4** (`@tailwindcss/postcss` + `postcss.config.js`)
- **TypeScript**
- **PostCSS**

---

## 🚀 Setup Instructions

### 1. Install Dependencies

```
npm install
```

Make sure you have the following installed in `package.json`:

```json
"devDependencies": {
  "tailwindcss": "^4.0.0",
  "@tailwindcss/postcss": "^1.0.0",
  "postcss": "^8.4.0",
  "autoprefixer": "^10.4.0"
}
```

---

### 2. Tailwind Setup

#### ✅ postcss.config.js

```js
module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
  }
}
```

#### ✅ globals.css

```css
@import "tailwindcss";

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: system-ui, sans-serif;
}
```

#### ✅ tailwind.config.js

```js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## 🖼️ Images

All building images are placed in the `public/images/` folder. You can reference them in JSX like so:

```tsx
<img src="/images/building1.png" alt="Building 1" className="..." />
```

Make sure all image file names match `mockData.ts` values.

---

## 🧱 Folder Structure

```
app/
├── components/
│   └── Card.tsx          ← Portfolio card component
├── data/
│   └── mockData.ts       ← Contains mock portfolio info
├── layout.tsx            ← Root layout with global CSS import
├── page.tsx              ← Main dashboard page
├── globals.css           ← Tailwind + custom styles

public/
└── images/
    ├── building1.png
    ├── building2.png
    └── ...

postcss.config.js         ← Required for Tailwind v4
tailwind.config.js        ← Tailwind config
```

---

## 🔧 Run the App

```
npm run dev
```

This starts the Next.js development server on `http://localhost:3000`.

---

## ✅ Final UI Example

- Responsive card layout
- Sidebar navigation
- Rounded image cards
- Tailwind styling (v4-compliant)
- Image rendering from `/public/images/`
- Scrollable dashboard grid

---

## 🧠 Tips

- Use `object-cover` and `h-40` to constrain image height inside cards.
- Tailwind v4 **does not** support legacy `@tailwind` directives unless properly configured in `postcss.config.js`.
- Always use `@import "tailwindcss";` inside `globals.css`.

---

## © 2025 LC Associates - GreenConnect RTEM