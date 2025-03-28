import { useEffect, useState } from 'react';
import { EditorFormProps } from '@/lib/types';
import { TextField } from './text-field';
import { CVSectionHeader } from './CVSectionHeader';
import { GeneralInfo } from '@/lib/schemas';
import { useForm } from '@/hooks/useForm';

export function GeneralInfoForm({curriculumData, setCurriculumData}: EditorFormProps) {

  const {form, handleChange} = useForm<GeneralInfo>({title: curriculumData.title || "", description: curriculumData.description || ""})

  useEffect(() => {
    if (form.title !== curriculumData.title || form.description !== curriculumData.description) {
      setCurriculumData({ ...curriculumData, ...form });
    }
  }, [form, curriculumData, setCurriculumData])

  return (
    <div className="mx-auto flex w-full flex-col space-y-6">
      <CVSectionHeader title='Información general' description='Esta sección no aparecerá en tu currículum.' />
      
      <form
        className="flex flex-col justify-start space-y-8"
      >
        <TextField
          label="Título del currículum"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="CV Salinas Franco Carlos (Frontend Developer)"
        />
        <TextField
          label="Descripción"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Curriculumn orientado a Frontend con experiencia en React"
        />
      </form>
    </div>
  );
}
