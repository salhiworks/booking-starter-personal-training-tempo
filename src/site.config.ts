/**
 * This website's identity — the ONE place for its name, time zone and the
 * placeholder contact details shown in preview mode (`npm run dev` without
 * Supabase). Everything the owner manages (sessions, prices, hours, real
 * contact details, text and photos) lives in the dashboard at /admin/.
 */
export const SITE = {
  /** The business name. The dashboard's Business page overrides it once connected. */
  name: 'Ballast Strength Studio',
  /** IANA time zone of the business. */
  timezone: 'America/Los_Angeles',
  /** Fictional contact details for preview mode only. */
  previewContact: {
    email: 'coach@ballast.example',
    phone: '+1 206-555-0142',
    address: '3410 Evanston Avenue N, Unit B, Seattle, WA 98103',
  },
};
