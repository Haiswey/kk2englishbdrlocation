# KK2 English BDR Location

Scheduled location sharing for a school panel. This is the portable Next.js version for Vercel. It does not rely on ChatGPT Sites or Cloudflare D1.

## Setup

1. Import this repository into Vercel as a Next.js project.
2. Connect a Neon Postgres database through Vercel Marketplace.
3. Configure `DATABASE_URL`, `SITE_PASSWORD` (shared teacher access password), and `ADMIN_KEY` (separate administrator password), and `TEACHER_NAMES` (teacher names separated by `|`) in Vercel's environment settings. Never commit their values. Set them for each environment you intend to use.
4. Run `npm ci`, then `DATABASE_URL=... npm run db:setup` in a trusted local terminal, supplying the database URL through your environment rather than pasting it into shared logs. The setup only creates the table and index if missing.
5. Deploy. The page fails closed until SITE_PASSWORD is configured. Database errors are displayed without exposing credentials.

Teachers open the site, enter any username and the shared SITE_PASSWORD at the browser prompt, choose their name, allow location access, and enable scheduled sharing. The panel dashboard additionally requires ADMIN_KEY. Do not give teachers the administrator password.

## Schedule and limitations

Malaysia time (UTC+8), 20–23 October 2026: 09:00–09:15 and 14:30–14:45. The schedule is enforced on the server as well as the page. Change both app/page.tsx and app/api/checkin/route.ts to extend it.

Sharing requires a visible page, awake device, network and granted browser permission. A closed page cannot start itself. Names are self-selected, not identity-verified. GPS accuracy varies. A reading is not proof of a full session or physical attendance. Use your school's approved handling and retention arrangements for location records.

Existing ChatGPT Sites records are not migrated automatically. Teacher names, passwords and location records are never stored in this repository. Teacher names are loaded from a password-protected server endpoint.

## Development

`npm ci`, `npm run dev`; validate with `npm run check` and `npm run build`.
