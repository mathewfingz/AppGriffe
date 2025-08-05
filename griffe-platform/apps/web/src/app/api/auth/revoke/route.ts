import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { revokeRefreshToken } from '@/lib/jwt'

const revokeTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { refreshToken } = revokeTokenSchema.parse(body)

    // Revocar el refresh token
    await revokeRefreshToken(refreshToken)

    return NextResponse.json(
      { message: 'Token revoked successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error revoking token:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}