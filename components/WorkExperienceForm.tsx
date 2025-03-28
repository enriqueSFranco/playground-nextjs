import { SparklesIcon } from '@heroicons/react/24/outline';
import Button from './button';
import { MyEditor } from './MyEditor';
import { TextField } from './text-field';
import { IconGrid } from './Icons';
import type { WorkExperience } from '@/lib/schemas';
import { useState } from 'react';

// TODO: Separar en un archivo independiente
function WorkExperienceItem({ id }: { id: number }) {
  return (
    <div className="flex flex-col gap-4 rounded-sm p-4 outline outline-[1px] outline-gray-600">
      <header className="flex w-full flex-col gap-4">
        <div className="flex items-start justify-between">
          <h2 className="font-bold">Tu experiencia laboral #{id + 1}</h2>
          <IconGrid />
        </div>
        <Button className="self-center">
          <SparklesIcon className="w-5" />
          <span>Generar con IA</span>
        </Button>
      </header>
      <form action="" className="flex flex-col space-y-4">
        <TextField
          placeholder="Frontend Developer"
          name="jobTitle"
          label="Nombre del puesto"
        />
        <TextField placeholder="Empresa XYZ" name="company" label="Empresa" />
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between gap-8">
            <TextField type="date" name="startDate" label="Fecha de inicio" />
            <TextField
              type="date"
              name="endDate"
              label="Fecha de finalización"
            />
          </div>
          <p className="text-xs font-normal text-gray-300">
            Si trabajas aquí actualmente, deja la{' '}
            <span className="font-bold">fecha de finalización</span> sin llenar.
          </p>
        </div>
        <MyEditor />
      </form>
      <Button className="mx-auto w-fit self-center bg-red-600 hover:bg-red-700">
        <span className="capitalize">eliminar</span>
      </Button>
    </div>
  );
}

export function WorkExperienceForm() {
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);

  function removeWorkExperience() {}

  function addWorkExperienceForm() {
    const newForm: WorkExperience = {
      jobTitle: '',
      company: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      description: '',
    };
    setWorkExperiences((prevWorkExperiences) => [
      ...prevWorkExperiences,
      newForm,
    ]);
  }
  return (
    <div className="flex flex-col gap-4">
      {workExperiences.length === 0 ? (
        <header>
          <p>Agrega tantas experiencias laborales como desees</p>
        </header>
      ) : (
        <ol className="flex flex-col gap-8">
          {workExperiences.map((_, idx) => (
            <li>
              <WorkExperienceItem
                key={`workExperienceId-${crypto.randomUUID()}`}
                id={idx}
              />
            </li>
          ))}
        </ol>
      )}
      <Button
        onClick={addWorkExperienceForm}
        className="w-fit dark:bg-white dark:text-black dark:hover:bg-slate-300"
      >
        Agregar experiencia laboral
      </Button>
    </div>
  );
}
