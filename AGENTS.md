# AGENTS.md

## Commands

- Build: `npm run build` (type-check + production build)
- Dev: `npm run dev` (start dev server on port 5173)
- Preview: `npm run preview`
- Lint: `npm run lint` / `npm run lint:fix`
- Format: `npm run format` (Prettier)
- Type-check: `npm run type-check`
- Tests: No test framework configured yet

## Code Style

- **TypeScript**: Strict mode, explicit types, interfaces for API responses
- **React**: Functional components with hooks, React Bootstrap UI
- **Imports**: External libs first, then `@shared/*` and `@features/*` aliases
- **Naming**: PascalCase components/types, camelCase functions/variables
- **Formatting**: Prettier (semi: true, singleQuote: true, printWidth: 100, tabWidth: 2)
- **Error Handling**: Custom ApiError type, Russian error messages, toast notifications
- **Async**: async/await with mounted flags, loading states
- **Structure**: `src/features/` for features, `src/shared/` for reusable code</content>
  <parameter name="filePath">/Users/dyukovlad/dev/devices/AGENTS.md
