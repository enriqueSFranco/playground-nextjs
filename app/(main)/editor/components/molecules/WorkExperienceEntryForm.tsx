import { useCallback, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/atoms/Button/Button';
import { IconGrid } from '@/components/atoms/Icons/IconGrid';
import { CustomInput } from '@/components/atoms/CustomInput/CustomInput';
import { $editorStore } from '@/app/(main)/_shared-store/editor';
import { EditorForms, WorkExperience } from '@/app/(main)/lib/types';
import { Tiptap } from '@/components/organisms/TipTap/TipTap';
import Link from 'next/link';

type WorkExperienceFields = keyof EditorForms['workExperience'];

interface Props {
  form: WorkExperience;
}

export function WorkExperienceEntryForm({ form }: Props) {
  const [isOpen, updateIsOpen] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: form.id,
    });
  const { updateField, removeEntry } = $editorStore.actions;

  const { id, position, company, startDate, endDate, description } = form;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    updateField({
      form: 'workExperience',
      field: name as WorkExperienceFields,
      value,
      index: id,
    });
  }

  function toggleModal(id: string) {
    console.log(`se abrio la modal con id ${id}`)
    updateIsOpen(prevState => !prevState)
  }

  const handleChange = useCallback(
    (value: string) => {
      updateField({
        form: 'workExperience',
        field: 'description' as WorkExperienceFields,
        value: value,
        index: id,
      });
    },
    [updateField, id],
  );

  function deleteForm() {
    // http://localhost:3000/editor?curriculumId=sfhsdbfskfsd7s87&show=true&step=work-experience
    removeEntry('workExperience', form.id);
  }

  return (
    <div className="borde-[1px] w-full flex flex-col gap-4 p-4">
      <header className="flex w-full flex-col gap-4">
        <div className="flex items-start justify-between">
          <h2 className="font-bold">Tu experiencia laboral {position}</h2>
          <div ref={setNodeRef} {...attributes} {...listeners}>
            <IconGrid />
          </div>
        </div>
        <div className="m-auto hover-conic-border transition-colors ease-in-out w-fit rounded-sm p-px">
          <Link href={``} className="m-auto flex items-center justify-between bg-neutral-900" onClick={() => toggleModal(form.id)}>
            <SparklesIcon className="w-5" />
            <span>Generar con IA</span>
          </Link>
        </div>
      </header>
      <form className="flex flex-col space-y-4">
        <CustomInput
          placeholder="Frontend Developer"
          name="position"
          label="Nombre del puesto"
          value={position}
          onChange={handleInputChange}
        />
        <CustomInput
          placeholder="Empresa XYZ"
          name="company"
          label="Empresa"
          value={company}
          onChange={handleInputChange}
        />
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between gap-8">
            <CustomInput
              type="date"
              name="startDate"
              label="Fecha de inicio"
              value={startDate}
              onChange={handleInputChange}
            />
            <CustomInput
              type="date"
              name="endDate"
              label="Fecha de finalización"
              value={endDate}
              onChange={handleInputChange}
            />
          </div>
          <p className="text-xs font-normal text-gray-300">
            Si trabajas aquí actualmente, deja la{' '}
            <span className="font-bold">fecha de finalización</span> sin llenar.
          </p>
        </div>

          <Tiptap content={description} onChange={handleChange} />
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
