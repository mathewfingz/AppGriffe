import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Dashboard - GRIFFE',
  description: 'Panel de control para gestionar tu tienda en GRIFFE',
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  if (session.user.role === 'ADMIN') {
    redirect('/admin')
  }

  if (!session.user.storeId) {
    redirect('/onboarding')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm border-r border-gray-200">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-900">
              {session.user.store?.name || 'Mi Tienda'}
            </h1>
            <p className="text-sm text-gray-500">Dashboard</p>
          </div>
          <nav className="mt-6">
            <div className="px-3">
              <div className="space-y-1">
                <a
                  href="/dashboard"
                  className="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  Resumen
                </a>
                <a
                  href="/dashboard/products"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  Productos
                </a>
                <a
                  href="/dashboard/orders"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  Pedidos
                </a>
                <a
                  href="/dashboard/customers"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  Clientes
                </a>
                <a
                  href="/dashboard/analytics"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  Analytics
                </a>
                <a
                  href="/dashboard/settings"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  Configuración
                </a>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}