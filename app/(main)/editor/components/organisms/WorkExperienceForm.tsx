"use client"
// import { useEffect, useRef } from 'react';
import {DndContext, closestCenter} from "@dnd-kit/core"
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable"
import {Button} from '@/components/atoms/Button/Button';
import { WorkExperienceEntryForm } from '../molecules/WorkExperienceEntryForm';
import { $editorStore } from "@/app/(main)/_shared-store/editor";
// import { DynamicList } from '@/components/organisms/DynamicList/DynamicList';

export function WorkExperienceForm() {
  const workExperiences = $editorStore.selectors.useWorkExperience()
  const { addEntry } = $editorStore.actions;

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
    <div className="flex flex-col items-center gap-4">
      {/* TODO: Usar el componente CVHeader */}
      <header className="flex flex-col items-center justify-center">
        <h2 className="text-2xl">Experiencia laboral</h2>
        <p className="text-sm text-gray-400">
          Agrega tantas experiencias laborales como desees
        </p>
      </header>
      <DndContext collisionDetection={closestCenter}>
        <SortableContext items={workExperiences} strategy={verticalListSortingStrategy}>
          {
            workExperiences.map(it => <WorkExperienceEntryForm key={it.id} form={it} />)
          }
          
        </SortableContext>
      </DndContext>
        {/* <DynamicList
          items={workExperiences}
          renderItem={(it) => <WorkExperienceEntryForm form={it} />}
          keyPrefix="workExperienceEntry"
          direction="vertical"
        /> */}

      <Button
        className="dark:bg-white dark:text-black"
        onClick={() => addEntry('workExperience')}
      >
        Agregar experiencia laboral
      </Button>
    </div>
  );
}
