import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#ffb400",
        "black-3": "#252525",
        "black-4": "#333",
        "black-5": "#555",
        "black-6": "#666",
        "light-grey": "#aaa",
        grey: "#ddd",
      },
      fontFamily: {
        Poppins: ["var(--font-poppins)", "sans-serif"],
        "Open-sans": ["var(--font-open-sans)", "sans-serif"],
      },
      fontSize: {
        "fs-12": "12px",
        "fs-13": "13px",
        "fs-14": "14px",
        "fs-15": "15px",
        "fs-16": "16px",
        "fs-18": "18px",
        "fs-19": "19px",
        "fs-21": "21px",
        "fs-26": "26px",
        "fs-33": "33px",
        "fs-40": "40px",
        "fs-50": "50px",
        "fs-60": "60px",
      },
      lineHeight: {
        "lh-1.2": "1.2",
        "lh-1.4": "1.4",
        "lh-1.6": "1.6",
        "lh-30": "30px",
        "lh-40": "40px",
      },
      borderRadius: {
        5: "5px",
        30: "30px",
      },
      maxWidth: {
        540: "540px",
        720: "720px",
        960: "960px",
        1140: "1140px",
        700: "700px",
        "40prcent": "40%",
      },
      spacing: {
        1: "1px",
        7: "7px",
        8: "8px",
        10: "10px",
        12: "12px",
        13: "13px",
        15: "15px",
        16: "16px",
        20: "20px",
        22: "22px",
        24: "24px",
        25: "25px",
        26: "26px",
        30: "30px",
        35: "35px",
        40: "40px",
        45: "45px",
        48: "48px",
        50: "50px",
        55: "55px",
        60: "60px",
        70: "70px",
        85: "85px",
        230: "230px",
      },
      blur: {
        "4xl": "96px",
        "5xl": "128px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "skin-glow": "0 18px 70px -28px var(--skin-shadow-color, rgba(59, 130, 246, 0.45))",
        "skin-card": "0 14px 40px -18px var(--skin-shadow-color, rgba(59, 130, 246, 0.45))",
      },
      animation: {
        "aurora-slow": "aurora-1 32s infinite alternate ease-in-out",
        "aurora-medium": "aurora-2 24s infinite alternate ease-in-out",
      },
      keyframes: {
        "aurora-1": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "33%": { transform: "translate3d(36px, -56px, 0) scale(1.18)" },
          "66%": { transform: "translate3d(-28px, 24px, 0) scale(0.92)" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1.12)" },
          "50%": { transform: "translate3d(-48px, 42px, 0) scale(0.88)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
