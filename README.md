# 🚀 NextJS Blog App

A production-ready full-stack blog application built with **Next.js 14 App Router**, **TypeScript**, **MongoDB**, and **Mongoose**.

## ✨ Features

- 🔐 JWT authentication with HTTP-only cookies
- 🔑 bcrypt password hashing (salt rounds: 12)
- 📝 Rich text editor (TipTap)
- 📱 Fully responsive design
- 🌙 Dark mode toggle
- 🔍 Full-text search with debounce
- 📄 Pagination
- ❤️ Like system
- 💬 Comments support
- 🛡️ Ownership-based access control
- ✅ Zod input validation
- 🎨 TailwindCSS + @tailwindcss/typography
- 🔔 Toast notifications
- ⚡ Loading skeletons
- 🗑️ Confirmation modals

## 📁 Project Structure

```
nextjs-blog/
├── middleware.ts              # JWT route protection
├── src/
│   ├── app/
│   │   ├── (auth)/           # Login & Signup pages
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # signup, login, logout
│   │   │   └── posts/        # CRUD + like
│   │   ├── blog/             # Blog pages
│   │   ├── dashboard/        # User dashboard
│   │   └── layout.tsx        # Root layout
│   ├── components/
│   │   ├── blog/             # PostCard, PostForm, SearchBar
│   │   ├── layout/           # Navbar, Footer
│   │   ├── providers/        # AuthProvider
│   │   └── ui/               # Button, Input, Modal, etc.
│   ├── hooks/                # useAuth, usePosts, useDebounce
│   ├── lib/                  # db, auth, api-response, utils
│   ├── models/               # User, Post Mongoose models
│   ├── types/                # TypeScript interfaces
│   └── validators/           # Zod schemas
```

## 🛠️ Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/blogdb
JWT_SECRET=your-super-secret-key-minimum-32-characters
JWT_EXPIRES_IN=7d
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> Generate a secure JWT secret: `openssl rand -base64 32`

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🌐 API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | ❌ | Create account |
| POST | `/api/auth/login` | ❌ | Login |
| POST | `/api/auth/logout` | ❌ | Logout |
| GET | `/api/posts` | ❌ | Get posts (paginated + search) |
| POST | `/api/posts` | ✅ | Create post |
| GET | `/api/posts/:id` | ❌ | Get single post |
| PUT | `/api/posts/:id` | ✅ Owner | Update post |
| DELETE | `/api/posts/:id` | ✅ Owner | Delete post |
| POST | `/api/posts/:id/like` | ✅ | Toggle like |

**Query parameters for GET /api/posts:**
- `page` (default: 1)
- `limit` (default: 10, max: 20)
- `search` (full-text search)
- `author` (filter by author ID)

## 🚀 Deployment

### MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a database user
3. Whitelist all IPs (`0.0.0.0/0`) or Vercel's IPs
4. Copy the connection string

### Vercel

1. Push to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy!

## 🔒 Security

- Passwords hashed with bcrypt (12 salt rounds)
- JWT stored in HTTP-only cookies (inaccessible to JavaScript)
- `SameSite: lax` + `Secure: true` (production) cookie flags
- Input sanitized with Zod on all endpoints
- Ownership verified before any mutation
- Generic error messages to prevent user enumeration
- MongoDB ObjectId validation before queries

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Validation | Zod |
| Styling | TailwindCSS |
| Rich Text | TipTap |
| Notifications | react-hot-toast |
| Dates | date-fns |
