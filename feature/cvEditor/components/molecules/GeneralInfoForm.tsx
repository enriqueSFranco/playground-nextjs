'use client';

import { ResumeSectionHeader } from './ResumeSectionHeader';
import { useDebouncedFormSync } from '@/hooks/useDebouncedFormSync';
import { useFieldTouched } from '@/hooks/useFieldTouched';
import { CVStepForms } from '@/shared/types';
import { $resumeStore } from '@/store/editor';
import { BasicInput } from '@/ui/atoms/BasicInput/BasicInput';

type GeneralInfoFields = keyof CVStepForms['generalInfo'];

export function GeneralInfoForm() {
  const { touched, handleBlur } = useFieldTouched();
  const { updateField } = $resumeStore.actions;
  const { generalInfo: generalInfoErrors } =
    $resumeStore.selectors.useCvFormError();
  const { form, handleChange } = useDebouncedFormSync({
    initialValues: { title: 'Sin Titulo', description: '' },
    onDebouncedChange: (name, value) =>
      updateField({
        form: 'generalInfo',
        field: name as GeneralInfoFields,
        value,
      }),
  });

  return (
    <div className="mx-auto flex h-full w-full flex-col space-y-6 bg-white p-5">
      <ResumeSectionHeader
        title="Detalles del CV"
        description="Esta información es solo para ti, no aparecerá en el currículum."
      />

      <form className="mt-6 flex flex-col space-y-8">
        <BasicInput
          label=""
          name="title"
          value={form.title}
          onChange={handleChange}
          onBlur={() => handleBlur('title')}
          placeholder={form.title}
          error={touched.title ? generalInfoErrors?.title : undefined}
        />
        {/* <div className="flex flex-col gap-2">
          <BasicInput
            label="Descripción"
            name="description"
            value={form.description}
            onChange={handleChange}
            onBlur={() => handleBlur('description')}
            placeholder="Curriculumn orientado a Frontend con experiencia en React"
            error={
              touched.description ? generalInfoErrors?.description : undefined
            }
          />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Describe para qué sirve este currículum
          </p>
        </div> */}
      </form>
    </div>
  );
}
