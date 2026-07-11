# Okay Express International — React + Vite + Supabase + Local API Server

This repo includes:

- **Frontend**: React + Vite (runs on `http://localhost:5173`)
- **Local API**: Express server that serves the handlers in `api/*.js` under `/api/*`.
  (runs on `http://localhost:3001`)
- **Auth**: Supabase auth + optional Google OAuth



## Prerequisites
- Node.js (LTS) + npm

## Local setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create env files from the examples:

```bash
copy .env.example .env
copy server/.env.example server/.env
```

Fill in real values:

- **Root `.env`** (Vite)

  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_GOOGLE_CLIENT_ID` (optional)
  - `VITE_GOOGLE_AUTH_PROXY` (optional; default used by app)
  - `VITE_API_BASE_URL` (optional; default is `http://localhost:3001`)


- **`server/.env`**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY` (required for server-side analytics queries)
  - `PORT` (optional; default `3001`)

### 3) Run the API server

Terminal 1:

```bash
npm run dev:api
```

Health check:

- `http://localhost:3001/health`

### 4) Run the frontend

Terminal 2:

```bash
npm run dev
```

Open:

- `http://localhost:5173`


## Verify dashboard analytics

After Supabase credentials are set:

- `http://localhost:3001/api/analytics` should return **200** JSON.


## Lint / build

```bash
npm run lint
npm run build
```

## Release/Packaging notes

When creating a release zip, exclude:

- `node_modules/`
- real `.env` files (`.env`, `server/.env`)
- `dist/` and `build/`
- `.git/`
- `check-env.mjs`


