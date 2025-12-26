# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Dev server: `yarn dev` (runs on default Next.js port)
- Build: `yarn build`
- Lint: `yarn lint` (ESLint)
- Format: `yarn format` (Prettier)
- Run all tests: `yarn test`
- Run single test: `yarn test src/path/to/file.test.tsx`
- Run tests with pattern: `yarn test -t "test pattern"`
- Watch tests: `yarn test:watch`

## Code Style

- Next.js 15.1+ with TypeScript and React 19.0
- Component architecture:
  - Common components: `components/common/[name]/Component.tsx`, `index.ts`, `interface.ts`
  - Features: `features/{desktop|mobile}/[feature]/views/...`
  - Pages: `app/(page)/...` (App Router pattern)
- Styling: TailwindCSS with CSS variables (var(--primary-1))
- Types: Use interfaces for props (IProp), export from interface.ts
- Testing: Jest + React Testing Library, mock external dependencies
- Error handling: Optional chaining, proper error boundaries
- Import order: External libraries first, then internal modules
- Naming: PascalCase for components, camelCase for utilities/hooks
- Security: Avoid exposing sensitive info, validate inputs
