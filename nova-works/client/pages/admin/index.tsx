// Exportando todas las páginas del admin desde un solo archivo
export { AdminDashboard as Dashboard } from './Dashboard';
export { AdminTiendas as Tiendas } from './Tiendas';
export { TiendaOverview } from './TiendaOverview';
export { AdminPedidos as Pedidos } from './Pedidos';

// Páginas adicionales simplificadas
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DollarSign, BarChart3, Users, MessageSquare, Settings } from 'lucide-react';

const formatCOP = (amount: number) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(amount);
};

export function Finanzas() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-dashboard-text">Finanzas</h1>
          <p className="text-dashboard-text-muted">Balance general y comisiones</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-dashboard-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="text-lg font-semibold text-dashboard-text">Balance Total</h3>
                <p className="text-2xl font-bold text-green-600">{formatCOP(45680000)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-dashboard-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-dashboard-text">Comisiones del Mes</h3>
                <p className="text-2xl font-bold text-blue-600">{formatCOP(8940000)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-dashboard-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-8 h-8 text-purple-600" />
              <div>
                <h3 className="text-lg font-semibold text-dashboard-text">Pagos Pendientes</h3>
                <p className="text-2xl font-bold text-purple-600">{formatCOP(2340000)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-dashboard-border p-6">
          <h2 className="text-lg font-semibold text-dashboard-text mb-4">Movimientos Recientes</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium text-dashboard-text">Comisión TechStore Pro</p>
                <p className="text-sm text-dashboard-text-muted">15 Enero 2024</p>
              </div>
              <p className="font-bold text-green-600">+{formatCOP(450000)}</p>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium text-dashboard-text">Payout Fashion Hub</p>
                <p className="text-sm text-dashboard-text-muted">14 Enero 2024</p>
              </div>
              <p className="font-bold text-red-600">-{formatCOP(1200000)}</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export function Reportes() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-dashboard-text">Reportes y BI</h1>
          <p className="text-dashboard-text-muted">Dashboard de inteligencia de negocios</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-dashboard-border p-6">
            <h3 className="text-lg font-semibold text-dashboard-text mb-4">Cohortes de Usuarios</h3>
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
              <p className="text-dashboard-text-muted">Gráfico de cohortes</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-dashboard-border p-6">
            <h3 className="text-lg font-semibold text-dashboard-text mb-4">LTV por Segmento</h3>
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
              <p className="text-dashboard-text-muted">Gráfico de LTV</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-dashboard-border p-6">
            <h3 className="text-lg font-semibold text-dashboard-text mb-4">Top Categorías</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-dashboard-text">Tecnología</span>
                <span className="font-bold text-dashboard-text">{formatCOP(15600000)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-dashboard-text">Moda</span>
                <span className="font-bold text-dashboard-text">{formatCOP(12400000)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-dashboard-text">Hogar</span>
                <span className="font-bold text-dashboard-text">{formatCOP(8900000)}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-dashboard-border p-6">
            <h3 className="text-lg font-semibold text-dashboard-text mb-4">Heatmap Regional</h3>
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
              <p className="text-dashboard-text-muted">Mapa de calor de ventas</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export function Usuarios() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-dashboard-text">Gestión de Usuarios</h1>
          <p className="text-dashboard-text-muted">Administra el equipo interno</p>
        </div>
        
        <div className="bg-white rounded-lg border border-dashboard-border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-dashboard-text">Usuarios del Sistema</h2>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90">
              Nuevo Usuario
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-dashboard-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-dashboard-text">Admin Principal</p>
                  <p className="text-sm text-dashboard-text-muted">admin@marketplace.com</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Super Admin</span>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-dashboard-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-dashboard-text">Soporte Técnico</p>
                  <p className="text-sm text-dashboard-text-muted">soporte@marketplace.com</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Soporte</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export function Soporte() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-dashboard-text">Centro de Soporte</h1>
          <p className="text-dashboard-text-muted">Gestiona tickets y consultas</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-dashboard-border p-6">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-semibold text-dashboard-text">Tickets Abiertos</h3>
            </div>
            <p className="text-3xl font-bold text-red-600">12</p>
          </div>
          
          <div className="bg-white rounded-lg border border-dashboard-border p-6">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-6 h-6 text-yellow-600" />
              <h3 className="text-lg font-semibold text-dashboard-text">En Progreso</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-600">8</p>
          </div>
          
          <div className="bg-white rounded-lg border border-dashboard-border p-6">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-dashboard-text">Resueltos Hoy</h3>
            </div>
            <p className="text-3xl font-bold text-green-600">15</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-dashboard-border p-6">
          <h2 className="text-lg font-semibold text-dashboard-text mb-4">Tickets Recientes</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-dashboard-border rounded">
              <div>
                <p className="font-medium text-dashboard-text">Problema con pagos - TechStore Pro</p>
                <p className="text-sm text-dashboard-text-muted">Hace 2 horas • Prioridad Alta</p>
              </div>
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Abierto</span>
            </div>
            <div className="flex items-center justify-between p-3 border border-dashboard-border rounded">
              <div>
                <p className="font-medium text-dashboard-text">Consulta sobre comisiones - Fashion Hub</p>
                <p className="text-sm text-dashboard-text-muted">Hace 4 horas • Prioridad Media</p>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">En Progreso</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export function Configuracion() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-dashboard-text">Configuración Global</h1>
          <p className="text-dashboard-text-muted">Ajustes del marketplace</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-dashboard-border p-6">
            <h3 className="text-lg font-semibold text-dashboard-text mb-4">Configuración General</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dashboard-text mb-2">Comisión Global (%)</label>
                <input
                  type="number"
                  defaultValue="15"
                  className="w-full px-3 py-2 border border-dashboard-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dashboard-text mb-2">Dominio Principal</label>
                <input
                  type="text"
                  defaultValue="marketplace.com"
                  className="w-full px-3 py-2 border border-dashboard-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-dashboard-border p-6">
            <h3 className="text-lg font-semibold text-dashboard-text mb-4">Feature Flags</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-dashboard-text">Chat IA Habilitado</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dashboard-text">Programa de Puntos</span>
                <input type="checkbox" className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dashboard-text">PWA Habilitado</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}