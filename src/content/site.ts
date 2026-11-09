import { defineSiteContent } from '@profitstudio/booking-engine';

/**
 * What the owner may change in the dashboard (Website). The defaults are the
 * website's own copy and photos: until the owner publishes, the page shows
 * exactly these. Sessions, prices, durations, hours, the address, phone and
 * email are NOT here — they come from the engine.
 *
 * Never rename or reuse a field id once the site is live: the owner's text is
 * stored under it. Add a new id instead.
 *
 * This file is also imported by vite.config.ts (Node), so it imports nothing
 * local. Default photo `src` values are keys of src/content/photoVariants.ts.
 */
const LEAN_HELP = 'Wrap a few words in *asterisks* to set them leaning forward in your signal colour.';
const SAMPLE_HELP = 'A “Sample” label stays on it until you replace it with a photo of your own studio.';

export const siteContent = defineSiteContent({
  sections: [
    {
      id: 'brand',
      label: 'Brand',
      description: 'Your name mark or logo, the signal colour and the heading style.',
      fields: [
        {
          type: 'text',
          id: 'brand.wordmark',
          label: 'Name mark',
          help: 'The short name in the header and footer. One short word reads best.',
          default: 'Ballast',
          maxLength: 20,
          required: true,
        },
        {
          type: 'image',
          id: 'brand.logo',
          label: 'Logo',
          help: 'Optional. A wide, dark logo on a transparent background — the header is a light plaster grey. It replaces the name mark in the header.',
          default: null,
          aspectRatio: 4,
        },
        {
          type: 'color',
          id: 'brand.accent',
          label: 'Signal colour',
          help: 'The one strong colour: buttons, the leaning words in headlines, the booking band and the calendar. A deep, saturated colour — burnt orange, brick, cobalt, deep green — suits the design; white text must stay readable on it.',
          default: '#c2410c',
          contrastWith: '#ffffff',
          minContrast: 4.5,
        },
        {
          type: 'choice',
          id: 'brand.headings',
          label: 'Heading style',
          default: 'bold',
          options: [
            { value: 'bold', label: 'Bold', description: 'Heavy and confident — the original design.' },
            { value: 'medium', label: 'Medium', description: 'The same letters in a calmer weight.' },
            { value: 'upright', label: 'Bold, no lean', description: 'Highlighted words stay upright, in the signal colour only.' },
          ],
        },
      ],
    },
    {
      id: 'seo',
      label: 'Search & sharing',
      description: 'Search engines and link previews show new text after the website is next deployed.',
      fields: [
        {
          type: 'text',
          id: 'seo.title',
          label: 'Page title',
          help: 'Search engines and link previews show new text after the website is next deployed.',
          default: 'Ballast Strength Studio — private personal training in Fremont, Seattle',
          maxLength: 70,
          required: true,
        },
        {
          type: 'longText',
          id: 'seo.description',
          label: 'Page description',
          help: 'One or two sentences for search results. Updated after the next deploy.',
          default:
            'Private strength and movement coaching in Fremont, Seattle — one-to-one or with a training partner. Beginners welcome. See sessions and prices and book online.',
          maxLength: 180,
          rows: 3,
          required: true,
        },
      ],
    },
    {
      id: 'hero',
      label: 'Welcome',
      description: 'The first screen: the headline, the buttons and one photo of a coached session.',
      fields: [
        {
          type: 'text',
          id: 'hero.eyebrow',
          label: 'Small line above the headline',
          default: 'Private strength & movement studio · Fremont, Seattle',
          maxLength: 64,
        },
        { type: 'text', id: 'hero.title', label: 'Headline', help: LEAN_HELP, default: 'Strength, coached *one-to-one.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'hero.lede',
          label: 'Introduction',
          default:
            'Personal training in a quiet, private room: one coach, one private session, every rep coached. New to lifting or coming back after a break — this is a good place to start.',
          maxLength: 240,
          rows: 3,
        },
        { type: 'text', id: 'hero.cta', label: 'Main button', default: 'Book a session', maxLength: 28, required: true },
        {
          type: 'text',
          id: 'hero.firstLabel',
          label: 'Link for first-timers',
          help: 'Opens the booking on your first “Start here” session (a consultation or assessment). Leave empty to hide it.',
          default: 'New here? Start with a consultation',
          maxLength: 48,
        },
        {
          type: 'image',
          id: 'hero.photo',
          label: 'Main photo',
          help: `Upright (4:5 or taller) — a coached moment works best, with both people in the middle of the frame. On phones it shows wider and shorter. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/hero-stepup-1200.webp',
            alt: 'A coach stays close as a client steps up onto a plywood box, driving one knee high, in a bright white training room.',
            width: 1200,
            height: 1800,
          },
          aspectRatio: 4 / 5,
        },
        {
          type: 'text',
          id: 'hero.caption',
          label: 'Caption beside the photo',
          help: 'A short line, like a note on a training card. Optional.',
          default: 'Step-up, knee drive · coached',
          maxLength: 48,
        },
      ],
    },
    {
      id: 'approach',
      label: 'How we coach',
      description: 'Your coaching approach: one plain statement, a few principles and a photo.',
      fields: [
        { type: 'text', id: 'approach.title', label: 'Title', help: LEAN_HELP, default: 'How we *coach*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'approach.statement',
          label: 'Statement',
          help: 'One or two sentences, set large.',
          default: 'Private sessions in a quiet room, with a coach who watches every rep. We teach the lifts properly, load them patiently and keep the plan honest about your week.',
          maxLength: 220,
          rows: 3,
        },
        {
          type: 'list',
          id: 'approach.principles',
          label: 'Principles',
          itemLabel: 'Principle',
          maxItems: 4,
          fields: [
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 40, required: true },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 240, rows: 3 },
          ],
          default: [
            {
              title: 'Look before we load',
              text: 'Every new client starts with a conversation and a look at how they move. The plan follows from what we see, not from a template.',
            },
            {
              title: 'Technique, then weight',
              text: 'We build each lift until it is yours, then add load in small steps. Heavy is earned; nothing is rushed for a number.',
            },
            {
              title: 'A plan that fits your life',
              text: 'Two sessions a week that you keep beat five you skip. We plan around work, sleep, family and the other sport you love.',
            },
          ],
        },
        {
          type: 'image',
          id: 'approach.photo',
          label: 'Photo',
          help: `Upright (4:5). ${SAMPLE_HELP}`,
          default: {
            src: '/photos/coach-hands-800.webp',
            alt: 'A coach places her hands on a client’s shoulder blades as the client holds two light dumbbells out in front of her.',
            width: 800,
            height: 1000,
          },
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'services',
      label: 'Sessions',
      description:
        'Session names, lengths and prices come from Services in this dashboard. The page groups them by the words in their names (consultation or assessment → Start here; mobility or recovery → Mobility & recovery; training or coaching → Strength training) and shows who each suits from its description: end a description with “Suits:” and items separated by “·”.',
      fields: [
        { type: 'text', id: 'services.title', label: 'Title', help: LEAN_HELP, default: 'Sessions & *prices*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'services.intro',
          label: 'Introduction',
          default:
            'Every session is private — you and your coach, or you and a training partner — and priced per session: no membership, no contract. Not sure where to begin? Start with a consultation.',
          maxLength: 320,
          rows: 3,
        },
        {
          type: 'longText',
          id: 'services.noteStart',
          label: 'Note beside “Start here”',
          default: 'Your first visit: we talk, we watch you move, and we agree where to begin.',
          maxLength: 200,
          rows: 2,
        },
        {
          type: 'longText',
          id: 'services.noteStrength',
          label: 'Note beside “Strength training”',
          default: 'The heart of the studio: coached sessions on your own plan, for first-time lifters and seasoned athletes alike.',
          maxLength: 200,
          rows: 2,
        },
        {
          type: 'longText',
          id: 'services.noteMobility',
          label: 'Note beside “Mobility & recovery”',
          default: 'Slower sessions for range, breathing and control — on their own, or between harder days.',
          maxLength: 200,
          rows: 2,
        },
        {
          type: 'image',
          id: 'services.photoStart',
          label: 'Photo beside “Start here” (wide)',
          help: `Wide (3:2). Remove it to show the group without a photo. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/group-start-1200.webp',
            alt: 'A coach and a client sit on a training mat, talking, the coach gesturing as she explains.',
            width: 1200,
            height: 800,
          },
          aspectRatio: 3 / 2,
        },
        {
          type: 'image',
          id: 'services.photoStrength',
          label: 'Photo beside “Strength training” (wide)',
          help: `Wide (3:2). ${SAMPLE_HELP}`,
          default: {
            src: '/photos/group-strength-1200.webp',
            alt: 'A client in an orange T-shirt drives one knee up against a resistance band while her coach mirrors the movement beside her.',
            width: 1200,
            height: 800,
          },
          aspectRatio: 3 / 2,
        },
        {
          type: 'image',
          id: 'services.photoMobility',
          label: 'Photo beside “Mobility & recovery” (wide)',
          help: `Wide (3:2). ${SAMPLE_HELP}`,
          default: {
            src: '/photos/group-mobility-1200.webp',
            alt: 'A client lies back over a foam roller on a mat while her coach sits beside her, guiding the movement.',
            width: 1200,
            height: 800,
          },
          aspectRatio: 3 / 2,
        },
      ],
    },
    {
      id: 'studio',
      label: 'The studio',
      description: 'The room and who you are. Two photos and a few plain facts.',
      fields: [
        { type: 'text', id: 'studio.title', label: 'Title', help: LEAN_HELP, default: 'A private room, *not a gym floor*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'studio.text',
          label: 'Text',
          default:
            'Ballast is a small, independent studio on a quiet street in Fremont: one bright training room, one private session at a time, and the door closed while you train. No mirrors full of strangers, no queue for the rack.\n\nThe room has everything a good programme needs and nothing it doesn’t — free weights, a platform, wall bars, space to move — and a coach who knows your name and your notes.',
          maxLength: 900,
          rows: 7,
        },
        {
          type: 'image',
          id: 'studio.photoRoom',
          label: 'Photo of the room (wide)',
          help: `The room itself, wide (3:2). ${SAMPLE_HELP}`,
          default: {
            src: '/photos/studio-room-1200.webp',
            alt: 'An empty, bright training room with tall windows, a pale grey floor, a mirrored wall and wooden wall bars.',
            width: 1200,
            height: 800,
          },
          aspectRatio: 3 / 2,
        },
        {
          type: 'image',
          id: 'studio.photoDetail',
          label: 'Detail photo (upright)',
          help: `A detail of the room, upright (4:5). Remove it to show the wide photo alone. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/studio-rack-800.webp',
            alt: 'Black hexagonal dumbbells on a steel rack in soft window light.',
            width: 800,
            height: 1000,
          },
          aspectRatio: 4 / 5,
        },
        {
          type: 'list',
          id: 'studio.facts',
          label: 'Studio facts',
          itemLabel: 'Fact',
          maxItems: 6,
          fields: [
            { type: 'text', id: 'title', label: 'Fact', default: '', maxLength: 48, required: true },
            { type: 'text', id: 'text', label: 'Detail', default: '', maxLength: 90 },
          ],
          default: [
            { title: 'Private sessions only', text: 'Just you — or you and a training partner. Never a class.' },
            { title: 'Free weights & a platform', text: 'Barbells, dumbbells, kettlebells, bands and wall bars.' },
            { title: 'Shower & changing room', text: 'Towels provided — come straight from work.' },
            { title: 'Step-free', text: 'Ground floor, level entrance, accessible restroom.' },
          ],
        },
      ],
    },
    {
      id: 'experience',
      label: 'How training works',
      description: 'From the first booking to the next block. Keep the booked session apart from the coaching work around it.',
      fields: [
        { type: 'text', id: 'experience.title', label: 'Title', help: LEAN_HELP, default: 'How training *works*', maxLength: 60, required: true },
        {
          type: 'list',
          id: 'experience.steps',
          label: 'Steps',
          itemLabel: 'Step',
          maxItems: 4,
          fields: [
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 40, required: true },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 280, rows: 4 },
          ],
          default: [
            {
              title: 'Choose your first session',
              text: 'Book a consultation or a movement assessment online. Tell us in the notes about your goals and your training so far — anything health-related we talk through in person.',
            },
            {
              title: 'Meet your coach',
              text: 'We talk through your history and what you want from training, watch how you move, and agree a sensible starting point.',
            },
            {
              title: 'Train, coached',
              text: 'Book sessions on the days that suit you. Your coach keeps your plan and notes and adjusts each session to how you feel that day.',
            },
            {
              title: 'Review and plan the next block',
              text: 'Every few weeks we look back at what moved and decide the next focus together — more strength, more range, or a new goal.',
            },
          ],
        },
        {
          type: 'longText',
          id: 'experience.note',
          label: 'Note under the steps',
          default:
            'Booking online reserves a session time in the studio. Your programme and progress notes are kept by your coach and talked through in person — not by this website.',
          maxLength: 280,
          rows: 3,
        },
        {
          type: 'image',
          id: 'experience.photo',
          label: 'Photo (upright)',
          help: `Upright (4:5). Remove it to show the steps alone. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/window-session-800.webp',
            alt: 'By tall black-framed windows, a client sits up from a foam roller while her coach sits behind her, arms out to show the movement.',
            width: 800,
            height: 1000,
          },
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'goodToKnow',
      label: 'Good to know',
      description: 'The practical questions clients ask before their first session.',
      fields: [
        { type: 'text', id: 'faq.title', label: 'Title', help: LEAN_HELP, default: 'Good to *know*', maxLength: 48, required: true },
        {
          type: 'list',
          id: 'faq.items',
          label: 'Questions',
          itemLabel: 'Question',
          maxItems: 10,
          fields: [
            { type: 'text', id: 'question', label: 'Question', default: '', maxLength: 120, required: true },
            { type: 'longText', id: 'answer', label: 'Answer', default: '', maxLength: 600, rows: 4 },
          ],
          default: [
            {
              question: 'I’ve never lifted weights. Is this for me?',
              answer:
                'Yes — many of our clients start from nothing. Your first sessions are about learning a few movements well, at a weight that feels easy. You will never be asked to do anything you haven’t been shown.',
            },
            {
              question: 'What should I bring?',
              answer:
                'Comfortable clothes you can move in, clean indoor trainers (or flat shoes), a water bottle and anything you need after a shower. Towels are provided.',
            },
            {
              question: 'I have an injury or a health condition.',
              answer:
                'Mention in the booking notes that there is something to talk about — no medical details needed there — and we will go through it in person. We are coaches, not clinicians: for a recent injury, a medical condition or pregnancy, please check with your doctor or physio first, and we will work within their advice.',
            },
            {
              question: 'Do I need a membership or a package?',
              answer: 'No. You book and pay per session, as often as suits you. Most clients train once or twice a week.',
            },
            {
              question: 'Can two of us train together?',
              answer: 'Yes — book a partner session. It works best for two people at a similar level; we adjust the plan for each of you.',
            },
            {
              question: 'What if I need to change or cancel?',
              answer: 'Let us know at least 24 hours before your session, so we can offer the time to someone else.',
            },
          ],
        },
      ],
    },
    {
      id: 'book',
      label: 'Booking',
      description: 'The words around the booking. Times and availability come from the engine.',
      fields: [
        { type: 'text', id: 'book.title', label: 'Title', help: LEAN_HELP, default: 'Book a *session*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'book.intro',
          label: 'Introduction',
          default: 'Choose a session and a time that suits you — first visit or fiftieth. No account needed: it takes about a minute, and your coach reads your notes before you arrive.',
          maxLength: 280,
          rows: 2,
        },
      ],
    },
    {
      id: 'visit',
      label: 'Visit',
      description: 'Opening hours, the address, phone and email come from your business settings and opening hours.',
      fields: [
        { type: 'text', id: 'visit.title', label: 'Title', help: LEAN_HELP, default: 'Find the *studio*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'visit.note',
          label: 'Arriving',
          default:
            'The entrance is on Evanston Avenue, a blue door beside the bike racks. Street parking is free after 6 pm; the 5 and 40 buses stop two blocks away. Arrive five minutes early on your first visit — we’ll show you around.',
          maxLength: 500,
          rows: 4,
        },
      ],
    },
    {
      id: 'footer',
      label: 'Footer',
      fields: [
        {
          type: 'text',
          id: 'footer.tagline',
          label: 'Footer line',
          default: 'Private strength and movement coaching — Fremont, Seattle.',
          maxLength: 100,
        },
      ],
    },
  ],
});
