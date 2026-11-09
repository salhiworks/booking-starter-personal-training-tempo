import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { durationParts, durationSpoken, group, priceParts, splitDescription } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Notice } from './Notice';
import { Photo } from './Photo';
import { SectionMark } from './SectionMark';

interface SessionsProps {
  values: SiteValues;
  services: Resource<Service[]>;
  business: Business | null;
  ownerFields: string[];
  onRetry: () => void;
  onBook: StartBooking;
}

/**
 * Sessions and prices, straight from the engine: every name, length and price
 * is the one the booking uses. Sessions sit in groups (Start here, Strength
 * training, Mobility & recovery) found from their names, laid out as a
 * progression board — the groups side by side, left to right, on one rail
 * (a path down the page on phones), each with its note and photo and its
 * sessions as cards led by their length in large figures: what the session is
 * for, who it suits, the price, and a Book button that opens the booking with
 * that session chosen.
 */
export function Sessions({ values, services, business, ownerFields, onRetry, onBook }: SessionsProps) {
  const locale = business?.locale ?? 'en-US';
  const groups = services.status === 'ready' ? group(services.data) : [];

  return (
    <section id="sessions" className="section sessions" aria-labelledby="sessions-title">
      <div className="page">
        <header className="section-head sessions__head">
          <SectionMark n={2} label="Sessions" />
          <h2 id="sessions-title">
            <Emphasis text={values['services.title']} />
          </h2>
          {values['services.intro'] && <p className="section-intro">{values['services.intro']}</p>}
        </header>

        {services.status === 'loading' && (
          <div className="sessions__loading" aria-busy="true">
            <p className="sr-only" role="status">
              Loading sessions…
            </p>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="skeleton skeleton--service" aria-hidden="true" />
            ))}
          </div>
        )}

        {services.status === 'error' &&
          (services.error.code === 'NOT_CONFIGURED' ? (
            <p className="quiet-state">Our sessions and prices will be listed here soon.</p>
          ) : (
            <Notice tone="error" action={{ label: 'Try again', onClick: onRetry }}>
              <p>We couldn't load our sessions just now.</p>
            </Notice>
          ))}

        {services.status === 'ready' && services.data.length === 0 && (
          <p className="quiet-state">Our sessions will be listed here soon. Call or email the studio to book in the meantime.</p>
        )}

        {groups.length > 1 && (
          <nav className="sessions__index" aria-label="Kinds of session">
            {groups.map((g) => (
              <a key={g.id} href={`#sessions-${g.id}`}>
                {g.label}
                <span className="sessions__count" aria-label={`${g.services.length} ${g.services.length === 1 ? 'session' : 'sessions'}`}>
                  {g.services.length}
                </span>
              </a>
            ))}
          </nav>
        )}

        {groups.length > 0 && (
        <div className="board" data-groups={groups.length}>
        {groups.map((g, i) => {
          const note = g.note ? values[g.note] : '';
          const photo = g.photo ? values[g.photo] : null;
          return (
            <section className="session-group" id={`sessions-${g.id}`} key={g.id} aria-labelledby={`sessions-${g.id}-title`}>
              <div className="session-group__aside">
                <p className="session-group__stage" aria-hidden="true">
                  <span className="session-group__dot" />
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="session-group__title" id={`sessions-${g.id}-title`}>
                  {g.label}
                </h3>
                {note && <p className="session-group__note">{note}</p>}
                {photo && g.photo && (
                  <figure className="session-group__visual">
                    <Photo image={photo} sizes="(min-width: 1024px) 26vw, (min-width: 720px) 40vw, 100vw" className="session-group__photo" />
                    {!ownerFields.includes(g.photo) && <span className="tag tag--on-photo">Sample</span>}
                  </figure>
                )}
              </div>
              <ol className="session-list" role="list">
                {g.services.map((s) => {
                  const { lead, suits } = splitDescription(s.description);
                  const price = priceParts(s, locale);
                  const length = durationParts(s.durationMinutes);
                  return (
                    <li className="session" key={s.id}>
                      <p className="session__length">
                        <span className="session__figure" aria-hidden="true">
                          {length.value}
                        </span>
                        <span className="session__unit" aria-hidden="true">
                          {length.unit}
                        </span>
                        <span className="sr-only">{durationSpoken(s.durationMinutes)}</span>
                      </p>
                      <div className="session__main">
                        {s.image && (
                          <img
                            className="session__thumb"
                            src={s.image.url}
                            alt={s.image.alt}
                            width={s.image.width ?? 160}
                            height={s.image.height ?? 200}
                            loading="lazy"
                            decoding="async"
                          />
                        )}
                        <h4 className="session__name">{s.name}</h4>
                        {lead && <p className="session__lead">{lead}</p>}
                        {suits.length > 0 && (
                          <p className="session__suits">
                            <span className="session__suits-label">Suits</span> {suits.join(' · ')}
                          </p>
                        )}
                      </div>
                      <div className="session__end">
                        <p className="session__price">
                          {price.from && <span className="session__from">from </span>}
                          {price.amount}
                        </p>
                        <a className="button button--small button--quiet session__book" href="#book" onClick={bookLink(onBook, s.id)}>
                          Book<span className="sr-only"> {s.name}</span>
                          <span className="button__arrow" aria-hidden="true">
                            →
                          </span>
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
        </div>
        )}
      </div>
    </section>
  );
}
