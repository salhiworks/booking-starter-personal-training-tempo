import { useEffect, useRef } from 'react';

/**
 * Marks an element `data-seen` the first time a sixth of it is on screen, so a
 * one-time animation (the tempo line filling) plays where the visitor can see
 * it. Without IntersectionObserver it is marked at once.
 */
export function useSeen<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.dataset.seen = '';
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.seen = '';
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
