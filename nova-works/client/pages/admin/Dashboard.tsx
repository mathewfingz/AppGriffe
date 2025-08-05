import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  TrendingUp, 
  Store, 
  ShoppingCart, 
  Users, 
  DollarSign,
  AlertTriangle,
  Search
} from 'lucide-react';

// Mock data
const kpiData = {
  ventasTotales: { value: 125840000, change: 12.5, period: '30d' },
  tiendasActivas: { value: 47, change: 8.3, period: '30d' },
  pedidosGlobales: { value: 1284, change: -2.1, period: '30d' },
  clientes: { value: 8945, change: 15.7, period: '30d' },
  comisionTotal: { value: 12584000, change: 18.2, period: '30d' }
};

const topTiendas = [
  { id: 1, nombre: 'TechStore Pro', ventas: 25840000, margen: 18.5, logo: '🏪' },
  { id: 2, nombre: 'Fashion Hub', ventas: 18920000, margen: 22.1, logo: '👗' },
  { id: 3, nombre: 'Home & Garden', ventas: 15670000, margen: 16.8, logo: '🏡' },
  { id: 4, nombre: 'Sports Zone', ventas: 12450000, margen: 19.3, logo: '⚽' },
  { id: 5, nombre: 'Beauty Corner', ventas: 9830000, margen: 25.7, logo: '💄' }
];

const alertas = [
  { tipo: 'stock', mensaje: 'TechStore Pro: 15 productos con stock crítico', urgencia: 'alta' },
  { tipo: 'pago', mensaje: '3 pagos vencidos pendientes de revisión', urgencia: 'media' },
  { tipo: 'webhook', mensaje: 'Fashion Hub: 2 webhooks fallidos en las últimas 24h', urgencia: 'baja' }
];

const formatCOP = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

function KPICard({ title, value, change, icon: Icon, isCurrency = false }: {
  title: string;
  value: number;
  change: number;
  icon: any;
  isCurrency?: boolean;
}) {
  const isPositive = change > 0;
  
  return (
    <div className="bg-white rounded-lg border border-dashboard-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className={`flex items-center gap-1 text-sm ${
          isPositive ? 'text-dashboard-success' : 'text-dashboard-danger'
        }`}>
          <TrendingUp className={`w-4 h-4 ${!isPositive && 'rotate-180'}`} />
          {Math.abs(change)}%
        </div>
      </div>
      <h3 className="text-sm font-medium text-dashboard-text-muted mb-1">{title}</h3>
      <p className="text-2xl font-bold text-dashboard-text">
        {isCurrency ? formatCOP(value) : value.toLocaleString()}
      </p>
    </div>
  );
}

export function AdminDashboard() {
  const [periodo, setPeriodo] = useState('30d');

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-dashboard-text">Dashboard</h1>
            <p className="text-dashboard-text-muted">Resumen general del marketplace</p>
          </div>
          
          {/* Search shortcut */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-dashboard-text-muted" />
              <input
                type="text"
                placeholder="Buscar... (⌘K)"
                className="pl-10 pr-4 py-2 border border-dashboard-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"
              />
            </div>
            
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="px-3 py-2 border border-dashboard-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
            title="Tiendas Activas"
            value={kpiData.tiendasActivas.value}
            change={kpiData.tiendasActivas.change}
            icon={Store}
          />
          <KPICard
            title="Pedidos Globales"
            value={kpiData.pedidosGlobales.value}
            change={kpiData.pedidosGlobales.change}
            icon={ShoppingCart}
          />
          <KPICard
            title="Clientes"
            value={kpiData.clientes.value}
            change={kpiData.clientes.change}
            icon={Users}
          />
          <KPICard
            title="Comisión Total"
            value={kpiData.comisionTotal.value}
            change={kpiData.comisionTotal.change}
            icon={TrendingUp}
            isCurrency
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top 5 Tiendas */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-dashboard-border p-6">
            <h2 className="text-lg font-semibold text-dashboard-text mb-4">Top 5 Tiendas</h2>
            <div className="space-y-4">
              {topTiendas.map((tienda, index) => (
                <div key={tienda.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                      {tienda.logo}
                    </div>
                    <div>
                      <p className="font-medium text-dashboard-text">{tienda.nombre}</p>
                      <p className="text-sm text-dashboard-text-muted">#{index + 1} en ventas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-dashboard-text">{formatCOP(tienda.ventas)}</p>
                    <p className="text-sm text-dashboard-success">{tienda.margen}% margen</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alertas */}
          <div className="bg-white rounded-lg border border-dashboard-border p-6">
            <h2 className="text-lg font-semibold text-dashboard-text mb-4">Alertas</h2>
            <div className="space-y-3">
              {alertas.map((alerta, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                    alerta.urgencia === 'alta' ? 'text-red-500' :
                    alerta.urgencia === 'media' ? 'text-yellow-500' : 'text-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-dashboard-text">{alerta.mensaje}</p>
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
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}