type ListItemProps<T> = {
  keyPrefix: string;
  renderItem: (item: T, idx: number) => JSX.Element;
  items: T[];
  direction?: 'horizontal' | 'vertical';
};

export function DynamicList<T>({
  items,
  renderItem,
  keyPrefix,
  direction = 'horizontal',
}: ListItemProps<T>) {
  return (
    <ol
      className={`flex ${direction === 'horizontal' ? 'flex-row' : 'flex-col'} gap-8`}
    >
      {items.map((item, idx) => (
        <li key={`${keyPrefix}-${crypto.randomUUID()}`}>
          {renderItem(item, idx)}
        </li>
      ))}
    </ol>
  );
}
