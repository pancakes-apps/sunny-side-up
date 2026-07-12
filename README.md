# 🍳 Sunny Side Up

A simple app that helps you split your day into two sessions, with a timer and a to-do list to keep you on track. PWA support is already configured, so once you build and deploy it (or serve the production build), you can install it on your phone or desktop and use it like a native app.

Part of the [Pancakes](https://usepancakes.com) family — simple, focused apps, built with love and no funny business. 🥞

## Prerequisites

Before you start, make sure you have installed:

- **[Node.js](https://nodejs.org/)** version 18 or higher
- **[Bun](https://bun.sh/)** (the package manager used in this project)

To check if you already have them, run:

```bash
node -v
bun -v
```

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone git@github.com:pancakes-apps/sunny-side-up.git
   ```

2. **Move into the project folder**:

   ```bash
   cd sunny-side-up
   ```

3. **Install dependencies**:

   ```bash
   bun install
   ```

4. **Start the app** in development mode:

   ```bash
   bun run dev
   ```

5. **Open the app** in your browser at [http://localhost:3000](http://localhost:3000)

That's it — the app should now be running locally, and it will automatically reload whenever you make changes to the code.

## Other Useful Commands

- **Build for production**:

  ```bash
  bun run build
  ```

- **Preview the production build locally**:

  ```bash
  bun run preview
  ```

- **Generate a static version of the site**:

  ```bash
  bun run generate
  ```

## Project Structure

- `app/components/Timer` — the timer feature
- `app/components/ToDoList` — the to-do list feature
- `app/components/Layout` — shared layout pieces (header, footer, etc.)
- `app/stores` — Pinia stores for app state (persisted across sessions)
- `app/assets/css` — global styles

## Built With

- [Nuxt](https://nuxt.com/) — the Vue.js framework powering the app
- [Pinia](https://pinia.vuejs.org/) — state management
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Vite PWA](https://vite-pwa-org.netlify.app/) — makes the app installable and work offline

---

<p align="center">
  🥞 Made with ❤️ by <a href="https://usepancakes.com">Pancakes</a><br>
A stack of simple apps, built to help one pancake at a time.
</p>