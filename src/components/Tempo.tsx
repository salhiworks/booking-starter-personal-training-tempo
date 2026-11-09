/**
 * The tempo line — the studio's one ornament. Coaches write a lift's tempo as
 * four counts (lower · pause · lift · reset, e.g. 3·1·1·1); the line draws
 * those four counts as segments, the lowering phase longest and in the signal
 * colour. It fills once from left to right when it first appears (CSS:
 * `.tempo`); with reduced motion it is simply there. Decorative only.
 */
export function Tempo({ className, counts = [3, 1, 1, 1] }: { className?: string; counts?: number[] }) {
  return (
    <span className={`tempo ${className ?? ''}`} aria-hidden="true">
      {counts.map((n, i) => (
        <span className="tempo__count" key={i} style={{ flexGrow: n }} />
      ))}
    </span>
  );
}
