# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

**Modern Monorepo Fullstack Kit** is a production-ready TypeScript monorepo starter kit for building fullstack web applications. It provides complete infrastructure for authentication, database management, API development, and modern React frontends - ready to use out of the box.

### Project Statistics
- **Primary languages:** TypeScript (strict mode), React 19, Node.js
- **Project type:** Starter Kit / Template Repository
- **Architecture:** Express.js 5 backend + React 19 frontend with shared packages
- **Status:** Production-ready, fully tested and documented
- **Authentication:** Better Auth with email/password + Google OAuth
- **Database:** SQLite + Drizzle ORM (easily migrated to PostgreSQL)

### What's Included Out of the Box

**Complete Infrastructure:**
- ✅ Monorepo setup (Turborepo + pnpm workspaces)
- ✅ Express.js 5 backend with TypeScript + ESM
- ✅ React 19 + Vite 7 frontend
- ✅ Better Auth (email/password + Google OAuth)
- ✅ SQLite + Drizzle ORM with auth schemas
- ✅ Protected routes (frontend + backend)
- ✅ Zod validation + neverthrow error handling
- ✅ Shared ESLint configuration
- ✅ Type-safe API client (Axios)
- ✅ File-based routing (Tanstack Router)
- ✅ Tailwind CSS 4 styling
- ✅ Security configured (Helmet, CORS)

## Quick Start

### Prerequisites
- **Node.js:** v24.3.0+ (v22.13.1 minimum)
- **pnpm:** 10.13.1 (enforced via packageManager field)
- **Platform:** Linux/macOS/WSL (SQLite file-based database)

### Initial Setup
```bash
# Install dependencies
pnpm install

# Copy environment files
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/app/.env.example apps/app/.env

# Generate database and migrations
pnpm db:generate
pnpm db:migrate

# Start development
pnpm dev
```

### Environment Configuration

**Backend (.env):**
```bash
NODE_ENV=development
PORT=8080
HOST=localhost
DATABASE_URL=./dev.db
FRONTEND_URL=http://localhost:5173

# Authentication (Better Auth)
GOOGLE_CLIENT_ID=       # Optional - for Google OAuth
GOOGLE_CLIENT_SECRET=   # Optional - for Google OAuth
```

**Frontend (apps/app/.env):**
```bash
VITE_API_URL=http://localhost:8080
```

## Essential Commands

### Development
```bash
# Start both frontend and backend
pnpm dev

# Start individually
pnpm dev:api          # Backend only (http://localhost:8080)
pnpm dev:app          # Frontend only (http://localhost:5173)
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

### Database
```bash
# Schema workflow
pnpm db:generate      # Generate migration from schemas
pnpm db:migrate       # Apply migrations to database
pnpm db:studio        # Open Drizzle Studio (visual DB editor)
```

### Build
```bash
pnpm build            # Build all packages for production
```

## Architecture and Key Concepts

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Monorepo Root                         │
│  (Turborepo + pnpm workspaces)                              │
└─────────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
    ┌───▼────┐                         ┌──────▼──────┐
    │  Apps  │                         │  Packages   │
    └───┬────┘                         └──────┬──────┘
        │                                     │
  ┌─────┴──────┐                    ┌────────┴────────────┐
  │            │                    │  │    │    │        │
┌─▼──┐    ┌───▼──┐          ┌──────▼┐ │ ┌──▼───┐ │  ┌────▼─────┐
│api │    │ app  │          │config│ │ │db    │ │  │validator │
│    │◄──►│      │          │      │ │ │      │ │  │          │
│8080│    │ 5173 │          └──────┘ │ └──────┘ │  └──────────┘
└────┘    └──────┘                    │          │
Express    React+Vite            ┌────▼────┐ ┌──▼───────────┐
SQLite     Tanstack Router       │ auth    │ │eslint-config │
Better Auth                      │         │ └──────────────┘
                                 └─────────┘
                                Better Auth
```

### 1. **Monorepo Organization**

**Location:** `/home/leo/workspace/modern-monorepo-fullstack-kit/`

The project uses **Turborepo** for build orchestration and **pnpm workspaces** for dependency management.

**Structure:**
```
/apps                   # Deployable applications
  /api                  # Express.js backend server
  /app                  # React frontend application

/packages               # Shared internal libraries
  /auth                 # Better Auth configuration (server + client)
  /config               # Centralized environment configuration
  /db                   # Database layer (Drizzle ORM + SQLite)
  /validator            # Validation utilities (Zod + neverthrow)
  /eslint-config        # Shared ESLint configurations
```

**When to use each:**
- **apps/**: Create new app when building a user-facing application
- **packages/**: Create new package for shared code used by multiple apps

### 2. **Authentication System (Better Auth)**

**Location:** `/home/leo/workspace/modern-monorepo-fullstack-kit/packages/auth/`

The starter kit includes **Better Auth** fully configured with:

**Features:**
- Email & Password authentication
- Google OAuth (configurable)
- Email verification
- Session management
- Admin plugin with roles
- Protected routes (frontend + backend)

**Server Setup (`server.ts`):**
```typescript
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: { user, session, account, verification }
  }),
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  socialProviders: { google: { /* credentials */ } },
  emailVerification: { expiresIn: 604_800 }
});
```

**Client Setup (`client.ts`):**
```typescript
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: VITE_API_URL,
  plugins: [adminClient()]
});
```

**Authentication Middleware:**
```typescript
import { authentication } from '@starter/auth/server';

router.get('/protected', async (req, res, next) => {
  const { user } = await authentication(req);
  res.json({ user });
});
```

**Database Schema:**
- `user`: User accounts (id, email, name, role, emailVerified, etc.)
- `session`: Active sessions with tokens
- `account`: OAuth provider accounts
- `verification`: Email verification tokens

### 3. **Type-Safe Error Handling**

**Location:** `/home/leo/workspace/modern-monorepo-fullstack-kit/packages/validator/src/error.ts`

The project uses **class-based errors with HTTP status codes** for operational errors.

**Error Hierarchy:**
```typescript
AppError (base)
├─ ValidationError (400)    // Zod validation failures
├─ NotFoundError (404)      // Resource not found
├─ UnauthorizedError (401)  // Authentication failure
└─ ForbiddenError (403)     // Permission denied
```

**Usage Example:**
```typescript
import { NotFoundError } from '@starter/validator';

// In route handler
if (!user) {
  throw new NotFoundError('User not found');
}
```

**Global Error Handler:** Located in `apps/api/src/server.ts`

### 4. **Request Validation Pattern**

**Location:** `/home/leo/workspace/modern-monorepo-fullstack-kit/packages/validator/src/validator.ts`

All API endpoints should validate requests using **Zod schemas**.

**Pattern:**
```typescript
import { z } from 'zod';

// Define schema
const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

// Use in route
router.post('/users', async (req, res) => {
  const data = createUserSchema.parse(req.body);
  // ... use validated data
});
```

### 5. **Result Type Pattern (Functional Error Handling)**

**Location:** `/home/leo/workspace/modern-monorepo-fullstack-kit/packages/validator/src/neverthrow.ts`

For service layer code, use **neverthrow** Result types instead of try-catch.

**Pattern:**
```typescript
import { ok, err, type AsyncResult } from '@starter/validator';
import { NotFoundError } from '@starter/validator';

async function getUserById(id: string): AsyncResult<User> {
  const user = await db.select().from(users).where(eq(users.id, id));

  if (!user) {
    return err(new NotFoundError('User not found'));
  }

  return ok(user);
}

// In route handler
const result = await getUserById(req.params.id);
result.match(
  (user) => res.json(user),
  (error) => next(error)
);
```

### 6. **Database Access Pattern**

**Location:** `/home/leo/workspace/modern-monorepo-fullstack-kit/packages/db/src/db.ts`

The project uses **Drizzle ORM** with **SQLite** in WAL mode for concurrency.

**Connection:**
```typescript
import { db } from '@starter/db';
import { user } from '@starter/db';

// Query example
const users = await db.select().from(user).where(eq(user.id, id));

// Insert example
await db.insert(user).values({ email, name, createdAt: new Date() });
```

**Key Feature:** WAL (Write-Ahead Logging) mode enabled for better read concurrency.

**Limitation:** SQLite supports only **one writer at a time** (acceptable for most use cases, easily migrated to PostgreSQL if needed).

### 7. **File-Based Routing (Frontend)**

**Location:** `/home/leo/workspace/modern-monorepo-fullstack-kit/apps/app/src/routes/`

The frontend uses **Tanstack Router** with file-based routing.

**Convention:**
```
routes/
  __root.tsx          → Root layout (/)
  index.tsx           → Home page (/)
  auth/
    _auth.tsx         → Auth layout
    _auth/
      login.tsx       → Login page (/auth/login)
      signup.tsx      → Signup page (/auth/signup)
  _protected.tsx      → Protected layout
  _protected/
    index.tsx         → Protected home (/_protected/)
```

**Route Definition Pattern:**
```typescript
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/your-page')({
  component: YourPage,
});

function YourPage() {
  // Component implementation
}
```

**Auto-generation:** `routeTree.gen.ts` is auto-generated by Vite plugin (DO NOT EDIT).

**Protected Routes:**
```typescript
// Use _protected layout for authenticated-only pages
// apps/app/src/routes/_protected/dashboard.tsx
export const Route = createFileRoute('/_protected/dashboard')({
  component: Dashboard,
});
```

### Data Flow

```
User Action
    ↓
React Component (apps/app/src/routes/)
    ↓
Auth Client Hook (authClient.useSession())
    ↓
Axios HTTP Request (apps/app/src/lib/api.ts)
    ↓
Express Route (apps/api/src/routes/)
    ↓
Authentication Middleware (if protected)
    ↓
Request Validation (Zod schema)
    ↓
Route Handler
    ↓
Database Query (Drizzle ORM)
    ↓
Response (JSON)
```

### State Management

**Frontend:**
- **Server State:** Tanstack Query (5-minute stale time, no window focus refetch)
- **Auth State:** Better Auth React hooks (`authClient.useSession()`)
- **UI State:** React hooks (useState, useReducer)
- **Form State:** React Hook Form + Zod validation
- **Router Context:** QueryClient injected via context

**Backend:**
- **Session Management:** Better Auth with database-backed sessions
- **Database:** SQLite file-based persistence (WAL mode)

## Project Structure

```
modern-monorepo-fullstack-kit/
├── apps/
│   ├── api/                      # Backend Express.js server (port 8080)
│   │   ├── src/
│   │   │   ├── routes/           # API route handlers
│   │   │   │   ├── health.ts     # Health check endpoint
│   │   │   │   └── user.ts       # Protected user endpoints
│   │   │   └── server.ts         # Express app with middleware + auth
│   │   ├── index.ts              # Entry point (loads .env, starts server)
│   │   ├── eslint.config.js      # ESLint configuration
│   │   └── tsconfig.json         # TypeScript config (ESM, Node)
│   │
│   └── app/                      # Frontend React application (port 5173)
│       ├── src/
│       │   ├── routes/           # File-based routes (Tanstack Router)
│       │   │   ├── __root.tsx    # Root layout with QueryClient
│       │   │   ├── index.tsx     # Home page (/)
│       │   │   ├── auth/         # Auth pages (login, signup)
│       │   │   └── _protected/   # Protected routes
│       │   ├── modules/
│       │   │   └── auth/         # Auth module (hooks, layouts, pages, components)
│       │   ├── lib/
│       │   │   └── api.ts        # Axios client configuration
│       │   ├── main.tsx          # React entry point
│       │   └── index.css         # Global styles + Tailwind
│       ├── routeTree.gen.ts      # AUTO-GENERATED (do not edit)
│       ├── vite.config.ts        # Vite configuration + plugins
│       └── eslint.config.js      # ESLint configuration
│
├── packages/
│   ├── auth/                     # Better Auth configuration
│   │   ├── server.ts             # Server-side auth setup (drizzle adapter, providers)
│   │   ├── client.ts             # Client-side auth hooks
│   │   ├── index.ts              # Exports
│   │   └── package.json          # Dependencies: better-auth
│   │
│   ├── config/                   # Environment configuration
│   │   └── index.ts              # Centralized config with types
│   │
│   ├── db/                       # Database layer
│   │   ├── src/
│   │   │   ├── db.ts             # SQLite connection (WAL mode)
│   │   │   ├── schemas/          # Drizzle schema definitions
│   │   │   │   ├── auth.ts       # Auth tables (user, session, account, verification)
│   │   │   │   └── index.ts      # Schema exports
│   │   │   └── queries/          # Database query helpers
│   │   │       └── auth.ts       # Auth-related queries
│   │   └── drizzle.config.ts     # Drizzle Kit configuration
│   │
│   ├── validator/                # Validation utilities
│   │   ├── src/
│   │   │   ├── error.ts          # Custom error classes
│   │   │   ├── validator.ts      # Zod validation middleware
│   │   │   └── neverthrow.ts     # Result type helpers
│   │   └── index.ts              # Package exports
│   │
│   └── eslint-config/            # Shared ESLint configurations
│       ├── base.js               # Base rules for all packages
│       ├── typescript.js         # TypeScript + import rules
│       ├── react.js              # React + hooks + a11y rules
│       └── node.js               # Node.js + Express rules
│
├── turbo.json                    # Turborepo build pipeline
├── pnpm-workspace.yaml           # Workspace configuration + catalog
├── prettier.config.js            # Code formatting rules
├── package.json                  # Root scripts and dev dependencies
├── README.md                     # User-facing documentation
├── CONTRIBUTING.md               # How to contribute/use the starter kit
├── LICENSE                       # MIT License
└── CLAUDE.md                     # This file (developer/AI guide)
```

## Important Patterns

### Adding New Features

**1. Creating a New Page:**
```bash
# Create route file
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

**2. Creating a Protected Page:**
```tsx
// apps/app/src/routes/_protected/dashboard.tsx
import { createFileRoute } from '@tanstack/react-router';
import { useSession } from '~/modules/auth';

export const Route = createFileRoute('/_protected/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  const { data: session } = useSession();
  return <div>Welcome, {session?.user?.email}!</div>;
}
```

**3. Creating a Database Schema:**
```typescript
// packages/db/src/schemas/posts.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content'),
  userId: text('user_id').notNull(),
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

**4. Creating an API Endpoint:**
```typescript
// apps/api/src/routes/posts.ts
import { Router, type Request, type Response, type NextFunction } from 'express';
import { authentication } from '@starter/auth/server';
import { db } from '@starter/db';
import { posts } from '@starter/db';

const router = Router();

// Protected endpoint - requires authentication
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = await authentication(req);
    const userPosts = await db.select().from(posts).where(eq(posts.userId, user.id));
    res.json(userPosts);
  } catch (error) {
    next(error);
  }
});

export { router as postsRouter };
```

```typescript
// apps/api/src/server.ts
import { postsRouter } from './routes/posts';

// Add to routes section
app.use('/api/posts', postsRouter);
```

## Key Patterns

### Error Handling Philosophy

**Operational vs Programming Errors:**
- **Operational errors** (expected): Validation failures, not found, unauthorized
  - Use custom error classes (ValidationError, NotFoundError, etc.)
  - Return appropriate HTTP status codes
  - Safe to continue server operation

- **Programming errors** (bugs): Null reference, type errors
  - Let them crash (don't catch)
  - Fix the bug, don't handle in production

**Pattern:**
```typescript
// DO: Operational error (expected, handle gracefully)
if (!user) {
  throw new NotFoundError('User not found');
}

// DON'T: Programming error (bug, should crash)
try {
  user.email.toLowerCase(); // If user can be null, fix the code
} catch {
  // Don't catch programming errors
}
```

## Dependencies and External Services

### Core Dependencies

**Backend:**
- **express:** 5.1.0 - Web server framework
- **better-auth:** ^1.2.12 - Authentication solution
- **better-sqlite3:** 12.4.1 - SQLite driver
- **drizzle-orm:** 0.44.2 - Type-safe ORM
- **zod:** 4.1.12 - Schema validation
- **neverthrow:** 8.2.0 - Result type for functional error handling
- **helmet:** 8.0.0 - Security headers
- **cors:** 2.8.5 - Cross-origin resource sharing
- **tsx:** 4.19.3 - TypeScript execution for development

**Frontend:**
- **react:** 19.1.0 - UI library (latest)
- **vite:** 7.0.0 - Build tool and dev server
- **@tanstack/react-router:** 1.125.6 - Type-safe routing
- **@tanstack/react-query:** 5.82.0 - Server state management
- **axios:** 1.10.0 - HTTP client
- **tailwindcss:** 4.1.11 - Utility-first CSS
- **react-hook-form:** 7.60.0 - Form management
- **react-hot-toast:** 2.5.2 - Toast notifications

**Development:**
- **typescript:** 5.8.3 - Type system
- **eslint:** 9.38.0 - Linting (flat config)
- **prettier:** 3.6.2 - Code formatting
- **turbo:** 2.5.4 - Monorepo build system

### External Services

**Current:** None (fully local application)

**Optional Setup:**
- **Google OAuth**: Configure via `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

**Future Considerations:**
- Cloud database (Turso for SQLite, or PostgreSQL)
- File storage (if handling uploads)
- Email service (for email verification)

### Environment Variables

**Backend Required:**
```bash
NODE_ENV=development      # Environment
PORT=8080                 # Server port
HOST=localhost            # Server host
DATABASE_URL=./dev.db     # SQLite file path
FRONTEND_URL=http://localhost:5173  # CORS origin

# Optional - Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

**Frontend Required:**
```bash
VITE_API_URL=http://localhost:8080  # Backend API URL (must have VITE_ prefix)
```

## Code Style

### Language-Specific Conventions

**TypeScript:**
- Strict mode enabled everywhere
- Prefer `interface` over `type` (enforced by ESLint)
- Use type imports: `import { type User } from '...'`
- No `any` type (warned by ESLint)
- Explicit return types for functions (recommended)

**React:**
- Functional components only (no classes)
- Hooks at top of component
- No `React` import needed (React 19)
- JSX: double quotes, no self-closing components with children

### Naming Conventions

**Files:**
- Routes: kebab-case (`finance.tsx`, `task-list.tsx`)
- Components: kebab-case files, PascalCase exports (`user-card.tsx` → `UserCard`)
- Utilities: kebab-case (`api-client.ts`, `date-helpers.ts`)
- Config: standard names (`vite.config.ts`, `eslint.config.js`)

**Code:**
```typescript
// Variables: camelCase
const queryClient = new QueryClient();
const isLoading = true;

// Functions: camelCase
function handleSubmit() {}
const calculateTotal = () => {};

// Components: PascalCase
function TaskList() {}
const UserCard = () => {};

// Types/Interfaces: PascalCase
interface User {}
type TaskStatus = 'pending' | 'completed';

// Constants: SCREAMING_SNAKE_CASE
const API_BASE_URL = 'http://localhost:8080';
const MAX_RETRY_COUNT = 3;

// Private/unused: prefix with _
const _unusedParam = value;
function handler(_req, res) {}
```

## Using This Starter Kit

### For New Projects

1. **Clone/Use as Template:**
   ```bash
   # Option 1: Clone
   git clone <repo-url> my-new-project
   cd my-new-project
   rm -rf .git
   git init

   # Option 2: Use GitHub "Use this template" button
   ```

2. **Customize:**
   - Update `package.json` name and description
   - Update `.env.example` files
   - Modify `README.md` for your project
   - Add your project-specific features

3. **Remove What You Don't Need:**
   - Don't need auth? Remove `packages/auth` and auth routes
   - Don't need example routes? Remove `apps/app/src/routes/finance.tsx`
   - Want PostgreSQL? Update `packages/db/src/db.ts`

### Extending the Starter Kit

**Add a New Module:**
```bash
mkdir -p apps/app/src/modules/blog
# Create components, hooks, pages for blog feature
```

**Add a New Package:**
```bash
mkdir -p packages/email
# Create email sending utilities
```

**Add Testing:**
```bash
pnpm add -D vitest @testing-library/react
# Configure vitest.config.ts
```

## Resources

### Internal Documentation

**Essential Reading:**
- `/README.md` - Project overview and quick start
- `/CONTRIBUTING.md` - How to use and extend this starter kit
- `/CLAUDE.md` - This file (comprehensive technical guide)
- `/LICENSE` - MIT License

### External Resources

**Core Technologies:**
- [Better Auth Documentation](https://better-auth.com/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [React 19 Documentation](https://react.dev)
- [Tanstack Router](https://tanstack.com/router)
- [Tanstack Query](https://tanstack.com/query)
- [Drizzle ORM](https://orm.drizzle.team)
- [Zod Documentation](https://zod.dev)
- [Vite Documentation](https://vite.dev)

**Key Libraries:**
- [neverthrow](https://github.com/supermacro/neverthrow) - Result type pattern
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new)
- [Express.js 5](https://expressjs.com/en/5x/api.html)

---

**Last Updated:** 2025-10-30
**Project Status:** Production-ready starter kit
**Version:** 0.1.0

For improvements to this guide, submit a pull request or open an issue on GitHub.
