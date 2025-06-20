import { FullPersonalInfo } from '@/shared/types';

interface PersonalInfoHeaderProps {
  resumeData: FullPersonalInfo;
}

function ProfileImage({ image }: { image: File }) {
  return (
    <picture className="inline-flex h-24 w-24 overflow-hidden">
      <img
        src={URL.createObjectURL(image)}
        alt={`Foto de perfil de ${image.name}`}
        className="aspect-square rounded-md object-contain shadow-md transition-shadow duration-300 hover:shadow-xl"
        aria-hidden="true"
      />
    </picture>
  );
}

export function PersonalInfoSection
({ resumeData }: PersonalInfoHeaderProps) {
  const { firstName, lastName, job, email, phone, image: profileImage } = resumeData;

  const fullName = [firstName, lastName].filter(Boolean).join(' ');
  const hasContact = email || phone;

  return (
    <section aria-labelledby="resume-personalInfo" role="region" data-testid="resume-personalInfo">
      {profileImage && (
        <ProfileImage image={profileImage} />
      )}
      <div className="line-clamp-5 flex flex-col items-start leading-6 tracking-widest" data-testid="resume-personalInfo-details">
        {fullName && <h2 className="text-3xl font-bold" data-testid="resume-fullName">{fullName}</h2>}
        {job && <h3 className="text-2xl font-light text-gray-500" data-testid="resume-job">{job}</h3>}
        {hasContact && (
          <ul className="flex items-center" aria-label="Información de contacto" data-testid="resume-contact">
            <li>
              <span className="text-xl">{email}</span>
            </li>
            <li aria-hidden="true">
              <span className="text-sm text-gray-500">&#8226;</span>
            </li>
            <li>
              <span className="text-xl">{phone}</span>
            </li>
          </ul>
        )}
      </div>
    </section>
  );
}
