import { useCallback } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import type { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';

type EntryWithId = { id: UniqueIdentifier };
type UseSortableItemsProps<T extends EntryWithId> = {
  items: T[],
  onReorder: (newOrder: UniqueIdentifier[]) => void
}

export function useSortableList<T extends EntryWithId>({items, onReorder}: UseSortableItemsProps<T>) {
  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!over || active.id === over.id) return;

      const oldIndex = items.findIndex((e) => e.id === active.id);
      const newIndex = items.findIndex((e) => e.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return;

      const newOrder = arrayMove(items, oldIndex, newIndex).map((i) => i.id);
      onReorder(newOrder);
    },
    [items, onReorder]
  );

  return {handleDragEnd}
}
