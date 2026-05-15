# GlobalTNA — Mini Service Request Board

A full-stack web application connecting homeowners with local tradespeople. Homeowners can post service requests; tradespeople can browse, filter, and manage job status.

---

## Tech Stack

| Layer    | Technology                  |
|----------|-----------------------------|
| Frontend | Next.js 14 (App Router)     |
| Backend  | Node.js + Express.js        |
| Database | MongoDB (Atlas or local)    |
| ODM      | Mongoose                    |
| Styling  | Plain CSS (CSS Variables)   |

---

## Project Structure

```
globaltna/
├── backend/
│   ├── middleware/
│   │   └── errorHandler.js    # Global error handler
│   ├── models/
│   │   └── JobRequest.js      # Mongoose schema/model
│   ├── routes/
│   │   └── jobs.js            # All /api/jobs endpoints
│   ├── utils/
│   │   └── db.js              # MongoDB connection
│   ├── seed.js                # Seed script (8 sample jobs)
│   ├── server.js              # Express entry point
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── app/
    │   ├── globals.css
    │   ├── layout.js
    │   ├── page.js              # Home — job board with filters
    │   └── jobs/
    │       ├── new/page.js      # Create new job request
    │       └── [id]/page.js     # Job detail + status + delete
    ├── lib/
    │   └── api.js               # Fetch helpers (talks to Express)
    ├── .env.local.example
    ├── next.config.js
    └── package.json
```

---

## Prerequisites

- Node.js v18+
- npm v9+
- A MongoDB Atlas account (free tier) **or** MongoDB running locally

---

## Environment Variables

### Backend — `backend/.env`

Copy `backend/.env.example` to `backend/.env`:

```bash
cp backend/.env.example backend/.env
```

| Variable    | Description                              | Example                              |
|-------------|------------------------------------------|--------------------------------------|
| `PORT`      | Port the Express server listens on       | `5000`                               |
| `MONGO_URI` | Full MongoDB connection string           | `mongodb+srv://user:pass@cluster...` |

**Getting a MongoDB Atlas URI:**
1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. In *Database Access*, create a user with read/write permissions
3. In *Network Access*, allow your IP (or `0.0.0.0/0` for development)
4. In *Clusters*, click **Connect → Drivers** and copy the URI
5. Replace `<password>` with your database user's password

### Frontend — `frontend/.env.local`

Copy `frontend/.env.local.example` to `frontend/.env.local`:

```bash
cp frontend/.env.local.example frontend/.env.local
```

| Variable               | Description                 | Default                     |
|------------------------|-----------------------------|-----------------------------|
| `NEXT_PUBLIC_API_URL`  | URL of the Express backend  | `http://localhost:5000`     |

---

## Setup & Run Instructions

### 1. Install dependencies

Open two terminal windows.

**Terminal 1 — Backend:**
```bash
cd backend
npm install
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure environment variables

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env and add your MONGO_URI

# Frontend
cp frontend/.env.local.example frontend/.env.local
# Edit if your backend runs on a port other than 5000
```

### 3. (Optional) Seed the database

```bash
cd backend
npm run seed
```

This inserts 8 realistic sample job requests across all categories and statuses.

### 4. Start the backend

```bash
cd backend
npm run dev    # development (nodemon, auto-restarts)
# or
npm start      # production
```

The Express API will be available at **http://localhost:5000**

### 5. Start the frontend

```bash
cd frontend
npm run dev
```

The Next.js app will be available at **http://localhost:3000**

---

## API Reference

Base URL: `http://localhost:5000`

| Method | Endpoint          | Description                     |
|--------|-------------------|---------------------------------|
| GET    | `/api/jobs`       | List all jobs (with filters)    |
| GET    | `/api/jobs/:id`   | Get a single job                |
| POST   | `/api/jobs`       | Create a new job request        |
| PATCH  | `/api/jobs/:id`   | Update job status only          |
| DELETE | `/api/jobs/:id`   | Delete a job request            |

### Query Parameters — `GET /api/jobs`

| Param      | Example          | Description                 |
|------------|------------------|-----------------------------|
| `category` | `?category=Plumbing` | Filter by trade category |
| `status`   | `?status=Open`   | Filter by status            |
| `search`   | `?search=tap`    | Keyword search (title + description) |

### Request body — `POST /api/jobs`

```json
{
  "title": "Leaking kitchen tap",
  "description": "Dripping tap under the kitchen sink, needs urgent repair.",
  "category": "Plumbing",
  "location": "Glasgow",
  "contactName": "Margaret Thomson",
  "contactEmail": "m.thomson@example.com"
}
```

### Request body — `PATCH /api/jobs/:id`

```json
{ "status": "In Progress" }
```

Valid status values: `"Open"`, `"In Progress"`, `"Closed"`

---

## Features

### Core
- **Job Board** — filterable list of all requests (category + status + keyword search)
- **Post a Request** — form with client-side and server-side validation
- **Job Detail** — full job view with status management and delete

### Bonus implemented
- **Keyword search** — searches title and description via regex on the backend
- **Seed script** — 8 realistic sample jobs (`npm run seed` in `/backend`)

---

## Data Model — `jobRequests` collection

```
title         String    required
description   String    required
category      String    required — enum: Plumbing | Electrical | Painting | Joinery | Other
location      String    required
contactName   String    required
contactEmail  String    required — validated email format
status        String    enum: Open | In Progress | Closed — default: Open
createdAt     Date      auto-set by Mongoose timestamps
updatedAt     Date      auto-set by Mongoose timestamps
```

---

## Design Decisions

- **Backend is fully separate** from Next.js — the frontend talks exclusively to the Express API, never directly to MongoDB
- **No Next.js API routes** used — all data fetching goes through `lib/api.js` → Express
- **Client components** (`"use client"`) used for interactive pages; the layout is a server component
- **Mongoose** handles both validation and the ODM layer; a separate manual check on `POST` provides cleaner error messages for missing fields
- **Global error handler** in Express catches any unhandled errors and returns consistent JSON

---

## Submission

- **GitHub repository:** _[your repo URL here]_
- **Live demo:** _[Vercel + Render URLs if deployed]_
