import { z } from "zod";

export const careerSummarySchema = z.object({
  biography: z.object({
    type: z.literal('doc'),
    content: z.array(z.any())
  }),
});
