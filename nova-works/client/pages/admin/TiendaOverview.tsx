import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  ArrowLeft,
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Download,
  Upload,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';

const tabs = [
  { id: 'resumen', name: 'Resumen' },
  { id: 'productos', name: 'Productos' },
  { id: 'categorias', name: 'Categorías' },
  { id: 'inventario', name: 'Inventario' },
  { id: 'pedidos', name: 'Pedidos' },
  { id: 'clientes', name: 'Clientes' },
  { id: 'finanzas', name: 'Finanzas' },
  { id: 'notificaciones', name: 'Notificaciones' },
  { id: 'ajustes', name: 'Ajustes' }
];

// Mock data
const tiendaData = {
  id: 'tienda-001',
  nombre: 'TechStore Pro',
  logo: '🏪',
  propietario: 'Juan Pérez',
  email: 'juan@techstore.com',
  plan: 'Premium',
  estado: 'Activa',
  fechaCreacion: '2023-06-15',
  kpis: {
    ventasMes: 25840000,
    pedidosMes: 342,
    clientesActivos: 1284,
    ticketPromedio: 75600
  }
};

const productos = [
  { id: 1, nombre: 'iPhone 15 Pro', sku: 'IP15P-128', precio: 4500000, stock: 25, estado: 'Aprobado' },
  { id: 2, nombre: 'MacBook Air M2', sku: 'MBA-M2-256', precio: 5200000, stock: 12, estado: 'Pendiente' },
  { id: 3, nombre: 'AirPods Pro', sku: 'APP-3GEN', precio: 890000, stock: 45, estado: 'Aprobado' },
  { id: 4, nombre: 'iPad Air', sku: 'IPA-64GB', precio: 2800000, stock: 8, estado: 'Rechazado' }
];

const formatCOP = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

function KPICard({ title, value, icon: Icon, isCurrency = false }: {
  title: string;
  value: number;
  icon: any;
  isCurrency?: boolean;
}) {
  return (
    <div className="bg-white rounded-lg border border-dashboard-border p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-sm font-medium text-dashboard-text-muted">{title}</h3>
      </div>
      <p className="text-xl font-bold text-dashboard-text">
        {isCurrency ? formatCOP(value) : value.toLocaleString()}
      </p>
    </div>
  );
}

export function TiendaOverview() {
  const { tiendaId } = useParams();
  const [activeTab, setActiveTab] = useState('resumen');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'resumen':
        return (
          <div className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard
                title="Ventas del Mes"
                value={tiendaData.kpis.ventasMes}
                icon={DollarSign}
                isCurrency
              />
              <KPICard
                title="Pedidos del Mes"
                value={tiendaData.kpis.pedidosMes}
                icon={ShoppingCart}
              />
              <KPICard
                title="Clientes Activos"
                value={tiendaData.kpis.clientesActivos}
                icon={Users}
              />
              <KPICard
                title="Ticket Promedio"
                value={tiendaData.kpis.ticketPromedio}
                icon={TrendingUp}
                isCurrency
              />
            </div>

            {/* Gráfico placeholder */}
            <div className="bg-white rounded-lg border border-dashboard-border p-6">
              <h3 className="text-lg font-semibold text-dashboard-text mb-4">Ventas Últimos 30 Días</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-dashboard-text-muted">Gráfico de ventas (implementar con recharts)</p>
              </div>
            </div>

            {/* IA Suggestions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Sugerencias de IA</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• Considera aumentar el stock de AirPods Pro (alta demanda)</li>
                <li>• El precio del iPad Air está 5% por debajo del mercado</li>
                <li>• Promociona productos con mayor margen los fines de semana</li>
              </ul>
            </div>
          </div>
        );

      case 'productos':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-dashboard-text">Productos</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-2 border border-dashboard-border rounded-lg text-sm hover:bg-dashboard-hover">
                  <Download className="w-4 h-4" />
                  Exportar CSV
                </button>
                <button className="flex items-center gap-2 px-3 py-2 border border-dashboard-border rounded-lg text-sm hover:bg-dashboard-hover">
                  <Upload className="w-4 h-4" />
                  Importar CSV
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-dashboard-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-dashboard-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-dashboard-text">Producto</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-dashboard-text">SKU</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-dashboard-text">Precio</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-dashboard-text">Stock</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-dashboard-text">Estado</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-dashboard-text">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dashboard-border">
                  {productos.map((producto) => (
                    <tr key={producto.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-dashboard-text">{producto.nombre}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-dashboard-text-muted">{producto.sku}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-dashboard-text">{formatCOP(producto.precio)}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-dashboard-text">{producto.stock}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          producto.estado === 'Aprobado' ? 'bg-green-100 text-green-800' :
                          producto.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {producto.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {producto.estado === 'Pendiente' && (
                            <>
                              <button className="p-1 hover:bg-green-100 rounded text-green-600" title="Aprobar">
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button className="p-1 hover:bg-red-100 rounded text-red-600" title="Rechazar">
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button className="p-1 hover:bg-dashboard-hover rounded" title="Ver">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 hover:bg-dashboard-hover rounded" title="Editar">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-lg border border-dashboard-border p-8 text-center">
            <Package className="w-12 h-12 text-dashboard-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-dashboard-text mb-2">
              {tabs.find(t => t.id === activeTab)?.name}
            </h3>
            <p className="text-dashboard-text-muted">
              Esta sección está en desarrollo. Contenido específico para {activeTab}.
            </p>
          </div>
        );
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            to="/admin/tiendas"
            className="p-2 hover:bg-dashboard-hover rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
              {tiendaData.logo}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-dashboard-text">{tiendaData.nombre}</h1>
              <p className="text-dashboard-text-muted">{tiendaData.propietario} • {tiendaData.plan}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-dashboard-border">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-dashboard-text-muted hover:text-dashboard-text hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </AdminLayout>
  );
}