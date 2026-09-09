# Before the Final Cut — Farewell 2026

Implemented in this build:
- Cinematic opening screen
- Main invitation section
- Personalized ticket generator using guest name + uploaded photo
- Generated ticket ID and visual QR placeholder
- Print / Save PDF ticket action
- 2022–2026 story timeline
- Before the Clock Strikes message form
- Browser-local Time Capsule using localStorage
- Credits finale

Run locally:

```bash
npm install
npm run dev
```

Replace these placeholders before launch:
- Venue in `src/Invitation.jsx`
- Sample cast data in `src/CastAndMemory.jsx`

Current demo behavior:
- Uploaded ticket photos are not sent to a server; they stay in the browser session.
- Time Capsule entries are stored only in that browser via localStorage.
- The QR on the ticket is currently a visual placeholder. Real unique QR verification should be connected to a backend/database before the event.
- The invitation has been redesigned as a richer cinematic premiere-style card with gold framing, film-strip details, a seal, and burgundy accents.
- Chapter numbering now flows as Chapter I — The Story, Chapter II — Before the Clock Strikes, Chapter III — The Time Capsule.
