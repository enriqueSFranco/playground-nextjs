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

// Esquema para la información general
export const generalInfoSchema = z.object({
  title: z.string()
    .min(2, { message: "El título debe tener al menos 2 caracteres." })
    .max(100, { message: "El título no puede exceder los 100 caracteres." }),
  description: z.string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres." })
    .max(1000, { message: "La descripción no puede exceder los 1000 caracteres." }),
});

// Esquema para la información personal
export const personalInfoSchema = z.object({
  firstName: z.string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." })
    .max(50, { message: "El nombre no puede exceder los 50 caracteres." }),
  lastName: z.string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres." })
    .max(50, { message: "El apellido no puede exceder los 50 caracteres." }),
  job: z.string()
    .min(2, { message: "El trabajo debe tener al menos 2 caracteres." })
    .max(100, { message: "El trabajo no puede exceder los 100 caracteres." }),
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "El número de teléfono no es válido." }),
  email: z.string()
    .email({ message: 'El correo electrónico no es válido.' })
    .max(100, { message: "El correo electrónico no puede exceder los 100 caracteres." }),
});

// Esquema para la experiencia laboral
export const workExperienceSchema = z.object({
  position: z.string()
    .min(2, { message: "El título del trabajo debe tener al menos 2 caracteres." })
    .max(50, { message: "El título del trabajo no puede exceder los 50 caracteres." }),
  company: z.string()
    .min(2, { message: "El nombre de la empresa debe tener al menos 2 caracteres." })
    .max(500, { message: "El nombre de la empresa no puede exceder los 500 caracteres." }),
  startDate: z.string()
    .refine(value => !isNaN(Date.parse(value)), { message: "La fecha de inicio no es válida." }),
  endDate: z.string()
    .refine(value => !isNaN(Date.parse(value)), { message: "La fecha de fin no es válida." })
    .optional(), // El campo endDate es opcional
  description: z.string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres." })
    .max(500, { message: "La descripción no puede exceder los 500 caracteres." })
});

// Esquema para la educación
export const educationSchema = z.object({
  degree: z.string()
    .min(2, { message: "El título académico debe tener al menos 2 caracteres." })
    .max(100, { message: "El título académico no puede exceder los 100 caracteres." }),
  school: z.string()
    .min(2, { message: "El nombre de la escuela debe tener al menos 2 caracteres." })
    .max(500, { message: "El nombre de la escuela no puede exceder los 500 caracteres." }),
  startDate: z.string()
    .refine(value => !isNaN(Date.parse(value)), { message: "La fecha de inicio no es válida." }),
  endDate: z.string()
    .refine(value => !isNaN(Date.parse(value)), { message: "La fecha de fin no es válida." })
    .optional(), // El campo endDate es opcional
});

// Esquema para el perfil profesional
export const professionalProfileSchema = z.object({
  resumeProfile: z.string()
    .min(10, { message: "El perfil profesional debe tener al menos 10 caracteres." })
    .max(1000, { message: "El perfil profesional no puede exceder los 1000 caracteres." }),
});

// Esquema para los conocimientos
export const knowledgeSchema = z.object({
  skills: z.string()
    .min(1, { message: "La lista de conocimientos no puede estar vacía." })
    .max(500, { message: "La lista de conocimientos no puede exceder los 500 caracteres." }),
});

export const fullPersonalInfoSchem = personalInfoSchema.merge(z.object({image: z.optional(imageSchema)}))


