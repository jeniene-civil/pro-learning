# Pro Learning - Civil Engineering Education Platform

A modern educational platform for civil and structural engineers, built with Next.js.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Internationalization**: next-intl (English & French)
- **Icons**: Lucide React

## Features

- 🏗️ Homepage with hero, stats, categories, popular courses
- 📚 Course catalog with search and filters
- 📖 Course detail pages with curriculum
- 👤 Student dashboard
- 💳 Pricing & subscription plans
- 🔐 Authentication (Login/Register)
- 🖥️ Software Training Hub
- 🌐 Bilingual (English / French)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
```

## Project Structure

```
src/
  app/[locale]/     # Route pages by locale
  components/       # Reusable UI components
  i18n/             # Internationalization config
messages/           # Translation files (en.json, fr.json)
```

## Deployment

The static export can be deployed to GitHub Pages. For full functionality (auth, payments, database), a backend server is required.
