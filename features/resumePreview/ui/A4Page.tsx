'use client'
import { useMemo, useRef } from 'react';
import { useDimension } from '@/hooks/useDimension';
import { useDeviceType } from '@/hooks/useDeviceType';
import { A4_PAGE } from '../constants.d';

type A4PageProps = {
  pageNumber?: number;
  children: React.ReactNode;
};

export function A4Page({ pageNumber, children }: A4PageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  console.log("renderizando <A4Page />")

  const { isBreakpoint } = useDeviceType();
  const { width: containerWidth, height: containerHeight } = useDimension({
    ref: containerRef as React.RefObject<HTMLElement>,
  });

  const scale = useMemo(() => {
    if (containerWidth === 0 || containerHeight === 0) return 1;

    const availableHeight = containerHeight - 64;

    const rawScale = Math.min(
      containerWidth / A4_PAGE.WIDTH,
      availableHeight / A4_PAGE.HEIGHT,
    );

    if (isBreakpoint(['mobile', 'mobileLarge'])) {
      return Math.min(rawScale, 1);
    }
    if (isBreakpoint(['tablet', 'tabletLarge'])) {
      return Math.min(rawScale, 0.85);
    }
    return Math.min(rawScale, 0.65);
  }, [containerWidth, containerHeight, isBreakpoint]);

  const isReady = containerWidth > 0 && containerHeight > 0;

  const previewStyle = {
    width: A4_PAGE.WIDTH,
    height: A4_PAGE.HEIGHT,
    minHeight: A4_PAGE.HEIGHT,
    transform: `scale(${scale})`,
    transformOrigin: 'top center',
  };

  console.log("is ready?: ", isReady)

  return (
    <div ref={containerRef} className="select-none">
      <div
        id="resume-preview"
        style={previewStyle}
        className="rounded-sm bg-white shadow-lg"
      >
        {isReady ? (
          children
        ) : (
          <LoadingResumePreview height={previewStyle.height} />
        )}
        {pageNumber !== undefined && (
          <span>{pageNumber}</span>
        )}
      </div>
    </div>
  );
}

interface LoadingResumePreviewProps {
  height: number;
  sections?: number;
  linesPerSection?: number;
}

function LoadingResumePreview({
  height,
  sections = 2,
  linesPerSection = 4,
}: LoadingResumePreviewProps) {
  return (
    <div
      className="flex w-full flex-col items-center justify-start space-y-10 bg-white p-10"
      style={{ height }}
    >
      {/* Foto de perfil opcional */}
      <div className="h-16 w-16 animate-pulse rounded-full bg-gray-200 mb-4"></div>

      {/* Encabezado del CV */}
      <div className="flex w-full flex-col items-center gap-3">
        <div className="h-6 w-2/3 animate-pulse rounded-md bg-gray-200"></div>
        <div className="h-4 w-1/3 animate-pulse rounded-md bg-gray-200"></div>
      </div>

      {/* Secciones del contenido */}
      {Array.from({ length: sections }).map((_, sectionIndex) => (
        <div key={sectionIndex} className="flex w-full flex-col space-y-3">
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
          {Array.from({ length: linesPerSection }).map((_, lineIndex) => (
            <div
              key={lineIndex}
              className={`h-3 animate-pulse rounded bg-gray-200 ${
                lineIndex % 3 === 0
                  ? 'w-full'
                  : lineIndex % 3 === 1
                  ? 'w-5/6'
                  : 'w-2/3'
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
