'use client';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DndContext, closestCenter } from '@dnd-kit/core';
// import { useDeviceType } from '@/hooks/useDeviceType';

// import { SortableItem } from '@/feature/resumeEditor/components/molecules/SortableItem';
import { SortableWorkExperienceItem } from '../../resumeEditor/ui/molecules/SortableWorkExperienceItem';
import { ResumeSectionHeader } from '../../resumeEditor/ui/molecules/ResumeSectionHeader';
import { Button } from '@/ui/atoms/Button/Button';
import { useSortableList } from '@/hooks/useSortableList';
import { usePanelContext } from '@/hooks/usePanelContext';
import { useRef } from 'react';
import { useScrollLock } from '@/hooks/useScrollLock';
import { Plus } from 'lucide-react';
import { WorkExperienceEntryForm } from '@/features/resumeEditor/ui/molecules/WorkExperienceForm';

export function WorkExperienceFormSection() {
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const {lockScroll} = useScrollLock()
  const { openPanel } = usePanelContext();

  // const { isBreakpoint } = useDeviceType();
  // const isSmallScreen = isBreakpoint([
  //   'mobile',
  //   'mobileLarge',
  //   'tablet',
  //   'tabletLarge',
  // ]);

  function handleOpenPanel(formId: string) {
    if (!formId) return;
    openPanel(<WorkExperienceEntryForm formId={formId} />, document.activeElement as HTMLElement);
    lockScroll()
  }

  function onAddNew() {
    // const newEntry = addEntry('workExperience');
    // if (!newEntry) return;
    // console.log("ejecutando onAddNew")
    // openPanel(<WorkExperienceEntryForm formId={newEntry.id} />, openButtonRef.current ?? undefined);
    // lockScroll()
  }

  return (
    <section className="relative flex w-full flex-col items-start gap-4 bg-white p-2">
        <ResumeSectionHeader
          title="Tu trayectoria profesional"
          description="Platica brevemente tu experiencia en los últimos 10 años. ¿Qué cosas chidas has logrado? Si tienes cifras, resultados o ejemplos concretos, mucho mejor. ¡Que se vea de qué estás hecho/a!"
        />
        {/* {workExperience && (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={workExperience.map((w) => w.id)} // 👈 ids estables
              strategy={verticalListSortingStrategy}
            >
              <div className="flex w-full flex-col gap-3">
                {workExperience.map((item) => (
                  <SortableItem id={item.id} key={item.id}>
                    {(dragHandle) => (
                      <SortableWorkExperienceItem
                        item={item}
                        onClick={handleOpenPanel}
                        dragHandle={dragHandle} // Pasa todo lo que necesita la card para controlar el drag
                      />
                    )}
                  </SortableItem>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )} */}
        <Button
          ref={openButtonRef}
          aria-label=' Agregar experiencia laboral'
          className="w-fit bg-transparent"
          leftIcon={<Plus />}
          onClick={onAddNew}
        >
          <span className="text-sm font-semibold text-blue-700">
            Agregar experiencia laboral
          </span>
        </Button>
    </section>
  );
}
