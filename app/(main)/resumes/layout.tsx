import Navbar from "./Navbar"

interface Props {
  children: React.ReactNode
}

export default function MainLayout({children}: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
    </div>
  )
}