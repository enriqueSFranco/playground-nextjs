import { useRef } from 'react';
import { PaintBrushIcon, StopIcon } from '@heroicons/react/24/outline';
import DOMPurify from "isomorphic-dompurify"
import { $editorStore } from '../../_shared-store/editor';
import { useDimension } from '@/hooks/useDimension';
import { cn } from '../../lib/utils';
import {
  FullPersonalInfo,
  ProfessionalProfile,
  WorkExperience,
} from '../../lib/types';

function CVPreviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimension({ containerRef });
  const data = $editorStore.selectors.useCurriculumData();

  const { personalInfo, professionalProfile, workExperience } = data;
  
  return (
    <div
      className={cn('aspect-[210/297] h-fit w-full bg-white text-black')}
      ref={containerRef}
    >
      <div
        className={cn(
          'flex w-full flex-col justify-center overflow-y-auto',
          !width && 'invisible',
        )}
        style={{ zoom: (1 / 794) * width }}
      >
        <PersonalInfoHeader personalInfo={personalInfo} />
        <SummarySection professionalSumary={professionalProfile} />
        <WorkExperienceSection workExperiences={workExperience} />
      </div>
    </div>
  );
}

export function CVPreview() {
  return (
    <article className="group relative hidden w-full bg-gray-100 md:flex md:w-1/2">
      <div className="absolute left-1 top-1 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-3 lg:top-3 xl:opacity-100">
        {/* opciones */}
      </div>
      <div className="bg-secondary flex w-full justify-center overflow-y-auto p-2">
        <CVPreviewSection />
      </div>
    </article>
  );
}

interface PersonalInfoHeaderProps {
  personalInfo: FullPersonalInfo;
}
function PersonalInfoHeader({ personalInfo }: PersonalInfoHeaderProps) {
  const { firstName, lastName, job, email, phone, image } = personalInfo;

  const fullName = `${firstName || ''} ${lastName || ''}`.trim();
  const contactDetailsExist = email || phone;

  return (
    <header
      className={`w-full max-w-4xl border border-gray-200 bg-white px-4 py-2 transition-shadow duration-300 hover:shadow-sm`}
      aria-labelledby="personal-info-header"
    >
      {image && (
        <img
          src={image}
          alt="Imagen de perfil"
          className="h-24 w-24 rounded-full object-cover shadow-md transition-shadow duration-300 hover:shadow-xl"
          aria-hidden="true"
        />
      )}
      <div className="flex flex-1 flex-col items-start gap-4">
        <h2
          aria-label={`Nombre completo: ${fullName}`}
          className="text-3xl font-semibold tracking-tight text-gray-800"
        >
          {fullName || 'Peter Benjamin Parker'}
        </h2>
        <h3 className="text-xl font-medium text-gray-600">
          {job || 'Superheroe'}
        </h3>
        {contactDetailsExist && (
          <ul className="flex items-center gap-4">
            {phone && (
              <li
                aria-label={`Teléfono: ${phone}`}
                className="text-sm text-gray-700"
              >
                <span>{phone}</span>
              </li>
            )}
            {email && (
              <li
                aria-label={`Correo electrónico: ${email}`}
                className="text-sm text-gray-700"
              >
                <span>{email}</span>
              </li>
            )}
          </ul>
        )}
      </div>
    </header>
  );
}

interface ProfesionalSummaryProps {
  professionalSumary: ProfessionalProfile;
}

function SummarySection({ professionalSumary }: ProfesionalSummaryProps) {
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

interface WorkExperienceSectionProps {
  workExperiences: WorkExperience[];
}

function WorkExperienceSection({
  workExperiences,
}: WorkExperienceSectionProps) {
  console.log(workExperiences)
  return (
    <section className="w-full bg-white px-4 py-2">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        Experiencia Laboral
      </h2>

      {workExperiences.length > 0 ? (
        <ul className="space-y-6">
          {workExperiences.map(
            ({ id, position, company, startDate, endDate, description }) => {
              const sanitizedText = DOMPurify.sanitize(description)
              return (
                <li
                key={id}
                
              >
                <article className="">
                  <header className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {position}{' '}
                      <span className="text-gray-600">{company && `${company}`}</span>
                    </h3>
                    <span className="text-sm text-gray-500">
                      {startDate} - {endDate}
                    </span>
                  </header>
                  <div className="leading-relaxed text-gray-700" dangerouslySetInnerHTML={{__html: sanitizedText}} />
                </article>
              </li>
              )
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
