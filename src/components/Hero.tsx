import { formatMoney } from '@profitstudio/booking-engine';
import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import type { SiteValues } from '../lib/content';
import type { OpenStatus } from '../lib/hours';
import type { Resource } from '../lib/resource';
import { durationLabel, firstStep } from '../lib/services';
import { bookLink } from '../lib/bookLink';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { Tempo } from './Tempo';

/** Keep in sync with the hero preloads in index.html. */
export const HERO_SIZES = '(min-width: 960px) 32vw, 100vw';

/**
 * Phones get a different crop of the same moment when the site's own default photo is
 * shown: the first screen there is wide and short, and the upright frame would cut the
 * step-up to heads and shoulders. An owner's photo is used as it is, everywhere.
 */
const DEFAULT_HERO = '/photos/hero-stepup-1200.webp';
const PHONE_CROP = { key: '/photos/hero-wide-800.webp', media: '(max-width: 959px)', sizes: '100vw' };

interface HeroProps {
  values: SiteValues;
  status: OpenStatus | null;
  services: Resource<Service[]>;
  business: Business | null;
  /** Fields the owner has set — the photo's "Sample" label disappears once they replace it. */
  ownerFields: string[];
  onBook: StartBooking;
}

/** Plain facts from the engine: the lowest price and the range of session lengths. Nothing is invented. */
function sessionFacts(services: Resource<Service[]>, business: Business | null) {
  if (services.status !== 'ready' || services.data.length === 0) return null;
  const lengths = services.data.map((s) => s.durationMinutes);
  const min = Math.min(...lengths);
  const max = Math.max(...lengths);
  const priced = services.data.filter((s) => s.priceCents !== null);
  const cheapest = priced.length ? priced.reduce((a, b) => ((a.priceCents ?? 0) <= (b.priceCents ?? 0) ? a : b)) : null;
  return {
    lengths: min === max ? durationLabel(min) : `${min}–${durationLabel(max)}`,
    from: cheapest
      ? formatMoney(cheapest.priceCents ?? 0, cheapest.currency, business?.locale ?? 'en-US').replace(/([.,])00(?!\d)/, '')
      : null,
  };
}

/**
 * The first screen, built on the plumb line — the vertical axis the whole page
 * stands on. A tall photograph of a coached moment is the pillar in the middle;
 * the headline leans into it from the left (set flush right), and the actions
 * answer from the right: the lede, one Book button, a quieter way in for
 * first-timers, and engine facts over the four-count tempo line. Phones stack
 * photo, headline, button, lede.
 */
export function Hero({ values, ownerFields, status, services, business, onBook }: HeroProps) {
  const sample = !ownerFields.includes('hero.photo');
  const photo = values['hero.photo'];
  const facts = sessionFacts(services, business);
  const first = services.status === 'ready' ? firstStep(services.data) : null;
  const firstLabel = values['hero.firstLabel'].trim();
  const caption = values['hero.caption'].trim();
  const figure = photo && (
    <figure className="hero__visual">
      <Photo
        image={photo}
        sizes={HERO_SIZES}
        priority
        className="hero__photo"
        small={photo.src === DEFAULT_HERO ? PHONE_CROP : undefined}
      />
      {sample && <span className="tag tag--on-photo">Sample</span>}
      {caption && (
        <figcaption className="hero__caption">
          <span className="hero__caption-mark" aria-hidden="true" />
          {caption}
        </figcaption>
      )}
    </figure>
  );
  return (
    <section className={`hero ${photo ? '' : 'hero--text-only'}`} id="top" aria-labelledby="hero-title">
      <div className="page hero__inner">
        {/* The lead leans into the pillar from the left; the actions answer it on the right. */}
        <div className="hero__lead">
          {values['hero.eyebrow'] && <p className="eyebrow hero__eyebrow hero__enter">{values['hero.eyebrow']}</p>}
          <h1 id="hero-title" className="hero__title hero__enter">
            <Emphasis text={values['hero.title']} />
          </h1>
        </div>

        {figure}

        <div className="hero__act">
          {values['hero.lede'] && <p className="hero__lede hero__enter">{values['hero.lede']}</p>}
          <div className="hero__actions hero__enter">
            <a className="button button--large" href="#book" onClick={bookLink(onBook)}>
              {values['hero.cta']}
              <span className="button__arrow" aria-hidden="true">
                →
              </span>
            </a>
            {first && firstLabel && (
              <a className="hero__first" href="#book" onClick={bookLink(onBook, first.id)}>
                {firstLabel}
                <span className="sr-only"> — {first.name}</span>
              </a>
            )}
          </div>
          {(facts || status) && (
            <div className="hero__card hero__enter">
              <dl className="hero__facts">
                {facts?.from && (
                  <div>
                    <dt>Sessions from</dt>
                    <dd>{facts.from}</dd>
                  </div>
                )}
                {facts && (
                  <div>
                    <dt>Session length</dt>
                    <dd>{facts.lengths}</dd>
                  </div>
                )}
                {status && (
                  <div className="hero__fact-status">
                    <dt>Today</dt>
                    <dd className="open-status" data-open={status.open}>
                      <span className="open-status__dot" aria-hidden="true" />
                      {status.text}
                    </dd>
                  </div>
                )}
              </dl>
              <Tempo className="hero__tempo" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
