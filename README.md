# CampusAI

RAG-powered AI Student Assistant.

## Project Structure

```
CampusAI/
├── frontend/    # Vite + React + TypeScript + Tailwind CSS
├── backend/     # Express API server (port 3001)
└── supabase/    # Database migrations
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on http://localhost:5173 and connects to Supabase using
the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `frontend/.env`.

## Backend

```bash
cd backend
npm install
npm run dev
```

The backend runs on http://localhost:3001 and connects to Supabase using
`SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` in `backend/.env`.
