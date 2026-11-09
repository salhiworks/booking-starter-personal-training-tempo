# Photographs

Nine free photographs from Pexels, downloaded into the project (never hot-linked),
cropped for their one use, given one shared light grade and exported as AVIF + WebP at
three widths by the Tempo photo pipeline. **This starter ships only those processed
frames** — the original downloads and the pipeline script stay with the Niche Pack
workspace (`concepts/personal-training-tempo/photo-pipeline/photos.mjs`), so the
repository never redistributes an unaltered copy. No image-generation tool was used.

**One coaching session, one room.** Seven of the nine frames come from a single shoot by
Anna Shvets: the same coach and the same client, a beginner-friendly one-to-one session
in a white daylight studio with black steel shelving and plywood boxes — a step-up with a
knee drive (upright, and from the side for phones), a hands-on correction, a conversation on the mat, banded knee drives, a coached
foam-roller roll-out by tall windows. The two studio photographs (an empty wall-bar room by
MART PRODUCTION, a dumbbell rack by Anete Lusina) were chosen for the same high-key light,
pale floor and black steel. The grade is shared (saturation × 0.93, slightly firmer blacks);
nothing is retouched.

They are the website's **defaults** (`src/content/site.ts`): the owner replaces each one in
the dashboard (Website). **They are sample imagery, not Ballast's coaches, clients or
space** (Ballast is fictional): the people in them did not train at the studio, are not its
staff or clients, are not named, and nothing implies results. Every section photo carries a
**"Sample"** label until the owner replaces it, and in the Live Demo and preview the studio
section says the room, the people and the photographs are licensed stock images.

People are identifiable in seven frames. The Pexels License allows this use but forbids
implying that a person endorses a business or showing them in a bad light: the Sample labels
and the copy keep them as illustrations, alt texts only describe what is in the frame, and no
before/after, body-shape or medical claim is made around them. The coach wears small maker
logos on her clothing (a training brand's mark, legible only when enlarged); they are not
retouched and nothing on the page refers to them.

| Use (content field) | Files (`public/photos/`) | Source page | Photographer | Licence |
|---|---|---|---|---|
| First screen — a coach stays close as a client steps up with a knee drive, whole frame (`hero.photo`) | `hero-stepup-{800,1200,1600}` | https://www.pexels.com/photo/a-fitness-coach-supervising-an-exercising-elderly-woman-4587383/ | Anna Shvets ([@shvetsa](https://www.pexels.com/@shvetsa/)) | Pexels License |
| First screen on phones — the same step-up from the side, both people head to foot (art-directed crop of the default only) | `hero-wide-{480,800,1200}` | https://www.pexels.com/photo/an-elderly-woman-exercising-under-the-watch-of-a-fitness-coach-4587384/ | Anna Shvets | Pexels License |
| How we coach — hands on the shoulder blades during a dumbbell hold (`approach.photo`) | `coach-hands-{480,800,1200}` | https://www.pexels.com/photo/women-working-out-together-4587354/ | Anna Shvets | Pexels License |
| Sessions · Start here — coach and client talking on the mat (`services.photoStart`) | `group-start-{800,1200,1600}` | https://www.pexels.com/photo/women-having-a-conversation-while-sitting-on-a-yoga-mat-4587412/ | Anna Shvets | Pexels License |
| Sessions · Strength training — banded knee drive, coach mirroring (`services.photoStrength`) | `group-strength-{800,1200,1600}` | https://www.pexels.com/photo/woman-having-training-session-in-the-gym-4587427/ | Anna Shvets | Pexels License |
| Sessions · Mobility & recovery — a coached foam-roller roll-out (`services.photoMobility`) | `group-mobility-{800,1200,1600}` | https://www.pexels.com/photo/a-trainer-watching-her-client-use-a-foam-roller-4587694/ | Anna Shvets | Pexels License |
| How training works — coach and client by tall windows (`experience.photo`) | `window-session-{480,800,1200}` | https://www.pexels.com/photo/exercising-on-roller-4587699/ | Anna Shvets | Pexels License |
| The studio — an empty, bright room with wall bars (`studio.photoRoom`) | `studio-room-{800,1200,1600}` | https://www.pexels.com/photo/an-empty-room-7318661/ | MART PRODUCTION ([@mart-production](https://www.pexels.com/@mart-production/)) | Pexels License |
| The studio — hex dumbbells on a steel rack (`studio.photoDetail`) | `studio-rack-{480,800,1200}` | https://www.pexels.com/photo/gym-body-building-equipment-16513601/ | Anete Lusina ([@anete-lusina](https://www.pexels.com/@anete-lusina/)) | Pexels License |

Downloaded 2026-11-09 at 3200 px wide; licence checked the same day on each photo page.

## Crops

Fractions of the original (`photo-pipeline/photos.mjs`): the first screen kept whole (2:3) — the
desktop column shows it head to foot with the box, lightly cropped at 30 % from the top; on
phones (below 960 px) the default is swapped for a 5:4 crop of the side view of the same step-up
(`hero-wide`, from 7.5 % across), because a wide, short frame cut from the upright photo showed
only heads and shoulders. An owner's own first-screen photo is used as it is on every screen; *How we coach* and
*How training works* 4:5 from 8–10 % down; the three group photos and the room at their full
3:2; the rack 4:5 from 20 % across.

## Considered and not used

- A newer, coherent coaching series in an industrial box gym (Vitaly Gariev, Pexels and
  Unsplash) — authentic, but frames from video, soft at large sizes, and a CrossFit-box look
  rather than a private studio.
- A warm brick-and-timber studio series (Pavel Danilyuk) — mostly group classes.
- A rowing-machine coaching series with a plus-size client (brick, wood floor) — strong and
  inclusive, but one machine only and a commercial-gym setting.
- A terracotta wall-bar TRX series — beautiful colour, but solo exercise with no coaching.
- Bodybuilder portraits, neon or dark "hardcore gym" frames, before/after imagery and
  anything with readable gym branding — off-brief.

## Replacing them

Upload your own photographs in the dashboard → Website (each field says the shape it is shown
in). To change a *default* instead, add your own variants to `public/photos/`, point the field's
`default.src` in `src/content/site.ts` at a key of `src/content/photoVariants.ts`, and update
this file. If the first-screen default changes, update the preload in `index.html`.
