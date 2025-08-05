'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

interface RouteGuardProps {
  children: React.ReactNode
  requiredRole?: string[]
  redirectTo?: string
}

export function RouteGuard({ 
  children, 
  requiredRole = [], 
  redirectTo = '/auth/login' 
}: RouteGuardProps) {
  const { user, status, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    // Si no está autenticado, redirigir al login
    if (!isAuthenticated) {
      router.push(redirectTo)
      return
    }

    // Si se requiere un rol específico y el usuario no lo tiene
    if (requiredRole.length > 0 && user && !requiredRole.includes(user.role)) {
      // Redirigir según el rol del usuario
      switch (user.role) {
        case 'ADMIN':
          router.push('/admin')
          break
        case 'STORE_OWNER':
        case 'STORE_EMPLOYEE':
          router.push('/store')
          break
        default:
          router.push('/auth/login')
          break
      }
      return
    }
  }, [status, isAuthenticated, user, requiredRole, router, redirectTo])

  // Mostrar loading mientras se verifica la autenticación
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Si no está autenticado o no tiene el rol requerido, no mostrar el contenido
  if (!isAuthenticated || (requiredRole.length > 0 && user && !requiredRole.includes(user.role))) {
    return null
  }

  return <>{children}</>
}

// Componente específico para rutas de admin
export function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard requiredRole={['ADMIN']} redirectTo="/store">
      {children}
    </RouteGuard>
  )
}

// Componente específico para rutas de tienda
export function StoreRouteGuard({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard requiredRole={['ADMIN', 'STORE_OWNER', 'STORE_EMPLOYEE']} redirectTo="/auth/login">
      {children}
    </RouteGuard>
  )
}