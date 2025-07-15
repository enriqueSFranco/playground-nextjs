"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePanelContext } from '@/hooks/usePanelContext';
import { Panel } from '../organisms/panel';

export function GlobalPanelRenderer() {
  const [mounted, setMounted] = useState(false);
  const { panelState, closePanel } = usePanelContext();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <Panel
      open={panelState.isOpen}
      onClose={closePanel}
    >
      {panelState.content}
    </Panel>,
    document.body
  );
}
