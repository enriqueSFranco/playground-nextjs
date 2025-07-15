import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResumeStepForms as ResumeState } from '@/shared/types';

// Función utilitaria para asignar valor a una propiedad anidada
const setNestedValue = <T>(obj: T, path: string, value: T): T => {
  const keys = path.split('.');
  const lastKey = keys.pop();

  if (!lastKey) return obj;

  let current: any = obj;

  for (const key of keys) {
    if (typeof current[key] !== 'object' || current[key] === null) {
      current[key] = {};
    }
    current = current[key];
  }
  current[lastKey] = value;

  return obj;
};

interface UpdateFieldPayload {
  fieldPath: string;
  value: any;
}

const initialState: ResumeState = {
  resumeDetails: {
    headline: '',
    overview: '',
  },
  personalDetails: {
    image: {
      name: '',
      previewURL: '',
      size: 0,
    },
    firstName: '',
    lastName: '',
    job: '',
    phone: '',
    email: '',
  },
  careerSummary: { biography: { type: 'doc', content: [] } },
  skillsSection: { keySkills: '' },
  employmentHistory: [],
  academicBackground: [],
};

export const resumeSlice = createSlice({
  name: 'resumeStepForms',
  initialState,
  reducers: {
    updateField: (
      state: ResumeState,
      action: PayloadAction<UpdateFieldPayload>,
    ) => {
      const { fieldPath, value } = action.payload;
      setNestedValue(state, fieldPath, value);
    },
  }
});

export const { updateField } = resumeSlice.actions;

export default resumeSlice.reducer;
