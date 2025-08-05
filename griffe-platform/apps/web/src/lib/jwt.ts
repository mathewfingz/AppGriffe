import jwt from 'jsonwebtoken'
import { prisma } from '@griffe/database'
import crypto from 'crypto'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret'

export interface JWTPayload {
  userId: string
  email: string
  role: string
  storeId?: string | null
}

export interface RefreshTokenPayload {
  userId: string
  tokenId: string
}

// Generar Access Token (JWT)
export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '15m', // 15 minutos
    issuer: 'griffe-platform',
    audience: 'griffe-users'
  })
}

// Generar Refresh Token
export async function generateRefreshToken(userId: string): Promise<string> {
  // Generar token único
  const token = crypto.randomBytes(64).toString('hex')
  
  // Calcular fecha de expiración (30 días)
  const expires = new Date()
  expires.setDate(expires.getDate() + 30)

  // Guardar en base de datos
  const refreshToken = await prisma.refreshToken.create({
    data: {
      token,
      userId,
      expires
    }
  })

  // Crear JWT con el ID del refresh token
  const refreshJWT = jwt.sign(
    { userId, tokenId: refreshToken.id } as RefreshTokenPayload,
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: '30d',
      issuer: 'griffe-platform',
      audience: 'griffe-refresh'
    }
  )

  return refreshJWT
}

// Verificar Access Token
export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'griffe-platform',
      audience: 'griffe-users'
    }) as JWTPayload
    return decoded
  } catch (error) {
    return null
  }
}

// Verificar Refresh Token
export async function verifyRefreshToken(token: string): Promise<{ userId: string; tokenId: string } | null> {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET, {
      issuer: 'griffe-platform',
      audience: 'griffe-refresh'
    }) as RefreshTokenPayload

    // Verificar que el token existe en la base de datos y no ha expirado
    const refreshToken = await prisma.refreshToken.findUnique({
      where: { id: decoded.tokenId },
      include: { user: true }
    })

    if (!refreshToken || refreshToken.expires < new Date()) {
      // Token expirado o no existe, eliminarlo si existe
      if (refreshToken) {
        await prisma.refreshToken.delete({
          where: { id: decoded.tokenId }
        })
      }
      return null
    }

    return { userId: decoded.userId, tokenId: decoded.tokenId }
  } catch (error) {
    return null
  }
}

// Renovar Access Token usando Refresh Token
export async function refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string } | null> {
  const tokenData = await verifyRefreshToken(refreshToken)
  
  if (!tokenData) {
    return null
  }

  // Obtener datos del usuario
  const user = await prisma.user.findUnique({
    where: { id: tokenData.userId },
    include: { store: true }
  })

  if (!user) {
    return null
  }

  // Generar nuevo access token
  const newAccessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    storeId: user.storeId
  })

  // Generar nuevo refresh token (rotación de tokens)
  await revokeRefreshToken(tokenData.tokenId)
  const newRefreshToken = await generateRefreshToken(user.id)

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  }
}

// Revocar Refresh Token
export async function revokeRefreshToken(tokenId: string): Promise<void> {
  try {
    await prisma.refreshToken.delete({
      where: { id: tokenId }
    })
  } catch (error) {
    // Token ya eliminado o no existe
  }
}

// Revocar todos los Refresh Tokens de un usuario
export async function revokeAllRefreshTokens(userId: string): Promise<void> {
  await prisma.refreshToken.deleteMany({
    where: { userId }
  })
}

// Limpiar tokens expirados (función de mantenimiento)
export async function cleanupExpiredTokens(): Promise<void> {
  const now = new Date()
  
  await prisma.refreshToken.deleteMany({
    where: {
      expires: {
        lt: now
      }
    }
  })

  await prisma.passwordResetToken.deleteMany({
    where: {
      expires: {
        lt: now
      }
    }
  })
}