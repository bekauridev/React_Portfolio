/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Scan all files for Tailwind usage
  theme: {
    extend: {
      screens: {
        md: "910px",
      },
      colors: {
        background: "rgba(var(--background))",
        text: "rgba(var(--text))",
        border: {
          primary: "rgba(var(--border))",
          secondary: "rgba(var(--border-secondary))",
        },
        primary: {
          50: "rgba(var(--primary-50))",
          100: "rgba(var(--primary-100))",
          200: "rgba(var(--primary-200))",
          300: "rgba(var(--primary-300))",
          400: "rgba(var(--primary-400))",
          500: "rgba(var(--primary-500))",
          600: "rgba(var(--primary-600))",
          700: "rgba(var(--primary-700))",
          800: "rgba(var(--primary-800))",
          900: "rgba(var(--primary-900))",
        },
      },
      fontFamily: {
        sans: ["Inter, serif"],
      },
      height: {
        screen: "100dvh",
      },

      keyframes: {
        "wiggle-hover": {
          "0%, 100%": { transform: "rotate(4deg)" }, // Subtle wiggle on hover
          "50%": { transform: "rotate(-4deg)" },
        },
      },
      animation: {
        "wiggle-hover": "wiggle-hover 1s ease-in-out 2",
      },
    },
    plugins: [
      // ...
    ],
  },
};
