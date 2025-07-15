'use client';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { IconReset } from '../Icons/IconReset';
import { LoaderCircle } from 'lucide-react';

// const MAX_SIZE_DEFAULT = 10 * 1024 * 1024; // 10MB
// type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

type Props = {
  uploadedUrl?: string | null;
  loading?: boolean;
  errorMessage?: string;
  onFileSelect: (file: File) => void;
};

export function FileUploader({
  uploadedUrl,
  loading,
  errorMessage,
  onFileSelect,
}: Props) {
  const [localFile, setLocalFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null);
  const inputHintId = useId();

  // memoize preview url
  const previewUrl = useMemo(() => {
    if (localFile) return URL.createObjectURL(localFile);
   return uploadedUrl || null;
  }, [localFile, uploadedUrl]);

  // Clean up memory
  useEffect(() => {
    return () => {
      if (localFile && previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl, localFile]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setLocalFile(file)
    onFileSelect(file);
  }

  function resetFile() {
    setLocalFile(null)
    onFileSelect(null as any);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  return (
    <div className="flex flex-row-reverse w-fit items-center gap-2 p-2 outline-[1px] outline-gray-500 bg-neutral-100 rounded-md">
      <div className="flex items-center justify-center gap-1">
        {uploadedUrl && (
          <button
            onClick={resetFile}
            className="grid place-content-center rounded-md p-0.5 hover:bg-gray-200"
          >
            <IconReset />
          </button>
        )}
      </div>
      <label
        htmlFor={inputHintId}
        className="flex w-full cursor-pointer flex-col items-center"
        aria-live="polite"
      >
        <div className="relative flex w-full items-center gap-2 overflow-hidden">
          {uploadedUrl ? (
            <picture>
              <img
                src={uploadedUrl}
                alt={`image-${localFile?.name}`}
                className="aspect-square w-7 rounded-full object-contain"
              />
            </picture>
          ) : (
            <div className="h-7 w-7 rounded-full bg-gray-400 grid place-content-center">
              {loading && <LoaderCircle className="animate-spin" size={14} color='#eee' />}
            </div>
          )}
          <span className="text-sm font-light">{uploadedUrl ? 'Cambiar imagen' : 'Subir imagen'}</span>
          <input
            ref={inputRef}
            type="file"
            id={inputHintId}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </label>
      {errorMessage && <span className="text-red-500 text-sm font-semibold">{errorMessage}</span>}
    </div>
  );
}

// ### 🎯 Nuevas funcionalidades:

// 1. ✅ **Validación de tipo** (solo imágenes)
// 2. ✅ **Validación de tamaño máximo** (ej: 2 MB)
// 3. ✅ **Mensaje de error si falla la validación**
// 4. ✅ **Botón "Reintentar"** si falló la carga

// ---

// ### 📦 Props extendidas (sin cambios necesarios para el consumidor):

// ```ts
// type FileUploaderProps = {
//   onFileSelect: (file: File | null) => void;
//   uploadedUrl?: string;
//   loading?: boolean;
//   errorMessage?: string;
// };
// ```

// ---

// ### 💡 Lógica interna adicional:

// * Validamos tipo: `image/jpeg`, `image/png`, `image/webp`, etc.
// * Validamos tamaño: 2 MB (`2097152` bytes).
// * Mostramos error local si falla validación, sin llamar a `onFileSelect`.

// ---

// ### 🧱 Código mejorado del componente:

// ```tsx
// import React, { useState } from 'react';

// const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
// const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// export function FileUploader({
//   onFileSelect,
//   uploadedUrl,
//   loading = false,
//   errorMessage,
// }: FileUploaderProps) {
//   const fileInputRef = React.useRef<HTMLInputElement | null>(null);
//   const [localError, setLocalError] = useState<string | null>(null);

//   const handleClick = () => {
//     setLocalError(null);
//     fileInputRef.current?.click();
//   };

//   const handleRemove = () => {
//     setLocalError(null);
//     onFileSelect(null);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;

//     if (!file) return;

//     // Validaciones
//     if (!ALLOWED_TYPES.includes(file.type)) {
//       setLocalError('Formato no permitido. Usa JPG, PNG o WEBP.');
//       return;
//     }

//     if (file.size > MAX_FILE_SIZE) {
//       setLocalError('La imagen debe pesar menos de 2 MB.');
//       return;
//     }

//     setLocalError(null);
//     onFileSelect(file);
//   };

//   const showRetry = !loading && !!errorMessage;

//   return (
//     <div className="flex flex-col items-start gap-2">
//       {uploadedUrl && (
//         <div className="relative">
//           <img
//             src={uploadedUrl}
//             alt="Preview"
//             className="h-32 w-32 object-cover rounded-md border"
//           />
//           <button
//             type="button"
//             onClick={handleRemove}
//             className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 py-0.5 rounded"
//           >
//             ✕
//           </button>
//         </div>
//       )}

//       <input
//         ref={fileInputRef}
//         type="file"
//         className="hidden"
//         accept="image/*"
//         onChange={handleFileChange}
//         disabled={loading}
//       />

//       <div className="flex items-center gap-2">
//         <button
//           type="button"
//           onClick={handleClick}
//           disabled={loading}
//           className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
//         >
//           {uploadedUrl ? 'Cambiar imagen' : 'Subir imagen'}
//         </button>

//         {showRetry && (
//           <button
//             type="button"
//             onClick={handleClick}
//             className="text-sm text-blue-600 hover:underline"
//           >
//             Reintentar
//           </button>
//         )}
//       </div>

//       {loading && <p className="text-sm text-gray-600">Subiendo imagen...</p>}
//       {localError && <p className="text-sm text-red-500">{localError}</p>}
//       {!localError && errorMessage && (
//         <p className="text-sm text-red-500">{errorMessage}</p>
//       )}
//     </div>
//   );
// }
// ```

// ---

// ### ✅ Qué hace ahora el componente

// | Situación        | Comportamiento                                                  |
// | ---------------- | --------------------------------------------------------------- |
// | Formato inválido | Muestra `Formato no permitido. Usa JPG, PNG o WEBP.`            |
// | Archivo > 2 MB   | Muestra `La imagen debe pesar menos de 2 MB.`                   |
// | Error en thunk   | Muestra `errorMessage` desde Redux (`imageUpload.errorMessage`) |
// | Carga fallida    | Muestra botón **Reintentar** que vuelve a abrir el file input   |
// | Carga exitosa    | Muestra preview y botón para cambiar/eliminar                   |

// ---

// ¿Quieres que este componente también acepte un `onRemove` o `onRetry` explícito? ¿O está bien que todo se maneje con `onFileSelect(null)` y reintentar?
