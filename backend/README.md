# CampusAI Backend

Production-ready Node.js + Express API server for the CampusAI RAG Student Assistant.

## Structure

```
backend/
├── src/
│   ├── config/          # Environment configuration
│   ├── controllers/     # Request handlers (auth, documents, chat)
│   ├── lib/             # Supabase client + connection health check
│   ├── middleware/      # CORS, error handling, upload, request logging
│   ├── routes/          # Express route definitions
│   ├── services/        # Business logic (auth, document, chat services)
│   ├── utils/           # asyncHandler, apiResponse, validate
│   ├── app.js           # Express app configuration
│   └── server.js        # Server entry point
├── .env.example         # Environment variable template
└── package.json
```

## Getting Started

```bash
cd backend
npm install
cp .env.example .env    # then fill in your values
npm run dev
```

## API Routes

| Method | Path                  | Description                     |
|--------|-----------------------|---------------------------------|
| GET    | `/api/health`         | Health check + DB connectivity  |
| POST   | `/api/auth/signup`    | Create account                  |
| POST   | `/api/auth/signin`    | Sign in                          |
| POST   | `/api/auth/signout`   | Sign out                         |
| GET    | `/api/auth/me`        | Get current user                 |
| GET    | `/api/documents`      | List all documents               |
| GET    | `/api/documents/:id`  | Get a single document            |
| POST   | `/api/documents/upload` | Upload a PDF (multipart form) |
| DELETE | `/api/documents/:id`  | Delete a document                |
| POST   | `/api/chat/ask`       | Ask a question (RAG)             |
| GET    | `/api/chat/conversations` | List conversation history     |

## Health Check

`GET /api/health` probes the Supabase database by querying the `documents`
table. On success it returns:

```json
{"status":"ok","database":"connected"}
```

If Supabase is not configured or the connection fails, it returns a 503 with
`database: "disconnected"`.

## Supabase Integration

The backend reads `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` from `.env`.
A service-role client is also created when `SUPABASE_SERVICE_ROLE_KEY` is set.

All services (auth, documents, chat) use the Supabase client from
`src/lib/supabase.js`. When credentials are absent, services return clear
503 "not configured" responses instead of crashing.
