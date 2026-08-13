# Wedding invitation

A bilingual, mobile-first wedding invitation inspired by the Safini invitation frontend. It includes a cover reveal, photo marquee, countdown, event details, map and Telegram links, dress-code guidance, and personalized guest links.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

## Customize the invitation

All names, dates, times, venue information, links, and Russian/English copy live in `app/invitation-content.ts`.

Replace the sample images in `public/inv/` while keeping the existing filenames, or update their paths in `app/Invitation.tsx`.

Personalized links support these optional parameters:

```text
/?name=Aidana&lang=ru
/?name=John&lang=en
```

## Verify

```bash
npm run lint
npm run build
```
