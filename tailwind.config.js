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

        // Utility opacity colors 
        "primary-dark-10": "#40707610", //for bg
        "primary-dark-40": "#40707640", //for border
        "primary-dark-80": "#40707680", //for shadow
        "primary-dark-20": "#40707620", //for hover
        
        // Secondary palette
        secondary: "#698996",

        // Backgrounds & Surfaces
        "primary-bg": "#fdf9fb",
        
        surface: "#C9C5BA",
        "green-surface": "#97B1A6",

        //Text
        text: "#222222",
        "text-muted": "#666666",
        "text-on-primary": "#ffffff",
        
        // Borders & Dividers
        border: "#e5e0e5",
        'border-dark': "#40707640",
        
        //Grays
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
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        dropdownSlideIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        logoGlow: {
          '0%, 100%': {
            opacity: '0.6',
            filter: 'drop-shadow(0 0 2px #40707640)'
          },
          '50%': {
            opacity: '1',
            filter: 'drop-shadow(0 0 12px #40707680)'
          }
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        modalSlideIn: 'modalSlideIn 0.3s ease-out',
        dropdownSlideIn: 'dropdownSlideIn 0.2s ease-in-out',
        fadeIn: 'fadeIn 0.4s ease-out',
        logoGlow: 'logoGlow 1.8s ease-in-out infinite',
        scan: 'scan 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
 }
