import { useLayoutEffect, useState } from "react";

export function useIntersectionObserver(
  refs: React.RefObject<HTMLElement>[],
  options?: IntersectionObserverInit
): Record<string, boolean> {
  const [visibilityMap, setVisibilityMap] = useState<Record<string, boolean>>({});

  useLayoutEffect(() => {
    const allReady = refs.every(ref => ref.current !== null);
    if (!allReady) return;

    const observer = new IntersectionObserver((entries) => {
      setVisibilityMap((prev) => {
        const newMap = { ...prev };
        let hasChanged = false;

        entries.forEach((entry) => {
          const id = entry.target.id;
          if (!id) return;
          const newValue = entry.isIntersecting;
          if (prev[id] !== newValue) {
            newMap[id] = newValue;
            hasChanged = true;
          }
        });

        return hasChanged ? newMap : prev;
      });
    }, options);

    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [refs, options]);

  return visibilityMap;
}
