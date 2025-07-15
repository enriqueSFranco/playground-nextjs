'use client';

import { SessionProvider } from "next-auth/react"
import StoreProvider from "./StoreProvider"

type Props = {
  children: React.ReactNode
}
export function Providers({children}: Props) {
  return (
    <StoreProvider>
      <SessionProvider>{children}</SessionProvider>
    </StoreProvider>
  )
}
