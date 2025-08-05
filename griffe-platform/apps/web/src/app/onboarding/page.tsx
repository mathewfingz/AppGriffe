'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@griffe/ui'
import { Input } from '@griffe/ui'
import { Label } from '@griffe/ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Store, ArrowRight } from 'lucide-react'

const storeSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  slug: z.string()
    .min(3, 'El slug debe tener al menos 3 caracteres')
    .regex(/^[a-z0-9-]+$/, 'Solo letras minúsculas, números y guiones'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
})

type StoreFormData = z.infer<typeof storeSchema>

export default function OnboardingPage() {
  const router = useRouter()
  const { data: session, update } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
  })

  const storeName = watch('name')

  // Auto-generate slug from store name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const onSubmit = async (data: StoreFormData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/stores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const store = await response.json()
        // Update session with new store info
        await update({
          ...session,
          user: {
            ...session?.user,
            storeId: store.id,
            store: store,
          },
        })
        router.push('/dashboard')
      } else {
        const error = await response.json()
        console.error('Error creating store:', error)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Store className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Configura tu tienda
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Completa la información para crear tu tienda en GRIFFE
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="name">Nombre de la tienda</Label>
              <div className="mt-1">
                <Input
                  id="name"
                  type="text"
                  placeholder="Mi Tienda Increíble"
                  {...register('name')}
                  onChange={(e) => {
                    register('name').onChange(e)
                    setValue('slug', generateSlug(e.target.value))
                  }}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="slug">URL de la tienda</Label>
              <div className="mt-1">
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    griffe.com/
                  </span>
                  <Input
                    id="slug"
                    type="text"
                    className="rounded-l-none"
                    placeholder="mi-tienda"
                    {...register('slug')}
                  />
                </div>
                {errors.slug && (
                  <p className="mt-2 text-sm text-red-600">{errors.slug.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <div className="mt-1">
                <textarea
                  id="description"
                  rows={3}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Describe tu tienda y los productos que vendes..."
                  {...register('description')}
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Creando tienda...'
                ) : (
                  <>
                    Crear mi tienda
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}