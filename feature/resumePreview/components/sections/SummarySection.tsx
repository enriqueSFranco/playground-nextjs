import { ProfessionalProfile } from '@/shared/types';
import { sanitizeHTML } from '@/utils/sanitizeHTML';

interface ProfesionalSummaryProps {
  resumeData: ProfessionalProfile;
}

export function SummarySection({
  resumeData,
}: ProfesionalSummaryProps) {
  const { resumeProfile } = resumeData;
  return (
    <section className="w-full">
      {resumeProfile && <header>
        <h2 className="mb-2 text-2xl font-bold capitalize text-gray-600">
          perfil profesional
        </h2>
      </header>}
      {resumeProfile ? (
        <div
          className="border border-red-500"
          aria-label="Resumen profesional"
          dangerouslySetInnerHTML={{ __html: sanitizeHTML(resumeProfile) }}
        />
      ) : null}
    </section>
  );
}
