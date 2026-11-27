/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#197fe6",
        "primary-hover": "#3a92ec",
        "prompt": "#4ade80",
        "background-light": "#f6f7f8",
        "background-dark": "#111921",
        "console-bg": "#0d1117",
        "console-raised": "#161b22",
        "console-border": "#30363d",
        "console-text": "#c9d1d9",
        // Texto secundario: 6.2:1 sobre console-bg (gray-500 no llegaba a 4.5:1)
        "console-muted": "#8b949e",
      },
      fontFamily: {
        // Voz humana: nombres, títulos, párrafos
        "display": ["Space Grotesk", "system-ui", "sans-serif"],
        "sans": ["Space Grotesk", "system-ui", "sans-serif"],
        // Voz de máquina: comandos, prompts, rutas, código, datos
        "mono": ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
}
