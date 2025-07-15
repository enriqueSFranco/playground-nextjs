import { ChevronLeftIcon } from "@heroicons/react/24/outline";

type Props = {
  children?: React.ReactNode;
}

export default function Layout({children}: Props) {
  return (
    <div>
      {children}
    </div>
  )
}
