import { useEffect, useState, useRef } from "react";

export const useDimension = <T extends HTMLElement>({
  ref,
}: {
  ref: React.RefObject<T>;
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const prevDimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    const trySetup = () => {
      const element = ref.current;
      if (!element) {
        // ref.current no existe todavía, esperamos al siguiente frame
        requestAnimationFrame(trySetup);
        return;
      }

      // ref.current ya está listo, creamos ResizeObserver
      const updateDimensions = () => {
        if (!element) return;
        const { offsetWidth, offsetHeight } = element;
        if (
          offsetWidth &&
          offsetHeight &&
          (offsetWidth !== prevDimensions.current.width ||
            offsetHeight !== prevDimensions.current.height)
        ) {
          prevDimensions.current = { width: offsetWidth, height: offsetHeight };
          setDimensions({ width: offsetWidth, height: offsetHeight });
        }
      };

      resizeObserver = new ResizeObserver(() => {
        // Para no saturar actualizaciones, medimos en el próximo frame
        requestAnimationFrame(updateDimensions);
      });

      resizeObserver.observe(element);
      updateDimensions();
    };

    trySetup();

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [ref]);

  return dimensions;
};
