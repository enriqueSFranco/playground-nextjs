import { WorkExperience } from '@/shared/types';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { IconGrid } from '@/ui/atoms/Icons/IconGrid';

interface DragHandleProps {
  attributes: any;
  listeners: any;
  setNodeRef: (el: HTMLElement | null) => void;
  style: React.CSSProperties;
}

interface Props {
  item: WorkExperience;
  onClick: (id: string) => void;
  dragHandle: DragHandleProps;
}

export function SortableWorkExperienceItem({ item, onClick, dragHandle }: Props) {
  const { id, position, company, startDate, endDate } = item;

  return (
    <article
      ref={dragHandle.setNodeRef}    // Esta es la referencia para mover toda la card
      style={dragHandle.style}        // Aplica la animación de arrastre a la card completa
      onClick={() => onClick(id)}
      className="flex w-full items-center justify-between touch-none"
    >
      {/* Solo el ícono es drag handle */}
      <div
        {...dragHandle.attributes}   // Solo aquí ponemos los atributos para drag start
        {...dragHandle.listeners}    // Y aquí los listeners que permiten drag
        className="cursor-grab select-none"
        onClick={e => e.stopPropagation()} // Para que no active el onClick de la card al hacer drag
      >
        <IconGrid />
      </div>

      {/* Resto de la card */}
      <div className="shadow-smb w-full rounded-md border-[1px] bg-white p-4 flex justify-between items-center">
        <div className="flex flex-col items-center">
          <h2 className="text-sm font-bold">
            {position || '(No especificado)'}
            {company && <span>{company}</span>}
          </h2>
          {startDate && <h3 className="text-sm font-light text-gray-500">{startDate}</h3>}
          {startDate && endDate && <div>-</div>}
          {endDate && <h3 className="text-sm font-light text-gray-500">{endDate}</h3>}
        </div>
        <button>
          <EllipsisHorizontalIcon className="stroke-gray-500 w-8" />
        </button>
      </div>
    </article>
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
