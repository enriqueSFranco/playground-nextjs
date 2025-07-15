'use client';

import {
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import { EmploymentHistory } from '@/shared/types';
import { sanitizeHTML } from '@/utils/sanitizeHTML';

type WorkExperienceSectionProps = {
  data: EmploymentHistory[]; // Array de experiencias laborales
  pageNumber?: number; // Para saber qué parte de la sección se renderiza
  isLastPage?: boolean; // Para saber si es la última parte de la sección
  // Otras props que necesites para la paginación
  // Por ejemplo, un prop para indicar qué índices de data renderizar
  startIndex?: number;
  endIndex?: number;
};

// Define la interfaz de lo que este componente "expone" a su padre via ref
export interface WorkExperienceSectionHandles {
  getHeight: () => number;
  getInnerElementHeights: () => Record<string, number>; // { 'job-id-1': height, 'job-id-2': height }
}

export const WorkExperienceSection = forwardRef<
  WorkExperienceSectionHandles,
  WorkExperienceSectionProps
>(({ data, pageNumber, isLastPage, startIndex, endIndex }, ref) => {
  const internalSectionDomRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});


  const currentData = data.slice(startIndex, endIndex);

  useImperativeHandle(ref, () => ({
    getHeight: () => internalSectionDomRef.current?.offsetHeight || 0,
    getInnerElementHeights: () => {
      const heights: Record<string, number> = {};
      for (const key in itemRefs.current) {
        if (itemRefs.current[key]) {
          heights[key] = itemRefs.current[key]?.offsetHeight || 0;
        }
      }
      return heights;
    },
  }));

  if (!data || data.length === 0) return null

  return (
    <section ref={internalSectionDomRef}>
      {data && (
        <header className="w-full">
          <h2 className="mb-2 text-2xl font-semibold text-gray-600">
            Experiencia Laboral
          </h2>
        </header>
      )}
      {data && (
        <ul className="space-y-6">
          {currentData.map((it) => {
            const sanitizedText = sanitizeHTML(it.description);
            return (
              <li key={it.id}>
                <article className="text-sm text-gray-600">
                  <header className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {it.position}{' '}
                      <span className="text-gray-600">
                        {it.company && `${it.company}`}
                      </span>
                    </h3>
                    {it.startDate || it.endDate ? (
                      <div className="flex items-center gap-2">
                        {it.startDate && (
                          <span className="text-sm">
                            {formattedDate(new Date(it.startDate))}
                          </span>
                        )}
                        {it.endDate && (
                          <span className="text-sm">
                            {formattedDate(new Date(it.endDate))}
                          </span>
                        )}
                      </div>
                    ) : null}
                  </header>
                  <div
                    className="leading-relaxed text-gray-700"
                    dangerouslySetInnerHTML={{ __html: sanitizedText }}
                  />
                </article>
              </li>
            );
          })}
        </ul>
      )}
      {!isLastPage && pageNumber && currentData.length < data.length ? (
        <p className="mt-2 text-center text-sm">Continued on next page...</p>
      ) : null}
    </section>
  );
});

WorkExperienceSection.displayName = 'WorkExperienceSection';

function formattedDate(input: Date): string {
  const dtf = new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long', // nombre completo del mes en español
    day: '2-digit',
    timeZone: 'America/Mexico_City',
  });

  // dtf.format devuelve algo como "16 de abril de 2026"
  const parts = dtf.formatToParts(input);

  // Extraemos partes para armar formato "16/Abril/2026"
  const day = parts.find((p) => p.type === 'day')?.value;
  // Capitalizar la primera letra del mes
  const month = parts.find((p) => p.type === 'month')?.value;
  const monthCapitalized = month
    ? month.charAt(0).toUpperCase() + month.slice(1)
    : '';
  const year = parts.find((p) => p.type === 'year')?.value;

  return `${day}/${monthCapitalized}/${year}`;
}

// Ejemplo de uso:
// const fecha = new Date('2026-04-16T00:00:00');
// console.log(formattedDate(fecha)); // "16/Abril/2026"
