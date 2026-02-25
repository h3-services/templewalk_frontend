import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        base: mode === 'production' ? "/templewalk_frontend_admin/" : "/",
        server: {
            proxy: {
                '/api': {
                    target: env.VITE_API_BASE_URL || 'https://hope3services.cloud',
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    }
})
