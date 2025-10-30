# Update README Command

Your task is to analyze the current project state and update the README.md file to accurately reflect reality.

## Execution Steps

### 1. Gather Current Project State

Read and analyze the following files to extract the current state:

**Version Information:**
- `package.json` → project version, pnpm version, root scripts
- `.nvmrc` → Node.js version requirement
- `apps/api/package.json` → backend dependencies and versions
- `apps/app/package.json` → frontend dependencies and versions
- `packages/*/package.json` → all package dependencies
- `pnpm-workspace.yaml` → catalog versions (if used)

**Project Structure:**
- List contents of `apps/` directory
- List contents of `packages/` directory
- List all route files in `apps/app/src/routes/` (recursively)

**Features & Configuration:**
- Check `.github/workflows/` for CI/CD workflows
- Check `.github/dependabot.yml` for dependency automation
- Review last 10-15 commits: `git log --oneline -15`

### 2. Extract Key Information

From the files above, extract:

**Versions:**
- Project version number
- Node.js version (from .nvmrc)
- pnpm version (from packageManager field)
- Key dependencies:
  - React (apps/app)
  - Vite (apps/app)
  - Express (apps/api)
  - TypeScript (root)
  - Tanstack Router (apps/app)
  - Tanstack Query (apps/app)
  - Better Auth (packages/auth)
  - Drizzle ORM (packages/db)
  - SQLite/better-sqlite3 (packages/db)
  - Zod (packages/validator)
  - Tailwind CSS (apps/app)
  - ESLint (root)
  - Prettier (root)
  - Turborepo (root)

**Project Structure:**
- List of apps (e.g., api, app)
- List of packages (e.g., auth, db, validator, config, eslint-config)
- Route files structure (especially in apps/app/src/routes/)

**Available Scripts:**
- All scripts from root package.json

**Features Present:**
- CI/CD workflows (check .github/workflows/)
- Dependabot (check .github/dependabot.yml)
- Authentication (Better Auth)
- Database setup (Drizzle + SQLite)
- Other features mentioned in commits

### 3. Read Current README.md

Read the entire README.md file and identify all sections:
- Title and description
- Features list
- Quick Start (Prerequisites, Installation)
- Project Structure
- Tech Stack
- Available Scripts
- Authentication
- Adding Features (examples)
- Environment Variables
- Key Patterns
- Deployment
- Documentation links
- Contributing
- License
- Acknowledgments

### 4. Compare and Identify Discrepancies

**Check for:**

1. **Version Mismatches:**
   - Does README show correct project version?
   - Does Node.js version match .nvmrc?
   - Does pnpm version match packageManager?
   - Are dependency versions accurate?

2. **Missing Features:**
   - Are CI/CD workflows documented?
   - Is Dependabot mentioned?
   - Are new features from recent commits included?

3. **Outdated Examples:**
   - Do code examples reference files that still exist?
   - Are route examples accurate (no deleted routes)?
   - Do example imports use correct package names?

4. **Project Structure:**
   - Does the structure tree match actual directories?
   - Are all apps and packages listed?
   - Is the route tree current?

5. **Scripts Accuracy:**
   - Do documented scripts match package.json?
   - Are all important scripts documented?

6. **Missing Sections:**
   - Should there be a CI/CD section?
   - Are there new features needing documentation?

### 5. Generate Update Report

Create a comprehensive report with:

**A. Discrepancies Found**
List each issue with:
- Section name
- Current README content
- Actual project state
- Why it's incorrect

**B. Proposed Updates**
For each discrepancy, provide:
- Exact markdown changes needed
- New content to add
- Content to remove
- Sections to create

**C. Priority Levels**
Categorize updates:
- 🔴 Critical: Wrong versions, missing major features, broken examples
- 🟡 Important: Outdated structure, missing recent additions
- 🟢 Minor: Formatting, optimization, nice-to-haves

### 6. Present Changes

Show the proposed updates clearly:

```markdown
## README.md Updates Needed

### 🔴 Critical Updates

#### 1. Add CI/CD Section
**Location:** After "Code Quality" section, before "Deployment"

**Add this content:**
[show exact markdown]

#### 2. Update Project Structure
**Current (incorrect):**
[show current content]

**Should be:**
[show corrected content]

### 🟡 Important Updates

[continue with other updates...]

### 🟢 Minor Updates

[continue with other updates...]
```

### 7. Apply Updates (if confirmed)

After presenting the report, ask the user if they want to apply the changes. If confirmed, update README.md with all the proposed changes.

## Sources of Truth (Priority Order)

When conflicts arise, trust these sources in order:

1. **Actual files** (most trustworthy)
   - package.json files for versions
   - Directory listings for structure
   - .nvmrc for Node version
   - Workflow files for CI/CD features

2. **Git history**
   - Recent commits for new features
   - Deleted files from git log

3. **CLAUDE.md**
   - Detailed technical documentation
   - Architecture explanations

4. **README.md** (what we're updating)
   - Least trustworthy, that's why we're checking it!

## Special Cases

**Routes:**
- Only document routes that currently exist in `apps/app/src/routes/`
- Ignore deleted routes (like `finance.tsx` if removed)
- Update examples to use current route names

**Dependencies:**
- Only list major dependencies in Tech Stack section
- Don't overwhelm with every single package
- Focus on user-facing technologies

**Version Numbers:**
- Be specific (e.g., "React 19.1.0" not just "React 19")
- Show minor versions for stability indication
- Use consistent formatting (e.g., all semver or all major.minor)

**CI/CD:**
- If workflows exist in `.github/workflows/`, they must be documented
- Show what checks run and when
- Explain the purpose clearly

## Output Format

Always structure your response as:

1. **Analysis Summary** (2-3 sentences about overall README health)
2. **Discrepancies Found** (numbered list)
3. **Proposed Updates** (grouped by priority)
4. **Questions** (if any clarifications needed)
5. **Ready to Apply?** (ask for confirmation)

## Remember

- Be thorough but concise
- Provide exact markdown, not descriptions
- Double-check file existence before referencing
- Keep the README user-friendly
- Maintain consistent tone and style
- Don't remove content unnecessarily
- Preserve code examples that work
- Update, don't rewrite from scratch
