# Scheduling Platform Assignment

A full-stack scheduling platform inspired by Calendly. It lets an admin manage event types and weekly availability, while public visitors can book available time slots through a shareable event link.

## Tech Stack

- Frontend: Next.js (App Router, JavaScript, Tailwind CSS)
- Backend: Node.js, Express.js, pg
- Database: PostgreSQL

## Features Implemented

- Event type management: create, edit, delete, and display public booking links
- Weekly availability management with save-to-backend support
- Public booking page with event lookup by slug, date selection, slot loading, booking form, and confirmation
- Slot generation based on event duration, availability, and existing meetings
- Meetings dashboard with upcoming meetings, past meetings, and cancel support
- Seeded PostgreSQL data for testing

## Database Schema Overview

The database is defined in [database/schema.sql](database/schema.sql) and includes three main tables:

- `event_types`: stores meeting templates such as name, slug, description, duration, and active status
- `availability`: stores weekly availability windows by day of week
- `meetings`: stores booked meetings, attendee details, timestamps, and status

Relationships:

- `meetings.event_type_id` references `event_types.id`
- soft deletion is handled through `event_types.is_active`
- cancelled meetings remain in the database with `status = 'cancelled'`

## Running Locally

### 1. Database

Create a PostgreSQL database named `scheduling_platform`, then run:

```sql
\i database/schema.sql
\i database/seed.sql
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend environment variables:

```env
PORT=4000
DATABASE_URL=postgresql://username:password@host:5432/database
CLIENT_URL=http://localhost:3000
```

The backend runs on `http://localhost:4000`.

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Frontend environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

The frontend runs on `http://localhost:3000`.

## Environment Variables

### Frontend

- `NEXT_PUBLIC_API_URL`: full public URL of the backend API, for example `https://your-backend.onrender.com/api`

### Backend

- `PORT`: port assigned by the host platform
- `DATABASE_URL`: PostgreSQL connection string
- `CLIENT_URL`: deployed frontend URL allowed by CORS

## Deploying Frontend

Platform: Vercel

- Root Directory: `frontend`
- Framework Preset: `Next.js`
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: leave default for Next.js

Environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend-service.onrender.com/api
```

After deployment, note the frontend URL. You will use it as `CLIENT_URL` in the backend deployment.

## Deploying Backend

Platform: Render

- Root Directory: `backend`
- Runtime: `Node`
- Build Command: `npm install`
- Start Command: `npm start`

Environment variables:

```env
PORT=4000
DATABASE_URL=postgresql://username:password@host:5432/database
CLIENT_URL=https://your-frontend-app.vercel.app
```

Recommended Render setup:

1. Create a new Web Service from the GitHub repo.
2. Set the root directory to `backend`.
3. Add the environment variables above.
4. Deploy and copy the generated backend URL.
5. Update the Vercel frontend env var `NEXT_PUBLIC_API_URL` to `https://your-backend-url/api`.
6. Redeploy the frontend if needed.

## Quick Submission Deployment Flow

1. Deploy the backend to Render first.
2. Copy the Render service URL.
3. Deploy the frontend to Vercel with `NEXT_PUBLIC_API_URL` set to `https://your-render-url/api`.
4. Copy the Vercel URL.
5. Set `CLIENT_URL` on Render to the Vercel URL.
6. Redeploy the backend.
7. Verify that the deployed frontend can load events, availability, slots, bookings, and meetings.

## Notes

- No authentication is required for this assignment.
- The admin dashboard assumes a default logged-in user.
- Timezone persistence is not stored in the current database schema.
- For submission, provide both the GitHub repository link and the deployed frontend URL.
