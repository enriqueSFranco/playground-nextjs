"use client"

import {createContext, useRef, useState} from "react"

interface PanelState {
  isOpen: boolean;
  content: React.ReactNode | null;
}

type PanelStateContextType = {
  panelState: PanelState
  closePanel: () => void
  openPanel: (content: React.ReactNode, triggerElement?: HTMLElement) => void
}

export const PanelContext = createContext<PanelStateContextType | undefined>(undefined)

type Props = {
  children: React.ReactNode
}

export function PanelProvider({children}: Props) {
  const [panelState, setPanelState] = useState<PanelState>({isOpen: false, content: null})
  const triggerRef = useRef<HTMLElement | null>(null)

  function openPanel(content: React.ReactNode, triggerElement?: HTMLElement) {
    if (triggerElement) triggerRef.current = triggerElement;
    setPanelState({isOpen: true, content})
  }

  function closePanel() {
    setPanelState({isOpen: false, content: null})
    // Devolver foco al botón que abrió el panel
    triggerRef.current?.focus();
  }

  const value: PanelStateContextType = {
    panelState,
    openPanel,
    closePanel
  }
  return (
    <PanelContext value={value}>
      {children}
    </PanelContext>
  )
}
