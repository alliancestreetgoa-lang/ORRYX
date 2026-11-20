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
index.html          the home page
management-consultancy/ strategy-advisory/ financial-consultancy/ business-brokerage/
                    one index.html each: the four service pages (added 20 Nov 2026)
js/page.js          lighter motion script used only by the service pages
css/style.css       all styles (later "v6…v18" blocks at the bottom override earlier rules)
js/main.js          all motion and behaviour
vendor/             GSAP 3.12.5, ScrollTrigger, Lenis 1.1.14 (local copies)
assets/img/         hero, management, strategy, finance, brokerage, dubai (.webp), logo-t.webp, mark.webp,
                    logo-full.png, og.jpg (share image), favicon-64.png, apple-touch-icon.png
assets/src/         original full-size .jpg / .png files (not used by the pages; keep for re-export)
robots.txt          welcomes search and AI crawlers, points to the sitemap
sitemap.xml         the one page URL
llms.txt            plain-text company summary for AI assistants
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
10. **07 Questions** — six plain questions and answers (added 20 Nov 2026 for search and AI assistants).
11. **08 Enquire** — enquiry form.
12. **Footer** — logo, company details, large ORRYX wordmark.

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
- Live site checked on phone (390×844), tablet (768×1024) and tablet landscape (1024×768) on 19 Nov 2026 after all changes: no problems found.

## Search and AI visibility (SEO / GEO) — added 20 November 2026

What was added:

- `index.html` head: shorter title, canonical link, Open Graph and Twitter share tags, small favicon and Apple icon, and one JSON-LD block (ProfessionalService + WebSite + FAQPage).
- A visible **Questions** section (`#questions`). The FAQPage data in the head repeats these six answers word for word.
- `robots.txt`, `sitemap.xml`, `llms.txt` in the site root.
- `assets/img/og.jpg` (1200×630 share image), `favicon-64.png`, `apple-touch-icon.png`.
- Method and Brokerage card headings changed from `h4` to `h3` (same look) so heading levels are in order.

Rules to keep:

- **The same fact lives in several places.** If a licence date, the address, the manager or an activity changes, update: the page text, the Questions section, the JSON-LD block in the head, and `llms.txt`.
- The Questions answers and the FAQPage JSON-LD must stay identical.
- Only state facts the client has given. No invented phone, email, awards, clients or reviews.
- The site says commodity trading is not on the current licence. Remove that answer (page, JSON-LD, llms.txt) if the licence changes.

When a custom domain arrives:

- Replace `https://alliancestreetgoa-lang.github.io/ORRYX/` everywhere: canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD, `robots.txt`, `sitemap.xml`, `llms.txt`.
- On the github.io address the site sits in a sub-folder, so crawlers do not read its `robots.txt` or `llms.txt` (they only look at the root of a host). Nothing is blocked, but these files only take full effect on the company's own domain.
- Then add the site to Google Search Console and Bing Webmaster Tools and submit the sitemap.

Still to do (needs the client): company email and phone (then add them to the page, JSON-LD and llms.txt), a Google Business Profile, a LinkedIn company page, and a domain.

## Service pages and lighter images — added 20 November 2026

- **Four service pages**, one folder each, same liquid-glass style: header with image, what it covers, when it fits, how it works, licence details, three questions, links to the other three activities. Each has its own title, description, canonical link and JSON-LD (Service + BreadcrumbList + FAQPage).
- They are plain HTML files; edit them by hand. They share `css/style.css` (the "v21" block at the bottom) and use `js/page.js`, not `main.js`.
- Home page links to them from: the four Licensed Activities panel titles, the Activity Mix tiles, and the footer Activities list. The panel layout and glide animation were not changed.
- The "what it covers" explanations and "signs it is time to talk" lists are our own wording. Client should confirm them, like the rest of the descriptive text.
- **Images** are now WebP: about 1.9 MB of scene images and logos went down to about 0.67 MB. To replace an image, export a new `.webp` from the original in `assets/src/` (scene panels 1400 px wide, hero and dubai 1672 px, quality about 78–82).
- Facts are now repeated on the service pages too: when a licence fact changes, also check the four service pages (page text and their JSON-LD).
- New pages must be added to `sitemap.xml` and to "Key pages" in `llms.txt`.

## Phone layout fixes — 20 November 2026 (CSS "v22" block)

- **Hero on phones (up to 560 px wide, portrait):** the oryx is sized by screen width (`--hh: min(70vw, 42svh)`), starts below the menu bar so the horn tips show, and the text starts below its feet. The small top line no longer sits across the legs. On phones that line drops "· Licence 2538901.01" so it stays on one line, and the intro paragraph shows in full (no "…").
- On short phone screens the stats bar sits just below the first screen; the oryx, headline, intro and buttons are in the first screen. Tablets keep the earlier one-screen rule.
- **Brokerage diagram:** more space between Seller, the ORRYX circle and Buyer.
- **Dubai section:** less empty sky above the heading (padding-top 34vh instead of 46vh).
- Checked at 390×844, 390×664 and 360×640, home page and a service page: no sideways scroll.
