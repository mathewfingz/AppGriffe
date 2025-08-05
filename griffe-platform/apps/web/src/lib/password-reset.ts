import { prisma } from '@griffe/database'
import crypto from 'crypto'
import { sendPasswordResetEmail } from './email'

// Generar token de recuperación de contraseña
export async function generatePasswordResetToken(email: string): Promise<{ success: boolean; message: string }> {
  try {
    // Buscar usuario por email
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Por seguridad, no revelamos si el email existe o no
      return {
        success: true,
        message: 'Si el email existe en nuestro sistema, recibirás un enlace de recuperación.'
      }
    }

    // Invalidar tokens anteriores del usuario
    await prisma.passwordResetToken.updateMany({
      where: {
        userId: user.id,
        used: false,
        expires: {
          gt: new Date()
        }
      },
      data: {
        used: true
      }
    })

    // Generar nuevo token
    const token = crypto.randomBytes(32).toString('hex')
    
    // Calcular fecha de expiración (1 hora)
    const expires = new Date()
    expires.setHours(expires.getHours() + 1)

    // Guardar token en base de datos
    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expires
      }
    })

    // Construir URL de reset
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3002'
    const resetUrl = `${baseUrl}/auth/reset-password?token=${token}`

    // Enviar email
    const emailSent = await sendPasswordResetEmail(user.email, resetUrl, user.name || undefined)

    if (!emailSent) {
      console.error('Failed to send password reset email')
      return {
        success: false,
        message: 'Error al enviar el email de recuperación. Inténtalo de nuevo.'
      }
    }

    return {
      success: true,
      message: 'Si el email existe en nuestro sistema, recibirás un enlace de recuperación.'
    }
  } catch (error) {
    console.error('Error generating password reset token:', error)
    return {
      success: false,
      message: 'Error interno del servidor. Inténtalo de nuevo.'
    }
  }
}

// Verificar token de recuperación de contraseña
export async function verifyPasswordResetToken(token: string): Promise<{ valid: boolean; userId?: string; message: string }> {
  try {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true }
    })

    if (!resetToken) {
      return {
        valid: false,
        message: 'Token de recuperación inválido o expirado.'
      }
    }

    if (resetToken.used) {
      return {
        valid: false,
        message: 'Este token ya ha sido utilizado.'
      }
    }

    if (resetToken.expires < new Date()) {
      // Marcar como usado para limpieza
      await prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { used: true }
      })

      return {
        valid: false,
        message: 'Token de recuperación expirado. Solicita uno nuevo.'
      }
    }

    return {
      valid: true,
      userId: resetToken.userId,
      message: 'Token válido.'
    }
  } catch (error) {
    console.error('Error verifying password reset token:', error)
    return {
      valid: false,
      message: 'Error al verificar el token.'
    }
  }
}

// Restablecer contraseña usando token
export async function resetPasswordWithToken(
  token: string, 
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Verificar token
    const tokenVerification = await verifyPasswordResetToken(token)
    
    if (!tokenVerification.valid || !tokenVerification.userId) {
      return {
        success: false,
        message: tokenVerification.message
      }
    }

    // Hash de la nueva contraseña
    const bcrypt = await import('bcryptjs')
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    // Actualizar contraseña del usuario
    await prisma.user.update({
      where: { id: tokenVerification.userId },
      data: { password: hashedPassword }
    })

    // Marcar token como usado
    await prisma.passwordResetToken.updateMany({
      where: {
        token,
        used: false
      },
      data: { used: true }
    })

    // Revocar todos los refresh tokens del usuario por seguridad
    await prisma.refreshToken.deleteMany({
      where: { userId: tokenVerification.userId }
    })

    return {
      success: true,
      message: 'Contraseña actualizada exitosamente.'
    }
  } catch (error) {
    console.error('Error resetting password:', error)
    return {
      success: false,
      message: 'Error al actualizar la contraseña. Inténtalo de nuevo.'
    }
  }
}

// Limpiar tokens expirados (función de mantenimiento)
export async function cleanupExpiredPasswordResetTokens(): Promise<void> {
  try {
    const now = new Date()
    
    await prisma.passwordResetToken.deleteMany({
      where: {
        OR: [
          { expires: { lt: now } },
          { used: true }
        ]
      }
    })
  } catch (error) {
    console.error('Error cleaning up expired password reset tokens:', error)
  }
}