# Modern Monorepo Fullstack Kit

> A production-ready TypeScript monorepo starter kit with React 19, Express 5, Better Auth, and SQLite

## ✨ Features

- **🏗️ Modern Monorepo Architecture** - Turborepo + pnpm workspaces for blazing-fast builds
- **⚛️ React 19** - Latest React with Vite 7 for lightning-fast development
- **🚀 Express 5** - Modern Express.js backend with TypeScript + ESM support
- **🔐 Authentication** - Better Auth with email/password + Google OAuth out of the box
- **💾 Database** - SQLite + Drizzle ORM with type-safe queries
- **✅ Type Safety** - Strict TypeScript everywhere with Zod validation
- **🎨 Styling** - Tailwind CSS 4.x for rapid UI development
- **📝 Code Quality** - ESLint 9 (flat config) + Prettier pre-configured
- **🔄 State Management** - Tanstack Query for server state, React hooks for UI state
- **📁 File-Based Routing** - Tanstack Router with auto-generated route tree
- **🛡️ Security** - Helmet.js security headers + CORS configured
- **⚡ Developer Experience** - Single command to run everything (`pnpm dev`)

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v24.3.0+ (v22.13.1 minimum)
- **pnpm**: 10.13.1 (enforced via packageManager field)
- **Platform**: Linux/macOS/WSL (SQLite file-based database)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd modern-monorepo-fullstack-kit

# Install dependencies
pnpm install

# Copy environment files
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/app/.env.example apps/app/.env

# Generate database schema and run migrations
pnpm db:generate
pnpm db:migrate

# Start development servers (frontend + backend)
pnpm dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **Health Check**: http://localhost:8080/api/health

## 📦 Project Structure

```
modern-monorepo-fullstack-kit/
├── apps/
│   ├── api/                    # Express.js backend (port 8080)
│   │   ├── src/
│   │   │   ├── routes/         # API route handlers
│   │   │   │   ├── health.ts   # Health check endpoint
│   │   │   │   └── user.ts     # Protected user routes
│   │   │   └── server.ts       # Express app setup
│   │   └── index.ts            # Entry point
│   │
│   └── app/                    # React frontend (port 5173)
│       ├── src/
│       │   ├── routes/         # File-based routes
│       │   │   ├── __root.tsx  # Root layout
│       │   │   ├── index.tsx   # Home page
│       │   │   ├── auth/       # Auth pages (login, signup)
│       │   │   └── _protected/ # Protected routes
│       │   ├── modules/
│       │   │   └── auth/       # Auth module (hooks, layouts, pages)
│       │   └── lib/
│       │       └── api.ts      # Axios client
│       │
├── packages/
│   ├── auth/                   # Better Auth configuration
│   │   ├── server.ts           # Auth server setup
│   │   └── client.ts           # Auth client (React)
│   │
│   ├── config/                 # Shared configuration
│   │   └── index.ts            # Environment config
│   │
│   ├── db/                     # Database layer
│   │   ├── src/
│   │   │   ├── db.ts           # SQLite connection
│   │   │   ├── schemas/        # Drizzle schemas
│   │   │   │   └── auth.ts     # Auth tables (user, session, etc.)
│   │   │   └── queries/        # Database queries
│   │   └── drizzle.config.ts   # Drizzle Kit config
│   │
│   ├── validator/              # Validation utilities
│   │   ├── src/
│   │   │   ├── error.ts        # Custom error classes
│   │   │   ├── validator.ts    # Zod middleware
│   │   │   └── neverthrow.ts   # Result type helpers
│   │   └── index.ts
│   │
│   └── eslint-config/          # Shared ESLint configs
│       ├── base.js             # Base rules
│       ├── typescript.js       # TypeScript rules
│       ├── react.js            # React rules
│       └── node.js             # Node.js rules
│
├── turbo.json                  # Turborepo configuration
├── pnpm-workspace.yaml         # pnpm workspace config
└── package.json                # Root package.json
```

## 🛠️ Tech Stack

### Frontend
- [React 19](https://react.dev) - UI library
- [Vite 7](https://vite.dev) - Build tool
- [Tanstack Router](https://tanstack.com/router) - Type-safe routing
- [Tanstack Query](https://tanstack.com/query) - Server state management
- [Tailwind CSS 4](https://tailwindcss.com) - Utility-first CSS
- [React Hook Form](https://react-hook-form.com) - Form management
- [Zod](https://zod.dev) - Schema validation

### Backend
- [Express 5](https://expressjs.com) - Web framework
- [Better Auth](https://better-auth.com) - Authentication
- [Drizzle ORM](https://orm.drizzle.team) - Type-safe ORM
- [SQLite](https://www.sqlite.org) - Database (WAL mode enabled)
- [Helmet](https://helmetjs.github.io) - Security headers
- [CORS](https://github.com/expressjs/cors) - Cross-origin resource sharing

### Tooling
- [TypeScript 5.8](https://www.typescriptlang.org) - Type system
- [Turborepo](https://turbo.build/repo) - Build orchestration
- [pnpm](https://pnpm.io) - Package manager
- [ESLint 9](https://eslint.org) - Linting (flat config)
- [Prettier](https://prettier.io) - Code formatting

## 📝 Available Scripts

### Development

```bash
# Start both frontend and backend
pnpm dev

# Start individually
pnpm dev:api          # Backend only (http://localhost:8080)
pnpm dev:app          # Frontend only (http://localhost:5173)
```

### Database

```bash
# Generate migration from schema changes
pnpm db:generate

# Apply migrations to database
pnpm db:migrate

# Open Drizzle Studio (visual DB editor)
pnpm db:studio        # http://localhost:8082
```

### Code Quality

```bash
# Linting
pnpm lint             # Check all workspaces
pnpm lint:fix         # Auto-fix issues

# Formatting
pnpm format           # Format all files
pnpm format:check     # Check formatting (CI)

# Type checking
pnpm type-check       # TypeScript validation
```

### Build

```bash
# Build all packages for production
pnpm build
```

## 🔐 Authentication Setup

This starter kit comes with Better Auth pre-configured with:

### Email & Password Authentication
Ready to use out of the box. Users can sign up and sign in with email/password.

### Google OAuth (Optional)
To enable Google OAuth:

1. Create a Google Cloud Project at [console.cloud.google.com](https://console.cloud.google.com)
2. Enable Google OAuth and create credentials
3. Add your credentials to `.env`:

```bash
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Protected Routes
Use the `_protected` layout to protect routes:

```tsx
// apps/app/src/routes/_protected/dashboard.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  return <div>Protected Dashboard</div>;
}
```

### Protected API Routes
Use the `authentication` middleware:

```typescript
// apps/api/src/routes/example.ts
import { authentication } from '@starter/auth/server';

router.get('/protected', async (req, res, next) => {
  try {
    const { user } = await authentication(req);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});
```

## 🎨 Adding Features

### Create a New Page

```bash
# Create new route file
touch apps/app/src/routes/about.tsx
```

```tsx
// apps/app/src/routes/about.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return <div>About Page</div>;
}
```

Route automatically available at: http://localhost:5173/about

### Create a Database Schema

```typescript
// packages/db/src/schemas/posts.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});
```

```typescript
// packages/db/src/schemas/index.ts
export * from './auth';
export * from './posts';  // Add this line
```

```bash
# Generate and apply migration
pnpm db:generate
pnpm db:migrate
```

### Create an API Endpoint

```typescript
// apps/api/src/routes/posts.ts
import { Router, type Request, type Response } from 'express';
import { db } from '@starter/db';
import { posts } from '@starter/db/schemas';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const allPosts = await db.select().from(posts);
  res.json(allPosts);
});

export { router as postsRouter };
```

```typescript
// apps/api/src/server.ts
import { postsRouter } from './routes/posts';

// Add to routes section
app.use('/api/posts', postsRouter);
```

## 🔒 Environment Variables

### Backend (.env)
```bash
NODE_ENV=development
PORT=8080
HOST=localhost
APP_NAME=Starter Kit
APP_VERSION=0.1.0

FRONTEND_URL=http://localhost:5173
DATABASE_URL=./dev.db

# Optional - Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:8080
```

## 📚 Key Patterns

### Error Handling
The project uses class-based errors for operational errors:

```typescript
import { NotFoundError, ValidationError } from '@starter/validator';

// In route handler
if (!user) {
  throw new NotFoundError('User not found');
}
```

### Request Validation
All endpoints should validate requests using Zod schemas:

```typescript
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

// Validate in handler
const data = schema.parse(req.body);
```

### Result Type Pattern
For service layer code, use Result types:

```typescript
import { ok, err, type AsyncResult } from '@starter/validator';

async function getUserById(id: string): AsyncResult<User> {
  const user = await db.select().from(users).where(eq(users.id, id));
  if (!user) return err(new NotFoundError('User not found'));
  return ok(user);
}
```

## 🚢 Deployment

### Build for Production
```bash
pnpm build
```

### Recommended Platforms

**Frontend:**
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [Cloudflare Pages](https://pages.cloudflare.com)

**Backend:**
- [Railway](https://railway.app)
- [Fly.io](https://fly.io)
- [Render](https://render.com)

**Database:**
- [Turso](https://turso.tech) - SQLite in the cloud
- Or migrate to PostgreSQL with minimal changes

## 📖 Documentation

For detailed documentation, see:
- **CLAUDE.md** - Comprehensive guide for AI assistants and developers
- **Better Auth Docs** - https://better-auth.com/docs
- **Drizzle ORM Docs** - https://orm.drizzle.team/docs
- **Tanstack Router Docs** - https://tanstack.com/router/latest/docs

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

Built with amazing open-source projects:
- React, Express, TypeScript
- Better Auth, Drizzle ORM, Tanstack Router
- Turborepo, pnpm, Vite

---

**Happy Coding!** 🎉

Made with ❤️
