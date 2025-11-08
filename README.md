# BrightEdge CrUX (Local Dev)

This repository contains a small two-part app:

- `backend/` — an Express TypeScript backend (BFF) that calls the CrUX API and exposes a `/metrics` endpoint.
- `frontend/` — a Vite + React TypeScript frontend that calls the backend and displays metrics in a table.

## Prerequisites

- Node.js (16+ recommended)
- npm (comes with Node)
- macOS — adjust for your shell if using different OS.

---

## Backend — Setup & Run

1. Open a terminal and change to the backend folder:

```bash
cd backend
```

2. Create a `.env` file in the `backend/` folder and add the required environment variables.

Create `backend/.env` with the following keys (replace example values):

```
# Example backend/.env
PORT=4000
CRUX_API_URL=https://chromeuxreport.googleapis.com/v1/records:queryRecord
GCP_API_KEY=YOUR_GOOGLE_CLOUD_API_KEY
```

- `PORT` — the port the backend will listen on (choose any free port).
- `CRUX_API_URL` — the CrUX endpoint used by the server (the code appends the API key as a query param).
- `GCP_API_KEY` — your [Google Cloud API key with access to the CrUX API](https://console.cloud.google.com/apis/credentials) .

3. Install dependencies and start the server:

```bash
npm install
npm start
```

The backend `start` script runs `nodemon src/server.ts` so the server restarts on code changes.

Once started you should see a console message like:

```
Server is running on port 4000
```

The backend exposes `GET /metrics?origins=<comma-separated-origins>`.

---

## Frontend — Setup & Run

1. Open a second terminal and change to the frontend folder:

```bash
cd frontend
```

2. Create a `.env` file in the `frontend/` folder and add required environment variables.

Vite uses environment variables prefixed with `VITE_`. Create `frontend/.env` with the following example:

```
# Example frontend/.env
VITE_BASE_URL=http://localhost:4000
```

- `VITE_BASE_URL` should point at your running backend (include the port if you set one via `PORT`).

3. Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Vite will start the dev server and print a local URL like `http://localhost:5173` to open in a browser.

---
