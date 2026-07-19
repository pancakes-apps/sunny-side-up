import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: ['./app/assets/css/main.css'],
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
    modules: [
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@vite-pwa/nuxt',
    ],
    app: {
        head: {
            title: 'Sunny Side Up',
                link: [
                    { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
                    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap' },
                ]
            }
    },
    pwa: {
        manifest: {
          name: 'sunny-side-up',
          short_name: 'sunny-side-up',
          description: 'split your day into two sessions',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
            { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          ],
        },
    
        workbox: {
          globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}'],
        },
    
        // lets the SW work while you run `nuxt dev`
        devOptions: {
          enabled: false,
          type: 'module',
        },
    },
})
