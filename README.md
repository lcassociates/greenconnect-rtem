## GreenConnect RTEM Dashboard

GreenConnect RTEM is a Next.js and Tailwind CSS dashboard with a Node.js backend ingestion service that retrieves device data from the ControlByWeb Cloud API, stores historical logs in PostgreSQL, and presents the data in a responsive frontend UI.

## STACK

#### Frontend:

- Next.js 16 (Turbopack)
- Tailwind CSS v4
- TypeScript
- PostCSS

#### Backend:

- Node.js
- Axios
- JSON Data
- PostgreSQL
- Bearer token authentication (ControlByWeb Cloud API)

## PROJECT STRUCTURE

greenconnect-rtem/
│
├── app/ # Next.js frontend
│ ├── components/
│ ├── data/
│ ├── layout.tsx
│ ├── page.tsx
│ └── globals.css
│
├── public/
│ └── images/
│
├── backend/ # Backend ingestion service
│ ├── src/
│ │ ├── cwb/ # ControlByWeb API
│ │ ├── db/ # Postgres DB
│ │ ├── jobs/
│ │ │ └── ingestDeviceLogs.js
│ │ └── utils/ # JSON Data
│ ├── .env # Backend environment variables
│ ├── .env.example
│ └── package.json
│
├── postcss.config.js
├── tailwind.config.js
└── README.md

## Setup Instructions

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

### 2. Tailwind Setup

#### postcss.config.js

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

#### globals.css

```css
@import "tailwindcss";

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: system-ui, sans-serif;
}
```

#### tailwind.config.js

```js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

## Images

All building images are placed in the `public/images/` folder. You can reference them in JSX like so:

```tsx
<img src="/images/building1.png" alt="Building 1" className="..." />
```

---

## Run the App

### Frontend:

Run npm install and npm run dev to start the application at http://localhost:3000.

### Backend:

Create backend/.env with the required environment variables for ControlByWeb and PostgreSQL.

#### CONTROLBYWEB ENVIRONMENT VARIABLES

```
CWB_BASE_URL=https://api.controlbyweb.cloud/api
CWB_USERNAME=your_controlbyweb_username
CWB_PASSWORD=your_controlbyweb_password
CWB_ACCOUNT_ID=your_account_id
```

#### POSTGRESQL ENVIRONMENT VARIABLES

```
PGHOST=your_db_host
PGPORT=5432
PGUSER=your_db_user
PGPASSWORD=your_db_password
PGDATABASE=your_db_name
PGSSLMODE=require
```

#### BACKEND INGESTION FLOW

1. Authenticate with ControlByWeb Cloud
2. Retrieve Bearer access token (valid for 24 hours)
3. Fetch all devices for the account
4. Retrieve device log JSON data
5. Parse and store logs in PostgreSQL
6. Safe re-runs using database constraints

---

## SCHEDULING

The ingestion job is designed to run every 15 minutes using cron or a cloud scheduler.

## SECURITY NOTES

- Environment files are gitignored
- No secrets are committed to source control
- Frontend never calls ControlByWeb APIs directly

## Final UI Example

- Responsive card layout
- Sidebar navigation
- Rounded image cards
- Tailwind styling (v4-compliant)
- Image rendering from `/public/images/`
- Scrollable dashboard grid

---

## Tips

- Use `object-cover` and `h-40` to constrain image height inside cards.
- Tailwind v4 **does not** support legacy `@tailwind` directives unless properly configured in `postcss.config.js`.
- Always use `@import "tailwindcss";` inside `globals.css`.

---

## © 2025 LC Associates - GreenConnect RTEM#
