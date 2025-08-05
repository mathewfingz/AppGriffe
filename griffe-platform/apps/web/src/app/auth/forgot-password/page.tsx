'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'
import { Button } from '@griffe/ui/button'
import { Input } from '@griffe/ui/input'
import { Label } from '@griffe/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@griffe/ui/card'
import { Alert, AlertDescription } from '@griffe/ui'

const forgotPasswordSchema = z.object({
  email: z.string().email('Ingresa un email válido')
})

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar el email')
      }

      setIsSuccess(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error inesperado')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Email Enviado</CardTitle>
            <CardDescription>
              Revisa tu bandeja de entrada
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Mail className="h-4 w-4" />
              <AlertDescription>
                Si el email <strong>{getValues('email')}</strong> está registrado en nuestro sistema, 
                recibirás un enlace para restablecer tu contraseña.
              </AlertDescription>
            </Alert>
            
            <div className="text-sm text-gray-600 space-y-2">
              <p>• Revisa también tu carpeta de spam</p>
              <p>• El enlace expirará en 1 hora</p>
              <p>• Si no recibes el email, puedes intentar de nuevo</p>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => setIsSuccess(false)} 
                variant="outline" 
                className="w-full"
              >
                Enviar otro email
              </Button>
              
              <Button asChild variant="ghost" className="w-full">
                <Link href="/auth/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al login
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Recuperar Contraseña</CardTitle>
          <CardDescription>
            Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Enviando...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar enlace de recuperación
                </>
              )}
            </Button>

            <Button asChild variant="ghost" className="w-full">
              <Link href="/auth/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al login
              </Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}