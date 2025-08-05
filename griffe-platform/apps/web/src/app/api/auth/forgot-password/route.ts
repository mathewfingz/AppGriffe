import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generatePasswordResetToken } from '@/lib/password-reset'

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar datos de entrada
    const validation = forgotPasswordSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Datos inválidos',
          details: validation.error.errors
        },
        { status: 400 }
      )
    }

    const { email } = validation.data

    // Generar token de recuperación
    const result = await generatePasswordResetToken(email)

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: result.message
    })

  } catch (error) {
    console.error('Error in forgot-password API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}