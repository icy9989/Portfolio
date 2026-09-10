# Portfolio

Personal portfolio built with Next.js, TypeScript, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edit `app/page.tsx` to build the homepage,
`app/layout.tsx` for shared layout and metadata, and `app/globals.css` for global styles.

## Checks and production

```bash
npm run lint
npm run build
npm start
```

Run `npm start` after a successful production build.

## Prisma database connection

Set `DATABASE_URL` in a private `.env` file (see `.env.example`). Never commit credentials. Prisma CLI loads the same environment files as Next.js.

- `npm run db:generate` regenerates the Prisma client (also runs after install).
- `npm run db:validate` validates the schema.
- `npm run db:check` checks database access and the Project table without writing records.
- `npm run db:deploy` applies checked-in migrations to the configured database.
- `npm run db:seed` loads the projects in `prisma/seed.ts` into the configured database. Matching slugs are updated; new slugs are inserted and unrelated records remain. Seeding changes data, while migrations change the database structure.
- `npm run db:migrate -- --name change_name` creates migrations against a development database.

Server modules can import `prisma` from `@/lib/prisma`. The portfolio reads published Project records from PostgreSQL on each page request. Set `published` to true to display a record; refresh the page after editing in Prisma Studio.

## Contact email setup

The Contact form sends JSON to `POST /api/contact`. Email is sent by Resend on the server; messages are not stored in PostgreSQL.

1. Verify a sender domain in Resend and create a sending API key.
2. Set `EMAIL_API_KEY`, `CONTACT_EMAIL`, and `EMAIL_FROM` in your private `.env.local` or hosting environment (see `.env.example`). `EMAIL_FROM` must use the verified domain; `CONTACT_EMAIL` is your inbox. Never use `NEXT_PUBLIC_*` for these values.
3. Restart the application after changing environment variables. Submit a test message, check the recipient inbox, and verify that Reply targets the submitted visitor address.

The form clears only after the provider confirms acceptance. Acceptance does not guarantee inbox delivery; delivery/rejection details can be checked in Resend. Missing configuration or provider failures return a generic error and preserve the form.

Basic rate limiting allows 5 attempts per email and 30 total attempts per rolling 10 minutes per server process. Identical pending/recent submissions receive 429 with `Retry-After`. The limiter retains only expiring hashes/counters, resets on restart, and is not shared across replicas. Add a distributed/hosting-level limiter before relying on a global quota in a multi-instance deployment. Resend idempotency keys additionally deduplicate identical email payloads for 24 hours, including retries after an uncertain network result.

Provider reference: https://resend.com/docs/api-reference/emails/send-email

Run offline API tests with `node --import tsx --conditions=react-server --test scripts/contact-api.test.ts`. These mock the provider and send no real emails.
