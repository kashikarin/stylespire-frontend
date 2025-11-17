/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {  
        mobile: "480px",
        narrow: "768px",
        normal: "1200px",
        wide: "1440px",
    },
    extend: {
      colors: { 
        "primary-light": "#EBBAB9",
        "primary-dark": "#407076",
        secondary: "#698996",
        "primary-bg": "#fdf9fb",
        surface: "#C9C5BA",
        "green-surface": "#97B1A6",
        text: "#222222",
        "text-muted": "#666666",
        "text-on-primary": "#ffffff",
        border: "#e5e0e5",
        divider: "#f0e8f1",
        gray1: "#ddd",
        gray2: "#aaa",
        gray3: "#777",
        gray4: "#333",
      },
      boxShadow: { 
        "shadow-soft": "0 4px 16px rgba(0, 0, 0, 0.08)",
        "shadow-strong": "0 8px 20px rgba(0, 0, 0, 0.12)"
      },
      spacing: { header: "65px" }
    },
  },
  plugins: [],
}

