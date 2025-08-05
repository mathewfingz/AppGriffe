import nodemailer from 'nodemailer'

// Configuración del transportador de email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

// Enviar email genérico
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.warn('SMTP credentials not configured. Email not sent.')
      return false
    }

    await transporter.sendMail({
      from: `"GRIFFE Platform" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    })

    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

// Template para email de recuperación de contraseña
export function getPasswordResetEmailTemplate(resetUrl: string, userName?: string): { html: string; text: string } {
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Recuperar Contraseña - GRIFFE</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          padding: 20px 0;
          border-bottom: 2px solid #f0f0f0;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #2563eb;
        }
        .content {
          padding: 30px 0;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          padding: 20px 0;
          border-top: 1px solid #f0f0f0;
          color: #666;
          font-size: 14px;
        }
        .warning {
          background-color: #fef3c7;
          border: 1px solid #f59e0b;
          border-radius: 6px;
          padding: 15px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">GRIFFE</div>
      </div>
      
      <div class="content">
        <h2>Recuperar Contraseña</h2>
        
        ${userName ? `<p>Hola ${userName},</p>` : '<p>Hola,</p>'}
        
        <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en GRIFFE Platform.</p>
        
        <p>Para crear una nueva contraseña, haz clic en el siguiente enlace:</p>
        
        <div style="text-align: center;">
          <a href="${resetUrl}" class="button">Restablecer Contraseña</a>
        </div>
        
        <div class="warning">
          <strong>⚠️ Importante:</strong>
          <ul>
            <li>Este enlace expirará en 1 hora por seguridad</li>
            <li>Si no solicitaste este cambio, puedes ignorar este email</li>
            <li>Tu contraseña actual seguirá siendo válida hasta que la cambies</li>
          </ul>
        </div>
        
        <p>Si tienes problemas con el enlace, copia y pega la siguiente URL en tu navegador:</p>
        <p style="word-break: break-all; color: #666; font-size: 14px;">${resetUrl}</p>
      </div>
      
      <div class="footer">
        <p>Este email fue enviado desde GRIFFE Platform</p>
        <p>Si no solicitaste este cambio, contacta con nuestro soporte</p>
      </div>
    </body>
    </html>
  `

  const text = `
    GRIFFE - Recuperar Contraseña
    
    ${userName ? `Hola ${userName},` : 'Hola,'}
    
    Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en GRIFFE Platform.
    
    Para crear una nueva contraseña, visita el siguiente enlace:
    ${resetUrl}
    
    IMPORTANTE:
    - Este enlace expirará en 1 hora por seguridad
    - Si no solicitaste este cambio, puedes ignorar este email
    - Tu contraseña actual seguirá siendo válida hasta que la cambies
    
    Si tienes problemas, contacta con nuestro soporte.
    
    GRIFFE Platform
  `

  return { html, text }
}

// Template para email de bienvenida
export function getWelcomeEmailTemplate(userName: string, loginUrl: string): { html: string; text: string } {
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bienvenido a GRIFFE</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          padding: 20px 0;
          border-bottom: 2px solid #f0f0f0;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #2563eb;
        }
        .content {
          padding: 30px 0;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          padding: 20px 0;
          border-top: 1px solid #f0f0f0;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">GRIFFE</div>
      </div>
      
      <div class="content">
        <h2>¡Bienvenido a GRIFFE Platform!</h2>
        
        <p>Hola ${userName},</p>
        
        <p>¡Tu cuenta ha sido creada exitosamente! Estamos emocionados de tenerte en nuestra plataforma.</p>
        
        <p>Ya puedes acceder a tu dashboard y comenzar a gestionar tu tienda:</p>
        
        <div style="text-align: center;">
          <a href="${loginUrl}" class="button">Acceder a mi Dashboard</a>
        </div>
        
        <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
        
        <p>¡Gracias por elegir GRIFFE!</p>
      </div>
      
      <div class="footer">
        <p>GRIFFE Platform - Tu socio en el comercio digital</p>
      </div>
    </body>
    </html>
  `

  const text = `
    ¡Bienvenido a GRIFFE Platform!
    
    Hola ${userName},
    
    ¡Tu cuenta ha sido creada exitosamente! Estamos emocionados de tenerte en nuestra plataforma.
    
    Ya puedes acceder a tu dashboard y comenzar a gestionar tu tienda:
    ${loginUrl}
    
    Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
    
    ¡Gracias por elegir GRIFFE!
    
    GRIFFE Platform - Tu socio en el comercio digital
  `

  return { html, text }
}

// Enviar email de recuperación de contraseña
export async function sendPasswordResetEmail(email: string, resetUrl: string, userName?: string): Promise<boolean> {
  const { html, text } = getPasswordResetEmailTemplate(resetUrl, userName)
  
  return await sendEmail({
    to: email,
    subject: 'Recuperar Contraseña - GRIFFE Platform',
    html,
    text,
  })
}

// Enviar email de bienvenida
export async function sendWelcomeEmail(email: string, userName: string, loginUrl: string): Promise<boolean> {
  const { html, text } = getWelcomeEmailTemplate(userName, loginUrl)
  
  return await sendEmail({
    to: email,
    subject: '¡Bienvenido a GRIFFE Platform!',
    html,
    text,
  })
}