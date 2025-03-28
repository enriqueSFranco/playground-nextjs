import { date, z } from 'zod';

const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB

export const generalInfoSchema = z.object({
  title: z.string().min(2, {message: "El nombre debe tener al menos 2 caracteres"}),
  description: z.string().min(10, {message: "La descripción debe tener al menos 10 caracteres"}),
});

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

export const workExperienceSchema = z.object({
  jobTitle: z.string().min(2, { message: "El título del trabajo debe tener al menos 2 caracteres." }).max(50, { message: "El título del trabajo no puede tener más de 50 caracteres." }),
  company: z.string().min(2, { message: "El nombre de la empresa debe tener al menos 2 caracteres." }).max(500, { message: "El nombre de la empresa no puede tener más de 500 caracteres." }),
  startDate: z.string().refine(value => !isNaN(Date.parse(value)), { message: "La fecha de inicio no es válida." }),
  endDate: z.string().refine(value => !isNaN(Date.parse(value)), { message: "La fecha de fin no es válida." }),
  description: z.string().min(10, { message: "La descripción debe tener al menos 10 caracteres." }).max(500, { message: "La descripción no puede tener más de 500 caracteres." }),
})

export const educationSchema = z.object({
  degree: z.string().min(2, { message: "El título académico debe tener al menos 2 caracteres." }).max(50, { message: "El título académico no puede tener más de 50 caracteres." }),
  school: z.string().min(2, { message: "El nombre de la escuela debe tener al menos 2 caracteres." }).max(500, { message: "El nombre de la escuela no puede tener más de 500 caracteres." }),
  startDate: z.string().refine(value => !isNaN(Date.parse(value)), { message: "La fecha de inicio no es válida." }),
  endDate: z.string().refine(value => !isNaN(Date.parse(value)), { message: "La fecha de fin no es válida." }),
})

export const professionalProfileSchema = z.object({
  resumeProfile: z.string().min(10, { message: "El perfil profesional debe tener al menos 10 caracteres." }).max(500, { message: "El perfil profesional no puede tener más de 500 caracteres." }),
})

export const knowledgeSchema = z.object({
  listOfKnowledge: z.string().min(1, { message: "La lista de conocimientos no puede estar vacía." })
})


export const fullPersonalInfoSchem = personalInfoSchema.merge(z.object({image: z.optional(imageSchema)}))

export const curriculumSchema = z.object({
  ...generalInfoSchema.shape,
  ...fullPersonalInfoSchem.shape
})


export type GeneralInfo = z.infer<typeof generalInfoSchema>;
export type FullPersonalInfo = z.infer<typeof fullPersonalInfoSchem>
export type WorkExperience = z.infer<typeof workExperienceSchema>
export type Education = z.infer<typeof educationSchema>
export type Knowledge = z.infer<typeof knowledgeSchema>
export type CurriculumData = Partial<z.infer<typeof curriculumSchema>> & {
  id?: number
}
