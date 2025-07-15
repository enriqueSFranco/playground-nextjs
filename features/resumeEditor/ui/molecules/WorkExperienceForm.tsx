'use client';

import { BasicInput } from '@/ui/atoms/BasicInput/BasicInput';
// import { Tiptap } from '@/ui/organisms/TipTap/TipTap';
import { Button } from '@/ui/atoms/Button/Button';
import { actions } from '@/store/editor/actions';
import { WandSparklesIcon } from 'lucide-react';

interface Props {
  formId: string;
}

export function WorkExperienceEntryForm({ formId }: Props) {
  const { updateField, removeEntry } = actions;
  // const form = workExperience.find(item => item.id === formId)
  // if (!form) return <div>null</div>;

  // const { id, position, company, startDate, endDate, description } = form;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const { name, value } = e.target;
  //   updateField({
  //     form: 'workExperience',
  //     field: name as keyof typeof form,
  //     value,
  //     id,
  //   });
  // }

  // function deleteForm() {
  //   removeEntry('workExperience', id);
  // }

  return (
    <form className="flex flex-col space-y-4">
      <input />
      {/* <BasicInput
        placeholder="Frontend Developer"
        name="position"
        label="Titulo del trabajo"
        value={position}
        onChange={handleInputChange}
      />
      <BasicInput
        // placeholder="Empresa XYZ"
        name="company"
        label="Empleador"
        value={company}
        onChange={handleInputChange}
      /> */}
      <div className="flex w-full flex-col space-y-2">
        <label className="font-xs text-sm text-gray-500">
          Fecha de inicio y finalización
        </label>
        <div className="flex w-full items-center justify-between gap-8">
          {/* <BasicInput
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleInputChange}
          />
          <BasicInput
            type="date"
            name="endDate"
            value={endDate}
            onChange={handleInputChange}
          /> */}
          {/* switch */}
        </div>
        <p className="text-sm font-normal text-gray-400">
          Si trabajas aquí actualmente, deja la{' '}
          <span className="text-sm font-bold">fecha de finalización</span> sin
          llenar.
        </p>
      </div>
      <div className="flex w-full flex-col items-center justify-center bg-gray-200">
        {/* <Tiptap
          content={description}
          placeholder="por ejemplo: creación e implementación de planes de aprendizaje basados en intereses y curiosidades dirigidos por los niños."
          onChange={handleInputChange}
          }
        /> */}
        <div className="h-[0.5px] w-full bg-gray-400"></div>
        <Button
          leftIcon={<WandSparklesIcon />}
          // onClick={deleteForm}
          variant="ghost"
          className="w-fit self-start"
        >
          <span className="text-sm font-light capitalize text-gray-500">
            Generar con IA
          </span>
        </Button>
      </div>
    </form>
  );
}
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

