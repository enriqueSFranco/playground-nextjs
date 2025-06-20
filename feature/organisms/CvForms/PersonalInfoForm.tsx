
import { ResumeSectionHeader } from '../../cvEditor/components/molecules/ResumeSectionHeader';
import { formatMexicanPhone } from '@/utils/formatMXPhone';
import { $resumeStore } from '@/store/editor';
import { FullPersonalInfo as FullPersonalInfoType } from '@/shared/types';
import { FileUploader } from '@/ui/atoms/FileUploader/FileUploader';
import { BasicInput } from '@/ui/atoms/BasicInput/BasicInput';

type FullPersonalInfo = keyof FullPersonalInfoType;

export function PersonalInfoForm() {
  const personalInfo = $resumeStore.selectors.useCvData().personalInfo;
  const updateField = $resumeStore.actions.updateField;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    updateField({
      form: 'personalInfo',
      field: name as FullPersonalInfo,
      value,
    });
  }

  function handleFormattedPhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    const { formatted } = formatMexicanPhone(value);
    updateField({
      form: 'personalInfo',
      field: 'phone',
      value: formatted,
    });
  }

  // console.log(personalInfo);
  return (
    <div className="bg-white rounded-lg p-5">
      <ResumeSectionHeader
        title="Sobre ti"
        description="Queremos conocerte un poco más"
      />
      <form className="flex flex-col gap-4">
        <FileUploader
          label="Foto"
          name="image"
          value={personalInfo.image}
          onFileChange={(file) =>
            updateField({
              form: 'personalInfo',
              field: 'image',
              value: file,
            })
          }
        />
        <div className="flex w-full items-center justify-between gap-8">
          <BasicInput
            label="Nombre(s)"
            name="firstName"
            placeholder="Jhon"
            value={personalInfo.firstName}
            onChange={handleChange}
            // error={errors.firstName && errors.firstName.message}
          />
          <BasicInput
            label="Apellidos"
            name="lastName"
            placeholder="Doe"
            value={personalInfo.lastName}
            onChange={handleChange}
          />
        </div>

        <BasicInput
          label="Puesto de trabajo deseado"
          name="job"
          placeholder="Frontend Developer React"
          value={personalInfo.job}
          onChange={handleChange}
        />
        <BasicInput
          label="Correo electrónico"
          name="email"
          placeholder="carlos@dominio.com"
          value={personalInfo.email}
          onChange={handleChange}
        />

        <BasicInput
          label="Teléfono"
          name="phone"
          placeholder="+52 55 1234 5678"
          value={personalInfo.phone}
          onChange={handleFormattedPhoneChange}
        />
      </form>
    </div>
  );
}
