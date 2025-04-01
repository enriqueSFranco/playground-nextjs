import { SparklesIcon } from '@heroicons/react/24/outline';
import Button from '@/components/atoms/Button/Button';
import { IconGrid } from '@/components/atoms/Icons/IconGrid';
import { CustomInput } from '@/components/atoms/CustomInput/CustomInput';
import { $editorStore } from '@/app/(main)/_shared-store/editor';
import { EditorForms, WorkExperience } from '@/app/(main)/lib/types';

type WorkExperienceFields = keyof EditorForms['workExperience'];

interface Props {
  form: WorkExperience;
}

export function WorkExperienceEntryForm({ form }: Props) {
  const { updateField, removeEntry } = $editorStore.actions;

  const { id, jobTitle, company, startDate, endDate, description } = form;
  console.log("id:",id)
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    updateField({form: 'workExperience', field: name as WorkExperienceFields, value, index: form.id});
  }

  function deleteForm() {
    removeEntry('workExperience', form.id)
  }

  return (
    <div className="borde-[1px] flex flex-col gap-4 rounded-sm border border-white/20 p-4">
      <header className="flex w-full flex-col gap-4">
        <div className="flex items-start justify-between">
          <h2 className="font-bold">Tu experiencia laboral {id}</h2>
          <IconGrid />
        </div>
        <div className="w-fit self-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[0.5px]">
          <Button className="transition-colors duration-300 ease-in-out hover:bg-transparent dark:bg-black">
            <SparklesIcon className="w-5" />
            <span>Generar con IA</span>
          </Button>
        </div>
      </header>
      <form action="" className="flex flex-col space-y-4">
        <CustomInput
          placeholder="Frontend Developer"
          name="jobTitle"
          label="Nombre del puesto"
          value={jobTitle}
          onChange={handleChange}
        />
        <CustomInput
          placeholder="Empresa XYZ"
          name="company"
          label="Empresa"
          value={company}
          onChange={handleChange}
        />
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between gap-8">
            <CustomInput
              type="date"
              name="startDate"
              label="Fecha de inicio"
              value={startDate}
              onChange={handleChange}
            />
            <CustomInput
              type="date"
              name="endDate"
              label="Fecha de finalización"
              value={endDate}
              onChange={handleChange}
            />
          </div>
          <p className="text-xs font-normal text-gray-300">
            Si trabajas aquí actualmente, deja la{' '}
            <span className="font-bold">fecha de finalización</span> sin llenar.
          </p>
        </div>
        {/* <TextEditor /> */}
      </form>
      <Button
        onClick={deleteForm}
        className="w-fit self-start outline-none dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
      >
        <span className="capitalize">eliminar</span>
      </Button>
    </div>
  );
}
