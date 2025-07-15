import type { ZodSchema } from 'zod';
import { nanoid } from 'nanoid'
import { ResumeStepForms, Education, WorkExperience } from '@/shared/types';

// Creación de entradas vacías reutilizable
const createEmptyEntry = <T extends Education | WorkExperience>(type: 'education' | 'workExperience'): T => {
  if (type === 'education') {
    return {
      id: nanoid(10),
      degree: '',
      school: '',
      startDate: '',
      endDate: '',
    } as T;
  }

  return {
    id: nanoid(10),
    company: '',
    description: '',
    position: '',
    startDate: '',
    endDate: '',
  } as T;
};

function validateForm<T>({
  formData,
  schema,
}: {
  formData: T;
  schema: ZodSchema<T>;
}): {
  success: boolean;
  errors?: Record<string, string>;
} {
  const result = schema.safeParse(formData);
  if (result.success) {
    return {
      success: true,
    };
  } else {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as string;
      errors[key] = issue.message;
    }
    return { success: false, errors };
  }
}

function setSafeField<T extends object, K extends keyof T>(
  obj: T,
  field: K,
  value: T[K]
) {
  obj[field] = value
}


type ActionsType = {
  updateField: <T extends keyof ResumeStepForms>(args: {
    form: T,
    field: keyof ResumeStepForms[T] extends string ? keyof ResumeStepForms[T] : string,
    value: any,
    id?: string,
  }) => void;
  updateFieldFile: <T extends keyof ResumeStepForms>(args: {
    form: T;
    field: keyof ResumeStepForms[T];
  }) => void;
  addEntry: <T extends 'education' | 'workExperience'>(form: T) => T extends 'education' ? Education : WorkExperience;
  reorderEntries: <T extends 'workExperience' | 'education'>(form: T, newOrder: string[]) => void;
  removeEntry: <T extends keyof ResumeStepForms>(form: T, id: string) => void;
};

export const actions: ActionsType = {
  updateField: ({ form, field, value, id }) => {
    const set = store.setState;

    set((state) => {
      const formData = state.resume[form];
      let updatedFormData;

      if (Array.isArray(formData)) {
        updatedFormData = formData.map((entry) =>
          entry.id === id ? { ...entry, [field]: value } : entry
        );
        console.log(updatedFormData)
      } else if (formData && typeof formData === "object") {
        updatedFormData = {
          ...formData,
          [field]: value,
        };
      } else {
        updatedFormData = formData;
      }

      const schema = schemasMap[form];
      let errors = {};
      if (schema) {
        const validation = validateForm({
          formData: updatedFormData,
          schema,
        });
        if (!validation.success) {
          console.warn("Validation errors", validation.errors);
          errors = validation.errors as any;
        }
      }

      return {
        ...state,
        resume: {
          ...state.resume,
          [form]: updatedFormData,
        },
        errors: {
          ...state.errors,
          [form]: errors,
        },
      };
    });
  },
  updateFieldFile: <T extends keyof ResumeStepForms>({
    form,
    field,
  }: {
    form: T;
    field: keyof ResumeStepForms[T];
  }) => {
    const set = store.setState;

    return (file: File | null) => {
      set((state) => {
        const formData = state.resume[form];
        if (
          formData &&
          typeof formData === 'object' &&
          !Array.isArray(formData)
        ) {
          formData[field] = file as ResumeStepForms[T][keyof ResumeStepForms[T]];
        }
      });
    };
  },
  addEntry: <T extends keyof Pick<ResumeStepForms, 'education' | 'workExperience'>>(
    form: T
  ) => {
    const set = store.setState;

    if (form === 'workExperience') {
      const newEntry: WorkExperience = createEmptyEntry('workExperience');
      set((state) => {
        state.resume.workExperience.push(newEntry);
      });
      return newEntry as T extends 'education' ? never : WorkExperience;
    }

    if (form === 'education') {
      const newEntry: Education = createEmptyEntry('education');
      set((state) => {
        state.resume.education.push(newEntry);
      });
      return newEntry as T extends 'education' ? Education : never;
    }

    throw new Error('Unsupported form type');
  },
  reorderEntries: <T extends 'workExperience' | 'education'>(form: T, newOrder: string[]) => {
    const set = store.setState;

    set(state => {
      const formData = state.resume[form]
      if (Array.isArray(formData)) {
        const reordered = newOrder.map(id => formData.find(item => item.id === id)).filter(Boolean)
        // Solo si todos los elementos fueron encontrados
        if (reordered.length === formData.length) {
          state.resume[form] = reordered as typeof formData;
        }
      }
    })
  },
  removeEntry: <T extends keyof ResumeStepForms>(form: T, id: string) => {
    const set = store.setState;

    set((state) => {
      const ResumeStepForms = { ...state.resume };

      if (Array.isArray(ResumeStepForms[form])) {
        const indexToRemove = (
          ResumeStepForms[form] as Array<WorkExperience | Education>
        ).findIndex((form) => form.id === id);

        if (indexToRemove !== -1) {
          (ResumeStepForms[form] as Array<WorkExperience | Education>).splice(
            indexToRemove,
            1,
          );
        }
      }
    });
  },
};
