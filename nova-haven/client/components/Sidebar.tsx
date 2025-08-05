import { 
  Home,
  List,
  Tag,
  Users,
  Camera,
  Building,
  BarChart3,
  MousePointer,
  Percent,
  Settings,
  LogOut,
  User,
  Shield
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

const navigationItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Orders", href: "/orders", icon: List },
  { name: "Products", href: "/products", icon: Tag },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Content", href: "/content", icon: Camera },
  { name: "Finances", href: "/finances", icon: Building },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Marketing", href: "/marketing", icon: MousePointer },
  { name: "Discounts", href: "/discounts", icon: Percent },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-60 max-h-screen bg-[#EBEBEB] p-2.5 flex flex-col hidden lg:flex">
      {/* User Info */}
      {user && (
        <div className="mb-4 p-3 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user.name}
              </p>
              <div className="flex items-center gap-1">
                {user.role === 'admin' ? (
                  <Shield className="h-3 w-3 text-blue-600" />
                ) : (
                  <User className="h-3 w-3 text-green-600" />
                )}
                <p className="text-xs text-gray-500 capitalize">
                  {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                </p>
              </div>
              {user.storeName && (
                <p className="text-xs text-gray-400 truncate">
                  {user.storeName}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.href ||
            (item.name === "Dashboard" && (location.pathname === "/" || location.pathname === "/analytics"));

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-2 h-7 px-2.5 rounded-lg text-sm font-bold text-black transition-colors ${
                isActive ? "bg-[#FAFAFA]" : "hover:bg-[#FAFAFA]/50"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              <span>{item.name}</span>
            </Link>
          );
        })}
        
        {/* Admin Panel Link */}
        {user?.role === 'admin' && (
          <div className="pt-2 mt-2 border-t border-gray-300">
            <Link
              to="/admin/dashboard"
              className={`flex items-center gap-2 h-7 px-2.5 rounded-lg text-sm font-bold text-black transition-colors ${
                location.pathname.startsWith('/admin') ? "bg-[#FAFAFA]" : "hover:bg-[#FAFAFA]/50"
              }`}
            >
              <Shield className="w-5 h-5" strokeWidth={1.5} />
              <span>Panel Admin</span>
            </Link>
          </div>
        )}
      </div>
      
      <div className="mt-auto space-y-1">
        <Link
          to="/settings"
          className="flex items-center gap-2 h-8 px-2.5 rounded-lg text-sm font-bold text-black bg-[#EBEBEB] hover:bg-[#FAFAFA]/50 transition-colors"
        >
          <Settings className="w-5 h-5" strokeWidth={1.5} />
          <span>Settings</span>
        </Link>
        
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-2 h-8 px-2.5 text-sm font-bold text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5" strokeWidth={1.5} />
          <span>Cerrar Sesión</span>
        </Button>
      </div>
    </div>
  );
}
