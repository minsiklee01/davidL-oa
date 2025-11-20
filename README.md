# ProcessCoach Demo – Technical Assessment

This project is a Next.js (App Router) application built as part of the ProcessCoach technical assessment.  
It demonstrates a simplified version of the ProcessCoach workflow UI, including Runs, Steps, and an Assistant panel.  
The goal was to take a starter template and build a small but meaningful feature end‑to‑end.

---

## Features

### **1. Runs List**
- Loads all available "runs" from SQLite.
- Selecting a run automatically loads all associated steps.

### **2. Steps Panel**
- Displays steps for the selected run.
- Step selection highlights the active step.
- Steps have color‑coded statuses:
  - `completed`
  - `assigned`
  - `pending`
- Supports marking a step as completed (PATCH request).

### **3. Assistant Panel (UI Mock)**
- A UI prototype of the ProcessCoach AI assistant.
- Messages scroll in a chat-like interface.
- Input bar stays fixed at the bottom.
- No backend AI model is used—this is a front‑end simulation of expected UX.

### **4. API Layer**
The app exposes a minimal REST API used by the UI:

| Method | Route | Description |
|--------|--------|-------------|
| GET | `/api/runs` | Fetch all runs |
| GET | `/api/runs/:id` | Fetch run + all steps |
| PATCH | `/api/runs/:id/steps/:stepId` | Update a step’s status |

Built using **Next.js Route Handlers** + `better-sqlite3`.

---

## Project Structure

```
app/
  api/
    runs/
      route.ts                → GET /api/runs
      [id]/
        route.ts              → GET /api/runs/:id  (returns run + steps)
        steps/
          [stepId]/
            route.ts          → PATCH /api/runs/:id/steps/:stepId
  page.tsx                    → Main UI layout

components/
  runs/
    RunList.tsx
    RunSteps.tsx
  assistant/
    StepAssistant.tsx

db/
  schema.sql
  seed.sql
```

---

## Tech Stack

- **Next.js 15 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **SQLite + better-sqlite3**
- Clean, component‑based layout:
  - Left: Runs + Steps
  - Right: Assistant Panel

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Initialize the database

```bash
sqlite3 db/processcoach.db < db/schema.sql
sqlite3 db/processcoach.db < db/seed.sql
```

### 3. Start the dev server

```bash
npm run dev
```

Open: **http://localhost:3000**

---

## Notes & Decisions

- Combined `run + steps` into a single `/runs/:id` response  
  → for UI simplicity and fewer network calls.
- Used REST instead of GraphQL for speed during assessment.
- Did not implement authentication or AI backend (beyond scope).
- Assistant panel focused on interaction UX, not actual LLM logic.

---

## Possible Extensions (if this were a real feature)

- Real AI integration via OpenAI or company model.
- Multi‑run workflows, templates, and SOP editing.
- Drag‑and‑drop step ordering.
- User accounts, roles, and audit logs.
- GraphQL API with typed schema.

---

## Summary

This project demonstrates:
- Full‑stack implementation (DB → API → UI).
- Clean component structure.
- Practical product thinking through UX mockups.
- Realistic, extensible design aligned with ProcessCoach concepts.
