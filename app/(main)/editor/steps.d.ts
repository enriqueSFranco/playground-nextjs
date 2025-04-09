import { GeneralInfoForm } from './components/molecules/GeneralInfoForm';
import { KnowledgeForm } from './components/molecules/KnowledgeForm';
import { PersonalInfoForm } from './components/organisms/PersonalInfoForm';
import { ProfessionalProfileForm } from './components/molecules/ProfessinalProfileForm';
import { WorkExperienceForm } from './components/organisms/WorkExperienceForm';
import { EducationForm } from './components/organisms/EducationForm';
// import { EditorForm } from '../lib/types';
import { StepsType, Steps } from '../lib/types';

export const STEPS = [
  {
    label: 'información general',
    component: GeneralInfoForm,
    href: Steps.GENERAL_INFO,
  },
  {
    label: 'información personal',
    component: PersonalInfoForm,
    href: Steps.PERSONAL_INFO,
  },
  {
    label: 'perfil profesional',
    component: ProfessionalProfileForm,
    href: Steps.PROFESSIONAL_PROFILE,
  },
  {
    label: 'experiencia laboral',
    component: WorkExperienceForm,
    href: Steps.WORK_EXPERIENCE,
  },
  { label: 'educación', component: EducationForm, href: Steps.EDUCATION },
  { label: 'habilidades', component: KnowledgeForm, href: Steps.KNOWLEDGE },
];
