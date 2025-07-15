import { ResumeSectionHeader } from "@/features/resumeEditor/ui/molecules/ResumeSectionHeader";

export function EducationForm() {
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
