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

The background soundtrack is `public/assets/music/Odysseus.m4a`. It starts when a guest opens the invitation with the heart button and can be paused or resumed with the music control. The skip button opens the invitation without starting audio.

Personalized links support these optional parameters:

```text
/?male=Рамиль
/?female=Айдана
/?friends=Айдана&Артем
/?female=Aidana&lang=en
```

## Verify

```bash
npm run lint
npm run build
```
