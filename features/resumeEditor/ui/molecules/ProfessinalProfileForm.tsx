import type { JSONContent } from '@tiptap/react';
import { ResumeSectionHeader } from './ResumeSectionHeader';
import { Tiptap } from '@/ui/organisms/TipTap/TipTap';
import { Button } from '@/ui/atoms/Button/Button';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { updateField } from '@/lib/redux/features/resume/resume.slice';
import { selectFieldByPath } from '@/lib/redux/features/resume/resume.selector';

export function ProfessionalProfileForm() {
  const dispatch = useAppDispatch()
  const biographyContent = useAppSelector(selectFieldByPath("careerSummary.biography"));

  const handleEditorChange = (jsonContent: JSONContent) => {
    dispatch(updateField({
      fieldPath: "careerSummary.biography",
      value: jsonContent,
    }));
  };

  return (
    <div className="flex flex-col items-center w-full gap-2 bg-white rounded-lg p-5">
      <ResumeSectionHeader
        title="perfil profesional"
         description="Impresiona en pocas palabras: menciona tu especialidad, cuánta experiencia tienes y en qué te destacas. Hazlo breve, concreto y memorable."
      />

      <Tiptap
        content={biographyContent || { type: 'doc', content: [] }}
        onChange={handleEditorChange}
      />
      <Button className=''>
        <span>Generar con IA</span>
      </Button>
    </div>
  );
}
