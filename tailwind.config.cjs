/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        "detail-cover": "2.6 / 1",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        pv: {
          blue: {
            lighter: "#4499E3",
            light: "#3283CA",
            dark: "#144E84",
          },
          cyan: "#3283CA",
          green: "#70B268",
          red: "#EB4D2D",
          white: {
            pure: "#FFFFFF",
            second: "#FDFDFD",
            light: "#FAFAFA",
          },
          grey: {
            light1: "#F5F5F5",
            light2: "#F0F0F0",
            light3: "#D9D9D9",
            medium1: "#BFBFBF",
            medium2: "#8C8C8C",
            medium3: "#595959",
            dark1: "#434343",
            dark2: "#262626",
            dark3: "#1F1F1F",
          },
          orange: "#F68500",
        },
      },
    },
    fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/line-clamp"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    }),
    require("@tailwindcss/line-clamp"),
  ],
};
