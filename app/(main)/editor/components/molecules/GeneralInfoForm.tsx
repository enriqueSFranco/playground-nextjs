'use client';

import { useState } from 'react';
import { CustomInput } from '@/components/atoms/CustomInput/CustomInput';
import { CVSectionHeader } from './CVSectionHeader';
import { EditorForms } from '../../../lib/types';
import { $editorStore } from '../../../_shared-store/editor';
// import {z} from 'zod'
import { generalInfoSchema } from '@/app/(main)/lib/schemas';

type GeneralInfoFields = keyof EditorForms['generalInfo']

export function GeneralInfoForm() {
  const [errors, setErrors] = useState<Record<GeneralInfoFields, string>>({
    title: '',
    description: ''
  })
  const { generalInfo } = $editorStore.selectors.useCurriculumData();
  const { updateField } = $editorStore.actions;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    updateField({form: 'generalInfo', field: name as GeneralInfoFields, value});
    const fieldSchema = generalInfoSchema.shape[name as GeneralInfoFields]
    const result = fieldSchema.safeParse(value)

    setErrors(prevState => ({
      ...prevState,
      [name]: result.success ? '' : result.error.issues[0].message || 'Error'
    }))
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
          error={errors.title}
        />
        <CustomInput
          label="Descripción"
          name="description"
          value={generalInfo.description}
          onChange={handleChange}
          placeholder="Curriculumn orientado a Frontend con experiencia en React"
          error={errors.description}
        />
      </form>
    </div>
  );
}
