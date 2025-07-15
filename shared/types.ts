import { z } from "zod";
import { resumeDetailsSchema } from "@/schemas/resumeDetails.schema";
import { personalDetailsSchema } from "@/schemas/personalDetails.schema";
import { employmentHistorySchema } from "@/schemas/employmentHistory.schema";
import { academicBackgroundSchema } from "@/schemas/academicBackground.schema";
import { skillsSectionSchema } from "@/schemas/skillsSection.schema";
import { careerSummarySchema } from "@/schemas/careerSummary.schema";

export type ResumeDetails = z.infer<typeof resumeDetailsSchema>;
export type PersonalDetails = z.infer<typeof personalDetailsSchema>
export type CareerSummary = z.infer<typeof careerSummarySchema>
export type EmploymentHistory = z.infer<typeof employmentHistorySchema> & { id: string}
export type AcademicBackground = z.infer<typeof academicBackgroundSchema> & { id: string}
export type SkillsSection = z.infer<typeof skillsSectionSchema>


export type ResumeStepForms = {
  resumeDetails: ResumeDetails;
  personalDetails: PersonalDetails;
  careerSummary: CareerSummary;
  skillsSection: SkillsSection;
  employmentHistory: EmploymentHistory[];
  academicBackground: AcademicBackground[];
};

export type StatusType = 'idle' | 'loading' | 'success' | 'error'

export type AsyncStatus = {
  status: StatusType,
  errorMessage?: string | null
  lastUpdated?: number
}
