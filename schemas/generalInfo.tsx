import { z } from 'zod';

export const generalInfoSchema = z.object({
  title: z.string().min(2, {message: "El nombre debe tener al menos 2 caracteres"}),
  description: z.string().min(10, {message: "La descripción debe tener al menos 10 caracteres"}),
});

export type GeneralInfo = z.infer<typeof generalInfoSchema>;
