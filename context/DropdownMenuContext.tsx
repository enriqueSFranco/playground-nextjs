'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

type DropdownType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const DropdownContext = createContext<DropdownType | undefined>(undefined);

type DropdownProviderProps = {
  children: React.ReactNode;
};
export function DropdownProvider({ children }: DropdownProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        console.log('Click fuera, cerrando dropdown');
        close();
      }
    }
    if (isOpen)
      document.addEventListener('mousedown', handleClickOutside, true);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside, true);
  }, [isOpen, close]);

  const value: DropdownType = {
    isOpen,
    open,
    close,
    toggle,
  };

  return (
    <DropdownContext.Provider value={value}>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function useDropdown() {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('Dropdown.* components must be used within <Dropdown />');
  }
  return context;
}
