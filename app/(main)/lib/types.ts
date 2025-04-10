import { z } from "zod";
import { generalInfoSchema, fullPersonalInfoSchem, workExperienceSchema, educationSchema, knowledgeSchema, professionalProfileSchema } from "./schemas";

export type GeneralInfo = z.infer<typeof generalInfoSchema>;
export type FullPersonalInfo = z.infer<typeof fullPersonalInfoSchem>
export type WorkExperience = z.infer<typeof workExperienceSchema> & { id: string}
export type Education = z.infer<typeof educationSchema> & { id: string}
export type Knowledge = z.infer<typeof knowledgeSchema>
export type ProfessionalProfile = z.infer<typeof professionalProfileSchema>

export type EditorForms = {
  generalInfo: GeneralInfo;
  personalInfo: FullPersonalInfo;
  professionalProfile: ProfessionalProfile;
  knowledge: Knowledge;
  workExperience: WorkExperience[];
  education: Education[];
};

export type Theme = 'light' | 'dark';

export enum STEP_KEYS {
  GENERAL_INFO = 'general-info',
  PERSONAL_INFO = 'personal-info',
  PROFESSIONAL_PROFILE = 'professional-profile',
  WORK_EXPERIENCE = 'work-experience',
  EDUCATION = 'education',
  KNOWLEDGE = 'knowledge',
}
