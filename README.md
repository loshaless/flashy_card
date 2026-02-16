# FlashCard - AI-Powered Flashcard Platform

A premium, modern web application built with **Next.js 15**, **Clerk**, and **Neon/Supabase** that uses AI to help you learn faster. Create study decks manually or generate high-quality flashcards instantly using AI.

## ✨ Features

- **AI Flashcard Generation**: Instantly generate sets of 20+ cards based on your deck title and description using OpenAI.
- **Dynamic Dashboard**: Manage your study decks with a sleek, glassmorphic interface.
- **Premium User Experience**: 
  - **Smooth Animations**: Pulse effects, blurred glows, and glassmorphism.
  - **Next-Level Loading**: Skeleton screens, orbital loading animations, and dynamic status updates for slow database responses (optimized for free tiers).
  - **Top Progress Bar**: Immediate visual feedback for page transitions.
- **Authentication**: Secure login via **Clerk**, including a "Guest Mode" for instant exploration.
- **Pro Plan System**: Integrated pricing table and plan-based limitations (e.g., deck limits for free users).
- **Fully Responsive**: Designed to look stunning on mobile, tablet, and desktop.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components, Server Actions)
- **Database**: [Neon](https://neon.tech/) / [Supabase](https://supabase.com/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **AI Engine**: [OpenAI SDK](https://www.npmjs.com/package/openai)
- **Typography**: [Poppins](https://fonts.google.com/specimen/Poppins) via Google Fonts

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- An OpenAI API Key
- A Clerk Account
- A Neon or Supabase PostgreSQL Database

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd vibe_coding
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   # Database
   DATABASE_URL=postgresql://...

   # Clerk Auth
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/handler/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/handler/sign-up

   # OpenAI
   OPENAI_API_KEY=sk-...
   MODEL_NAME=gpt-4o-mini
   ```

4. **Initialize the Database:**
   ```bash
   npx drizzle-kit push
   ```

### Running Locally

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `app/`: Next.js App Router (pages, layouts, and server actions).
- `components/`: Reusable UI components (Shadcn UI + custom).
- `lib/`: Utility functions (DB connection, AI client, Auth helpers).
- `src/db/`: Database schema definitions and Drizzle queries.
- `public/`: Static assets.

## 💎 Design Rationale

This project prioritizes **Visual Excellence**. By combining vibrant primary colors with subtle dark mode aesthetics and rich micro-animations, we've created a tool that feels premium and professional. The implementation of specific loading states for "database warmup" ensures a smooth experience even on free-tier infrastructure.

---
Built with ❤️ by Antigravity
