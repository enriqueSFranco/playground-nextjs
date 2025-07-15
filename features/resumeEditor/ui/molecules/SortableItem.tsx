'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem({
  id,
  children,
}: {
  id: string;
  children: (props: {
    attributes: any;
    listeners: any;
    setNodeRef: (el: HTMLElement | null) => void;
    style: React.CSSProperties;
  }) => React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return <>{children({ attributes, listeners, setNodeRef, style })}</>;
}
