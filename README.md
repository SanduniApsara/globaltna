# GlobalTNA — Mini Service Request Board

> Full-Stack Developer Intern Technical Assessment Submission

**Submitted by:** K.M. Sanduni Apsara Sirimanna  
**Email:** sandu8098@gmail.com  
**GitHub:** [github.com/SanduniApsara](https://github.com/SanduniApsara)  
**LinkedIn:** [linkedin.com/in/sanduni-sirimanna](https://www.linkedin.com/in/sanduni-sirimanna)  
**Repository:** [github.com/SanduniApsara/globaltna](https://github.com/SanduniApsara/globaltna)

---

## What I Built

A full-stack web application that connects homeowners with local tradespeople. Homeowners can post service requests and tradespeople can browse, filter, and manage job status — a stripped-down, single-page version of the GlobalTNA platform.

---

## Screenshots

### 1. Service Request Board — Home Page
> All job requests displayed as cards with category badges, status indicators, location, and date. Filters for category and status are visible at the top.
<img width="1920" height="902" alt="Screenshot (110)" src="https://github.com/user-attachments/assets/1b4fcb17-b303-429b-8760-768957931017" />

---

### 2. Category Filter — painting
> Filtering the board by "painting" category instantly shows only relevant jobs.

<img width="1920" height="909" alt="Screenshot (112)" src="https://github.com/user-attachments/assets/ecc47a57-f147-4ab3-b455-449d7081f56d" />

---

### 3. Keyword Search
> Searching for "leaking" filters jobs by matching title and description in real time.

<img width="1920" height="924" alt="Screenshot (111)" src="https://github.com/user-attachments/assets/735b5026-2bcc-44f4-82d5-17a8122c7618" />

---

### 4. Job Detail Page
> Full job details with contact information, status dropdown, and delete button.

<img width="1920" height="915" alt="Screenshot (113)" src="https://github.com/user-attachments/assets/e7249844-795d-404b-9028-0ec4f74383ef" />


---

### 5. Status Update — Success
> Tradespeople can update job status to "In Progress" or "Closed". Green confirmation message shown on save.

<img width="1920" height="912" alt="Screenshot (115)" src="https://github.com/user-attachments/assets/5893104e-d2a9-4bbf-a3d9-78d9596ed96c" />


---

### 6. Post a Job Form
> Homeowners fill in a validated form to post a new service request. Required fields are marked and validated on both client and server.

<img width="1920" height="904" alt="Screenshot (116)" src="https://github.com/user-attachments/assets/7f2a7722-588d-4f5f-bc5c-1380c1c0b5a4" />


---

### 7. REST API Response
> The Express API returning all jobs as JSON at `http://localhost:5000/api/jobs`.

<img width="1920" height="675" alt="Screenshot (117)" src="https://github.com/user-attachments/assets/fd77ee94-04f4-4223-9af9-927488275eb4" />


---

### 8. MongoDB Compass — jobRequests Collection
> All job documents visible in MongoDB Compass showing the `globaltna` database and `jobRequests` collection.

<img width="1760" height="978" alt="Screenshot (118)" src="https://github.com/user-attachments/assets/d024b73d-da50-4cc7-beb8-8c2a179640d0" />


---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | Next.js 14 (App Router)           |
| Backend    | Node.js + Express.js              |
| Database   | MongoDB (local) + Mongoose ODM    |
| Styling    | Plain CSS with CSS Variables      |

---

## Project Structure

```
globaltna/
├── backend/
│   ├── middleware/
│   │   └── errorHandler.js       # Global error handler
│   ├── models/
│   │   └── JobRequest.js         # Mongoose schema
│   ├── routes/
│   │   └── jobs.js               # All REST API endpoints
│   ├── utils/
│   │   └── db.js                 # MongoDB connection
│   ├── seed.js                   # Seed script (8 sample jobs)
│   ├── server.js                 # Express entry point
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── app/
    │   ├── globals.css
    │   ├── layout.js
    │   ├── page.js               # Home — job board with filters
    │   └── jobs/
    │       ├── new/page.js       # Create new job request
    │       └── [id]/page.js      # Job detail + status + delete
    ├── lib/
    │   └── api.js                # All fetch calls to Express API
    ├── .env.local.example
    ├── next.config.js
    └── package.json
```

---

## Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- MongoDB installed locally **or** a free MongoDB Atlas account

---

## Environment Variables

### Backend — `backend/.env`

| Variable    | Description                          | Example                                        |
|-------------|--------------------------------------|------------------------------------------------|
| `PORT`      | Port the Express server listens on   | `5000`                                         |
| `MONGO_URI` | MongoDB connection string            | `mongodb://localhost:27017/globaltna`          |

### Frontend — `frontend/.env.local`

| Variable                | Description                   | Default                      |
|-------------------------|-------------------------------|------------------------------|
| `NEXT_PUBLIC_API_URL`   | URL of the Express backend    | `http://localhost:5000`      |

---

## Setup & Run Instructions

### Step 1 — Clone the repository

```bash
git clone https://github.com/SanduniApsara/globaltna.git
cd globaltna
```

### Step 2 — Set up the backend

```bash
cd backend
npm install
cp .env.example .env
```

Open `backend/.env` and set your MongoDB URI:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/globaltna
```

### Step 3 — Set up the frontend

```bash
cd ../frontend
npm install
cp .env.local.example .env.local
```

The `.env.local` file should contain:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Step 4 — Start MongoDB

**Local MongoDB:**
```bash
mongod --dbpath /data/db
```

**Or on Windows (if mongod is not in PATH):**
```bash
& "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath "C:\data\db"
```

### Step 5 — Start the backend

```bash
cd backend
node server.js
```

You should see:
```
Server running on http://localhost:5000
MongoDB connected: localhost
```

### Step 6 — Start the frontend

```bash
cd frontend
npm run dev
```

You should see:
```
▲ Next.js 14
- Local: http://localhost:3000
✓ Ready
```

### Step 7 — (Optional) Seed sample data

```bash
cd backend
node seed.js
```

This inserts 8 realistic sample job requests covering all categories and statuses.

---

## The application will be running at:

| Service  | URL                          |
|----------|------------------------------|
| Website  | http://localhost:3000        |
| API      | http://localhost:5000        |

---

## API Reference

Base URL: `http://localhost:5000`

| Method | Endpoint          | Description                          |
|--------|-------------------|--------------------------------------|
| GET    | `/api/jobs`       | List all jobs (supports filters)     |
| GET    | `/api/jobs/:id`   | Get a single job by ID               |
| POST   | `/api/jobs`       | Create a new job request             |
| PATCH  | `/api/jobs/:id`   | Update job status only               |
| DELETE | `/api/jobs/:id`   | Delete a job request                 |

### Query Parameters — `GET /api/jobs`

| Parameter  | Example               | Description                          |
|------------|-----------------------|--------------------------------------|
| `category` | `?category=Plumbing`  | Filter by trade category             |
| `status`   | `?status=Open`        | Filter by status                     |
| `search`   | `?search=tap`         | Keyword search in title + description|

### POST /api/jobs — Request Body

```json
{
  "title": "Leaking kitchen tap",
  "description": "Dripping tap under the kitchen sink.",
  "category": "Plumbing",
  "location": "Glasgow",
  "contactName": "Margaret Thomson",
  "contactEmail": "m.thomson@example.com"
}
```

### PATCH /api/jobs/:id — Request Body

```json
{ "status": "In Progress" }
```

Valid values: `"Open"` · `"In Progress"` · `"Closed"`

---

## Data Model — `jobRequests` Collection

| Field          | Type     | Rules                                              |
|----------------|----------|----------------------------------------------------|
| `title`        | String   | Required                                           |
| `description`  | String   | Required                                           |
| `category`     | String   | Required · Enum: Plumbing, Electrical, Painting, Joinery, Other |
| `location`     | String   | Required                                           |
| `contactName`  | String   | Required                                           |
| `contactEmail` | String   | Required · Must be valid email format              |
| `status`       | String   | Enum: Open, In Progress, Closed · Default: Open    |
| `createdAt`    | Date     | Auto-set by Mongoose timestamps                    |
| `updatedAt`    | Date     | Auto-set by Mongoose timestamps                    |

---

## Features Implemented

### Core Requirements ✅
- Job board with card layout showing all requests
- Category filter dropdown
- Status filter dropdown
- Post a new job request with client-side and server-side validation
- Job detail page with full information
- Status update dropdown (Open → In Progress → Closed)
- Delete job request with confirmation
- REST API with all 5 endpoints and correct HTTP status codes
- Global error handler and 404 handling
- Frontend communicates exclusively with Express API (no direct MongoDB access)

### Bonus Features ✅
- **Keyword search** — searches both title and description via regex on the backend
- **Seed script** — inserts 8 realistic sample jobs across all categories and statuses

---

## Design Decisions

- **Strict separation** — the Next.js frontend never connects to MongoDB directly; all data flows through the Express API via `lib/api.js`
- **No Next.js API routes** — all endpoints live in the Express backend as required
- **Mongoose validation + manual checks** — Mongoose handles schema validation while a manual pre-check on POST gives cleaner error messages for missing fields
- **Client components** — interactive pages use `"use client"` while the root layout remains a server component
- **useRef for form inputs** — prevents re-render lag on every keystroke in the job creation form

---

## Author

**K.M. Sanduni Apsara Sirimanna**  
📧 sandu8098@gmail.com  
🔗 [linkedin.com/in/sanduni-sirimanna](https://www.linkedin.com/in/sanduni-sirimanna)  
🐙 [github.com/SanduniApsara](https://github.com/SanduniApsara)
