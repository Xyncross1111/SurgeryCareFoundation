import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Colors ──────────────────────────────────────────────
      colors: {
        primary: {
          DEFAULT: "#014a62",
          deep: "#013547",
        },
        accent: {
          DEFAULT: "#0caf7b",
          mint: "#00eea3",
          green: "#4cb493",
        },
        slate: {
          DEFAULT: "#45556c",
          medium: "#62748e",
          light: "#90a1b9",
        },
        teal: {
          muted: "#8fb3c0",
        },
        surface: {
          green: "#ecfdf5",
          border: "#e2e8f0",
          subtle: "#f1f5f9",
          bg: "#f8fafc",
          page: "#fafafa",
        },
        placeholder: "rgba(29, 41, 61, 0.5)",
      },

      // ── Typography ──────────────────────────────────────────
      fontFamily: {
        sans: [
          "var(--font-inter)",
          '"Segoe UI"',
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      fontSize: {
        // Headings
        h1: ["88px", { lineHeight: "92.4px", letterSpacing: "-2.2px", fontWeight: "900" }],
        h2: ["60px", { lineHeight: "63px", letterSpacing: "-1.5px", fontWeight: "900" }],
        h3: ["36px", { lineHeight: "40px", letterSpacing: "-0.9px", fontWeight: "900" }],
        h4: ["24px", { lineHeight: "30px", fontWeight: "900" }],
        h5: ["20px", { lineHeight: "28px", letterSpacing: "0.5px", fontWeight: "900" }],
        // Body
        "body-lg": ["20px", { lineHeight: "32.5px", fontWeight: "500" }],
        body: ["16.8px", { lineHeight: "27.3px", fontWeight: "500" }],
        "body-sm": ["15.2px", { lineHeight: "22.8px", fontWeight: "700" }],
        // Controls
        "btn-lg": ["18px", { lineHeight: "28px", fontWeight: "900" }],
        btn: ["14px", { lineHeight: "20px", fontWeight: "700" }],
        label: ["12px", { lineHeight: "16px", letterSpacing: "1.2px", fontWeight: "700" }],
        caption: ["10.4px", { lineHeight: "10.4px", letterSpacing: "1.04px", fontWeight: "700" }],
        nav: ["15.2px", { lineHeight: "22.8px", fontWeight: "700" }],
      },

      // ── Layout ──────────────────────────────────────────────
      maxWidth: {
        container: "1408px",
      },

      // ── Radii ───────────────────────────────────────────────
      borderRadius: {
        image: "2.5rem",
        input: "1rem",
      },

      // ── Shadows ─────────────────────────────────────────────
      boxShadow: {
        cta: "0 8px 30px rgba(0, 238, 163, 0.25)",
        secondary: "0 10px 15px rgba(1, 74, 98, 0.2), 0 4px 6px rgba(1, 74, 98, 0.2)",
        card: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)",
        subtle: "0 4px 30px rgba(0, 0, 0, 0.02)",
        elevated: "0 20px 60px rgba(1, 74, 98, 0.15)",
        soft: "0 10px 30px rgba(0, 0, 0, 0.03)",
        pill: "0 4px 20px rgba(0, 0, 0, 0.1)",
      },

      // ── Gradients ───────────────────────────────────────────
      backgroundImage: {
        "cta-gradient": "linear-gradient(to bottom, #4cb493, #00eea3)",
        "footer-line":
          "linear-gradient(to right, transparent, rgba(76, 180, 147, 0.3), transparent)",
      },
    },
  },
  plugins: [],
};
export default config;
