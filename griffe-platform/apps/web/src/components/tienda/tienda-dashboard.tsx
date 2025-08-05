'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@griffe/ui'
import {
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  AlertTriangle,
  Search,
  Eye,
  MoreHorizontal
} from 'lucide-react'

// Mock data basado en nova-works
const kpiData = {
  ventasTotales: { value: 25840000, change: 12.5, period: '30d' },
  productosActivos: { value: 247, change: 8.3, period: '30d' },
  pedidosRecibidos: { value: 184, change: -2.1, period: '30d' },
  clientesUnicos: { value: 1245, change: 15.7, period: '30d' },
  comisionPagada: { value: 2584000, change: 18.2, period: '30d' }
}

const productosTop = [
  { id: 1, nombre: 'iPhone 15 Pro Max', ventas: 5840000, stock: 12, imagen: '📱' },
  { id: 2, nombre: 'MacBook Air M3', ventas: 4920000, stock: 8, imagen: '💻' },
  { id: 3, nombre: 'AirPods Pro 2', ventas: 3670000, stock: 25, imagen: '🎧' },
  { id: 4, nombre: 'iPad Pro 12.9"', ventas: 2450000, stock: 15, imagen: '📱' },
  { id: 5, nombre: 'Apple Watch Ultra', ventas: 1830000, stock: 6, imagen: '⌚' }
]

const pedidosRecientes = [
  { id: '#12847', cliente: 'Juan Pérez', producto: 'iPhone 15 Pro Max', valor: 4200000, estado: 'pendiente', fecha: '2024-01-15' },
  { id: '#12846', cliente: 'María García', producto: 'MacBook Air M3', valor: 5500000, estado: 'procesando', fecha: '2024-01-15' },
  { id: '#12845', cliente: 'Carlos López', producto: 'AirPods Pro 2', valor: 899000, estado: 'enviado', fecha: '2024-01-14' },
  { id: '#12844', cliente: 'Ana Martínez', producto: 'iPad Pro 12.9"', valor: 3200000, estado: 'entregado', fecha: '2024-01-14' },
  { id: '#12843', cliente: 'Luis Rodríguez', producto: 'Apple Watch Ultra', valor: 2800000, estado: 'entregado', fecha: '2024-01-13' }
]

const alertas = [
  { tipo: 'stock', mensaje: 'iPhone 15 Pro Max: Stock crítico (12 unidades)', urgencia: 'alta' },
  { tipo: 'pago', mensaje: 'Pago de comisión pendiente por $2,584,000', urgencia: 'media' },
  { tipo: 'producto', mensaje: 'Apple Watch Ultra: 6 unidades restantes', urgencia: 'media' }
]

const formatCOP = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

interface KPICardProps {
  title: string
  value: number
  change: number
  icon: React.ComponentType<{ className?: string }>
  isCurrency?: boolean
}

function KPICard({ title, value, change, icon: Icon, isCurrency = false }: KPICardProps) {
  const isPositive = change > 0
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <div className={`flex items-center gap-1 text-sm ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className={`w-4 h-4 ${!isPositive && 'rotate-180'}`} />
            {Math.abs(change)}%
          </div>
        </div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">
          {isCurrency ? formatCOP(value) : value.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  )
}

function getEstadoColor(estado: string) {
  switch (estado) {
    case 'pendiente':
      return 'bg-yellow-100 text-yellow-800'
    case 'procesando':
      return 'bg-blue-100 text-blue-800'
    case 'enviado':
      return 'bg-purple-100 text-purple-800'
    case 'entregado':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function TiendaDashboard() {
  const [periodo, setPeriodo] = useState('30d')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Resumen de tu tienda</p>
        </div>
        
        {/* Search and filters */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar... (⌘K)"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
          
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
            <option value="90d">Últimos 90 días</option>
          </select>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KPICard
          title="Ventas Totales"
          value={kpiData.ventasTotales.value}
          change={kpiData.ventasTotales.change}
          icon={DollarSign}
          isCurrency
        />
        <KPICard
          title="Productos Activos"
          value={kpiData.productosActivos.value}
          change={kpiData.productosActivos.change}
          icon={Package}
        />
        <KPICard
          title="Pedidos Recibidos"
          value={kpiData.pedidosRecibidos.value}
          change={kpiData.pedidosRecibidos.change}
          icon={ShoppingCart}
        />
        <KPICard
          title="Clientes Únicos"
          value={kpiData.clientesUnicos.value}
          change={kpiData.clientesUnicos.change}
          icon={Users}
        />
        <KPICard
          title="Comisión Pagada"
          value={kpiData.comisionPagada.value}
          change={kpiData.comisionPagada.change}
          icon={TrendingUp}
          isCurrency
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top 5 Productos */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top 5 Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productosTop.map((producto, index) => (
                <div key={producto.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                      {producto.imagen}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{producto.nombre}</p>
                      <p className="text-sm text-gray-500">#{index + 1} en ventas • Stock: {producto.stock}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCOP(producto.ventas)}</p>
                    <p className={`text-sm ${producto.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                      {producto.stock < 10 ? 'Stock bajo' : 'Stock OK'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alertas */}
        <Card>
          <CardHeader>
            <CardTitle>Alertas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertas.map((alerta, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                    alerta.urgencia === 'alta' ? 'text-red-500' :
                    alerta.urgencia === 'media' ? 'text-yellow-500' : 'text-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{alerta.mensaje}</p>
                    <p className={`text-xs mt-1 ${
                      alerta.urgencia === 'alta' ? 'text-red-600' :
                      alerta.urgencia === 'media' ? 'text-yellow-600' : 'text-blue-600'
                    }`}>
                      Urgencia {alerta.urgencia}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pedidos Recientes */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Pedido</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Cliente</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Producto</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Valor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Estado</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Fecha</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidosRecientes.map((pedido) => (
                  <tr key={pedido.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">{pedido.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-900">{pedido.cliente}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-900">{pedido.producto}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">{formatCOP(pedido.valor)}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(pedido.estado)}`}>
                        {pedido.estado}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-500">{pedido.fecha}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded" title="Ver detalles">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded" title="Más opciones">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}