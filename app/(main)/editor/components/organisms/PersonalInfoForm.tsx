// import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import { DocumentIcon } from '@heroicons/react/24/outline';
import { CustomInput } from '@/components/atoms/CustomInput/CustomInput';
import { CVSectionHeader } from '../molecules/CVSectionHeader';
import { $editorStore } from '../../../_shared-store/editor';
import { FullPersonalInfo as FullPersonalInfoType } from '../../../lib/types';
import { fullPersonalInfoSchem } from '@/app/(main)/lib/schemas';

type FullPersonalInfo = keyof FullPersonalInfoType

export function PersonalInfoForm() {
  const personalInfo = $editorStore.selectors.useCurriculumData().personalInfo;
  const updateField = $editorStore.actions.updateField
  // const {register, formState: {errors}, trigger, setValue} = useForm<FullPersonalInfoType>({
  //   resolver: zodResolver(fullPersonalInfoSchem),
  //   defaultValues: personalInfo,
  //   mode: 'onChange'
  // })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target

    updateField({form:'personalInfo', field: name as FullPersonalInfo, value})
    // setValue(name as FullPersonalInfo, value)
    // trigger(name as FullPersonalInfo)
  }
  return (
    <div>
      <CVSectionHeader
        title="Información Personal"
        description="Cuentanos sobre ti"
      />
      <form action="" className="flex flex-col space-y-8 mt-6">
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
          <CustomInput
            // {...register("firstName", { required: true })}
            label="Nombre(s)"
            name="firstName"
            placeholder="Jhon"
            value={personalInfo.firstName}
            onChange={handleChange}
            // error={errors.firstName && errors.firstName.message}
          />
          <CustomInput
            label="Apellidos"
            name="lastName"
            placeholder="Doe"
            value={personalInfo.lastName}
            onChange={handleChange}
            // {...register("lastName"), {require: true}}
          />
        </div>

        <CustomInput
          label="Especialidad"
          name="job"
          placeholder="Frontend Developer React"
          value={personalInfo.job}
          onChange={handleChange}
          // {...register("job"), {require: true}}
        />

        <CustomInput
          label="Telefono"
          name="phone"
          placeholder="5598674501"
          value={personalInfo.phone}
          onChange={handleChange}
        />
        <CustomInput
          label="Correo electronico"
          name="email"
          placeholder="carlos@dominio.com"
          value={personalInfo.email}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
