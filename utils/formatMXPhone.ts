export function formatMexicanPhone(input: string) {
  const digitsOnly = input.replace(/\D/g, ''); // 5611824613
  const noPrefix = digitsOnly.startsWith('52')
    ? digitsOnly.slice(2)
    : digitsOnly;
  const raw = `52${noPrefix}`;
  const valid = noPrefix.length === 10;

  let formatted = '';
  if (noPrefix.length > 0) {
    formatted += ' ' + noPrefix.slice(0, 2);
  }
  if (noPrefix.length > 2) {
    formatted += ' ' + noPrefix.slice(2, 6);
  }
  if (noPrefix.length > 6) {
    formatted += ' ' + noPrefix.slice(6, 10);
  }
  return {
    formatted,
    raw,
    valid
  };
}

// 1. **Extensiones** (ej. `5611824613 ext 123`)
// 2. **Entradas con letras, símbolos, espacios** (ej. `+52 (56) 1182-4613`)
// 3. **Números más cortos o incompletos** (para formateo progresivo)

// ### ✅ Nueva versión mejorada

// ```ts
// function formatMexicanPhone(input: string) {
//   // Extraer solo números y detectar si hay una extensión
//   const extMatch = input.match(/(?:ext|x|extensión)\s*(\d+)/i);
//   const extension = extMatch ? extMatch[1] : null;

//   // Limpiar el input dejando solo números
//   const digitsOnly = input.replace(/\D/g, "");

//   // Detectar y remover prefijo +52 o 52
//   const noPrefix = digitsOnly.startsWith("52") ? digitsOnly.slice(2) : digitsOnly;

//   // Solo tomar los primeros 10 dígitos del número base
//   const phoneDigits = noPrefix.slice(0, 10);
//   const valid = phoneDigits.length === 10;
//   const raw = `52${phoneDigits}`;

//   // Formatear progresivamente
//   let formatted = "+52";
//   if (phoneDigits.length > 0) {
//     formatted += " " + phoneDigits.slice(0, 2);
//   }
//   if (phoneDigits.length > 2) {
//     formatted += " " + phoneDigits.slice(2, 6);
//   }
//   if (phoneDigits.length > 6) {
//     formatted += " " + phoneDigits.slice(6, 10);
//   }

//   // Añadir extensión si existe
//   if (extension) {
//     formatted += ` ext. ${extension}`;
//   }

//   return {
//     formatted: formatted.trim(),
//     raw,
//     valid,
//     extension,
//   };
// }
// ```

// ### 🔍 Ejemplos de uso:

// ```ts
// formatMexicanPhone("+52 (56) 1182-4613 ext 123")
// // {
// //   formatted: '+52 56 1182 4613 ext. 123',
// //   raw: '5256118246',
// //   valid: true,
// //   extension: '123'
// // }

// formatMexicanPhone("56118")
// // {
// //   formatted: '+52 56 118',
// //   raw: '5256118',
// //   valid: false,
// //   extension: null
// // }

// formatMexicanPhone("ext 99 +52 55 1234 5678")
// // {
// //   formatted: '+52 55 1234 5678 ext. 99',
// //   raw: '5255123456',
// //   valid: true,
// //   extension: '99'
// // }
// ```












// Perfecto, vamos a **autocompletar con ceros** cuando el número esté incompleto, así siempre puedes tener un número de 10 dígitos formateado de forma consistente, aunque no sea "válido" todavía para enviar.

// ### ✅ Versión final con autocompletado de ceros

// ```ts
// function formatMexicanPhone(input: string) {
//   // Buscar extensión (ej. ext 123)
//   const extMatch = input.match(/(?:ext|x|extensión)\s*(\d+)/i);
//   const extension = extMatch ? extMatch[1] : null;

//   // Extraer solo números
//   const digitsOnly = input.replace(/\D/g, "");

//   // Quitar prefijo 52 si existe
//   const noPrefix = digitsOnly.startsWith("52") ? digitsOnly.slice(2) : digitsOnly;

//   // Asegurar que tenga al menos 10 dígitos (completar con ceros si falta)
//   const paddedPhone = (noPrefix + "0000000000").slice(0, 10);

//   const valid = noPrefix.length === 10;
//   const raw = `52${paddedPhone}`;

//   // Formato: +52 XX XXXX XXXX
//   const formatted = `+52 ${paddedPhone.slice(0, 2)} ${paddedPhone.slice(2, 6)} ${paddedPhone.slice(6, 10)}` +
//     (extension ? ` ext. ${extension}` : "");

//   return {
//     formatted: formatted.trim(),
//     raw,
//     valid,
//     extension,
//   };
// }
// ```

// ### Ejemplos:

// ```ts
// formatMexicanPhone("5611")
// // {
// //   formatted: '+52 56 1100 0000',
// //   raw: '525611000000',
// //   valid: false,
// //   extension: null
// // }

// formatMexicanPhone("5611824613 ext 321")
// // {
// //   formatted: '+52 56 1182 4613 ext. 321',
// //   raw: '5256118246',
// //   valid: true,
// //   extension: '321'
// // }

// formatMexicanPhone("+52 (55) 1234 5")
// // {
// //   formatted: '+52 55 1234 5000',
// //   raw: '5255123450',
// //   valid: false,
// //   extension: null
// // }
// ```

// ---

// ### ¿Qué más podríamos agregar?

// * ✅ Validación estricta para que solo celulares empiecen con `55`, `56`, etc.
// * ✅ Detección de número fijo vs celular
// * ✅ Mensajes de error personalizados
// * ✅ Integración con campos de formularios en vivo
















// Perfecto. Aquí tenés un **diagrama paso a paso + snippet completo** que muestra cómo funciona el **drag & drop con `dnd-kit` y Zustand**, con explicaciones claras y fáciles de seguir. Esto es ideal para tenerlo como guía o referencia.

// ---

// ## 🧠 Diagrama mental del flujo

// ```txt
// 1. Renderizas una lista de items desde Zustand
//    (Ej: experiencias laborales)

//       Zustand (store)
//         |
//         v
//    [Exp1, Exp2, Exp3]  ---> UI renderiza componentes (cards, forms, etc.)

// 2. Usuario arrastra Exp1 y lo suelta sobre Exp3

// 3. dnd-kit emite onDragEnd con:
//      - active.id = 'Exp1'
//      - over.id   = 'Exp3'

// 4. Usas arrayMove para calcular nuevo orden:
//      [Exp2, Exp3, Exp1] → y obtenés los ids

// 5. Llamás a `reorderEntries` → actualiza Zustand con ese nuevo orden

// 6. React vuelve a renderizar → UI ahora muestra:
//      Exp2
//      Exp3
//      Exp1
// ```

// ---

// ## 🧩 Código completo y comentado

// ### 1. `WorkExperienceForm.tsx` — donde usás `dnd-kit`

// ```tsx
// import { DndContext, closestCenter } from '@dnd-kit/core';
// import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
// import { $resumeStore } from '@/app/(main)/_shared-store/editor';
// import { WorkExperienceEntryForm } from '../molecules/WorkExperienceEntryForm';

// export function WorkExperienceForm() {
//   const workExperiences = $resumeStore.selectors.useWorkExperience();
//   const { addEntry, reorderEntries } = $resumeStore.actions;

//   const handleDragEnd = ({ active, over }) => {
//     if (!over || active.id === over.id) return;

//     const oldIndex = workExperiences.findIndex((e) => e.id === active.id);
//     const newIndex = workExperiences.findIndex((e) => e.id === over.id);
//     if (oldIndex === -1 || newIndex === -1) return;

//     const newOrder = arrayMove(workExperiences, oldIndex, newIndex).map((e) => e.id);
//     reorderEntries('workExperience', newOrder);
//   };

//   return (
//     <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//       <SortableContext
//         items={workExperiences.map((e) => e.id)}
//         strategy={verticalListSortingStrategy}
//       >
//         {workExperiences.map((entry) => (
//           <WorkExperienceEntryForm key={entry.id} form={entry} />
//         ))}
//       </SortableContext>
//     </DndContext>
//   );
// }
// ```

// ---

// ### 2. `WorkExperienceEntryForm.tsx` — cada ítem individual

// ```tsx
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';

// export function WorkExperienceEntryForm({ form }) {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
//     id: form.id,
//   });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
//       {/* tu formulario aquí */}
//       </div>
//     );
//   }
//   ```

//   ---

//   ### 3. Acción `reorderEntries` en Zustand

//   ```ts
//   reorderEntries: <T extends 'workExperience' | 'education'>(
//     form: T,
//     newOrder: string[],
//   ) => {
//     const set = store.setState;

//     set((state) => {
//       const formData = state.cv[form];

//       if (Array.isArray(formData)) {
//         const reordered = newOrder
//           .map((id) => formData.find((item) => item.id === id))
//           .filter((item): item is WorkExperience | Education => item !== undefined);

//         if (reordered.length === formData.length) {
//           state.cv[form] = reordered as typeof formData;
//         }
//       }
//     });
//   }
//   ```

//   ---

//   ## 📝 Conclusión

//   * DnD-kit solo mueve elementos en pantalla → tú debes actualizar el estado.
//   * Zustand mantiene el orden del array, y React renderiza según ese orden.
//   * `arrayMove` te facilita el trabajo.
//   * ¡Todo queda sincronizado y coherente!

//   ---

//   ¿Querés que esto te lo prepare en un repo de ejemplo o como un archivo `.md` para documentación interna?


