<div align="center">

<img src="public/logo.png" alt="RoktoSeva Logo" width="80" />

# RoktoSeva

### Bangladesh's Blood Donation Network

**Connect donors with patients. Save lives.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-rokto--seva.vercel.app-red?style=for-the-badge&logo=vercel)](https://rokto-seva.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## What is RoktoSeva?

**RoktoSeva** (রক্তসেবা — "Blood Service") is a full-stack blood donation platform built for Bangladesh. It bridges the gap between blood donors and patients in urgent need by providing a real-time request system, smart donor search, role-based dashboards, and a community funding mechanism — all wrapped in a modern, dark-themed UI.

> Every second counts in an emergency. RoktoSeva makes finding compatible blood donors fast, reliable, and free.

---

## Live Demo

**[https://rokto-seva.vercel.app](https://rokto-seva.vercel.app)**

| Role | Demo Email | Demo Password |
|------|-----------|---------------|
| Admin | admin@roktoseva.com | `admin123` |
| Donor | donor@roktoseva.com | `donor123` |
| Volunteer | volunteer@roktoseva.com | `vol123` |

---

## Features

### For Donors
- Register with blood group, district, and upazila
- Create, edit, and track personal blood donation requests
- Real-time request status updates (Pending → In-Progress → Done / Canceled)
- Profile management with avatar upload via ImgBB

### For Volunteers
- View and manage all active donation requests
- Update request statuses across the platform
- Dedicated volunteer dashboard overview

### For Admins
- Full user management — view, block/unblock, and promote users
- Platform-wide request oversight and control
- Funding transaction history and analytics
- Dashboard statistics (Total Users, Total Requests, Total Funding)

### Platform-Wide
- Smart donor search by **Blood Group**, **District**, and **Upazila**
- Secure **email + password authentication** via Better Auth
- Stripe-powered **community funding** with payment success flow
- Fully responsive UI — sidebar dashboard works on mobile, tablet, and desktop
- Toast notifications for all user actions (login, logout, form submissions)
- SEO-optimized with Open Graph, Twitter Card, and sitemap support

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 + DaisyUI |
| Authentication | Better Auth + MongoDB Adapter |
| Database | MongoDB Atlas |
| Payments | Stripe API + `@stripe/react-stripe-js` |
| Image Upload | ImgBB API |
| Notifications | React Toastify |
| Icons | Lucide React |
| Component Library | HeroUI |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...all]/      # Better Auth catch-all handler
│   │   └── checkout_sessions/  # Stripe checkout session API
│   ├── dashboard/
│   │   ├── admin/              # Admin panel (users, requests, overview)
│   │   ├── donor/              # Donor overview
│   │   ├── volunteer/          # Volunteer panel
│   │   ├── create-donation-request/
│   │   ├── my-donation-requests/
│   │   ├── edit-request/[id]/
│   │   ├── funding/            # Stripe funding page + success screen
│   │   ├── profile/
│   │   └── layout.jsx          # Role-aware sidebar dashboard layout
│   ├── blood-donation-request/[id]/  # Public request detail page
│   ├── search/                 # Donor search page
│   ├── login/
│   ├── register/
│   ├── contact/
│   └── layout.js               # Root layout with global ToastProvider
├── components/
│   ├── Navbar.jsx              # Sticky responsive navbar
│   ├── Footer.jsx
│   ├── ConditionalNavbar.jsx   # Hides navbar on dashboard routes
│   ├── ToastProvider.jsx       # Global react-toastify container
│   ├── PendingRequests.jsx
│   ├── ContactSection.jsx
│   └── Home/Hero.jsx
├── lib/
│   ├── auth.js                 # Better Auth server configuration
│   ├── auth-client.js          # Better Auth client
│   ├── db.js                   # MongoDB connection
│   └── stripe.js               # Stripe server instance
└── data/
    └── locationData.js         # Bangladesh districts + upazilas dataset
```

---

## User Roles

```
┌─────────────────────────────────────────────────────┐
│                     ADMIN                           │
│  • Manage all users (block / unblock / promote)     │
│  • View and control all requests platform-wide      │
│  • Access funding data and analytics                │
├─────────────────────────────────────────────────────┤
│                   VOLUNTEER                         │
│  • View all donation requests                       │
│  • Update request statuses                          │
├─────────────────────────────────────────────────────┤
│                     DONOR                           │
│  • Create and manage own donation requests          │
│  • Edit profile details                             │
│  • Fund the platform via Stripe                     │
└─────────────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB Atlas account
- Stripe account
- ImgBB account (free tier works)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mizanurcodes-ux/roktoseva.git
cd roktoseva

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file in the project root with the following:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/roktoseva

# Better Auth
BETTER_AUTH_SECRET=your_super_secret_key_here
BETTER_AUTH_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# ImgBB (image upload)
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

---

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Authentication Flow

RoktoSeva uses **[Better Auth](https://www.better-auth.com/)** for authentication — a TypeScript-first auth library with a MongoDB adapter.

- **Sign Up** — Email + password registration with additional user fields (blood group, district, upazila, role, status)
- **Sign In** — Email + password with callback URL redirect
- **Session** — Accessed client-side via `authClient.useSession()`
- **Sign Out** — Clears session and redirects to `/login`
- **Route Protection** — All dashboard pages check session state before rendering

---

## Payment & Funding

The platform uses **Stripe Checkout** for community funding:

1. User clicks "Fund" on the `/dashboard/funding` page
2. A Stripe Checkout Session is created via `/api/checkout_sessions`
3. User is redirected to Stripe's hosted payment page
4. On success, user lands on `/dashboard/funding/success`

---

## Deployment

The project is deployed on **Vercel** with zero-config Next.js support.

```bash
# Deploy with Vercel CLI
npx vercel --prod
```

Set all environment variables in your Vercel project settings under **Settings → Environment Variables**.

---

## Roadmap

- [ ] SMS / email notifications for request status changes
- [ ] Real-time donor availability toggling
- [ ] Google / Facebook OAuth login
- [ ] Public donor map with district-level clustering
- [ ] PWA support for mobile offline access
- [ ] Admin analytics charts (Chart.js / Recharts)

---

## Contributing

Contributions are welcome! Please follow these steps:

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes
git commit -m "feat: add your feature"

# 4. Push to your fork and open a Pull Request
git push origin feature/your-feature-name
```

Please make sure your code passes `npm run lint` before submitting a PR.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with purpose for Bangladesh 🇧🇩

**[RoktoSeva](https://rokto-seva.vercel.app)** — because every drop matters.

</div>
