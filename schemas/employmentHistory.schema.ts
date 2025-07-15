import { z } from "zod";

export const employmentHistorySchema = z.object({
  position: z
    .string()
    .min(2, {
      message: 'El título del trabajo debe tener al menos 2 caracteres.',
    })
    .max(50, {
      message: 'El título del trabajo no puede exceder los 50 caracteres.',
    }),
  company: z
    .string()
    .min(2, {
      message: 'El nombre de la empresa debe tener al menos 2 caracteres.',
    })
    .max(500, {
      message: 'El nombre de la empresa no puede exceder los 500 caracteres.',
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
  description: z
    .string()
    .min(10, { message: 'La descripción debe tener al menos 10 caracteres.' })
    .max(500, {
      message: 'La descripción no puede exceder los 500 caracteres.',
    }),
});
