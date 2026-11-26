import { formatMoney } from '@profitstudio/booking-engine';
import type { Service } from '@profitstudio/booking-engine';

/**
 * The session list's groups, and who each session suits.
 *
 * The engine (2.0.0) has no service categories and no per-service
 * metadata, and a service's id is a database UUID this site cannot know when
 * it is built — so everything here is read from the service's own engine data:
 *
 *   1. the group, from its NAME against the rules below — the first rule that
 *      matches wins, strongest signal first ("Movement Assessment" is a first
 *      step even though it is about movement; "Mobility & Recovery" is
 *      mobility, not training);
 *   2. if the name has no session words (an owner renamed "Personal Training"
 *      to "The Hour"), its DESCRIPTION, against the same rules;
 *   3. otherwise "More sessions" — a genuinely new kind of session gets its
 *      own group instead of a wrong one.
 *
 * Who a session suits is the part of its description after "Suits:" (or
 * "Good for:" / "Ideal for:" / "For:"), split at "·" (or ";") — written by the
 * owner in Dashboard → Services, so it changes with the session and never
 * drifts from it.
 *
 * A truly stable category needs an engine field — see
 * docs/ENGINE-PROPOSAL-personal-training.md in the Niche Pack workspace.
 */
export type GroupId = 'start' | 'strength' | 'mobility' | 'more';

/** Content fields that belong to a group (src/content/site.ts). */
export type GroupNote = 'services.noteStart' | 'services.noteStrength' | 'services.noteMobility';
export type GroupPhoto = 'services.photoStart' | 'services.photoStrength' | 'services.photoMobility';

interface GroupRule {
  id: GroupId;
  label: string;
  note: GroupNote | null;
  photo: GroupPhoto | null;
  match: RegExp;
}

const RULES: GroupRule[] = [
  {
    id: 'start',
    label: 'Start here',
    note: 'services.noteStart',
    photo: 'services.photoStart',
    match: /\b(consult(?:ation)?s?|assess(?:ment)?s?|intro(?:ductory|duction)?|first (?:session|visit)|taster|trial|screen(?:ing)?|discovery|get(?:ting)? started|new client)\b/i,
  },
  {
    id: 'mobility',
    label: 'Mobility & recovery',
    note: 'services.noteMobility',
    photo: 'services.photoMobility',
    match: /\b(mobility|recover(?:y|ing)?|stretch(?:ing)?|flexib(?:le|ility)|range of motion|breath(?:ing|work)?|restore|restorative|prehab|deload|cool[- ]?down)\b/i,
  },
  {
    id: 'strength',
    label: 'Strength training',
    note: 'services.noteStrength',
    photo: 'services.photoStrength',
    // Weaker words (a plan, a lift, sets) only decide when no group above matched.
    match: /\b(train(?:ing)?|coach(?:ing|ed)?|strength|strong(?:er)?|performance|partner|duo|conditioning|lift(?:s|ing)?|power|athlet(?:e|es|ic)|sport|hypertrophy|barbell|kettlebell|sets?)\b/i,
  },
];

const MORE = { id: 'more', label: 'More sessions', note: null, photo: null } as const;

/** The order groups are shown in. */
const ORDER: GroupId[] = ['start', 'strength', 'mobility', 'more'];

export interface Group {
  id: GroupId;
  label: string;
  note: GroupNote | null;
  photo: GroupPhoto | null;
  services: Service[];
}

export function groupOf(service: Pick<Service, 'name' | 'description'>): GroupRule | typeof MORE {
  const byName = RULES.find((rule) => rule.match.test(service.name));
  if (byName) return byName;
  const { lead } = splitDescription(service.description);
  return RULES.find((rule) => rule.match.test(lead)) ?? RULES.find((rule) => rule.match.test(service.description ?? '')) ?? MORE;
}

/** Sessions in their groups, keeping the owner's display order inside each; empty groups are left out. */
export function group(services: readonly Service[]): Group[] {
  const groups = new Map<GroupId, Group>();
  for (const service of services) {
    const rule = groupOf(service);
    let g = groups.get(rule.id);
    if (!g) {
      g = { id: rule.id, label: rule.label, note: rule.note, photo: rule.photo, services: [] };
      groups.set(rule.id, g);
    }
    g.services.push(service);
  }
  return ORDER.flatMap((id) => (groups.has(id) ? [groups.get(id)!] : []));
}

/**
 * The first-visit session for "New here?" links: the first session of the
 * "Start here" group (the owner's order), or null when there is none.
 */
export function firstStep(services: readonly Service[]): Service | null {
  return group(services).find((g) => g.id === 'start')?.services[0] ?? null;
}

/**
 * "A full session on your plan… Suits: beginners · experienced lifters" →
 * { lead: "A full session on your plan…", suits: ["beginners", "experienced lifters"] }.
 * Without "Suits:" the whole description is the lead and the list is empty.
 */
export function splitDescription(description: string | null | undefined): { lead: string; suits: string[] } {
  const text = (description ?? '').trim();
  const match = /(?:^|[\s.])(?:suits|suited to|good for|ideal for|best for|for)\s*:\s*/i.exec(text);
  if (!match) return { lead: text, suits: [] };
  const lead = text.slice(0, match.index + (match[0].startsWith('.') ? 1 : 0)).trim();
  const suits = text
    .slice(match.index + match[0].length)
    .split(/\s*[·•;]\s*|\s+\|\s+/)
    .map((item) => item.trim().replace(/\.$/, ''))
    .filter(Boolean);
  return { lead, suits };
}

/** "45 min", "1 h 30 min" — durations straight from the engine. */
export function durationLabel(minutes: number): string {
  if (minutes < 120) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** The same, for screen readers. */
export function durationSpoken(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${minutes} minutes`;
  const hours = `${h} hour${h > 1 ? 's' : ''}`;
  return m ? `${hours} ${m} minutes` : hours;
}

/**
 * The big numeral in the session list: minutes up to two hours ("75" + "min"),
 * hours beyond ("2.5" + "h"), so a coach's usual lengths read the way coaches say them.
 */
export function durationParts(minutes: number): { value: string; unit: string } {
  if (minutes < 120) return { value: String(minutes), unit: 'min' };
  const h = minutes / 60;
  return { value: Number.isInteger(h) ? String(h) : h.toFixed(1).replace(/\.0$/, ''), unit: 'h' };
}

export function priceLabel(service: Pick<Service, 'priceCents' | 'priceFrom' | 'currency'>, locale: string): string {
  if (service.priceCents === null) return 'Price on request';
  const amount = formatMoney(service.priceCents, service.currency, locale);
  return service.priceFrom ? `from ${amount}` : amount;
}

/**
 * The price as the list shows it: the amount, and whether it is a starting
 * price ("from" — the engine's `priceFrom`). Whole dollars print without ".00".
 */
export function priceParts(service: Pick<Service, 'priceCents' | 'priceFrom' | 'currency'>, locale: string): { from: boolean; amount: string } {
  if (service.priceCents === null) return { from: false, amount: 'Price on request' };
  return { from: service.priceFrom, amount: formatMoney(service.priceCents, service.currency, locale).replace(/([.,])00(?!\d)/, '') };
}

/** Whole-dollar prices print without ".00" — "$115", not "$115.00". */
export function shortPrice(service: Pick<Service, 'priceCents' | 'priceFrom' | 'currency'>, locale: string): string {
  return priceLabel(service, locale).replace(/([.,])00(?!\d)/, '');
}
