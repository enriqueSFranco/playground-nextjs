import { useEffect, useRef, useState } from "react";

type SectionHeightMap = Record<string, number>;

//hook para observar multipleas secciones y reportar sus alturas
export function useSectionHeight({
  keys,
  refs,
}: {
  keys: string[];
  refs: React.RefObject<Record<string, HTMLElement | null>>;
}) {
  const [heights, setHeights] = useState<SectionHeightMap>({});
  const observers = useRef<Record<string, ResizeObserver>>({});

  useEffect(() => {

    // Limpia observadores anteriores
    Object.values(observers.current).forEach((observer) =>
      observer.disconnect()
    );
    observers.current = {};

    // Intentar observar solo si todos los elementos existen
    const elementsAvailable = keys.every((key) => refs.current[key] !== null);

    if (!elementsAvailable) {
      // Si no todos están listos, limpia alturas y espera a que se vuelvan a montar
      setHeights({});
      return;
    }

    keys.forEach((key) => {
      const el = refs.current[key];
      if (!el) return;

      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const newHeight = entry.contentRect.height;

          setHeights((prev) => {
            // Solo actualizar si cambió la altura para evitar renders innecesarios
            if (prev[key] !== newHeight) {
              return { ...prev, [key]: newHeight };
            }
            return prev;
          });
        }
      });
      observer.observe(el);
      observers.current[key] = observer;
    });

    return () => {
      Object.values(observers.current).forEach((observer) =>
        observer.disconnect()
      );
      observers.current = {};
    };
  }, [keys, refs]);

  return heights;
}
