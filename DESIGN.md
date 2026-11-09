# Tempo — the visual system

**Idea:** controlled strength. Coaches write the speed of a lift as four counts —
*lower · pause · lift · reset*, e.g. 3·1·1·1 — because strength is built in the slow,
controlled part of the movement, not in the noise around it. The site is built the same
way: a calm, bright private room (plaster walls, a concrete floor, black steel, plywood),
heavy upright type, and **one signal colour** for everything that moves — the buttons,
the words that *lean forward* in a headline, the booking band, and the long lowering
count of the **tempo line**, the site's one ornament. No black "gym" pages, no neon, no
motivational slogans, no muscle-model imagery: real coaching, in daylight.

Kept apart from the rest of the collection in composition, not only in colour: the other styles
share a left-aligned editorial skeleton (text-left/photo-right first screen, a side column of
session groups, a corner-overlapping studio photo, a four-step row, a two-column FAQ and booking
band). Tempo is built symmetrically on a central axis instead (see *Layout*). And in detail: no serif (Atelier, After Hours, Quiet Nordic,
Lacquer), no condensed price list (Cut List), no expanded type, graphite pages or light
lines (Clearcoat), no monospace edge print, paper or hand-drawn marks (Contact Sheet), no
arches, linen or poured colour fields. One sans family, set heavy with true italics.

Every raw value lives in `src/styles/tokens.css`. Other stylesheets use the tokens only.

## Colour

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--accent` (owner: *Signal colour*) | `#c2410c` burnt orange | Buttons, the lean in headlines, the booking band's ground, the tempo line's long count, section bars, the calendar selection, focus rings | white on it 5.2:1 (the editor checks any new colour against `#ffffff` at 4.5:1); on the page 4.6:1 (used for large headline words only) |
| `--accent-strong` | 84 % signal + black | The lean on concrete bands, hover states | 6:1 on concrete |
| `--accent-glow` | 55 % signal in pale peach | The signal on steel (footer plate, the sheet header's business name and tempo edge) | ≥ 7:1 on steel |
| `--paper` | `#f2f1ee` plaster | The page | — |
| `--raised` | `#fbfbfa` chalk white | Sessions band, inputs, the booking sheet, notes | — |
| `--oat` | `#e5e3de` concrete | The studio band, Good to know, the booking summary | muted text 5.5:1 |
| `--ink` / `--ink-soft` / `--muted` | `#121417` / `#2c3035` / `#565b62` | Text | 17 / 12.5 / 6.2:1 on the page |
| `--forest` (steel) | `#16191d` | The booking sheet's header, the footer | `--on-forest` 16:1 |
| `--ply` | `#d8c3a0` plywood | The short counts of the tempo edge on steel | — |
| `--clay` | `#a3261a` | Errors only, always with words | — |

Measured (rendered, Chromium, 1440 and 390 px, page + booking sheet,
`concepts/personal-training-tempo/contrast.mjs` in the Niche Pack workspace): lowest text
pair 4.58:1, none below 4.5. Note for owners: a signal colour that just passes 4.5:1 on white
reads ~4.1:1 on the plaster page — still well above the 3:1 large-text minimum for the
headline words it colours there.

## Type

- **Schibsted Grotesk** (variable 400–900 with true italics, OFL) for everything. Headlines
  800, −0.04em tracking, 0.92 leading; body 400 at 1.6. Small labels in 600 capitals with
  0.12em tracking.
- **The lean.** The owner's `*highlight*` in a headline is set in true italics in the signal
  colour — the words lean forward, like a body moving through a rep. White on the booking
  band, `--accent-strong` on concrete.
- **Figures.** Session lengths are set very large (up to 5rem, 800, tabular) as the lead of
  each session row; prices 700 tabular. Clock times keep proportional figures (Schibsted's
  tabular colon is wide).
- Heading style (owner): *Bold* (default), *Medium* (600), *Bold, no lean* (highlighted words
  upright, colour only).
- The name mark: Schibsted 800, tight, with a small **plate** — a weight plate seen edge-on —
  in the signal colour.

## Devices (each with a job)

- **The tempo line** (`Tempo.tsx`). Four segments in the proportions of a 3·1·1·1 tempo: the
  long lowering count in the signal colour, three short counts in steel. It fills once, left
  to right, with a slow-then-quick easing (a controlled rep). Under the first screen's facts;
  along the foot of the booking sheet's header (lifted signal + plywood on steel).
- **How training works as a tempo.** The four steps are four counts of one track: a 4 px
  segment above each step (a vertical thread on phones), the first in the signal colour,
  filling in sequence when the steps come on screen (`useSeen`). Numbered discs 1–4.
- **Section marks.** A short heavy bar in the signal colour (the load), the section number in
  ink and the name in small capitals: `▬ 02 SESSIONS`.
- **The stage rail.** On the sessions board each group stands on one rail: a dot, the stage
  number and a 4 px segment (the first in the signal colour, like the tempo line's long count).
- **"New here?"** Beside the main button on the first screen, an underlined link that opens the
  booking on the first session of *Start here* (found in engine data).

## Layout — the plumb line

The composition stands on **one vertical axis down the middle of the page** — the plumb line a
coach uses to stack a body over its centre of mass (and what ballast does for a hull). It is the
layout's own signature, independent of colour and photography:

- **Section openings.** Every section opens on the axis: a hairline drops from the section's top
  edge to its label, and the label, heading and introduction are centred under it.
- **The pillar.** A tall photograph standing on the axis, with content balanced either side of it.
  Used three times: the first screen (headline flush right, leaning into the photo; lede, Book
  button, first-timer link and facts on the right, low), *How we coach* (statement centred above;
  principles either side — 01 left, 02 right, 03 left…, left items set flush right toward the
  pillar) and *How training works* (the four steps around the pillar, each under its count of the
  tempo track; the left tracks fill toward the pillar). The photo is as tall as what stands beside
  it (with a minimum); without a photo the items fall back to even columns.
- **Sessions as a progression board.** The groups (Start here → Strength training → Mobility &
  recovery) stand side by side from 1024 px on one rail — a dot, the stage number and a rail segment
  each, the first segment in the signal colour — sharing rows (subgrid) so photos and first cards
  line up. Each session is a card led by its length in large figures. Two or four groups → two
  columns; one → a single centred column. Tablets and phones: the stages stack as a path down the page.
- **The studio**: the room wide (21:9 from 1024 px) with its detail photo standing on the axis over
  the room's lower edge; the text in a centred column; the facts in a row.
- **Good to know**: one centred column of disclosure rows. **Booking band**: centred, three steps,
  one steel button. **Visit**: centred heading, three columns. **Footer**: the name mark on the axis.
- Page width 86rem plus a fluid gutter (`clamp(1rem, 4.5vw, 4.5rem)`); one page, no routes.
- **Phones**: the photo first (wide and short, 5:4, ≤ 40 % of the screen height — for the default,
  an art-directed side view of the same step-up), then eyebrow, headline, the full-width button and
  the first-timer link centred on the axis (all on the first screen at 390×667 and 320×568), then
  the lede and facts. Short laptops (≤ 820 px tall) tighten the type so the first screen fits 1280×720.

## Booking sheet

Shared booking styles (`booking.css`) on the tokens: a chalk-white sheet over the page (60rem
from 960 px) with a steel header edged by the tempo line, the studio name in small capitals in
the lifted signal. Density is set by size, never by scaling: step headings `--text-step`, the
sheet title `--text-sheet`, 48 px inputs, 44 px day cells and time chips (the tap minimum),
compact field rhythm and a 17rem summary.
Session step: groups as on the page, each pick with its length and price and its *Suits* line.
Summary: session, length, price, date, time. Full-screen on phones with the pinned Continue /
submit bars clear of the chosen time and focused fields (`keepFieldClear`).

## Motion

160–420 ms UI transitions; the first screen's text rises in sequence; the hero photo rises into
its frame once (a clip from the bottom, like a bar leaving the floor); the tempo line and the
training track fill once. Everything has a `prefers-reduced-motion` path (no animation; the
lines are simply there).

## Accessibility

44 px tap targets everywhere; visible focus (the signal colour, white on the booking band,
light on steel); every Book link names its session for screen readers; durations are also
spoken in words; decorative numbers, bars and the tempo line are `aria-hidden`; the group
index gives each group's session count in words.
