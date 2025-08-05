import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { verifyPasswordResetToken, resetPasswordWithToken } from '@/lib/password-reset'

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token requerido'),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'La contraseña debe contener al menos una mayúscula, una minúscula y un número')
})

const verifyTokenSchema = z.object({
  token: z.string().min(1, 'Token requerido')
})

// Verificar token de recuperación
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Token requerido' },
        { status: 400 }
      )
    }

    const validation = verifyTokenSchema.safeParse({ token })
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Token inválido',
          details: validation.error.errors
        },
        { status: 400 }
      )
    }

    const result = await verifyPasswordResetToken(token)

    if (!result.valid) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      valid: true,
      message: result.message
    })

  } catch (error) {
    console.error('Error in verify reset token API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Restablecer contraseña
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar datos de entrada
    const validation = resetPasswordSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Datos inválidos',
          details: validation.error.errors
        },
        { status: 400 }
      )
    }

    const { token, password } = validation.data

    // Restablecer contraseña
    const result = await resetPasswordWithToken(token, password)

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: result.message
    })

  } catch (error) {
    console.error('Error in reset-password API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}