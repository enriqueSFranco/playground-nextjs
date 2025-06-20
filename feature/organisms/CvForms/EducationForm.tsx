import { ResumeSectionHeader } from '@/feature/cvEditor/components/molecules/ResumeSectionHeader';
import { EducationEntryForm } from '@/feature/cvEditor/components/molecules/EducationEntryForm';
import { useCvStore } from '@/store/editor/state';

export function EducationForm() {
  const forms = useCvStore((state) => state.cv.education);

  return (
    <div className="flex flex-col gap-4 bg-white p-2">
      <ResumeSectionHeader
        title="Tu educación"
        description="Cuéntanos dónde y qué has estudiado."
      />

      {/* <DynamicList
        items={forms}
        renderItem={() => <EducationEntryForm />}
        keyPrefix="educationEntry"
        direction="vertical"
      /> */}
    </div>
  );
}
