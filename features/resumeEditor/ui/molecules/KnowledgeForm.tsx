import { useCallback } from 'react';
import { $resumeStore } from '@/store/editor';
import { ResumeSectionHeader } from './ResumeSectionHeader';
import { Tiptap } from '@/ui/organisms/TipTap/TipTap';

export function KnowledgeForm() {

  // const handleChange = useCallback(
  //   (value: string) => {
  //     updateField({
  //       form: 'knowledge',
  //       field: 'skills',
  //       value,
  //     });
  //   },
  //   [updateField],
  // );

  return (
    <div className="bg-white p-2">
      <ResumeSectionHeader
        title="Tus habilidades técnicas"
        description="Agrega lo que sabes usar y lo que mejor manejas en tu trabajo."
      />

      {/* <Tiptap content="" onChange={handleChange} /> */}
    </div>
  );
}
