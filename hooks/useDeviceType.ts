import { useEffect, useState, useCallback } from 'react';

type Breakpoint =
  | 'mobile'
  | 'mobileLarge'
  | 'tablet'
  | 'tabletLarge'
  | 'desktop'
  | 'desktopLarge';

type Orientation = 'portrait' | 'landscape';

interface ScreenState {
  breakpoint: Breakpoint;
  orientation: Orientation;
  isTouchDevice: boolean;
}

const BREAKPOINTS: [Breakpoint, number][] = [
  ['mobile', 0],
  ['mobileLarge', 480],
  ['tablet', 768],
  ['tabletLarge', 992],
  ['desktop', 1200],
  ['desktopLarge', 1440],
];

const getBreakpoint = (width: number): Breakpoint =>
  [...BREAKPOINTS].reverse().find(([, value]) => width >= value)?.[0] ?? 'mobile';

const getClientScreenState = (): ScreenState => ({
  breakpoint: getBreakpoint(window.innerWidth),
  orientation: window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape',
  isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
});

export function useDeviceType(): ScreenState & { isBreakpoint: (b: Breakpoint | Breakpoint[]) => boolean; mounted: boolean } {
  const [screen, setScreen] = useState<ScreenState | null>(null);

  useEffect(() => {
    const update = () => setScreen(getClientScreenState());
    update(); // Set initial state
    window.addEventListener('resize', update);
    const orientationMQ = window.matchMedia('(orientation: portrait)');
    orientationMQ.addEventListener('change', update);

    return () => {
      window.removeEventListener('resize', update);
      orientationMQ.removeEventListener('change', update);
    };
  }, []);

  const isBreakpoint = useCallback(
    (target: Breakpoint | Breakpoint[]) => {
      if (!screen) return false;
      return Array.isArray(target)
        ? target.includes(screen.breakpoint)
        : target === screen.breakpoint;
    },
    [screen]
  );

  return {
    breakpoint: screen?.breakpoint ?? 'mobile',
    orientation: screen?.orientation ?? 'portrait',
    isTouchDevice: screen?.isTouchDevice ?? false,
    isBreakpoint,
    mounted: !!screen,
  };
}
