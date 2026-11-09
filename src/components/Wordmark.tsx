import type { SiteValues } from '../lib/content';

/** The owner's logo when set, otherwise the name mark with a small plate (a weight plate seen edge-on) in the signal colour. */
export function Wordmark({ values, className }: { values: SiteValues; className?: string }) {
  const logo = values['brand.logo'];
  const name = values['brand.wordmark'];
  return (
    <span className={`wordmark ${className ?? ''}`}>
      {logo ? (
        <img
          className="wordmark__logo"
          src={logo.src}
          alt={logo.alt || name}
          width={logo.width ?? 160}
          height={logo.height ?? 40}
          decoding="async"
        />
      ) : (
        <span className="wordmark__text">
          {name}
          <span className="wordmark__plate" aria-hidden="true" />
        </span>
      )}
    </span>
  );
}
