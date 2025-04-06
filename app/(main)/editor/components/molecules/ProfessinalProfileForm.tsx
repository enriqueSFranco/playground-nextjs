import { useCallback } from 'react';
import { $editorStore } from '../../../_shared-store/editor';
import { CVSectionHeader } from './CVSectionHeader';
import { Tiptap } from '@/components/organisms/TipTap/TipTap';

export function ProfessionalProfileForm() {
  const {professionalProfile} = $editorStore.selectors.useCurriculumData()
  const { updateField } = $editorStore.actions;

  const handleChange = useCallback((value: string) => {
    updateField({
      form: 'professionalProfile',
      field: 'resumeProfile',
      value,
    });
  }, [updateField]);
  
  return (
    <div className="flex flex-col gap-4">
      <CVSectionHeader
        title="perfil profesional"
        description="Comparte un breve resumen sobre tu carrera, habilidades y lo que te hace destacar en tu campo."
      />

      <Tiptap content={professionalProfile.resumeProfile} onChange={handleChange} />
    </div>
  );
}
