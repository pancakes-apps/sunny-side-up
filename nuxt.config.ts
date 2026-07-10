import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: ['./app/assets/css/main.css'],
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
    modules: [
        // ...
        '@pinia/nuxt',
    ],
    app: {
        head: {
            title: 'Sunny Side Up',
                link: [
                    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap' },
                ]
            }
    }
})
