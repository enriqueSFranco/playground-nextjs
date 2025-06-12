import {z} from 'zod'

import { GeneralInfoForm } from './components/molecules/GeneralInfoForm';
import { KnowledgeForm } from './components/molecules/KnowledgeForm';
import { PersonalInfoForm } from './components/organisms/PersonalInfoForm';
import { ProfessionalProfileForm } from './components/molecules/ProfessinalProfileForm';
import { WorkExperienceForm } from './components/organisms/WorkExperienceForm';
import { EducationForm } from './components/organisms/EducationForm';

import { curriculumSchema } from '../lib/schemas';
import { STEP_KEYS, EditorForms } from '../lib/types';

type StepsType = {
  label: string,
  component: React.ComponentType<any>,
  href: STEP_KEYS,
  schema: z.ZodTypeAny,
  storeKey: keyof EditorForms
}

export const STEPS: StepsType[] = [
  {
    label: 'información general',
    component: GeneralInfoForm,
    href: STEP_KEYS.GENERAL_INFO,
    schema: curriculumSchema.shape.generalInfo,
    storeKey: 'generalInfo'
  },
  {
    label: 'información personal',
    component: PersonalInfoForm,
    href: STEP_KEYS.PERSONAL_INFO,
    schema: curriculumSchema.shape.personalInfo,
    storeKey: 'personalInfo'
  },
  {
    label: 'perfil profesional',
    component: ProfessionalProfileForm,
    href: STEP_KEYS.PROFESSIONAL_PROFILE,
    schema: curriculumSchema.shape.professionalProfile,
    storeKey: 'professionalProfile'
  },
  {
    label: 'experiencia',
    component: WorkExperienceForm,
    href: STEP_KEYS.WORK_EXPERIENCE,
    schema: curriculumSchema.shape.workExperience,
    storeKey: 'workExperience'
  },
  {
    label: 'educación',
    component: EducationForm,
    href: STEP_KEYS.EDUCATION,
    schema: curriculumSchema.shape.education,
    storeKey: 'education'
  },
  {
    label: 'habilidades',
    component: KnowledgeForm,
    href: STEP_KEYS.KNOWLEDGE,
    schema: curriculumSchema.shape.knowledge,
    storeKey: 'knowledge'
  },
];
