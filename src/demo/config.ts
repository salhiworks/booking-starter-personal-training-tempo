import type { DemoConfig } from './engine';
import { sitePreset } from '../lib/preset';

/**
 * The public Live Demo's sample studio (`npm run dev:demo` / `npm run build:demo`).
 * Only demo builds read this file. Customizing the real website? Leave src/demo/ alone.
 */
export const demoConfig: DemoConfig = {
  id: 'personal-training-tempo',
  preset: sitePreset,
  business: {
    name: 'Ballast Strength Studio',
    timezone: 'America/Los_Angeles',
    email: 'coach@ballast.example',
    phone: '+1 206-555-0142',
    address: '3410 Evanston Avenue N, Unit B, Seattle, WA 98103',
  },
  ownerEmail: 'owner@ballast.example',
  referencePrefix: 'BL',
  sampleNotes: [
    'Never lifted before and a bit nervous. Lower back gets stiff after long days at the desk.',
    'Training for a half marathon in the spring — want to get stronger without losing running time.',
    'Coming back after two years off. I used to lift a little and would like to rebuild slowly and properly.',
  ],
  // The site caches published content under this key (createSiteContentStore's default).
  resetKeys: ['pbe-site-content'],
  customers: [
    { name: 'Hannah Lindqvist', email: 'hannah.l@example.com', phone: '+1 206 555 0113' },
    { name: 'Marcus Webb', email: 'marcus.webb@example.com', phone: '+1 206 555 0126' },
    { name: 'Priya Raman', email: 'priya.raman@example.com', phone: '+1 206 555 0131' },
    { name: 'Daniel Okafor', email: 'd.okafor@example.com', phone: '+1 206 555 0148' },
    { name: 'Ruth Castellano', email: 'ruth.c@example.com', phone: '+1 206 555 0152' },
    { name: 'Kenji Mori', email: 'kenji.mori@example.com', phone: '+1 206 555 0167' },
    { name: 'Alice Moreau', email: 'alice.moreau@example.com', phone: '+1 206 555 0174' },
    { name: 'Tom Haverford', email: 'tom.h@example.com', phone: '+1 206 555 0189' },
    { name: 'Grace Achebe', email: 'grace.a@example.com', phone: '+1 206 555 0193' },
    { name: 'Leo Brandt', email: 'leo.brandt@example.com', phone: '+1 206 555 0108' },
  ],
};
