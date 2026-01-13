# 🌟 Stylespire – Frontend  
*A responsive, interactive outfit inspiration & styleboard application built with React.*

---

## 📌 Overview

The **Stylespire Frontend** is a modern, fully responsive React application that that combines personalized outfit inspiration with an interactive visual styleboard.  
Users can browse curated images, save favorites, and create customizable StyleBoards.
This project is built as a production-grade frontend, with a strong focus on scalability, separation of concerns, and real-world UX patterns.

The app guides users from inspiration to creation:

1. Collects user preferences, location, and live weather
2. Generates outfit inspiration images
3. Allows users to save favorites
4. Enables advanced visual composition via a drag-and-drop StyleBoard editor

The frontend emphasizes clean architecture, custom hooks, and rich canvas-based interactions.

---

## ✨ Core Features

### 🔹 Smart Inspiration Flow
Users submit a short form (gender, age, mood, clothing style, occasion).  
The app then enriches the data with:
- 🌍 Geolocation  
- 🌤 Weather API data  

And fetches curated visuals from **Unsplash** and **Pexels**.

---

### 🔹 Routing & Data Flow

The application uses **React Router v6** for client-side routing.

Routing is kept purely navigational, while all application data (authentication, favorites, search results, and styleboards) is managed via **Redux** and backend APIs. This ensures consistent data availability across pages without relying on route-based state.

---

### 🔹 Dynamic Results Page
- Scrollable/snap-style image carousel  
- High-quality outfit inspiration  
- Smooth transitions and animations  
- Reusable UI components  

---

### 🔹 JWT Authentication  
- Login / Signup flows  
- JWT-based authentication  
- Protected routes  
- Global auth state via Redux

---

### 🔹 Favorites System  
- Like / unlike images (heart toggle)  
- Favorites saved per authenticated user  
- Smooth real-time UI updates  
- Dedicated Favorites page with styled grid layout
-  

---

### 🎨 Styleboard

The Styleboard is an interactive canvas-based workspace that allows users to transform inspiration into personalized outfit compositions.

Users can select a background and drag images directly from their Favorites onto the canvas. Images are placed without their original backgrounds, enabled through integration with a custom Python microservice that removes backgrounds and selects the dominant figure in each image.

The canvas supports common editing actions such as moving, resizing, layering (z-index), deletion, undo/redo, and keyboard shortcuts for efficient workflows.

Styleboards can be saved with a custom name and reopened later for continued editing. Future enhancements include sharing, exporting, and printing boards.

---

## 🧩 Architecture

### Hook-Based Architecture (Modern & Scalable)

The application relies heavily on a rich set of **custom hooks**, grouped by responsibility.  
This approach keeps components lean while allowing complex behavior to evolve independently.

**Authentication & User**
- `useAuthForm()`
- `useCurrentUser()`
- `useIsLoggedInUser()`
- `useDemoLogin()`

**Inspiration & Search**
- `useForm()`
- `useUnsplash()`
- `useWeather()`
- `useResults()`
- `useStyleSearchParams()`
- `useHomeHero()`

**Favorites & Likes**
- `useFavorites()`
- `useLike()`

**Styleboard & Canvas**
- `useBoards()`
- `useBoardHistory()`
- `useBoardItems()`
- `useBackgroundRemoval()`
- `useCanvasActions()`
- `useCanvasImages()`
- `useCanvasLayout()`
- `useCanvasBackgrounds()`
- `useCanvasBackgroundBar()`
- `useCanvasOverlayActions()`
- `useCanvasShortcuts()`

**UI, Layout & Interaction**
- `useMediaQuery()`
- `useDragToScroll()`
- `useDropdownController()`
- `useOnClickOutside()`
- `useLockBodyScroll()`
- `useHeaderActions()`
- `useFooterActions()`
- `useEffectUpdate()`

**Key principles:**
- UI components are focused on presentation, with business logic extracted into hooks  
- Reusable, composable components (Carousel, Cards, Modals, Forms)  
- Fully responsive layout using Tailwind CSS and scoped styles where needed  

This structure mirrors real-world, production-grade frontend architecture.

---

### 🧩 State Management

The app uses **Redux** for global state management, handling:
- Authentication state  
- User data  
- Favorites  
- Global loading and error states  

Editor- and canvas-specific state (Styleboard) is intentionally managed locally to keep the global store lean and focused.

---

## 🛠 Tech Stack

**Frontend**
- React  
- JavaScript (ES6+)  
- React Hooks  
- Redux  
- React Router v6  
- Konva.js (canvas rendering & interactions)  
- Tailwind CSS  
- SCSS / CSS Modules (where needed)  

**APIs & Services**
- Unsplash API  
- Pexels API
- Geolocation API  
- Weather API  
- Stylespire Backend (Node / Express)  
- Background removal microservice (Python)

**Tooling**
- Vite  
- Git & GitHub  
- Postman  
- VS Code  
- MongoDB Compass

---

### 🧩 Installation & Running the App

```bash
npm install
npm run dev
```

### 🔧 Environment Variables

Create a `.env` file in the project root and include the following variables:

```
VITE_WEATHER_KEY=
VITE_UNSPLASH_KEY=
VITE_PEXELS_KEY=
VITE_API_BASE_URL=
```

> ⚠️ **Do not include actual API keys in your repository.**  
> Make sure `.env` is added to `.gitignore`.


