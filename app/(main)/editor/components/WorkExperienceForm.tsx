import { useEffect, useRef, useState } from 'react';
import type { WorkExperience } from '@/lib/schemas';
import { EditorForm } from '@/lib/types';
import Button from '@/components/atoms/Button/Button';
import { WorkExperienceEntryForm } from '@/app/(main)/editor/components/molecules/WorkExperienceEntryForm';
import { DynamicList } from '@/components/organisms/DynamicList/DynamicList';

type workExperienceFormWithId = WorkExperience & {
  id: string;
};

export function WorkExperienceForm({
  curriculumData,
  setCurriculumData,
}: EditorForm) {
  const [workExperiences, setWorkExperiences] = useState<
    workExperienceFormWithId[]
  >([]);
  const listRef = useRef<HTMLOListElement | null>(null);

  useEffect(() => {
    if (workExperiences.length > 0 && listRef.current) {
      // Nos aseguramos de hacer scroll hacia el último elemento
      setTimeout(() => {
        const lastItem = listRef.current?.lastElementChild;
        if (lastItem) {
          lastItem.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 50);
    }
  }, [workExperiences]);

  function removeWorkExperience(id: string) {
    const newExperiences = workExperiences.filter((form) => form.id !== id);
    setWorkExperiences(newExperiences);
  }

  function addWorkExperienceForm() {
    const newForm: WorkExperience & { id: string } = {
      id: crypto.randomUUID(),
      jobTitle: '',
      company: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      workExperienceDescription: '',
    };
    setWorkExperiences((prevWorkExperiences) => [
      ...prevWorkExperiences,
      newForm,
    ]);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* TODO: Usar el componente CVHeader */}
      <header className="flex flex-col items-center justify-center">
        <h2 className="text-2xl">Experiencia laboral</h2>
        <p className="text-sm text-gray-400">
          Agrega tantas experiencias laborales como desees
        </p>
      </header>

      <DynamicList
        items={workExperiences}
        renderItem={(workExperience, _) => (
          <WorkExperienceEntryForm
            id={workExperience.id}
            onRemove={removeWorkExperience}
            curriculumData={curriculumData}
            setCurriculumData={setCurriculumData}
          />
        )}
        keyPrefix="workExperienceEntry"
        direction="vertical"
      />

      <Button
        className="dark:bg-white dark:text-black"
        onClick={addWorkExperienceForm}
      >
        Agregar experiencia laboral
      </Button>
    </div>
  );
}
