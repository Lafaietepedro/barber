[Leia em Português](./README.pt-BR.md)

# BarberElite — Booking & Admin Template

A production-ready Next.js 15 template for service-based businesses. Includes a public booking system, a protected admin dashboard, and a custom authentication layer — fully configured and ready to deploy on Vercel in minutes.

**Live demo:** https://barberelite.vercel.app

![Dashboard Preview](./public/screenshot.png)

## What You Get

- **Public booking form** — customers book appointments by selecting service, date, and time; data saved directly to MongoDB
- **Admin dashboard** — view, filter, and manage all appointments with status controls (pending / completed / cancelled)
- **Custom auth** — httpOnly cookie session with HMAC-signed tokens and server-side validation; no third-party auth library required
- **Config-first architecture** — change business name, services, prices, time slots, and contact info from a single config file
- **TypeScript throughout** — strict typing across all components, API routes, and server utilities
- **One-click deploy** — optimized for Vercel; just add your environment variables and go

## Tech Stack

| Technology | Usage |
|---|---|
| Next.js 15 (App Router) | Frontend and API routes |
| React 19 | UI components |
| TypeScript | Static typing |
| Tailwind CSS | Styling and responsive layout |
| MongoDB (native driver) | Data persistence |
| bcryptjs | Password hashing |
| Vercel | Deployment |

## Customize in 15 Minutes

All business-specific configuration lives in `src/config/`:

**`site.ts`** — business name, contact info, address, social links

**`booking.ts`** — services, prices, and available time slots

**`auth.ts`** — cookie name and session duration

No need to touch the components or API routes.

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/Lafaietepedro/barber.git
cd barber
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DB=your-database-name
ADMIN_SESSION_SECRET=your-secret-here  # generate: openssl rand -base64 32

### 3. Create the admin user

```bash
npm run seed:admin
```

### 4. Update your config files

Edit `src/config/site.ts`, `src/config/booking.ts`, and `src/config/auth.ts` with your business details.

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure
src/
app/           # App Router pages and API routes
components/    # UI and admin components
config/        # Business configuration (site, booking, auth)
lib/           # MongoDB connection and session utilities
scripts/
seed-admin.ts  # Admin user creation script
public/          # Static assets
.env.example     # Environment variable reference

## Deploy on Vercel

1. Push to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add environment variables in Project Settings
4. Deploy

## Author

Built by [Lafaiete Almeida](https://linkedin.com/in/lafaiete-almeida-dev) — [GitHub](https://github.com/Lafaietepedro)
