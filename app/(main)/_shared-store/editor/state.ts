import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { EditorForms } from '../../lib/types';

type State = {
  curriculumData: EditorForms;
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
