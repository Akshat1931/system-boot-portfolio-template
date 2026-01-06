export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050608",
        panel: "#0b0d10",
        line: "rgba(255,255,255,0.08)",
        glow: "#6ee7ff",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
}
