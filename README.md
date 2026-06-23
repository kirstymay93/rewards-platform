# RewardsHub - Modern Rewards Platform

A production-ready rewards platform built with React, TypeScript, and Supabase.

## Features

- **User Authentication**: Login, Register, Forgot Password with email verification
- **User Dashboard**: Activity overview, notifications panel, points balance
- **Rewards System**: Browse catalog, search/filter, redeem rewards, transaction history
- **Support Center**: FAQ accordion, create support tickets, track ticket status
- **Admin Panel**: Dashboard analytics, user management, rewards CRUD, ticket management
- **Dark/Light Mode**: Toggle theme with persistent preference

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS with custom glassmorphism design
- **State Management**: Zustand with persistence
- **Data Fetching**: TanStack Query
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, RLS)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kirstymay93/rewards-platform.git
cd rewards-platform
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

### Database Setup

The Supabase migrations are included in `supabase/migrations/`. They create:

- **users**: User profiles with points and roles
- **rewards**: Reward catalog items
- **reward_transactions**: Redemption history
- **activities**: User activity log
- **notifications**: User notifications
- **support_tickets**: Support ticket system
- **ticket_responses**: Ticket responses
- **faqs**: FAQ entries

## Project Structure

```
src/
├── components/
│   ├── layout/       # MainLayout, ProtectedRoute, PublicLayout
│   └── ui/           # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions, Supabase client
├── pages/
│   ├── admin/        # Admin panel pages
│   ├── auth/         # Authentication pages
│   ├── dashboard/    # User dashboard pages
│   ├── rewards/      # Rewards catalog pages
│   └── support/      # Support center pages
├── services/         # API service layer
├── stores/           # Zustand state stores
└── types/            # TypeScript types
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run typecheck` - Run TypeScript type checking

## License

MIT
