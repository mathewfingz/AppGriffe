import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@griffe/database'
import { z } from 'zod'

const createStoreSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  slug: z.string()
    .min(3, 'El slug debe tener al menos 3 caracteres')
    .regex(/^[a-z0-9-]+$/, 'Solo letras minúsculas, números y guiones'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // Check if user already has a store
    if (session.user.storeId) {
      return NextResponse.json(
        { error: 'El usuario ya tiene una tienda' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const validatedData = createStoreSchema.parse(body)

    // Check if slug is already taken
    const existingStore = await prisma.store.findUnique({
      where: { slug: validatedData.slug }
    })

    if (existingStore) {
      return NextResponse.json(
        { error: 'Este slug ya está en uso' },
        { status: 400 }
      )
    }

    // Create the store
    const store = await prisma.store.create({
      data: {
        name: validatedData.name,
        slug: validatedData.slug,
        description: validatedData.description,
        userId: session.user.id,
      }
    })

    // Update user with storeId
    await prisma.user.update({
      where: { id: session.user.id },
      data: { storeId: store.id }
    })

    return NextResponse.json(store, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating store:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // Only admins can list all stores
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Acceso denegado' },
        { status: 403 }
      )
    }

    const stores = await prisma.store.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        _count: {
          select: {
            products: true,
            orders: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(stores)
  } catch (error) {
    console.error('Error fetching stores:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}