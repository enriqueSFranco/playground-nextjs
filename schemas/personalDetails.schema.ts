import { z } from "zod";
import { FileImageSchema } from "./fileImage.schema";

export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
    .max(50, { message: 'El nombre no puede exceder los 50 caracteres.' }),
  lastName: z
    .string()
    .min(2, { message: 'El apellido debe tener al menos 2 caracteres.' })
    .max(50, { message: 'El apellido no puede exceder los 50 caracteres.' }),
  job: z
    .string()
    .min(2, { message: 'El trabajo debe tener al menos 2 caracteres.' })
    .max(100, { message: 'El trabajo no puede exceder los 100 caracteres.' }),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: 'El número de teléfono no es válido.',
    }),
  email: z
    .string()
    .email({ message: 'El correo electrónico no es válido.' })
    .max(100, {
      message: 'El correo electrónico no puede exceder los 100 caracteres.',
    }),
});

export const personalDetailsSchema = personalInfoSchema.merge(
  z.object({ image: z.object({
    name: z.string(),
    previewURL: z.string(),
    size: z.number()
  }) }),
);
