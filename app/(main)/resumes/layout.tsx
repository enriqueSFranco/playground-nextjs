import { DropdownProvider } from "@/context/DropdownMenuContext"
import Navbar from "../../../ui/organisms/navbar"

interface Props {
  children: React.ReactNode
}

export default function MainLayout({children}: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <DropdownProvider>
        <Navbar />
      </DropdownProvider>
      {children}
    </div>
  )
}
