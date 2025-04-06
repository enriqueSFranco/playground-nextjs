import { CVSectionHeader } from '@/app/(main)/editor/components/molecules/CVSectionHeader';
import { DynamicList } from '@/components/organisms/DynamicList/DynamicList';
import { EducationEntryForm } from '@/app/(main)/editor/components/molecules/EducationEntryForm';
import { useEditorStore } from '../../../_shared-store/editor';

export function EducationForm() {
  const forms = useEditorStore(state => state.curriculumData.workExperience)

  return (
    <div className="flex flex-col gap-4">
      <CVSectionHeader
        title="Educación"
        description="Comparte un breve resumen sobre tu carrera, habilidades y lo que te hace destacar en tu campo."
      />
      <DynamicList
        items={forms}
        renderItem={() => <EducationEntryForm />}
        keyPrefix='educationEntry'
        direction='vertical'
      />
    </div>
  );
}
