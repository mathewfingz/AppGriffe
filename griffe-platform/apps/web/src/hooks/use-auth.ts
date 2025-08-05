'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

export function useAuth() {
  const { data: session, status, update } = useSession()
  const router = useRouter()

  // Función para refrescar el token de acceso
  const refreshToken = useCallback(async () => {
    if (!session?.refreshToken) {
      return false
    }

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: session.refreshToken,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to refresh token')
      }

      const data = await response.json()
      
      // Actualizar la sesión con los nuevos tokens
      await update({
        ...session,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      })

      return true
    } catch (error) {
      console.error('Error refreshing token:', error)
      // Si falla el refresh, cerrar sesión
      await signOut({ callbackUrl: '/auth/login' })
      return false
    }
  }, [session, update])

  // Función para cerrar sesión
  const logout = useCallback(async () => {
    try {
      // Revocar el refresh token en el servidor
      if (session?.refreshToken) {
        await fetch('/api/auth/revoke', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken: session.refreshToken,
          }),
        })
      }
    } catch (error) {
      console.error('Error revoking token:', error)
    } finally {
      await signOut({ callbackUrl: '/auth/login' })
    }
  }, [session])

  // Función para redirigir según el rol del usuario
  const redirectToDashboard = useCallback(() => {
    if (!session?.user) return

    switch (session.user.role) {
      case 'ADMIN':
        router.push('/admin')
        break
      case 'STORE_OWNER':
      case 'STORE_EMPLOYEE':
        router.push('/store')
        break
      default:
        router.push('/store')
        break
    }
  }, [session, router])

  // Auto-refresh del token cuando esté próximo a expirar
  useEffect(() => {
    if (status === 'authenticated' && session?.accessToken) {
      // Configurar refresh automático 5 minutos antes de que expire el token
      const refreshInterval = setInterval(() => {
        refreshToken()
      }, 10 * 60 * 1000) // 10 minutos

      return () => clearInterval(refreshInterval)
    }
  }, [status, session, refreshToken])

  return {
    user: session?.user,
    session,
    status,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    refreshToken,
    logout,
    redirectToDashboard,
    update,
  }
}