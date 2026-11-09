import type { Preset } from '@profitstudio/booking-engine';

/**
 * Ballast Strength Studio's own preset (INTEGRATION.md §5): the sample
 * sessions, hours and policies preview mode shows, and the starter set the
 * dashboard offers an owner who has no services yet (<BookingAdmin presets>).
 * Prices are in US dollars, in cents.
 *
 * One private training room, one client (or one pair) at a time: the engine
 * keeps ONE shared calendar, so a session's length is the time on the floor
 * with the coach, and the buffer after it is the room's reset (wipe-down,
 * notes, re-racking). Programmes, progress notes and check-ins are the coach's
 * own work, outside the booking system. Memberships, session packs, group
 * classes, several coach calendars and deposits need a new engine version —
 * never custom code here.
 *
 * Who a session suits is written at the end of its description after
 * "Suits:", separated by "·" — the website shows it as a short line
 * (src/lib/services.ts, `splitDescription`).
 *
 * The website sorts sessions into groups (Start here, Strength training,
 * Mobility & recovery) by the words in their names — see src/lib/services.ts.
 */
export const sitePreset = {
  id: 'personal-training',
  label: 'Personal Training Studio',
  terminology: { customer: 'client', customers: 'clients', booking: 'session', bookings: 'sessions' },
  previewBusiness: {
    name: 'Sample Training Studio',
    currency: 'USD',
    locale: 'en-US',
    contact: {
      email: 'hello@example.com',
      phone: '+1 206-555-0100',
      address: '100 Example Street, Seattle, WA',
    },
  },
  policies: {
    slotIntervalMinutes: 15,
    minNoticeMinutes: 720,
    maxAdvanceDays: 60,
    autoConfirm: false,
    requirePhone: true,
    pendingHoldMinutes: 1440,
    verificationWindowMinutes: 15,
  },
  // Early starts on weekdays for before-work sessions, a shorter Friday, Saturday mornings; closed Sunday.
  workingHours: [
    { weekday: 1, start: '06:30', end: '19:30' },
    { weekday: 2, start: '06:30', end: '19:30' },
    { weekday: 3, start: '06:30', end: '19:30' },
    { weekday: 4, start: '06:30', end: '19:30' },
    { weekday: 5, start: '06:30', end: '15:00' },
    { weekday: 6, start: '08:00', end: '13:00' },
  ],
  services: [
    {
      name: 'Introductory Consultation',
      description:
        'Thirty unhurried minutes to talk through your goals, your history and how you like to train — then a look around the studio. No workout, no pressure. Suits: anyone new to the studio · first-time lifters · coming back after a long break',
      durationMinutes: 30,
      bufferAfterMinutes: 15,
      priceCents: 4000,
    },
    {
      name: 'Movement Assessment',
      description:
        'We watch how you squat, hinge, push, pull and balance, test a few simple strength markers, and turn what we see into a starting plan. Suits: before your first training block · after time off · a change of goal',
      durationMinutes: 60,
      bufferAfterMinutes: 15,
      priceCents: 13000,
    },
    {
      name: 'Personal Training',
      description:
        'A full one-to-one session on your plan: warm-up, technique, the main lifts and the work around them, every set coached. Suits: beginners and experienced lifters · building general strength',
      durationMinutes: 60,
      bufferAfterMinutes: 15,
      priceCents: 11500,
    },
    {
      name: 'Partner Training',
      description:
        'Two people who train together share one coach and one plan, adjusted to each of you. Suits: friends, partners or family · two people at a similar level',
      durationMinutes: 60,
      bufferAfterMinutes: 15,
      priceCents: 16000,
    },
    {
      name: 'Performance Coaching',
      description:
        'A longer session for a specific aim — a race, a season, a first competition — with more time for power, speed and conditioning. Suits: runners, climbers and team-sport athletes · experienced lifters',
      durationMinutes: 75,
      bufferAfterMinutes: 15,
      priceCents: 14500,
    },
    {
      name: 'Mobility & Recovery',
      description:
        'Slower, coached work on range of motion, breathing and control — for stiff days, desk weeks and the days between harder sessions. Suits: anyone · alongside regular training · easing back in',
      durationMinutes: 45,
      bufferAfterMinutes: 15,
      priceCents: 8500,
    },
  ],
} satisfies Preset;
