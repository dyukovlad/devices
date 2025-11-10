# AGENTS.md

## Commands

- Build: `bun run build` (Next.js production build with TypeScript check)
- Dev: `bun run dev` (Next.js dev server on port 3000)
- Start: `bun run start` (Next.js production server)
- Preview: `bun run preview` (Next.js production server)
- Lint: `bun run lint` / `bun run lint:fix` (Next.js ESLint on src/**/\*.{ts,tsx} app/**/\*.{ts,tsx})
- Format: `bun run format` (Prettier on src/**/\*.{ts,tsx} app/**/\*.{ts,tsx})
- Type-check: `bun run type-check` (TypeScript noEmit check)
- Tests: No test framework configured yet

## Code Style

- **TypeScript**: Strict mode, explicit types, ApiError interface for API responses
- **React**: Functional components with hooks, React Bootstrap UI, mounted flags for async
- **Next.js**: App Router, "use client" directives for interactive components, SSR disabled for client components
- **Imports**: External libs → `@shared/*` → `@features/*` aliases (tsconfig paths)
- **Naming**: PascalCase (components/types), camelCase (functions/variables), kebab-case (files)
- **Formatting**: Prettier (semi: true, singleQuote: true, printWidth: 100, tabWidth: 2, trailingComma: es5)
- **Error Handling**: ApiError type, Russian messages, toast notifications via ToastProvider
- **Async**: async/await with mounted flags, loading states, Spinner components
- **Structure**: `app/` (Next.js App Router), `src/features/` (feature-specific), `src/shared/` (reusable: api/, ui/, utils/)
- **HTTP**: Axios with baseURL, 15s timeout, custom error interceptor</content>
  <parameter name="filePath">/Users/dyukovlad/dev/devices/AGENTS.md
