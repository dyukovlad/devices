# AGENTS.md

## Commands

- Build: `bun run build` (TypeScript check + Vite production build)
- Dev: `bun run dev` (Vite dev server on port 5173)
- Preview: `bun run preview` (Preview production build)
- Lint: `bun run lint` / `bun run lint:fix` (ESLint on src/\*_/_.{ts,tsx})
- Format: `bun run format` (Prettier on src/\*_/_.{ts,tsx})
- Type-check: `bun run type-check` (TypeScript noEmit check)
- Tests: No test framework configured yet

## Code Style

- **TypeScript**: Strict mode, explicit types, ApiError interface for API responses
- **React**: Functional components with hooks, React Bootstrap UI, mounted flags for async
- **Imports**: External libs → `@shared/*` → `@features/*` aliases (tsconfig paths)
- **Naming**: PascalCase (components/types), camelCase (functions/variables), kebab-case (files)
- **Formatting**: Prettier (semi: true, singleQuote: true, printWidth: 100, tabWidth: 2, trailingComma: es5)
- **Error Handling**: ApiError type, Russian messages, toast notifications via ToastProvider
- **Async**: async/await with mounted flags, loading states, Spinner components
- **Structure**: `src/features/` (feature-specific), `src/shared/` (reusable: api/, ui/, utils/)
- **HTTP**: Axios with baseURL, 15s timeout, custom error interceptor</content>
  <parameter name="filePath">/Users/dyukovlad/dev/devices/AGENTS.md
