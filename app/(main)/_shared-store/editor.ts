import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { EditorForms } from '../lib/types';
import { Education, WorkExperience } from '../lib/types';
import { useShallow } from 'zustand/shallow';

type State = {
  curriculumData: EditorForms;
};

type Actions = {
  updateField: <T extends keyof EditorForms>({
    form,
    field,
    value,
    index,
  }: {
    form: T;
    field: keyof EditorForms[T];
    value: any;
    index?: string | number;
  }) => void;
  addEntry: <T extends keyof EditorForms>(form: T) => void;
  removeEntry: <T extends keyof EditorForms>(form: T, id: string) => void;
};

const actions: Actions = {
  updateField: ({ form, field, value, index }) => {
    const set = useEditorStore.setState;

    set((state) => {
      const formData = state.curriculumData[form];

      if (Array.isArray(formData)) {
        const formIndex = formData.findIndex((form) => form.id === index); // recuperamos el indice del form
        if (formIndex !== -1) {
          formData[formIndex] = { ...formData[formIndex], [field]: value };
        }
      } else {
        // actualizamos los formularios 'generalInfo', 'personalInfo', 'professionalProfile' y 'knowledge'
        if (formData && typeof formData === 'object') {
          formData[field] = value;
        }
      }
    });
  },
  addEntry: <T extends keyof EditorForms>(form: T) => {
    const set = useEditorStore.setState;

    set((state) => {
      const updatedForm = { ...state.curriculumData };

      if (Array.isArray(updatedForm[form])) {
        if (form === 'workExperience') {
          // Añadir un formulario vacío para 'workExperience'
          const newWorkExperienceForm: WorkExperience = {
            id: crypto.randomUUID(),
            position: '',
            company: '',
            startDate: '',
            endDate: '',
            description: '',
          };
          (updatedForm[form] as WorkExperience[]).push(newWorkExperienceForm);
        } else if (form === 'education') {
          // Añadir un formulario vacío para 'education'
          const newEducationForm: Education = {
            id: crypto.randomUUID(),
            degree: '',
            school: '',
            startDate: '',
            endDate: '',
          };
          (updatedForm[form] as Education[]).push(newEducationForm);
        }
      }
    });
  },
  removeEntry: <T extends keyof EditorForms>(form: T, id: string) => {
    const set = useEditorStore.setState;

    set((state) => {
      const editorForms = { ...state.curriculumData };

      if (Array.isArray(editorForms[form])) {
        const indexToRemove = (
          editorForms[form] as Array<WorkExperience | Education>
        ).findIndex((form) => form.id === id);

        if (indexToRemove !== -1) {
          (editorForms[form] as Array<WorkExperience | Education>).splice(
            indexToRemove,
            1,
          );
        }
      }
    });
  },
};

const selectors = {
  useCurriculumData: () => useEditorStore(useShallow(state => state.curriculumData)),
  useWorkExperience: () => useEditorStore(useShallow(state => state.curriculumData.workExperience)),
  useEducation: () => useEditorStore(useShallow(state => state.curriculumData.education))
};

export const useEditorStore = create(immer<State>(() => ({
  curriculumData: {
    generalInfo: { title: '', description: '' },
    personalInfo: {
      firstName: '',
      lastName: '',
      job: '',
      phone: '',
      email: '',
      image: undefined,
    },
    professionalProfile: { resumeProfile: '' },
    knowledge: { skills: '' },
    workExperience: [],
    education: [],
  },
})));

export const $editorStore = {
  actions,
  selectors,
};
