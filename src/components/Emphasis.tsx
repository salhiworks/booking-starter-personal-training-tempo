import { Fragment } from 'react';
import type { ReactNode } from 'react';

/** Hyphenated words ("one-to-one") stay on one line: a large heading never breaks at the hyphen. */
function keepHyphens(text: string, key: string): ReactNode[] {
  return text.split(/(\S+-\S+)/g).map((piece, i) =>
    i % 2 === 1 ? (
      <span className="nowrap" key={`${key}-${i}`}>
        {piece}
      </span>
    ) : (
      <Fragment key={`${key}-${i}`}>{piece}</Fragment>
    ),
  );
}

/**
 * The owner's text with *asterisks* turned into the lean — the words set
 * italic, leaning forward like a body moving through a rep, in the signal
 * colour (CSS: `.lean`). Still rendered as text, never as HTML.
 */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em className="lean" key={i}>
            {keepHyphens(part, String(i))}
          </em>
        ) : (
          <Fragment key={i}>{keepHyphens(part, String(i))}</Fragment>
        ),
      )}
    </>
  );
}
