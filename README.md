# Scheduling Platform Assignment

A clean starter scaffold for a Calendly-style scheduling platform with a separated frontend, backend, and database structure.

## Stack

- Frontend: Next.js (App Router, JavaScript) + Tailwind CSS
- Backend: Node.js + Express.js
- Database: PostgreSQL

## Project Structure

`	ext
.
|-- frontend
|   |-- app
|   |-- components
|   |-- services
|   -- ...
|-- backend
|   |-- src
|   |   |-- config
|   |   |-- controllers
|   |   |-- db
|   |   |-- middleware
|   |   |-- routes
|   |   -- services
|   -- ...
-- database
    |-- schema.sql
    -- seed.sql
`

## Features Included In This Scaffold

- Calendly-inspired dashboard layout with sidebar + main content area
- App Router pages for:
  - /event-types
  - /availability
  - /meetings
  - /book/[eventSlug]
- Reusable frontend components and backend API service layer
- Express REST API modules for:
  - event types
  - availability
  - meetings
  - slot generation
- PostgreSQL schema and seed data for local testing

## What Is Not Implemented Yet

- Real authentication
- Full CRUD logic
- Real database query wiring
- Validation and production-hardening

This repo is intentionally scaffold-first so development can continue cleanly from a solid structure.

## Setup

### 1. Database

Create a PostgreSQL database, then run:

`sql
\i database/schema.sql
\i database/seed.sql
`

### 2. Backend

`ash
cd backend
npm install
cp .env.example .env
npm run dev
`

The backend starts on http://localhost:4000.

### 3. Frontend

`ash
cd frontend
npm install
npm run dev
`

The frontend starts on http://localhost:3000.

## Environment Variables

### Backend

See ackend/.env.example:

`env
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/scheduling_platform
CLIENT_URL=http://localhost:3000
`

### Frontend

See rontend/.env.local.example:

`env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
`

## Suggested Next Steps

1. Connect backend services to PostgreSQL queries.
2. Replace placeholder responses with real scheduling logic.
3. Wire frontend service calls into pages and forms.
4. Add validation, error handling, and tests.
