# Contributing to Modern Monorepo Fullstack Kit

Thank you for your interest in contributing! This starter kit is designed to be a solid foundation for fullstack TypeScript projects.

## Getting Started

### Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/modern-monorepo-fullstack-kit.git
cd modern-monorepo-fullstack-kit

# Install dependencies
pnpm install

# Copy environment files
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/app/.env.example apps/app/.env

# Generate database and start development
pnpm db:generate
pnpm db:migrate
pnpm dev
```

## Using This Starter Kit

This starter kit is meant to be used as a template for your own projects:

1. **Click "Use this template"** on GitHub to create your own repository
2. **Clone your new repository** and start building
3. **Customize** the starter kit to fit your needs
4. **Remove** features you don't need
5. **Add** new features specific to your project

## Development Workflow

### Code Quality

Before submitting any changes, ensure your code passes all quality checks:

```bash
# Lint your code
pnpm lint

# Auto-fix linting issues
pnpm lint:fix

# Check TypeScript types
pnpm type-check

# Check code formatting
pnpm format:check

# Format code
pnpm format
```

### Making Changes

1. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

3. Push your changes:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request on GitHub

### Commit Convention

We follow conventional commits for clear change history:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```bash
feat: add email verification
fix: correct auth redirect loop
docs: update README with deployment guide
```

## Project Structure

Understanding the monorepo structure will help you navigate the codebase:

```
modern-monorepo-fullstack-kit/
├── apps/
│   ├── api/          # Express.js backend
│   └── app/          # React frontend
├── packages/
│   ├── auth/         # Authentication (Better Auth)
│   ├── config/       # Shared configuration
│   ├── db/           # Database layer (Drizzle ORM)
│   ├── validator/    # Validation utilities
│   └── eslint-config/ # Shared ESLint configs
```

## Adding Features

### Adding a New Package

```bash
# Create package directory
mkdir -p packages/your-package

# Create package.json
cat > packages/your-package/package.json << EOF
{
  "name": "@starter/your-package",
  "version": "0.1.0",
  "main": "./index.ts",
  "types": "./index.ts",
  "dependencies": {}
}
EOF

# Create main file
echo "export const yourFunction = () => {}" > packages/your-package/index.ts
```

### Adding Database Tables

1. Create schema file: `packages/db/src/schemas/your-feature.ts`
2. Export schema in: `packages/db/src/schemas/index.ts`
3. Generate migration: `pnpm db:generate`
4. Apply migration: `pnpm db:migrate`

### Adding API Routes

1. Create route file: `apps/api/src/routes/your-feature.ts`
2. Import and mount in: `apps/api/src/server.ts`

### Adding Frontend Pages

1. Create route file: `apps/app/src/routes/your-page.tsx`
2. Route is automatically available (file-based routing)

## Testing

Testing infrastructure is planned but not yet implemented. Contributions to add testing are welcome!

Planned testing stack:
- **Framework**: Vitest
- **Frontend**: @testing-library/react
- **Backend**: supertest

## Documentation

When adding features, please update:
- **README.md** - User-facing documentation
- **CLAUDE.md** - Developer/AI assistant guide
- **Code comments** - For complex logic

## Pull Request Guidelines

### Before Submitting

- ✅ Code follows the project's style guidelines
- ✅ All linting checks pass (`pnpm lint`)
- ✅ Type checking passes (`pnpm type-check`)
- ✅ Code is formatted (`pnpm format`)
- ✅ Documentation is updated if needed
- ✅ Commit messages follow conventional commits

### PR Description

Include in your PR description:
- **What** changes you made
- **Why** you made them
- **How** to test the changes
- **Screenshots** (if UI changes)

## Questions?

- **Issues**: Open an issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check CLAUDE.md for detailed architecture info

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on what's best for the community

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to making this starter kit better! 🎉
