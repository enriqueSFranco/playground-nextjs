import { WorkExperience } from '@/shared/types';
import { sanitizeHTML } from '@/utils/sanitizeHTML';

interface WorkExperienceSectionProps {
  resumeData: WorkExperience[];
}

export function WorkExperienceSection({
  resumeData,
}: WorkExperienceSectionProps) {
  return (
    <section>
      {resumeData && (
        <header>
          <h2 className="mb-2 text-2xl font-semibold text-gray-600">
            Experiencia Laboral
          </h2>
        </header>
      )}
      {resumeData.length > 0 ? (
        <ul className="space-y-6">
          {resumeData.map(
            ({ id, position, company, startDate, endDate, description }) => {
              const sanitizedText = sanitizeHTML(description);
              return (
                <li key={id}>
                  <article className="text-sm text-gray-600">
                    <header className="mb-4 flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {position}{' '}
                        <span className="text-gray-600">
                          {company && `${company}`}
                        </span>
                      </h3>
                      {startDate || endDate ? (
                      <div className="flex items-center gap-2">
                        {startDate && (
                          <span className="text-sm">
                            {formattedDate(new Date(startDate))}
                          </span>
                        )}
                        {endDate && (
                          <span className="text-sm">
                            {formattedDate(new Date(endDate))}
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
            },
          )}
        </ul>
      ) : null}
    </section>
  );
}

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
const fecha = new Date('2026-04-16T00:00:00');
console.log(formattedDate(fecha)); // "16/Abril/2026"
