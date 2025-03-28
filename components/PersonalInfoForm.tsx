import { DocumentIcon } from '@heroicons/react/24/outline';
import { TextField } from './text-field';
import { CVSectionHeader } from './CVSectionHeader';
import { type EditorFormProps } from '@/lib/types';
import { useForm } from '@/hooks/useForm';
import { useEffect } from 'react';
import type { FullPersonalInfo } from '@/lib/schemas';

export function PersonalInfoForm({
  curriculumData,
  setCurriculumData,
}: EditorFormProps) {
  const { form, handleChange } = useForm<FullPersonalInfo>({
    firstName: curriculumData.firstName || '',
    lastName: curriculumData.lastName || '',
    phone: curriculumData.phone || '',
    email: curriculumData.email || '',
    job: curriculumData.job || '',
    image: curriculumData.image || undefined,
  });

  useEffect(() => {
    if (
      form.firstName !== curriculumData.firstName ||
      form.lastName !== curriculumData.lastName ||
      form.phone !== curriculumData.phone ||
      form.email !== curriculumData.email ||
      form.job !== curriculumData.job
    )
      setCurriculumData({ ...curriculumData, ...form });
  }, [form, curriculumData, setCurriculumData]);

  return (
    <div className="">
      <CVSectionHeader
        title="Información Personal"
        description="Cuentanos sobre ti"
      />
      <form action="" className="flex flex-col gap-4">
        <div className="flex w-1/2 m-auto items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-white/10 dark:border-white/20 dark:bg-black"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <DocumentIcon className="w-8 dark:stroke-white" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG or JPEG (MÁX. 5MB)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>

        <div className="flex w-full items-center justify-between gap-8">
          <TextField
            label="Nombre(s)"
            name="firstName"
            placeholder="Carlos Enrique"
            value={form.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Apellidos"
            name="lastName"
            placeholder="Salinas Franco"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

        <TextField
          label="Telefono"
          name="phone"
          placeholder="5598674501"
          value={form.phone}
          onChange={handleChange}
        />
        <TextField
          label="Correo electronico"
          name="email"
          placeholder="carlos@dominio.com"
          value={form.email}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
