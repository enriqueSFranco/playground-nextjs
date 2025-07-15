'use client';

import { Provider } from 'react-redux';
import { useRef } from 'react';
import { AppStore, makeStore } from '@/lib/redux/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Crea la instancia del store la primera vez que se renderiza
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
