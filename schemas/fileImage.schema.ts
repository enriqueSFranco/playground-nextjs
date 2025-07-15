import { z } from "zod"

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_IMAGE_TYPES = ["image/jpg", "image/jpeg", "image/png", "image/webp"]

export const FileImageSchema = z
.instanceof(File)
.refine(file => file.size <= MAX_FILE_SIZE, {
  message: 'El archivo debe pesar menos de 10MB',
})
.refine(file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
"Solo se permiten formatos .jpg, .jpeg, .png y .webp"
)
.optional()
.nullable()
