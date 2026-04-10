[Leia em Português (Brasil)](./README.pt-BR.md)

# BarberElite
Full-stack barbershop scheduling web app built as a portfolio project.

**Live demo:** https://barberelite.vercel.app

![Dashboard](./public/screenshot.png)

## Tech Stack

| Technology | Usage |
| --- | --- |
| Next.js 15 (App Router) | Frontend and API routes |
| React 19 | UI rendering and component model |
| TypeScript | Static typing across app and server code |
| Tailwind CSS | Styling and responsive layout |
| MongoDB (native driver, no Mongoose) | Appointment and admin user persistence |
| Vercel | Production deployment |

## Features

- Public booking form that stores new appointments in MongoDB.
- Admin dashboard with appointment list, status filters, and stats cards.
- Admin actions to mark appointments as `completed` or `cancelled`, and to delete appointments.
- Authentication via custom `httpOnly` cookie session (no third-party auth library).
- Session token created in `src/lib/adminSession.ts`, set on login route, and validated server-side on admin appointment API routes.
- Protected admin API routes return `401 Unauthorized` when no valid session cookie is present.

## Architecture Overview

- Uses Next.js App Router for pages and server endpoints under `src/app`.
- Uses server-side cookie authentication for admin endpoints, avoiding client-managed tokens.
- Uses MongoDB connection pooling through a global client promise in `src/lib/mongodb.ts` to reuse connections efficiently.

## Run Locally

1. Clone the repository:
```bash
git clone https://github.com/Lafaietepedro/barber
cd barber
```
2. Install dependencies:
```bash
npm install
```
3. Create `.env.local`:
```bash
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=barber
```
4. Start the development server:
```bash
npm run dev
```
5. Open `http://localhost:3000`.

## Project Structure

```text
src/
  app/          # App Router pages and API routes
  components/   # UI and admin components
  lib/          # MongoDB and auth session utilities
  styles/       # Global styles and animations
data/           # Local seed/sample data
public/         # Static assets
```

## Author

- [LinkedIn](https://www.linkedin.com/in/lafaiete-almeida-dev)
- [GitHub](https://github.com/Lafaietepedro)
