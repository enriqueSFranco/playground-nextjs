import { ResumeSectionHeader } from '../../resumeEditor/ui/molecules/ResumeSectionHeader';
import { formatMexicanPhone } from '@/utils/formatMXPhone';
import { FileUploader } from '@/ui/atoms/FileUploader/FileUploader';
import { BasicInput } from '@/ui/atoms/BasicInput/BasicInput';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { updateField } from '@/lib/redux/features/resume/resume.slice';
import { selectFieldByPath } from '@/lib/redux/features/resume/resume.selector';
import { uploadImage } from '@/lib/redux/features/resume/resume.thunk';
import { selecImageUploadStatus } from '@/lib/redux/features/resume/resumeUI.slice';

export function PersonalDetailsForm() {
  const dispatch = useAppDispatch();
  const form = useAppSelector(selectFieldByPath('personalDetails'));
  const imageUploadStatus = useAppSelector((state) =>
    selecImageUploadStatus(state),
  );

  const handleChange = (field: string, value: string) => {
    dispatch(
      updateField({
        fieldPath: `personalDetails.${field}`,
        value,
      }),
    );
  };

  const handleFormattedPhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, name } = e.target;
    const { formatted } = formatMexicanPhone(value);
    dispatch(
      updateField({
        fieldPath: `personalDetails.${name}`,
        value: formatted,
      }),
    );
  };

  const handleFileSelecte = async (file: File | null) => {
    if (file) {
      const previewURL = URL.createObjectURL(file);
      dispatch(
        updateField({
          fieldPath: 'personalDetails.image',
          value: {
            name: file.name,
            previewURL,
            size: file.size,
          },
        }),
      );
      dispatch(uploadImage(file));
    }

    return (
      <div className="rounded-lg bg-white p-5">
        <ResumeSectionHeader
          title="Sobre ti"
          description="Queremos conocerte un poco más"
        />
        <form className="flex flex-col gap-4">
          <FileUploader
            onFileSelect={handleFileSelecte}
            uploadedUrl={form.image.previewURL}
            loading={imageUploadStatus.status === 'loading'}
            errorMessage={imageUploadStatus.errorMessage ?? ''}
          />
          <div className="flex w-full items-center justify-between gap-8">
            <BasicInput
              label="Nombre(s)"
              name="firstName"
              value={form.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              // error={errors.firstName && errors.firstName.message}
            />
            <BasicInput
              label="Apellidos"
              name="lastName"
              value={form.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
            />
          </div>

          <BasicInput
            label="Puesto de trabajo deseado"
            name="job"
            value={form.job}
            onChange={(e) => handleChange('job', e.target.value)}
          />
          <BasicInput
            label="Correo electrónico"
            name="email"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />

          <BasicInput
            label="Teléfono"
            name="phone"
            value={form.phone}
            onChange={handleFormattedPhoneChange}
          />
        </form>
      </div>
    );
  };
}
