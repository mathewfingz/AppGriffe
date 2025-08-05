import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Autenticación - GRIFFE',
  description: 'Inicia sesión o crea una cuenta en GRIFFE',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  )
}