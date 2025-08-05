import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Store,
  ShoppingCart,
  DollarSign,
  BarChart3,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Tiendas', href: '/admin/tiendas', icon: Store },
  { name: 'Pedidos', href: '/admin/pedidos', icon: ShoppingCart },
  { name: 'Finanzas', href: '/admin/finanzas', icon: DollarSign },
  { name: 'Reportes', href: '/admin/reportes', icon: BarChart3 },
  { name: 'Usuarios', href: '/admin/usuarios', icon: Users },
  { name: 'Soporte', href: '/admin/soporte', icon: MessageSquare },
  { name: 'Configuración', href: '/admin/configuracion', icon: Settings },
];

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-dashboard-border">
        <div className="flex items-center gap-3">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets%2Fba13dea2100e443594be28096ef0e240%2F32c0fc8ad84747b1ad73c52cc874a901?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Fba13dea2100e443594be28096ef0e240%2F32c0fc8ad84747b1ad73c52cc874a901?width=200 200w"
            className="w-8 h-8 object-cover"
            alt="Logo"
          />
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-semibold text-dashboard-text">Admin Panel</h1>
              <p className="text-xs text-dashboard-text-muted">Marketplace</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-primary text-white'
                  : 'text-dashboard-text hover:bg-dashboard-hover'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User info and logout */}
      <div className="p-4 border-t border-dashboard-border">
        {!isCollapsed && (
          <div className="mb-3">
            <p className="text-sm font-medium text-dashboard-text">{user?.name}</p>
            <p className="text-xs text-dashboard-text-muted">{user?.email}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-dashboard-danger hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Cerrar Sesión</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-dashboard-border"
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
        className={`lg:hidden fixed left-0 top-0 h-full w-64 bg-white border-r border-dashboard-border z-50 transform transition-transform ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-dashboard-border">
          <h2 className="text-lg font-semibold text-dashboard-text">Menú</h2>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1 hover:bg-dashboard-hover rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div
        className={`hidden lg:flex flex-col bg-white border-r border-dashboard-border transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Collapse button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 w-6 h-6 bg-white border border-dashboard-border rounded-full flex items-center justify-center hover:bg-dashboard-hover"
        >
          <Menu className="w-3 h-3" />
        </button>
        
        <SidebarContent />
      </div>
    </>
  );
}