import { EducationForm } from "./components/EducationForm"
import { GeneralInfoForm } from "./components/GeneralInfoForm"
import { KnowledgeForm } from "./components/KnowledgeForm"
import { PersonalInfoForm } from "./components/PersonalInfoForm"
import { ProfessionalProfileForm } from "./components/ProfessinalProfileForm"
import { WorkExperienceForm } from "./components/WorkExperienceForm"

export const STEPS = [
    {label: "información general", component: GeneralInfoForm, href: "general-info"},
    {label: "información personal", component: PersonalInfoForm, href: "personal-info"},
    {label: "perfil profesional", component: ProfessionalProfileForm, href: "professional-profile"},
    {label: "experiencia laboral", component: WorkExperienceForm, href: "work-experience"},
    {label: "educación", component: EducationForm, href: "education"},
    {label: "conocimientos", component: KnowledgeForm, href: "knowledge"},
]
