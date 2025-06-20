import { useCallback } from 'react';
import { ResumeSectionHeader } from './ResumeSectionHeader';

import { $resumeStore } from '@/store/editor';
import { Tiptap } from '@/ui/organisms/TipTap/TipTap';
import { Button } from '@/ui/atoms/Button/Button';

export function ProfessionalProfileForm() {
  const {professionalProfile} = $resumeStore.selectors.useCvData()
  const { updateField } = $resumeStore.actions;

  const handleChange = useCallback((value: string) => {
    updateField({
      form: 'professionalProfile',
      field: 'resumeProfile',
      value,
    });
  }, [updateField]);

  return (
    <div className="flex flex-col items-center w-full gap-2 bg-white rounded-lg p-5">
      <ResumeSectionHeader
        title="perfil profesional"
         description="Impresiona en pocas palabras: menciona tu especialidad, cuánta experiencia tienes y en qué te destacas. Hazlo breve, concreto y memorable."
      />

      <Tiptap content={professionalProfile.resumeProfile} onChange={handleChange} />
      <Button className=''>
        <span>Generar con IA</span>
      </Button>
    </div>
  );
}
