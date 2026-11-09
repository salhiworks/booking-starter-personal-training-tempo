import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionMark } from './SectionMark';
import { useSeen } from '../lib/useSeen';

/**
 * How training works, on the plumb line: a photograph as the pillar and the
 * four steps balanced around it (1 left, 2 right, 3 left, 4 right), each under
 * one count of the tempo track, which fills once in order when the steps come
 * on screen (a vertical thread on phones). The note under the steps keeps the
 * booked session apart from the coaching work around it — the booking system
 * books times; it does not plan training or track progress.
 */
export function Training({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const counts = useSeen<HTMLOListElement>();
  const steps = values['experience.steps'];
  const photo = values['experience.photo'];
  if (steps.length === 0 && !photo) return null;
  return (
    <section id="training" className="section training" aria-labelledby="training-title">
      <div className="page">
        <header className="section-head training__head">
          <SectionMark n={4} label="How it works" />
          <h2 id="training-title">
            <Emphasis text={values['experience.title']} />
          </h2>
        </header>
        <div className={`pillar ${photo ? '' : 'pillar--no-photo'}`}>
          {photo && (
            <figure className="pillar__visual">
              <Photo image={photo} sizes="(min-width: 1024px) 26vw, (min-width: 720px) 50vw, 100vw" className="pillar__photo" />
              {!ownerFields.includes('experience.photo') && <span className="tag tag--on-photo">Sample</span>}
            </figure>
          )}
          {steps.length > 0 && (
            <ol ref={counts} className="counts pillar__sides" role="list" data-count={steps.length}>
              {steps.map((step, i) => (
                <li className="count" key={`${i}-${step.title}`}>
                  <span className="count__track" aria-hidden="true" />
                  <span className="count__n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="count__title">{step.title}</h3>
                  {step.text && <p className="count__text">{step.text}</p>}
                </li>
              ))}
            </ol>
          )}
        </div>
        {values['experience.note'] && (
          <p className="training__note">
            <span className="training__note-mark" aria-hidden="true" />
            {values['experience.note']}
          </p>
        )}
      </div>
    </section>
  );
}
