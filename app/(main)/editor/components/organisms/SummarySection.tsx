import { ProfessionalProfile } from "@/app/(main)/lib/types";

interface ProfesionalSummaryProps {
  professionalSumary: ProfessionalProfile;
}

export function SummarySection({ professionalSumary }: ProfesionalSummaryProps) {
  const { resumeProfile } = professionalSumary;
  return (
    <div className="w-full max-w-3xl px-4 py-2">
      <p
        className="line-clamp-4 text-base leading-relaxed text-gray-700"
        aria-label="Resumen profesional"
      >
        {resumeProfile}
      </p>
    </div>
  );
}