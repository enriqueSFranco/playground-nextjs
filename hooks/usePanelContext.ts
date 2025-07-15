import { PanelContext } from "@/context/PanelContext"
import {useContext} from "react"

export function usePanelContext() {
  const ctx = useContext(PanelContext)

  if (!ctx) throw new Error("usePanelContext must be use with a PanelProvider");

  return ctx
}
