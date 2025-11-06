# AGENTS.md

## Build Commands
- `npm run build` - Type-check and build for production
- `npm run dev` - Start development server
- `npm run preview` - Preview production build

## Test Commands
No test framework configured yet. Add testing setup when needed.

## Code Style Guidelines

### TypeScript
- Strict mode enabled
- Use explicit types for function parameters and return values
- Define interfaces/types for API responses
- Use union types for error states (`string | null`)

### React
- Functional components with hooks
- Use `useEffect` with cleanup for async operations
- Handle component unmounting with `mounted` flag
- Use React Bootstrap components for UI consistency

### Imports
- External libraries first (react, react-bootstrap, axios)
- Path aliases: `@shared/*` for shared code, `@features/*` for features
- Group imports by type, separate with blank lines

### Naming Conventions
- Components: PascalCase (DevicesPage, PlayersList)
- Functions/variables: camelCase (getDevices, notifyError)
- Files: PascalCase for components, camelCase for utilities
- Types: PascalCase with descriptive names

### Error Handling
- Use try/catch with async/await
- Custom error types with status, message, and data
- Display user-friendly error messages (support Russian)
- Use toast notifications for user feedback

### Async Patterns
- Prefer async/await over promises
- Use `mounted` flag to prevent state updates on unmounted components
- Handle loading states with boolean flags

### File Structure
- `src/features/` - Feature-specific components
- `src/shared/` - Reusable utilities, API, UI components
- Keep components focused and single-responsibility</content>
<parameter name="filePath">/Users/dyukovlad/dev/devices/AGENTS.md