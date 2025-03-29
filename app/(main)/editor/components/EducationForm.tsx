import { useState } from 'react';
import type { Education } from '@/lib/schemas';
import { CVSectionHeader } from '@/app/(main)/editor/components/molecules/CVSectionHeader';
import { DynamicList } from '@/components/organisms/DynamicList/DynamicList';
import { EducationEntryForm } from '@/app/(main)/editor/components/molecules/EducationEntryForm';

export function EducationForm() {
  const [educationalBackground, setEducationalBackground] = useState<
    Education[]
  >([]);

  function addEducation() {
    const newForm: Education = {
      degree: '',
      school: '',
      startDate: '',
      endDate: '',
    };

    setEducationalBackground((prevEducation) => [...prevEducation, newForm]);
  }

  return (
    <div className="flex flex-col gap-4">
      <CVSectionHeader
        title="Educación"
        description="Comparte un breve resumen sobre tu carrera, habilidades y lo que te hace destacar en tu campo."
      />
      <DynamicList
        items={educationalBackground}
        renderItem={() => <EducationEntryForm />}
        keyPrefix='educationEntry'
        direction='vertical'
      />
    </div>
  );
}
