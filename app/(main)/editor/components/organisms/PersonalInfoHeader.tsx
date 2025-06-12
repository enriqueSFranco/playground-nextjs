import { FullPersonalInfo } from '@/app/(main)/lib/types';

interface PersonalInfoHeaderProps {
  personalInfo: FullPersonalInfo;
}

export function PersonalInfoHeader({ personalInfo }: PersonalInfoHeaderProps) {
  const { firstName, lastName, job, email, phone, image } = personalInfo;

  const fullName = `${firstName || ''} ${lastName || ''}`.trim();
  const contactDetailsExist = email || phone;

  return (
    <header
      className="w-full"
      aria-labelledby="personal-info-header"
    >
      {image && (
        <picture>
          <img
            src={""}
            alt="Imagen de perfil"
            className="h-24 w-24 rounded-full object-cover shadow-md transition-shadow duration-300 hover:shadow-xl"
            aria-hidden="true"
          />
        </picture>
      )}
      <div className="flex flex-1 flex-col items-start">
        <h2
          aria-label={`Nombre completo: ${fullName}`}
          className="text-3xl font-semibold tracking-tight text-gray-800"
        >
          {fullName ?? "Tu nombre"}
        </h2>
        <h3 className="text-xl font-medium text-gray-600">
          {job}
        </h3>
        {contactDetailsExist && (
          <ul className="flex justify-center items-center gap-x-1.5">
            {phone && (
              <li
                aria-label={`Teléfono: ${phone}`}
                className="text-sm text-gray-700"
              >
                <span>{phone ?? "5612345645"}</span>
              </li>
            )}
            {email && <span className="text-gray-500">&bull;</span>}
            {email && (
              <li
                aria-label={`Correo electrónico: ${email}`}
                className="text-sm text-gray-700"
              >
                <span>{email ?? "correo01@domain.com"}</span>
              </li>
            )}
          </ul>
        )}
      </div>
    </header>
  );
}
