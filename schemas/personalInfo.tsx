import { z } from 'zod';

const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB

export const imageSchema = z
  .instanceof(File)
  .refine(
    (file) => ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type),
    { message: 'Archivo de tipo de imagen no válido' },
  )
  .refine((file) => file.size <= FILE_SIZE_LIMIT, {
    message: 'El tamaño del archivo no debe exeder los 5MB',
  });

export const personalInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  job: z.string(),
  phone: z.string(),
  email: z.string().email({ message: 'El email no es válido' }),
});

export const fullPersonalInfoSchem = personalInfoSchema.merge(z.object({image: imageSchema}))
export type fullPersonalInfo = z.infer<typeof fullPersonalInfoSchem>
