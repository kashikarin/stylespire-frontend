# 🌟 Stylespire – Frontend  
*A personalized, weather-aware outfit inspiration app built with React.*

---

## 📌 Overview

The **Stylespire Frontend** is a modern React application that generates personalized outfit inspiration based on user preferences, location, and live weather.  
Users can browse curated images, save favorites, and soon create customizable style boards.

The app is fully component-based, built with **React hooks**, and emphasizes clean architecture, modular components, and a smooth user experience.

---

## ✨ Features

### 🔹 Smart Inspiration Flow
Users submit a short form (gender, age, mood, clothing style, outing purpose).  
The app then enriches the data with:
- 🌍 Geolocation  
- 🌤 Weather API data  

And fetches curated visuals from **Unsplash**.

---

### 🔹 Routing & Page-to-Page Data Transfer

The application uses **React Router v6** for client-side routing.  
While most data is handled globally via Redux, a **single targeted use-case** uses Router state:

- When the user submits the inspiration form, the enriched search results (Unsplash images) are passed to the Results page using:

```js
navigate('/results', { state: { results } });
```
This prevents overloading Redux with temporary, per-request data and keeps the global store clean.
The pattern is intentionally scoped to this flow only, making the transition seamless and avoiding unnecessary network re-fetching on the Results page.

---

### 🔹 Dynamic Results Page
- Scrollable/snap-style image carousel  
- High-quality outfit inspiration  
- Smooth transitions and animations  
- Reusable UI components  

---

### 🔹 JWT Authentication  
- Login / Signup UI  
- Auth state managed via JWT-based authentication (token stored client-side) 
- Auto-redirect rules (protected routes)  
- Global auth state (Redux)
- Protected routes based on Redux state

  

---

### 🔹 Favorites System  
- Heart button to toggle favorites  
- Favorites saved per authenticated user  
- Smooth real-time UI updates  
- Dedicated Favorites page  

---

## 🧩 Architecture

### Hook-Based Architecture (Modern & Scalable)

The app is built entirely using **custom hooks**, keeping UI components clean and declarative.

#### Key principles:

- **Logic extracted into hooks**  
  - `useUnsplash()` – photo fetching logic  
  - `useWeather()` – API + geolocation logic  
  - `useForm()` – form states and validations  
  - `useFavorites()` – add/remove/sync favorites  
  - `useResults()` – browse & sync unsplash results 
  - `useIsLoggedInUser()` – retrieve and validate authentication state
  - `useLike()` – get & toggle like (heart) state for images
  - `useMediaQuery()` – manage responsive breakpoints & screen width state

- **UI components contain zero business logic**
- **Reusable components** (Carousel, Card, Modals, Forms)
- **Responsive SCSS** architecture

This structure mirrors real-world production standards.

---

### 🧩 State Management

The app uses **Redux** for global state management, handling:
- Authentication state
- User data
- Favorites
- API loading states

---

## 🛠 Tech Stack

**Frontend:**  
- React  
- JavaScript (ES6+)  
- React Hooks  
- Redux  
- SCSS / CSS Modules  
- React Router v6 – client-side routing & state transfer between pages

**APIs:**  
- Unsplash API  
- Geolocation API  
- Weather API  
- Stylespire Backend (Node/Express)

**Tools:**  
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
```



> ⚠️ **Do not include actual API keys in your repository.**  
> Make sure `.env` is added to `.gitignore`.


## 🚀 Coming Next (V2)

The next major feature on the frontend is the **Stylespiration Board** — an interactive mood-board style workspace where users can create personalized outfit inspiration layouts.

Planned capabilities include:

- Selectable backgrounds (textures, themes, colors)  
- A favorites sidebar showing saved images  
- Drag & drop images from favorites onto the board  
- Automatic background removal for placed images  
- Positioning, resizing, and arranging elements on the board  
- Saving the board for later editing  
- Exporting or sharing the final board layout  

This feature will serve as the creative core of Stylespire and is currently in development.