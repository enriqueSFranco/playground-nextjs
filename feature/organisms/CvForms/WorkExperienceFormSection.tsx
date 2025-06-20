'use client';

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DndContext, closestCenter } from '@dnd-kit/core';
// import { useScreen } from '@/hooks/useScreen';
import { PlusIcon } from '@heroicons/react/24/outline';

import { SortableItem } from '@/feature/cvEditor/components/molecules/SortableItem';
import { SortableWorkExperienceItem } from '../../cvEditor/components/molecules/SortableWorkExperienceItem';
import { $resumeStore } from '@/store/editor';
import { ResumeSectionHeader } from '../../cvEditor/components/molecules/ResumeSectionHeader';
import { WorkExperienceEntryForm } from '@/feature/cvEditor/components/molecules/WorkExperienceForm';
import { usePanel } from '@/hooks/usePanel';
import { Button } from '@/ui/atoms/Button/Button';
import { Panel } from '@/ui/organisms/Panel';
import { WorkExperience } from '@/shared/types';
import { useState } from 'react';

export function WorkExperienceFormSection() {
  const workExperienceList: WorkExperience[] = $resumeStore.selectors.useWorkExperience();
  const[activeForm, setActiveForm] = useState("")
  const { addEntry, reorderEntries } = $resumeStore.actions;
  const { isOpenPanel, open, close } = usePanel();
  // const { isBreakpoint } = useScreen();
  // const isSmallScreen = isBreakpoint([
  //   'mobile',
  //   'mobileLarge',
  //   'tablet',
  //   'tabletLarge',
  // ]);

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const oldIndex = workExperienceList.findIndex((e) => e.id === active.id);
    const newIndex = workExperienceList.findIndex((e) => e.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newOrder = arrayMove(workExperienceList, oldIndex, newIndex).map(
      (i) => i.id,
    );
    reorderEntries('workExperience', newOrder); // 👈 Actualiza en el store
  };

  function handleOpenPanel(formId: string) {
    setActiveForm(formId)
  }

  function onAddNew() {
    addEntry('workExperience'); // suponer que retorna la nueva entrada
    open();
  }

  return (
    <section className="relative">
      <div className="flex w-full flex-col items-start gap-4 bg-white p-2">
        <ResumeSectionHeader
          title="Tu trayectoria profesional"
          description="Platica brevemente tu experiencia en los últimos 10 años. ¿Qué cosas chidas has logrado? Si tienes cifras, resultados o ejemplos concretos, mucho mejor. ¡Que se vea de qué estás hecho/a!"
        />
        {workExperienceList && (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd} // obligatorio
          >
            <SortableContext
              items={workExperienceList.map((w) => w.id)} // 👈 ids estables
              strategy={verticalListSortingStrategy}
            >
              <div className="flex w-full flex-col gap-3">
                {workExperienceList.map((item) => (
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
        )}

        <Button
          className="w-fit bg-transparent"
          leftIcon={<PlusIcon className="w-5 stroke-blue-700" />}
          onClick={onAddNew}
        >
          <span className="text-sm font-semibold text-blue-700">
            Agregar experiencia laboral
          </span>
        </Button>
      </div>
      {/* {isOpenPanel && activeForm && (
        <Panel
          onClose={close}
          title={`experiencia laboral ${activeForm}`}
          description="experiencia laboral"
        >
          <WorkExperienceEntryForm form={workExperienceList.find(form => form.id === activeForm)} />
        </Panel>
      )} */}
    </section>
  );
}
