import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss()
    ],
    optimizeDeps: {
      include: ["sweetalert2"],
    },
    server: {
       proxy: mode === "development" ? {
        "/api": {
           target: "http://localhost:3000",
           changeOrigin: true,
           secure: false
        }
       } : {}
    }
  }
})


