import { GeneralInfoForm } from '@/features/resumeEditor/ui/molecules/GeneralInfoForm';
import { ResumeStepForms as ResumeStepFormsType } from './types';
import { PersonalDetailsForm } from '@/features/organisms/CvForms/PersonalDetailsForm';
import { ProfessionalProfileForm } from '@/features/resumeEditor/ui/molecules/ProfessinalProfileForm';
import { WorkExperienceFormSection } from '@/features/organisms/CvForms/WorkExperienceFormSection';
import { EducationForm } from '@/features/organisms/CvForms/EducationForm';
import { KnowledgeForm } from '@/features/resumeEditor/ui/molecules/KnowledgeForm';

export type ResumeFormSectionsType = {
  component: React.ComponentType<any>,
  key: keyof ResumeStepFormsType
}

// Lista de pasos del formulario de CV, con sus respectivos componentes, esquemas y claves de almacenamiento
export const resumeFormSections: ResumeFormSectionsType[] = [
  {
    component: GeneralInfoForm,
    key: 'resumeDetails'
  },
  {
    component: PersonalDetailsForm,
    key: 'personalDetails'
  },
  {
    component: ProfessionalProfileForm,
    key: 'careerSummary'
  },
  {
    component: WorkExperienceFormSection,
    key: 'employmentHistory'
  },
  {
    component: EducationForm,
    key: 'academicBackground'
  },
  {
    component: KnowledgeForm,
    key: 'skillsSection'
  },
];
