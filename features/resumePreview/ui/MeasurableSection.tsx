import { useEffect, useRef } from 'react';

type ResumeSectionProps = {
  onHeightMeasured: (h: number) => void;
  children: React.ReactNode;
};

export function MeasurableSection({ children }: ResumeSectionProps) {
  return <div>{children}</div>;
}
