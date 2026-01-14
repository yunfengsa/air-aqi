# Project Context: air-aqi

## Project Overview

`air-aqi` is a Next.js application designed to display Air Quality Index (AQI) information. It is built using modern web technologies including Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

**Key Technologies:**

*   **Framework:** [Next.js](https://nextjs.org/) (v16.1.1) with App Router
*   **UI Library:** [React](https://react.dev/) (v19.2.3)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4)
*   **Linting & Formatting:** [Biome](https://biomejs.dev/)

## Architecture

The project follows the standard Next.js App Router directory structure:

*   `src/app/`: Contains routes and pages.
    *   `api/aqi/`: Secure API route for client-side data fetching.
    *   `manifest.ts`: Generates the PWA web manifest.
*   `src/components/`: UI components.
    *   `AqiDashboard`: Main dashboard container.
    *   `PollutantDetailModal`: Interactive modal for detailed pollutant information.
    *   `ServiceWorkerRegister`: Handles PWA Service Worker registration.
*   `src/lib/`: Core logic and utilities.
    *   `aqi.ts`: API client, caching, and pollutant dictionary.
*   `public/`: Static assets.
    *   `sw.js`: Service Worker script for offline caching.
    *   `icon.svg`: App icon.

## Features

- **Real-time AQI Display**: Fetches data from WAQI API.
- **Auto-Refresh**: Polls data every 4 hours.
- **Secure Data Access**: Strict origin/referer validation for API.
- **Detailed Pollutant Encyclopedia**: Interactive cards with health advice.
- **Optimized Forecasts**: Filters past dates, responsive table/card layout.
- **PWA Support**: 
    - Installable on mobile devices (Android/iOS).
    - Offline-ready via Service Worker caching.
    - Custom App Icon and Theme Color.
- **Modern UI/UX**: Tailwind CSS v4, Dark Mode, Animations.

## Building and Running

**Environment Setup:**
Create a `.env.local` file:
```bash
AQI_API_TOKEN=4fb4c60da4c3197a4d8fcbbbb5ac79d3b07df5d
```

**Development:**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build && npm run start
```