import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { refreshAccessToken } from '@/lib/jwt'

const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token requerido')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar datos de entrada
    const validation = refreshTokenSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Datos inválidos',
          details: validation.error.errors
        },
        { status: 400 }
      )
    }

    const { refreshToken } = validation.data

    // Renovar tokens
    const result = await refreshAccessToken(refreshToken)

    if (!result) {
      return NextResponse.json(
        { error: 'Refresh token inválido o expirado' },
        { status: 401 }
      )
    }

    // Configurar cookies seguras
    const response = NextResponse.json({
      message: 'Tokens renovados exitosamente'
    })

    // Configurar cookies con los nuevos tokens
    response.cookies.set('access-token', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60, // 15 minutos
      path: '/'
    })

    response.cookies.set('refresh-token', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 días
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Error in refresh token API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}