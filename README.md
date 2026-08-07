# The Lord of the Rings — Extended Edition Marathon

A one-page site for a *Lord of the Rings* Extended Edition marathon on **24 October 2026**.

Live at **https://lotr.rolf.bible**

## ⚠️ Spoiler — do not share this file with guests

The start time is **08:35:38** for a reason. The "ten o'clock in the morning on October the 24th"
line lands at `01:24:19,684` into the Extended Edition of *The Fellowship of the Ring*. Starting
then puts Gandalf's line at 09:59:57 on 24 October — near enough to ten o'clock that the room
will notice.

**The site deliberately never mentions this.** It's meant to land as a surprise on the day, so
the page shows 08:35:38 as a bare, unexplained start time and says nothing about the date's
significance. Keep it that way when editing copy.

## What's on the page

| Section | What it does |
|---|---|
| Hero | The One Ring, lit from behind |
| Aftellen | Live countdown to 08:35:38, with flavour text that changes as it shrinks |
| Palantír | Rotating Gandalf quotes — English, with a small Dutch translation beneath |
| Schema | The full day. On 24 October it goes live: current item highlighted with a progress bar |
| Het Gezelschap | The nine walkers; tap one to trace their route |
| Kaart | Hand-built SVG map of Middle-earth; routes draw themselves. Film blocks in the schedule link through to the stretch of road they cover |
| Bakens | The beacons of Gondor, lit in sequence |
| Praktisch | House rules and an `.ics` download of the whole day |

Easter eggs: type `mellon` or `precious`; tap the One Ring. (The typed ones are keyboard-only,
so they're effectively desktop-only — the Ring is the one that works on a phone.)

## Language

Interface copy is Dutch. Film titles, character and place names, meal names, and **all quoted
film lines** stay English, with a small Dutch translation underneath where there is room.

## Stack

Static — `index.html`, `style.css`, `app.js`. No build step, no dependencies, no images.
Everything is drawn in SVG/CSS. Fonts come from Google Fonts.

The CSS is written **mobile-first**: base rules target a phone, `min-width` queries add back
the room a larger screen buys.

All schedule data lives in the `SCHEDULE` array at the top of `app.js`. Times are pinned to
`+02:00` (the Netherlands is still on CEST on 24 October 2026), so the countdown is correct
regardless of the visitor's own timezone.

## Deploying

`deploy.sh` runs every 5 minutes from cron, pulls `main`, and rsyncs to
`/var/www/lotr.rolf.bible/html`. Push to `main` and it's live within 5 minutes.
