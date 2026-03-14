# StayKorčula

A modern vacation rental and tourism platform for Korčula Island, built with Next.js 14, React, TypeScript, and TailwindCSS.

## Features

- **Multi-language support** (Croatian/English) with i18n
- **Accommodations** – Property listings with detailed pages
- **Services** – Boat rentals, taxi, airport transfers, speedboat tours
- **Contact form** – Resend-powered email delivery
- **SEO** – Dynamic metadata, JSON-LD schemas, sitemap, robots.txt
- **Responsive design** – Mobile-first with TailwindCSS

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS, Framer Motion
- **Forms:** React Hook Form, Zod validation
- **Email:** Resend API

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Nikola-Separovic/StayKorcula.git
cd StayKorcula

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your RESEND_API_KEY and TO_EMAIL
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

### Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run start`| Start production server  |
| `npm run lint` | Run ESLint               |
| `npm run type-check` | TypeScript check  |

## Project Structure

```
app/
├── [locale]/           # Locale-based routing (hr, en)
│   ├── (site)/         # Main site pages
│   │   ├── accommodations/  # Property listings
│   │   ├── services/         # Service pages
│   │   └── page.tsx         # Home page
│   ├── components/     # Reusable components
│   ├── data/           # Property & service data
│   └── lib/            # Utilities, i18n, SEO
├── api/                # API routes (contact form)
├── layout.tsx          # Root layout
├── sitemap.ts          # Dynamic sitemap
└── robots.ts           # robots.txt
```

## Environment Variables

See `.env.example` for required variables. Key ones:

- `RESEND_API_KEY` – Resend API key for contact form
- `TO_EMAIL` – Recipient for form submissions

## License

Private – All rights reserved.
