import type { JSX } from "react";

type ListItemProps<T extends {id: string}> = {
  keyPrefix: string;
  renderItem: (item: T, idx: number) => JSX.Element;
  items: T[];
  direction?: 'horizontal' | 'vertical';
};

export function DynamicList<T extends {id: string}>({
  items,
  renderItem,
  keyPrefix,
  direction = 'horizontal',
}: ListItemProps<T>) {
  return (
    <ol
      className={`flex ${direction === 'horizontal' ? 'flex-row' : 'flex-col'} gap-8 w-full`}
    >
      {items.map((item, idx) => (
        <li key={`${keyPrefix}-${item.id}`}>
          {renderItem(item, idx)}
        </li>
      ))}
    </ol>
  );
}
