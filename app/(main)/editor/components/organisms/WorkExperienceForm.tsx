'use client';
// import { useEffect, useRef } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button } from '@/components/atoms/Button/Button';
import { WorkExperienceEntryForm } from '../molecules/WorkExperienceEntryForm';
import { $editorStore } from '@/app/(main)/_shared-store/editor';
import { useSearchParams } from 'next/navigation';
import { Modal } from '@/components/organisms/Modal/Modal';
// import { DynamicList } from '@/components/organisms/DynamicList/DynamicList';

export function WorkExperienceForm() {
  const searchParams = useSearchParams();
  const workExperiences = $editorStore.selectors.useWorkExperience();
  const { addEntry } = $editorStore.actions;
  const show = searchParams.get('show');
  // const listRef = useRef<HTMLOListElement | null>(null);

  // useEffect(() => {
  //   if (workExperiences.length > 0 && listRef.current) {
  //     // Nos aseguramos de hacer scroll hacia el último elemento
  //     setTimeout(() => {
  //       const lastItem = listRef.current?.lastElementChild;
  //       if (lastItem) {
  //         lastItem.scrollIntoView({
  //           behavior: 'smooth',
  //           block: 'start',
  //         });
  //       }
  //     }, 50);
  //   }
  // }, [workExperiences]);

  return (
    <div className="flex w-full flex-col items-center gap-4 bg-red-600">
      {/* TODO: Usar el componente CVHeader */}
      <header className="flex flex-col items-center justify-center">
        <h2 className="text-2xl">Experiencia laboral</h2>
        <p className="text-sm text-gray-400">
          Agrega tantas experiencias laborales como desees
        </p>
      </header>
      <DndContext collisionDetection={closestCenter}>
        <SortableContext
          items={workExperiences}
          strategy={verticalListSortingStrategy}
        >
          {workExperiences.map((it) => (
            <WorkExperienceEntryForm key={it.id} form={it} />
          ))}
        </SortableContext>
      </DndContext>
      {/* <DynamicList
          items={workExperiences}
          renderItem={(it) => <WorkExperienceEntryForm form={it} />}
          keyPrefix="workExperienceEntry"
          direction="vertical"
        /> */}
      <Button
        className="text-md flex w-fit items-center justify-between gap-2 bg-black px-[10px] py-2 font-medium capitalize text-white transition-colors duration-300 ease-in-out hover:bg-neutral-800 dark:bg-white dark:text-black"
        onClick={() => addEntry('workExperience')}
      >
        Agregar experiencia laboral
      </Button>
      <Modal title="Genra tu experiencia laboral con IA" description='Describe tus habilidades o roles deseados y deja que la IA genere experiencia laboral relevante para ti.'>
        <label className="flex flex-col space-y-2" id="description">
          <span>Descripción</span>
          <textarea
            placeholder="Ej: Soy estudiante de ingeniería de software y quiero aplicar a un rol de desarrollador backend junior."
            name="description"
            className="w-full h-28 resize-none rounded-md border-none outline outline-[1px] outline-black"
          ></textarea>
        </label>
      </Modal>
    </div>
  );
}
