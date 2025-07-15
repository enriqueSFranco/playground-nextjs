import { z } from 'zod';

// Esquema para la información general
export const resumeDetailsSchema = z.object({
  headline: z
    .string()
    .min(2, { message: 'El título debe tener al menos 2 caracteres.' })
    .max(100, { message: 'El título no puede exceder los 100 caracteres.' }),
  overview: z
    .string()
    .min(10, { message: 'La descripción debe tener al menos 10 caracteres.' })
    .max(1000, {
      message: 'La descripción no puede exceder los 1000 caracteres.',
    }),
});
