import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <main className="h-dvh flex flex-col items-center justify-center p-10 bg-gray-200">
      {children}
    </main>
  )
}
