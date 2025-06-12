# Airdrop Checking Project

## Project Structure

This project follows Feature Slices Design (FSD) architecture pattern for better code organization and maintainability.

```
src/
├── app/          # Application initialization, providers
├── pages/        # Page components and routing
├── widgets/      # Complex reusable components (e.g. Header)
├── features/     # Business features
├── entities/     # Business entities
└── shared/       # Shared utilities and components
    ├── api/      # API related code
    ├── ui/       # Shared UI components
    ├── lib/      # Utility functions
    └── config/   # Configurations
```

## Layer Dependencies

Dependencies should only go from top to bottom:

```
app → pages → widgets → features → entities → shared
```

## Component Structure Example

```
feature/
├── api/          # API calls
├── model/        # Business logic
├── ui/          # Components
├── lib/         # Feature specific utilities
├── types.ts     # TypeScript types
└── index.ts     # Public API exports
```

## Code Style & Conventions

### Imports

```typescript
// Direct imports for better tree-shaking
import { Button } from "@/shared/ui/button";
import { formatAddress } from "@/shared/lib/format-address";
```

### Component Exports

```typescript
// Use named exports
export { Button } from "./Button";
export type { ButtonProps } from "./types";
```

### File Naming

- React Components: `PascalCase.tsx`
- Utilities: `kebab-case.ts`
- Types: `PascalCase.types.ts`

## Getting Started

1. Install dependencies:

```bash
yarn install
```

2. Run development server:

```bash
yarn dev
```

3. Build for production:

```bash
yarn build
```

## Key Technologies

- Next.js 14
- TypeScript
- Tailwind CSS
- Wagmi
- Shadcn/ui

## Best Practices

1. **Public API Pattern**

   - Always export through `index.ts`
   - Only expose what's necessary

2. **Component Organization**

   - Keep components small and focused
   - Use composition over inheritance
   - Separate business logic from UI

3. **Styling**

   - Use Tailwind CSS utilities
   - Follow BEM-like naming for custom classes
   - Use CSS variables for theming

4. **State Management**
   - Use React Query for server state
   - Use React Context for global UI state
   - Keep component state local when possible
