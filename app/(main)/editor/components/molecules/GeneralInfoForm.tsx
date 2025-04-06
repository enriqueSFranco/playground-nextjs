import { CustomInput } from '@/components/atoms/CustomInput/CustomInput';
import { CVSectionHeader } from './CVSectionHeader';
import { EditorForms } from '../../../lib/types';
import { $editorStore } from '../../../_shared-store/editor';

type GeneralInfoFields = keyof EditorForms['generalInfo']

export function GeneralInfoForm() {
  const { generalInfo } = $editorStore.selectors.useCurriculumData();
  const { updateField } = $editorStore.actions;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "title" || name === "description") {
      updateField({form: 'generalInfo', field: name as GeneralInfoFields, value});
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col space-y-6">
      <CVSectionHeader
        title="Información general"
        description="Esta sección no aparecerá en tu currículum."
      />

      <form className="flex flex-col justify-start space-y-8">
        <CustomInput
          label="Título del currículum"
          name="title"
          value={generalInfo.title}
          onChange={handleChange}
          placeholder="CV Salinas Franco Carlos (Frontend Developer)"
        />
        <CustomInput
          label="Descripción"
          name="description"
          value={generalInfo.description}
          onChange={handleChange}
          placeholder="Curriculumn orientado a Frontend con experiencia en React"
        />
      </form>
    </div>
  );
}
