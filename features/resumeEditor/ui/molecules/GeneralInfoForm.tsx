'use client';

import { ResumeSectionHeader } from './ResumeSectionHeader';
// import { useDebouncedFormSync } from '@/hooks/useDebouncedFormSync';
import { useFieldTouched } from '@/hooks/useFieldTouched';
import { BasicInput } from '@/ui/atoms/BasicInput/BasicInput';


export function GeneralInfoForm() {
  const { touched, handleBlur } = useFieldTouched();

  // const { form, handleChange } = useDebouncedFormSync({
  //   initialValues: { title: 'Sin Titulo', description: '' },
  //   onDebouncedChange: (name, value) =>
  //     updateField({
  //       form: 'generalInfo',
  //       field: name as GeneralInfoFields,
  //       value,
  //     }),
  // });

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
          // value={form.title}
          // onChange={handleChange}
          // placeholder={form.title}
          onBlur={() => handleBlur('title')}
          // error={touched.title ? generalInfoErrors?.title : undefined}
        />
      </form>
    </div>
  );
}
