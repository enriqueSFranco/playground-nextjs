import { RootState } from "@/redux/store"
import { createAsyncThunk } from "@reduxjs/toolkit"

// helper
async function fakeUploadImage(file: File): Promise<{image: string}> {
  return new Promise((resolve) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file)
        resolve({image: url})
      }, 3000)
  })
}

export const uploadImage = createAsyncThunk<
  {image: string},
  File,
  {state: RootState}
>(
  'resume/uploadImage',
  async(file: File, {rejectWithValue}) => {
    try {
      const response = await fakeUploadImage(file);
      return response;
    } catch(error) {
      let errorMessage
      if (error instanceof Error) {
        errorMessage = error?.message || 'Error al subir la imagen';
      }
      throw rejectWithValue({errorMessage})
    }
  }
)


// | Proceso en la UI                   | Propiedad sugerida               |
// | ---------------------------------- | -------------------------------- |
// | Subida de imagen de perfil         | `imageUpload: AsyncStatus`       |
// | Envío del formulario completo      | `submitForm: AsyncStatus`        |
// | Obtener vista previa del resumen   | `fetchPreview: AsyncStatus`      |
// | Guardado automático del formulario | `autosave: AsyncStatus`          |
// | Validación de correo (API)         | `emailValidation: AsyncStatus`   |
// | Envío de correo de confirmación    | `sendConfirmation: AsyncStatus`  |
// | Descarga del PDF generado          | `downloadPDF: AsyncStatus`       |
// | Subida de archivos adicionales     | `attachmentsUpload: AsyncStatus` |
