import { transform } from 'framer-motion';

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
        "shadow-soft": "0 2px 6px rgba(0, 0, 0, 0.10)",
        "shadow-hover": "0 6px 14px rgba(0, 0, 0, 0.15)",
        "shadow-strong": "0 10px 25px rgba(0, 0, 0, 0.18)"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
      spacing: { header: "65px" },
      keyframes: {
        modalSlideIn: {
          '0%:': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        dropdownSlideIn: {
          '0%:': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        modalSlideIn: 'modalSlideIn 0.3s ease-out',
        dropdownSlideIn: 'dropdownSlideIn 0.2 ease-in-out',
        fadeIn: 'fadeIn 0.4s ease-out'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}

