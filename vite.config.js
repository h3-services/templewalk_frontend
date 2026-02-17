import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/DFW/",
    server: {
        proxy: {
            '/api': {
                target: 'http://72.61.250.191:8002',
                changeOrigin: true,
                secure: false,
            },
        },
    },
})
