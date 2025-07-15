import { useEffect, useState } from 'react';
import { useDropdown } from '@/context/DropdownMenuContext';
import { cn } from '@/utils/cn';

type DropDownItem = {
  text: string;
  icon?: React.ReactNode;
  action?: () => void;
};

type DropdownMenuProps = {
  items: DropDownItem[];
};

export function DropdownMenu({ items }: DropdownMenuProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const { isOpen, close } = useDropdown();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isOpen) {
      setShouldRender(true)
    } else {
      timeoutId = setTimeout(() => setShouldRender(false), 150)
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [isOpen])

  if (!shouldRender) return null

  return (
    <div
      aria-orientation="vertical"
      role="menu"
      className={cn(
        'absolute right-4 top-14 z-50 w-48 origin-top-right rounded-md bg-white p-2 shadow-lg',
        'transition-all duration-150 ease-in-out',
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      )}
      style={{pointerEvents: isOpen ? 'auto' : 'none'}}
    >
      {items.map((item) => (
        <button
          key={item.text}
          onClick={() => {
            item?.action?.()
            close()
          }}
          className="flex items-center gap-1"
          role="menuitem"
        >
          {item.icon && item.icon}
          <label className="text-sm font-light">{item.text}</label>
        </button>
      ))}
    </div>
  );
}
