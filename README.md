# Web App

A Next.js web application.

## Local Development

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   Copy `.env.example` to `.env.local` and fill in values for your own
   environment. The example file contains placeholders only — no real secrets.

   ```bash
   cp .env.example .env.local
   ```

3. **Generate the Prisma client**

   ```bash
   npx prisma generate
   ```

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   The app runs at http://localhost:3000.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build (`prisma generate && next build`)
- `npm run start` — start the production server
- `npm run lint` — lint
- `npm test` — run Jest tests
