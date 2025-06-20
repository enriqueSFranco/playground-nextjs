'use client';

import { useCallback } from 'react';
import { BasicInput } from '@/ui/atoms/BasicInput/BasicInput';
import { $resumeStore } from '@/store/editor';
import { CVStepForms, WorkExperience } from '@/shared/types';
import { Tiptap } from '@/ui/organisms/TipTap/TipTap';
import { Button } from '@/ui/atoms/Button/Button';

type WorkExperienceFields = keyof CVStepForms['workExperience'];

interface Props {
  form: WorkExperience;
}

export function WorkExperienceEntryForm({ form }: Props) {
  const { updateField, removeEntry } = $resumeStore.actions;

  const { id, position, company, startDate, endDate, description } = form;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    updateField({
      form: 'workExperience',
      field: name as WorkExperienceFields as string,
      value,
      id,
    });
  }

  const handleChange = useCallback(
    (value: string) => {
      updateField({
        form: 'workExperience',
        field: 'description',
        value,
        id,
      });
    },
    [updateField, id],
  );

  function deleteForm() {
    removeEntry('workExperience', form.id);
  }

  return (
    <form className="flex flex-col space-y-4">
      <BasicInput
        placeholder="Frontend Developer"
        name="position"
        label="Nombre del puesto"
        value={position}
        onChange={handleInputChange}
      />
      <BasicInput
        placeholder="Empresa XYZ"
        name="company"
        label="Empresa"
        value={company}
        onChange={handleInputChange}
      />
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between gap-8">
          <BasicInput
            type="date"
            name="startDate"
            label="Fecha de inicio"
            value={startDate}
            onChange={handleInputChange}
          />
          <BasicInput
            type="date"
            name="endDate"
            label="Fecha de finalización"
            value={endDate}
            onChange={handleInputChange}
          />
        </div>
        <p className="text-sm font-normal text-gray-400">
          Si trabajas aquí actualmente, deja la{' '}
          <span className="text-sm font-bold">fecha de finalización</span> sin
          llenar.
        </p>
      </div>
      <Tiptap content={description} onChange={handleChange} />
      <Button onClick={deleteForm} className="w-fit self-start outline-none">
        <span className="capitalize">eliminar</span>
      </Button>
    </form>
  );
}

// ## 1. ¿Qué hace DnD-kit en tu UI?

// * DnD-kit te permite hacer drag & drop — arrastrar y soltar elementos para reordenarlos.
// * En tu caso, tienes una lista de experiencias laborales (`workExperience`) que quieres que el usuario pueda ordenar.
// * Para que DnD-kit funcione, cada ítem necesita un identificador único (`id`) y un componente que use `useSortable` para habilitar arrastrar.
// * Cuando arrastras y sueltas un ítem, DnD-kit te avisa con un evento `onDragEnd`.

// ## 2. ¿Por qué hay que reordenar el array?

// * Tu UI **muestra la lista según el orden del array** que tienes en tu store (Zustand).

// * Cuando arrastras un ítem y lo sueltas en otra posición, el array original **sigue igual** si no actualizas la estructura interna.

// * Para que el UI refleje el nuevo orden, tienes que:

//   1. Saber cuál ítem se movió (`active.id`).
//   2. Saber dónde se soltó (`over.id`).
//   3. Reordenar el array para que el orden coincida con el nuevo orden.
//   4. Actualizar ese array en el store.

// * Esto hace que el renderizado de React muestre la lista en el nuevo orden, sin que tengas que hacer nada más.

// ## 3. ¿Cómo reordenar el array?

// * Usamos una función que mueve un ítem de un índice a otro (por ejemplo, `arrayMove`).
// * Luego obtenemos los ids de los ítems en el nuevo orden.
// * Con esos ids creamos un array nuevo, reordenado, y lo ponemos en el store.

// ## 4. Cómo integrarlo con Zustand

// * Zustand es tu store global.
// * Cuando cambias el array dentro de Zustand, React re-renderiza los componentes que usan ese estado.
// * Por eso, cuando actualizamos la lista en Zustand con el nuevo orden, el componente con la lista se actualiza automáticamente.

// ## 5. Resumen código clave:

// ```tsx
// // Evento al soltar un drag
// function handleDragEnd(event) {
//   const { active, over } = event;
//   if (!over || active.id === over.id) return;

//   // Indices originales
//   const oldIndex = workExperiences.findIndex(e => e.id === active.id);
//   const newIndex = workExperiences.findIndex(e => e.id === over.id);

//   // Mover elemento en el array
//   const newOrder = arrayMove(workExperiences, oldIndex, newIndex).map(e => e.id);

//   // Actualizar store con el nuevo orden
//   reorderEntries('workExperience', newOrder);
// }

// ## 6. En tu componente sortable:

// * Cada ítem usa `useSortable({ id })` para tener drag handlers.
// * El contenedor usa `DndContext` y `SortableContext` para que los elementos puedan ser draggeados y el contexto esté activo.

// ## 7. El problema que tuviste con typescript

// * La función `reorderEntries` necesita reemplazar el array en Zustand con el nuevo orden.
// * El filtro `filter(Boolean)` produce un array que puede tener `undefined`, y TypeScript se quejaba.
// * Solución: agregar un **type guard** para decirle a TypeScript que ya no hay `undefined`.

// ## En resumen

// * DnD-kit detecta cuando un ítem se mueve.
// * Usas los ids para reordenar tu array con la función `arrayMove`.
// * Actualizas el estado en Zustand con el array ordenado.
// * React vuelve a renderizar y muestra el nuevo orden en la UI.

// ---
