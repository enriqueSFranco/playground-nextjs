import { z } from "zod";

export const academicBackgroundSchema = z.object({
  degree: z
    .string()
    .min(2, {
      message: 'El título académico debe tener al menos 2 caracteres.',
    })
    .max(100, {
      message: 'El título académico no puede exceder los 100 caracteres.',
    }),
  school: z
    .string()
    .min(2, {
      message: 'El nombre de la escuela debe tener al menos 2 caracteres.',
    })
    .max(500, {
      message: 'El nombre de la escuela no puede exceder los 500 caracteres.',
    }),
  startDate: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), {
      message: 'La fecha de inicio no es válida.',
    }),
  endDate: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), {
      message: 'La fecha de fin no es válida.',
    })
    .optional(), // El campo endDate es opcional
});
