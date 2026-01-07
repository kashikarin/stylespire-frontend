# Stylespire Frontend - AI Agent Instructions

## Architecture Overview

**Tech Stack**: React 19 + Vite + Redux (legacy) + TailwindCSS + SCSS + Konva (canvas)

**Key Pattern**: Hook-based architecture where **all business logic lives in custom hooks**, not components. Components are purely presentational.

**State Management**: Redux with legacy `createStore` (not RTK slices). Actions are async thunks that directly dispatch commands via `store.dispatch()`.

## Critical Patterns

### 1. Hook-First Development
- **Always extract logic into hooks**, never inline in components
- Examples: `useBoards()`, `useFavorites()`, `useForm()`, `useMediaQuery()`
- Components receive data/handlers from hooks and render UI only
- See [src/pages/Home.jsx](../src/pages/Home.jsx) for clean component example

### 2. Redux Store Structure
```javascript
// Modules: systemModule, userModule, favoriteModule, boardModule
// Actions: Direct dispatch pattern (not RTK)
import { store } from '../store/store'
store.dispatch(getCmdSetLoading(true))
```
- Action files (e.g., [src/store/actions/favorite.actions.js](../src/store/actions/favorite.actions.js)) export async functions
- Always wrap try/catch with loading/error dispatch
- Use `getCmdXxx()` naming for action creators

### 3. Styling Hybrid System
**Two parallel systems:**
- **TailwindCSS**: Primary for layout, spacing, colors (inline classes)
- **SCSS**: For complex component styles, imported per component
- Main entry: [src/assets/styles/main.scss](../src/assets/styles/main.scss) (imports setup → basics → components)
- Custom Tailwind screens: `mobile: 480px`, `narrow: 768px`, `normal: 1200px`, `wide: 1440px`
- Use `useMediaQuery(breakpoints.mobile)` for responsive logic

### 4. Authentication & Protected Routes
- JWT stored in `localStorage.getItem('accessToken')`
- Axios interceptor auto-attaches token in [src/services/http.service.js](../src/services/http.service.js)
- Protected routes use `<ProtectedRoute />` wrapper with `<Outlet />`
- Check auth with `useIsLoggedInUser()` hook (returns `{ loggedInUser, loading }`)

### 5. Data Flow Patterns
**Router State (Exceptional Case)**: Only used for search results flow:
```javascript
navigate('/results', { state: { results } }) // Avoid Redux pollution
```
**Redux**: User, favorites, boards, system modals  
**Component State**: UI-only (dropdowns, selections, local toggles)

## Development Commands

```bash
npm run dev          # Vite dev server → proxies /api to localhost:8000
npm run build        # Outputs to ../stylespire-backend/public (monorepo setup)
npm run lint         # ESLint
```

**Backend Integration**: Vite proxy forwards `/api/*` to `localhost:8000` (see [vite.config.js](../vite.config.js))

## Component Conventions

### Naming & Exports
- **Named exports only**: `export function ComponentName() {}`
- Files match component name: `AppHeader.jsx` exports `AppHeader`
- Props destructured in signature: `function MyComponent({ prop1, prop2 })`

### Component Structure Example
```jsx
export function MyFeature() {
  const { data, handleAction } = useMyFeature() // Hook for all logic
  const isMobile = useMediaQuery(breakpoints.mobile)
  
  return (
    <div className="flex flex-col gap-4 px-4">
      {/* Pure presentational JSX */}
    </div>
  )
}
```

## Key Hooks Reference

| Hook | Purpose | Returns |
|------|---------|---------|
| `useForm(initialState)` | Form state management | `[fields, setFields, handleChange]` |
| `useFavorites()` | Fetch/manage favorites | `{ favorites, selectedFav, handleSelect, isLoading }` |
| `useBoards()` | Canvas board state | `{ boards, board, updateCurrentBoard, saveAndCreateNewBoard }` |
| `useIsLoggedInUser()` | Auth state | `{ loggedInUser, loading }` |
| `useMediaQuery(breakpoint)` | Responsive checks | `boolean` |

## Services Layer

All API calls through [src/services/http.service.js](../src/services/http.service.js):
```javascript
httpService.get/post/put/delete(endpoint, data)
// Endpoints relative to /api/ (e.g., 'favorites/123')
```

Domain services (e.g., `favoriteService`, `boardService`) wrap http calls with business logic.

## Canvas/Konva Integration

- Canvas feature uses Konva.js (HTML5 canvas library)
- Main canvas: [src/cmps/StyleBoard/StyleBoardCanvas.jsx](../src/cmps/StyleBoard/StyleBoardCanvas.jsx)
- Custom hooks: `useCanvasImages()`, `useCanvasBackgrounds()`, `useBoardHistory()`
- Ref-based API: Components call methods via `canvasRef.current.getCanvasState()`

## Common Gotchas

1. **Don't use RTK patterns** - This uses legacy Redux with manual action creators
2. **Check auth before data fetching** - Many hooks early-return if `!loggedInUser._id`
3. **SCSS imports must be in main.scss** - Don't import component SCSS directly in JSX
4. **Tailwind config uses custom screen names** - Use `narrow:` not `md:`, `mobile:` not `sm:`
5. **Modal state in Redux** - `systemModule.isStyleMeModalOpen`, `userModule.authMode`

## File Organization

```
src/
  hooks/        # All business logic (hook-first!)
  services/     # API wrappers & external integrations
  store/        # Redux: actions/ + reducers/
  cmps/         # Pure presentational components
  pages/        # Route components (also presentational)
  util/         # Pure functions, constants, maps
  assets/styles/ # SCSS architecture (setup → basics → cmps → pages)
```

When adding features: **Create the hook first**, then build the component around it.
