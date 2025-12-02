/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0F0F19",
          soft: "#131328"
        },
        royal: {
          purple: "#5A2BFF"
        },
        neon: {
          gold: "#E8C96F",
          blue: "#4DA6FF"
        }
      },
      fontFamily: {
        heading: ["Poppins", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        "neon-purple": "0 14px 28px rgba(0, 0, 0, 0.45)",
        "neon-gold": "0 12px 24px rgba(0, 0, 0, 0.4)",
        "neon-blue": "0 10px 20px rgba(0, 0, 0, 0.4)",
        "glass": "0 18px 40px rgba(0,0,0,0.65)"
      },
      backgroundImage: {
        "royal-radial":
          "radial-gradient(circle at top, rgba(90,43,255,0.4), transparent 55%), radial-gradient(circle at bottom, rgba(19,19,40,0.85), transparent 55%)",
        "royal-gradient":
          "linear-gradient(135deg, #5A2BFF 0%, #7B4DFF 55%, #5A2BFF 100%)",
        "glass":
          "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))"
      },
      borderRadius: {
        "xl": "0.75rem",
        "2xl": "1rem"
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        "pulse-glow": {
          "0%, 100%": { opacity: 0.5, filter: "blur(16px)" },
          "50%": { opacity: 1, filter: "blur(20px)" }
        }
      },
      animation: {
        "float-slow": "float-slow 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};


