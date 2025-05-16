import { WorkExperience } from '@/app/(main)/lib/types';
import DOMPurify from 'isomorphic-dompurify';

interface WorkExperienceSectionProps {
  workExperiences: WorkExperience[];
}

export function WorkExperienceSection({
  workExperiences,
}: WorkExperienceSectionProps) {
  return (
    <section className="w-full bg-white px-4 py-2">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        Experiencia Laboral
      </h2>

      {workExperiences.length > 0 ? (
        <ul className="space-y-6">
          {workExperiences.map(
            ({ id, position, company, startDate, endDate, description }) => {
              const sanitizedText = DOMPurify.sanitize(description);
              return (
                <li key={id}>
                  <article className="">
                    <header className="mb-4 flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {position}{' '}
                        <span className="text-gray-600">
                          {company && `${company}`}
                        </span>
                      </h3>
                      <span className="text-sm text-gray-500">
                        {startDate} - {endDate}
                      </span>
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
      ) : (
        <p className="text-gray-500">
          No hay experiencias laborales disponibles.
        </p>
      )}
    </section>
  );
}
