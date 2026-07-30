# Gandalf Day — LOTR Extended Edition Marathon

A one-page site for a *Lord of the Rings* Extended Edition marathon on **24 October 2026**,
the day Gandalf tells Frodo it is "ten o'clock in the morning on October the 24th".

Live at **https://lotr.rolf.bible**

## Why 08:35:38

That line lands at `01:24:19,684` into the Extended Edition of *The Fellowship of the Ring*.
Start the film at 08:35:38 and Gandalf says it at 09:59:57 — near enough to ten o'clock that
the room will notice. The countdown on the page targets exactly that moment.

## What's on the page

| Section | What it does |
|---|---|
| Hero | Ink portrait of Gandalf, lit from behind |
| Aftellen | Live countdown to 08:35:38, with flavour text that changes as it shrinks |
| Palantír | Rotating Gandalf quotes, Dutch + English original |
| Schema | The full day. On 24 October it goes live: current item highlighted with a progress bar |
| Het Gezelschap | The nine walkers; click one to trace their route |
| Kaart | Hand-built SVG map of Middle-earth; routes draw themselves. Film blocks in the schedule link through to the stretch of road they cover |
| Bakens | The beacons of Gondor, lit in sequence |
| Praktisch | House rules and an `.ics` download of the whole day |

Easter eggs: type `mellon`, `precious` or `balrog`; click the One Ring; the Konami code.

## Stack

Static — `index.html`, `style.css`, `app.js`, `gandalf.svg`. No build step, no dependencies.
Fonts come from Google Fonts; everything else is self-contained.

All schedule data lives in the `SCHEDULE` array at the top of `app.js`. Times are pinned to
`+02:00` (the Netherlands is still on CEST on 24 October 2026), so the countdown is correct
regardless of the visitor's own timezone.

## Deploying

`deploy.sh` runs every 5 minutes from cron, pulls `main`, and rsyncs to
`/var/www/lotr.rolf.bible/html`. Push to `main` and it's live within 5 minutes.

## Credits

The Gandalf portrait is [*Gandalf's drawing*](https://freesvg.org/gandalfs-drawing) via
Openclipart / freesvg.org, released into the public domain (CC0). Recoloured and optimised;
the artist's signature is left intact.

Everything else — the map, the Ring, the Doors of Durin, the Balrog, the beacons — is drawn
in SVG/CSS for this page.
