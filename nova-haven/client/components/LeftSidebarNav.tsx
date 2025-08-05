import { 
  LayoutDashboard,
  Store,
  ShoppingCart,
  DollarSign,
  BarChart3,
  Users,
  MessageSquare,
  Settings,
  Percent,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const navigationItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Tiendas", href: "/admin/tiendas", icon: Store },
  { name: "Pedidos", href: "/admin/pedidos", icon: ShoppingCart },
  { name: "Finanzas", href: "/admin/finanzas", icon: DollarSign },
  { name: "Descuentos", href: "/admin/descuentos", icon: Percent },
  { name: "Reportes", href: "/admin/reportes", icon: BarChart3 },
  { name: "Usuarios", href: "/admin/usuarios", icon: Users },
  { name: "Soporte", href: "/admin/soporte", icon: MessageSquare },
  { name: "Configuración", href: "/admin/configuracion", icon: Settings },
];

export default function LeftSidebarNav() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-60'} max-h-screen bg-[#EBEBEB] p-2.5 flex flex-col transition-all duration-300 hidden lg:flex`}>
      {/* Header with collapse button */}
      <div className="flex items-center justify-between mb-4">
        {!isCollapsed && (
          <h2 className="text-lg font-bold text-[#303030]">NOVA HAVEN</h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-lg hover:bg-[#FAFAFA]/50 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-[#303030]" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-[#303030]" />
          )}
        </button>
      </div>

      <div className="flex-1 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-2 h-10 px-2.5 rounded-lg text-sm font-bold text-black transition-colors ${
                isActive ? "bg-[#FAFAFA]" : "hover:bg-[#FAFAFA]/50"
              }`}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}