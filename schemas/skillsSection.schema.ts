import { z } from "zod";

// Esquema para los conocimientos
export const skillsSectionSchema = z.object({
  keySkills: z
    .string()
    .min(1, { message: 'La lista de conocimientos no puede estar vacía.' })
    .max(500, {
      message: 'La lista de conocimientos no puede exceder los 500 caracteres.',
    }),
});
