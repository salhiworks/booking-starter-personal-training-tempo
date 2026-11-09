# Make this starter yours — the Claude Code prompt

Fill in the four lines at the top, then paste the whole prompt into a Claude Code
session opened in this folder. It changes identity and words only, so it finishes in
one short session.

```text
Customize this personal training studio starter for my business.

Studio name: <YOUR STUDIO NAME>
City and area: <CITY, AREA>
Time zone (IANA): <e.g. America/Chicago>
How we coach, who we train, and our personality in a few words: <e.g. strength for beginners and over-40s, calm and patient>

Follow CLAUDE.md (already loaded in this session — no need to open it again).
Open and change only these files; don't explore the rest of the project:
1. src/site.config.ts — name, timezone, and fictional previewContact details in my city.
2. index.html and admin/index.html — the studio name, city and description in <title>,
   the meta description and the og tags.
3. src/content/site.ts — rewrite every DEFAULT text for my studio: the name mark
   (brand.wordmark — one short word), the line above the headline, headline,
   introduction, the first-timer link, the hero caption, the coaching statement and
   principles, the sessions intro and group notes, the studio text and facts, the four
   training steps and their note, Good to know answers, the arriving note and the search
   title and description. Keep field ids, types, limits and photos. Keep the sample
   photos (they stay labelled "Sample" until I upload my own). Headlines may set one or
   two words leaning forward with *asterisks* — keep that style.
4. Only if burnt orange clearly doesn't fit my studio (otherwise skip this step and don't
   open these files): change the default of brand.accent in src/content/site.ts (a deep,
   saturated colour — brick, cobalt, deep green, plum), the light-mode colour in
   src/admin-theme.css and the small plate in public/favicon.svg, keeping white text at
   4.5:1 on it.

Do not change the layout, the booking flow, src/lib/engine.ts, src/lib/preset.ts,
src/lib/services.ts, src/demo/, supabase/, booking-engine.lock.json or package.json.
Do not invent sessions, prices, opening hours, coaches' names, qualifications or
certifications, awards, reviews, testimonials, results, before-and-after claims or
health promises I have not given — sessions, prices and hours are set in the dashboard.
When done, run npm run build and fix any error, then show me the result with npm run dev.
```

## After the prompt

- **Your sessions:** dashboard → Services. The page puts each session in a group by the
  words in its name — *consultation / assessment / intro / first session / taster /
  trial* → **Start here**; *mobility / recovery / stretch / flexibility / breathing* →
  **Mobility & recovery**; *training / coaching / strength / performance / partner /
  conditioning / lifting* → **Strength training** (checked in that order). If you rename
  a session to something without those words ("The Hour"), its description decides
  instead; anything else appears under "More sessions". The "New here?" link on the
  first screen opens the booking on the first session in **Start here**.
- **Who a session suits:** end its description with `Suits:` and the items separated by
  `·` — for example `Suits: first-time lifters · coming back after a break`. The page and
  the booking show them as a short line.
- **Your photographs:** dashboard → Website → Welcome (one upright photo), How we coach
  (upright), Sessions (one wide photo per group), The studio (a wide photo of the room and
  an upright detail), How training works (upright). Remove a photo to show the section
  without it. Each stays labelled "Sample" until you replace it; show your own studio.
- **Coaches:** add names, backgrounds and qualifications in your own words — for example
  in *The studio* text or the facts list. Only state what you can show.
- Connect real bookings: README.md, step 3.
