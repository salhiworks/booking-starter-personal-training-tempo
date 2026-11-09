import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionMark } from './SectionMark';

/**
 * How the studio coaches, on the plumb line: the statement set large and
 * centred under the heading, then a photograph of hands-on coaching as the
 * pillar with the principles balanced either side of it (01 left, 02 right,
 * 03 left…). No claims the studio cannot show — the owner writes what they do.
 */
export function Approach({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const photo = values['approach.photo'];
  const principles = values['approach.principles'];
  const sample = !ownerFields.includes('approach.photo');
  return (
    <section id="approach" className="section approach" aria-labelledby="approach-title">
      <div className="page">
        <header className="section-head approach__head">
          <SectionMark n={1} label="Approach" />
          <h2 id="approach-title">
            <Emphasis text={values['approach.title']} />
          </h2>
        </header>
        {values['approach.statement'] && <p className="approach__statement">{values['approach.statement']}</p>}
        <div className={`pillar ${photo ? '' : 'pillar--no-photo'}`}>
          {photo && (
            <figure className="pillar__visual">
              <Photo image={photo} sizes="(min-width: 1024px) 26vw, (min-width: 720px) 60vw, 100vw" className="pillar__photo" />
              {sample && <span className="tag tag--on-photo">Sample</span>}
            </figure>
          )}
          {principles.length > 0 && (
            <ol className="principles pillar__sides" role="list">
              {principles.map((p, i) => (
                <li className="principle" key={`${i}-${p.title}`}>
                  <span className="principle__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="principle__title">{p.title}</h3>
                  {p.text && <p className="principle__text">{p.text}</p>}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
