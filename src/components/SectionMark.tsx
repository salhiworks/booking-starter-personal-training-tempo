/**
 * A section's label: its number and name in small capitals after a short bar
 * in the signal colour — the load on the bar. Decorative numbering is hidden
 * from screen readers; the heading below names the section.
 */
export function SectionMark({ n, label, tone }: { n: number; label: string; tone?: 'signal' }) {
  return (
    <p className={`section-mark ${tone ? `section-mark--${tone}` : ''}`} aria-hidden="true">
      <span className="section-mark__bar" />
      <span className="section-mark__n">{String(n).padStart(2, '0')}</span>
      <span className="section-mark__label">{label}</span>
    </p>
  );
}
