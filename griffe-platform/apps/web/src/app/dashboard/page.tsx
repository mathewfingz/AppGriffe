'use client'

import { useSession } from 'next-auth/react'
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react'

export default function StoreDashboard() {
  const { data: session } = useSession()

  const stats = [
    {
      name: 'Productos',
      value: '24',
      change: '+3 nuevos',
      changeType: 'increase',
      icon: Package,
    },
    {
      name: 'Pedidos Hoy',
      value: '12',
      change: '+18%',
      changeType: 'increase',
      icon: ShoppingCart,
    },
    {
      name: 'Clientes',
      value: '89',
      change: '+5 nuevos',
      changeType: 'increase',
      icon: Users,
    },
    {
      name: 'Ventas del Mes',
      value: '$3,247',
      change: '+12%',
      changeType: 'increase',
      icon: TrendingUp,
    },
  ]

  const recentOrders = [
    {
      id: '#001',
      customer: 'Ana García',
      product: 'Vestido Floral',
      amount: '$89.99',
      status: 'Completado',
      time: 'Hace 2 horas',
    },
    {
      id: '#002',
      customer: 'Carlos López',
      product: 'Camisa Casual',
      amount: '$45.50',
      status: 'Procesando',
      time: 'Hace 4 horas',
    },
    {
      id: '#003',
      customer: 'María Rodríguez',
      product: 'Zapatos Deportivos',
      amount: '$120.00',
      status: 'Enviado',
      time: 'Hace 6 horas',
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido, {session?.user?.name}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Resumen de tu tienda {session?.user?.store?.name}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-blue-500 rounded-md p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'increase'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Pedidos Recientes
          </h3>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pedido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiempo
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'Completado'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Procesando'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}