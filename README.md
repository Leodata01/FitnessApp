# AI Fitness Agent

Your personalized AI-powered fitness and diet coach.

## Overview

This project is a web application that leverages AI to generate personalized workout and diet plans for users based on their individual profiles, goals, and preferences.

## Key Technologies

- **Frontend**: [Next.js](https://nextjs.org/) (React Framework), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Convex](https://convex.dev/) (Serverless backend platform)
- **Authentication**: [Clerk](https://clerk.com/)
- **AI**: [Google Gemini](https://ai.google.dev/)
- **Styling**: [shadcn/ui](https://ui.shadcn.com/) (UI Components)

## Prerequisites

- Node.js (version 18.x or later recommended)
- npm, yarn, pnpm, or bun (depending on your preference)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <repository-name>
```

### 2. Install Dependencies

Choose your preferred package manager:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of your project and add the necessary environment variables. You will need API keys and configuration details for Convex, Clerk, and Google Gemini.

Example `.env.local`:

```env
NEXT_PUBLIC_CONVEX_URL="<your_convex_url>"
CONVEX_DEPLOYMENT="<your_convex_deployment>" # e.g., dev:xxxxx or prod:xxxxx

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="<your_clerk_publishable_key>"
CLERK_SECRET_KEY="<your_clerk_secret_key>"
CLERK_WEBHOOK_SECRET="<your_clerk_webhook_secret>"

GEMINI_API_KEY="<your_google_gemini_api_key>"

# For Clerk JWT configuration with Convex
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

**Note**: Obtain these keys from their respective service dashboards.

### 4. Set up Convex Backend

If you haven't already, deploy your Convex functions and schema:

```bash
npx convex deploy
```

This command will also prompt you to link your project to a Convex deployment if it's your first time.

## Running the Development Server

Once the setup is complete, you can run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

The page auto-updates as you edit files in the `src/` directory.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
