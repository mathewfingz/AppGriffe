'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button, Avatar, AvatarFallback, cn } from '@griffe/ui'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  DollarSign,
  BarChart3,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Store
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/tienda', icon: LayoutDashboard },
  { name: 'Productos', href: '/tienda/productos', icon: Package },
  { name: 'Pedidos', href: '/tienda/pedidos', icon: ShoppingCart },
  { name: 'Ventas', href: '/tienda/ventas', icon: DollarSign },
  { name: 'Reportes', href: '/tienda/reportes', icon: BarChart3 },
  { name: 'Clientes', href: '/tienda/clientes', icon: Users },
  { name: 'Soporte', href: '/tienda/soporte', icon: MessageSquare },
  { name: 'Configuración', href: '/tienda/configuracion', icon: Settings },
]

export function TiendaSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Store className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Mi Tienda</h1>
              <p className="text-xs text-gray-500">Panel de Control</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User info and logout */}
      <div className="p-4 border-t border-gray-200">
        {!isCollapsed && (
          <div className="mb-3 flex items-center gap-3">
            <Avatar>
              <AvatarFallback>MT</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-gray-900">Mi Tienda Store</p>
              <p className="text-xs text-gray-500">tienda@griffe.com</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          className="flex items-center gap-3 w-full justify-start px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Cerrar Sesión</span>}
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          "lg:hidden fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform",
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Menú</h2>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div
        className={cn(
          "hidden lg:flex flex-col bg-white border-r border-gray-200 transition-all duration-300",
          isCollapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Collapse button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-100 z-10"
        >
          <Menu className="w-3 h-3" />
        </button>
        
        <SidebarContent />
      </div>
    </>
  )
}