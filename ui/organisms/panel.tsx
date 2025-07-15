import { useScrollLock } from '@/hooks/useScrollLock';
import { Button } from '@/ui/atoms/Button/Button';
import { cn } from '@/utils/cn';
import { ChevronLeft } from 'lucide-react';
import { useRef } from 'react';

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
} & React.HTMLAttributes<HTMLElement>;
export function Panel({ title, description, open, children, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const {unlockScroll} = useScrollLock()
  function handleClose() {
    if (!onClose) return
    onClose()
    unlockScroll()
  }
  return (
    <div
    className={cn(
      // Fondo oscuro animado con transición de opacidad
      'fixed inset-0 w-full z-50 transition-opacity duration-300 ease-in-out',
      open
        ? 'pointer-events-auto opacity-100'
        : 'pointer-events-none opacity-0',
      'bg-white backdrop-blur-sm',
    )}
    tabIndex={-1}
    aria-hidden={!open}
    >
      <aside
        ref={panelRef}
        className={cn(
          'fixed right-0 top-0 h-full w-full max-w-md shadow-xl transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <header className="flex w-full justify-between">
          <Button
            variant="ghost"
            leftIcon={<ChevronLeft className="w-5 stroke-blue-500" />}
            onClick={handleClose}
          />
          <div className="line-clamp-4 flex w-full flex-col items-center justify-center self-center tracking-wide">
            {title && (
              <h2 className="text-center text-sm font-semibold capitalize text-gray-900">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="flex w-full flex-col">{children}</div>
      </aside>
    </div>
  );
}
