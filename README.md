# Digital Admin Dashboard

A modern, full-featured admin dashboard built with Next.js 15, TypeScript, Shadcn/UI, and TanStack Query to manage your Digital app's users, posts, comments, and analytics.

## 🎯 Features

### ✅ **Implemented**
- **Dashboard Overview** - Stats cards with metrics (users, posts, comments, likes)
- **User Management** - View, search, and delete users with pagination
- **Post Management** - Browse, search, and moderate posts with engagement metrics
- **Comment Management** - Monitor and moderate user comments
- **Authentication** - Secure login system with JWT tokens
- **Responsive Design** - Mobile-first UI with Tailwind CSS
- **Data Tables** - Sortable, searchable tables with pagination
- **Toast Notifications** - User feedback for actions
- **Loading States** - Skeleton loaders for better UX
- **Confirmation Dialogs** - Safety prompts before destructive actions

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **UI Library:** Shadcn/UI
- **Styling:** Tailwind CSS v4
- **State Management:** TanStack Query (React Query)
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Date Formatting:** date-fns
- **Notifications:** Sonner

## 📦 Installation

```bash
cd digital-admin
npm install
```

## ⚙️ Configuration

Edit `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🚀 Running the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (Next.js will use port 3000 by default)

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
