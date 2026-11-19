# Orryx Commodities L.L.C-FZ — Website

Motion-graphic, infographic-style one-page website for the client Orryx Commodities L.L.C-FZ.

- **Live site:** https://alliancestreetgoa-lang.github.io/ORRYX/
- **Repo:** https://github.com/alliancestreetgoa-lang/ORRYX (public; push to `main` = deploy via GitHub Pages)
- **Local folder:** `~/orryx-commodities`
- **Local preview:** `cd ~/orryx-commodities && python3 -m http.server 5290` → http://localhost:5290/
- **Built:** 19 November 2026

## The client (from the licence documents)

| Item | Detail |
|---|---|
| Company | Orryx Commodities L.L.C-FZ (اوريكس كوموديتيز ش.ذ.م.م - منطقة حرة) |
| Free zone | Meydan Free Zone, Dubai, U.A.E. |
| Licence number | 2538901.01 |
| Formation number | 2538901 |
| Company type | Limited Liability Company |
| Manager | Stallone Dominic Shaikh |
| Issue date | 17/10/2025 |
| Expiry date | 16/10/2027 |
| Address | Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E. |

### Licensed activities

| Code | Activity | Source document |
|---|---|---|
| 7020.00 | Management consultancy activities | Business Licence |
| 7020.11 | Strategy advisory services | Business Licence |
| 7490.02 | Business brokerage — arranging the purchase and sale of small and medium sized businesses, including professional practices, not including real estate brokerage | Business Licence |
| 6619.14 | Financial consultancy | Activity Authorisation Request (issued 18/11/2026, expiry 16/10/2027) |

Source PDFs: `Business_License_-_New_179500777138.pdf` and `Activity Authorisation Document 26 - 27.pdf` (were in `~/Downloads`).

**Content rules**

- Do not claim commodity trading — it is not on the licence, despite the company name.
- Brokerage wording must keep "not real estate brokerage".
- The licence says: "Relevant authorities' approval must be obtained prior to conducting applicable business activities." This line is on the site.
- The financial consultancy document is headed "Activity Authorisation Request" and says the company "seeks authorization". The site labels it "Activity authorisation issued 18·11·2026". Confirm with the client that it is approved.
- Activity descriptions, the five-step method and the Activity Mix questions are our own wording, not from the documents. Client should confirm them.

## Files

```
index.html          the whole page
css/style.css       all styles (later "v6…v18" blocks at the bottom override earlier rules)
js/main.js          all motion and behaviour
vendor/             GSAP 3.12.5, ScrollTrigger, Lenis 1.1.14 (local copies)
assets/img/         hero, management, strategy, finance, brokerage, dubai (.jpg)
                    logo-full.png (original), logo-t.png and mark.png (transparent)
.nojekyll           needed for GitHub Pages
```

No build step. Plain HTML, CSS and JavaScript.

## Design

- **Style:** liquid glass (blurred translucent cards with a light edge and a spotlight that follows the mouse).
- **Three deep colours:** emerald `#063b2d`, sapphire `#0a1b52`, wine `#4d0e26`, with gold `#e6bd6a` as the accent. The fixed background crossfades between the three as you scroll (`data-tone` on each section).
- **Typography:**
  - Newsreader — headlines
  - Hanken Grotesk — body, buttons, numbers, card headings
  - Red Hat Mono — small labels and activity codes
  - Noto Kufi Arabic — Arabic text
  - The first set (Bodoni Moda, Syne, Figtree, Martian Mono) was replaced because the owner wanted more readable, eye-friendly type.
- **Pointer:** normal arrow shape with a gold border. No ring follower.

## Sections (top to bottom)

1. **Loader** — logo mark and a 0–100% counter.
2. **Hero** — glass oryx image, headline "Clear counsel. Sharper strategy. Deals that close.", two buttons, four floating activity chips (desktop ≥1200px only), drifting gold dust, stats bar.
3. **Marquee** — the four activities scrolling sideways.
4. **01 Company** — who we are, live licence-validity ring (days remaining to 16/10/2027), formation number, company type, manager, and the Activity Mix card (orbit + four activity tiles).
5. **02 Licensed activities** — four image panels that glide sideways while the section is pinned (desktop); swipe on phones.
6. **03 Method** — five steps (Listen, Diagnose, Design, Deliver, Transact) on a line that draws with the scroll.
7. **04 Brokerage desk** — seller ↔ Orryx ↔ buyer diagram and three steps (Prepare, Match, Arrange).
8. **05 Dubai** — skyline image, registered address, Maps link.
9. **06 Credentials** — the licence line by line, English and Arabic.
10. **07 Enquire** — enquiry form.
11. **Footer** — logo, company details, large ORRYX wordmark.

## Responsive rules the owner asked for

- The whole oryx (horns, face, legs) must be visible in the hero at every screen size. The image scales by screen height and is right-aligned; it is not zoomed or cropped.
- The hero fits one screen (sizes use both width and height).
- The pinned Licensed Activities screen is exactly one screen tall so the panels are never cut at the bottom. The sideways glide animation itself must not be changed.
- The footer ORRYX wordmark must show all five letters in full.
- Tested sizes: 1920×1080, 1440×850, 1366×768, 1280×620, 1024×768, 768×1024, 390×844, 360×640.

## Images and logo

All six scene images and the logo were generated in ChatGPT in the Chrome profile "GOA" (account alliancestreetgoa, Plus plan), in one chat titled "Create Oryx Image". Shared style: liquid glass 3D render, deep emerald / midnight sapphire / burgundy wine, thin gold rim light, dark background, no text.

## How to change things

- **Enquiry email:** set `CONTACT_EMAIL` at the top of `js/main.js`. While it is empty the form shows a holding message.
- **After editing CSS or JS:** raise the `?v=` number on the `style.css` and `main.js` links in `index.html`, otherwise browsers show the cached old version.
- **Deploy:** `git push` to `main`. GitHub Pages republishes in about a minute.
- **Licence renewal:** the validity ring dates are in `js/main.js` (`start` and `end`); the dates also appear as text in `index.html`.

## Open items

- Company email, phone and domain are not known yet. The enquiry form is not connected.
- Client to confirm the financial consultancy authorisation status and our descriptive wording.
- No custom domain yet; the site is on the github.io address.
- Phone and tablet were not re-checked after the typography change, the Activity Mix update and the footer fix.
