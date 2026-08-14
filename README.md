# Wedding invitation

A bilingual, mobile-first Next.js wedding invitation. It includes a cover reveal, photo marquee, countdown, event details, map and Telegram links, dress-code guidance, background music, and personalized guest links.

## Run locally

Requires Node.js 22.

```bash
npm install
npm run dev
```

## Customize the invitation

All names, dates, times, venue information, links, and Russian/English copy live in `app/invitation-content.ts`.

Replace the sample images in `public/inv/` while keeping the existing filenames, or update their paths in `app/Invitation.tsx`.

The background soundtrack is `public/assets/music/Odysseus.m4a`. It starts from the guest's heart-button interaction, which is the reliable cross-browser way to begin audible playback. It can be paused or resumed with the music control.

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
npm test
npm run build
```

## Deploy to Vercel

Import the repository using the Next.js framework preset. Keep the root directory, build command, output directory, and install command at their defaults. No environment variables are required.
