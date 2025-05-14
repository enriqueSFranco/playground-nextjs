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
      className="w-full border-b-[1px] border-dashed border-neutral-300 bg-white px-4 py-2 transition-shadow duration-300 hover:shadow-sm"
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
