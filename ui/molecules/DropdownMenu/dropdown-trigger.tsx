import { useDropdown } from "@/context/DropdownMenuContext"
import { ChevronDownIcon } from "lucide-react"

type Props = {
  children: React.ReactNode
}

export function DropdownTrigger({children}: Props) {
  const {isOpen, toggle} = useDropdown()

  return(
    <div role='button' aria-haspopup="true" aria-expanded={isOpen} onClick={toggle} className="relative cursor-pointer">
      {children}
    </div>
  )
}
