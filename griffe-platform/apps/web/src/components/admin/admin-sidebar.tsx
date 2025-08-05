'use client'

import { 
  Home,
  Users,
  Store,
  ShoppingCart,
  BarChart3,
  DollarSign,
  Settings,
  LogOut,
  Shield,
  Package,
  FileText,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button, Avatar, AvatarFallback, cn } from "@griffe/ui";

const navigationItems = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Usuarios", href: "/admin/usuarios", icon: Users },
  { name: "Tiendas", href: "/admin/tiendas", icon: Store },
  { name: "Pedidos", href: "/admin/pedidos", icon: ShoppingCart },
  { name: "Finanzas", href: "/admin/finanzas", icon: DollarSign },
  { name: "Reportes", href: "/admin/reportes", icon: BarChart3 },
  { name: "Productos", href: "/admin/productos", icon: Package },
  { name: "Soporte", href: "/admin/soporte", icon: AlertTriangle },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: '/auth/login' });
  };

  return (
    <div className="w-64 min-h-screen bg-[#EBEBEB] p-2.5 flex flex-col">
      {/* User Info */}
      {session?.user && (
        <div className="mb-4 p-3 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">
                {session.user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'AD'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {session.user.name}
              </p>
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-blue-600" />
                <p className="text-xs text-gray-500">
                  Administrador
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-2 h-9 px-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-[#FAFAFA] text-black font-bold" 
                  : "text-black hover:bg-[#FAFAFA]/50"
              )}
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
      
      {/* Bottom Actions */}
      <div className="mt-auto space-y-1">
        <Link
          href="/admin/configuracion"
          className={cn(
            "flex items-center gap-2 h-9 px-2.5 rounded-lg text-sm font-medium transition-colors",
            pathname === "/admin/configuracion"
              ? "bg-[#FAFAFA] text-black font-bold"
              : "text-black hover:bg-[#FAFAFA]/50"
          )}
        >
          <Settings className="w-5 h-5" strokeWidth={1.5} />
          <span>Configuración</span>
        </Link>
        
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-2 h-9 px-2.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5" strokeWidth={1.5} />
          <span>Cerrar Sesión</span>
        </Button>
      </div>
    </div>
  );
}