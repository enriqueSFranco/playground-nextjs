import { z } from 'zod';
import { resumeDetailsSchema } from './resumeDetails.schema';
import { personalInfoSchema } from './personalDetails.schema';
import { careerSummarySchema } from './careerSummary.schema';
import { employmentHistorySchema } from './employmentHistory.schema';
import { academicBackgroundSchema } from './academicBackground.schema';
import { skillsSectionSchema } from './skillsSection.schema';

export const cvSchema = z.object({
  generalInfo: resumeDetailsSchema,
  personalInfo: personalInfoSchema,
  professionalProfile: z.optional(careerSummarySchema),
  workExperience: z.array(employmentHistorySchema),
  education: z.array(academicBackgroundSchema),
  knowledge: skillsSectionSchema,
});
