import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  MoreHorizontal,
  Download,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

// Mock data
const tiendas = [
  {
    id: 'tienda-001',
    logo: '🏪',
    nombre: 'TechStore Pro',
    plan: 'Premium',
    estado: 'Activa',
    ventas: 25840000,
    comision: 18.5,
    ultimoAcceso: '2024-01-15T10:30:00Z',
    propietario: 'Juan Pérez'
  },
  {
    id: 'tienda-002',
    logo: '👗',
    nombre: 'Fashion Hub',
    plan: 'Básico',
    estado: 'Activa',
    ventas: 18920000,
    comision: 15.0,
    ultimoAcceso: '2024-01-14T16:45:00Z',
    propietario: 'María García'
  },
  {
    id: 'tienda-003',
    logo: '🏡',
    nombre: 'Home & Garden',
    plan: 'Premium',
    estado: 'Pausada',
    ventas: 15670000,
    comision: 20.0,
    ultimoAcceso: '2024-01-10T09:15:00Z',
    propietario: 'Carlos López'
  },
  {
    id: 'tienda-004',
    logo: '⚽',
    nombre: 'Sports Zone',
    plan: 'Básico',
    estado: 'Activa',
    ventas: 12450000,
    comision: 15.0,
    ultimoAcceso: '2024-01-15T14:20:00Z',
    propietario: 'Ana Martínez'
  },
  {
    id: 'tienda-005',
    logo: '💄',
    nombre: 'Beauty Corner',
    plan: 'Premium',
    estado: 'Bloqueada',
    ventas: 9830000,
    comision: 25.0,
    ultimoAcceso: '2024-01-08T11:30:00Z',
    propietario: 'Luis Rodríguez'
  }
];

const formatCOP = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getEstadoIcon = (estado: string) => {
  switch (estado) {
    case 'Activa':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'Pausada':
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case 'Bloqueada':
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return null;
  }
};

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case 'Activa':
      return 'bg-green-100 text-green-800';
    case 'Pausada':
      return 'bg-yellow-100 text-yellow-800';
    case 'Bloqueada':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function AdminTiendas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroPlan, setFiltroPlan] = useState('todos');
  const [selectedTiendas, setSelectedTiendas] = useState<string[]>([]);
  const [showNewTiendaModal, setShowNewTiendaModal] = useState(false);

  const filteredTiendas = tiendas.filter(tienda => {
    const matchesSearch = tienda.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tienda.propietario.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = filtroEstado === 'todos' || tienda.estado === filtroEstado;
    const matchesPlan = filtroPlan === 'todos' || tienda.plan === filtroPlan;
    
    return matchesSearch && matchesEstado && matchesPlan;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTiendas(filteredTiendas.map(t => t.id));
    } else {
      setSelectedTiendas([]);
    }
  };

  const handleSelectTienda = (tiendaId: string, checked: boolean) => {
    if (checked) {
      setSelectedTiendas([...selectedTiendas, tiendaId]);
    } else {
      setSelectedTiendas(selectedTiendas.filter(id => id !== tiendaId));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-dashboard-text">Gestión de Tiendas</h1>
            <p className="text-dashboard-text-muted">Administra todas las tiendas del marketplace</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-dashboard-border rounded-lg text-sm font-medium hover:bg-dashboard-hover">
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
            <button 
              onClick={() => setShowNewTiendaModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
              Nueva Tienda
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-dashboard-border p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-dashboard-text-muted" />
                <input
                  type="text"
                  placeholder="Buscar tiendas o propietarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-dashboard-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="px-3 py-2 border border-dashboard-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="todos">Todos los estados</option>
              <option value="Activa">Activas</option>
              <option value="Pausada">Pausadas</option>
              <option value="Bloqueada">Bloqueadas</option>
            </select>
            
            <select
              value={filtroPlan}
              onChange={(e) => setFiltroPlan(e.target.value)}
              className="px-3 py-2 border border-dashboard-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="todos">Todos los planes</option>
              <option value="Básico">Básico</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
        </div>

        {/* Bulk actions */}
        {selectedTiendas.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-blue-800">
                {selectedTiendas.length} tienda(s) seleccionada(s)
              </p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                  Cambiar Plan
                </button>
                <button className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700">
                  Pausar
                </button>
                <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                  Habilitar IA
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg border border-dashboard-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-dashboard-border">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedTiendas.length === filteredTiendas.length && filteredTiendas.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-dashboard-border"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dashboard-text">Tienda</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dashboard-text">Plan</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dashboard-text">Estado</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dashboard-text">Ventas</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dashboard-text">Comisión</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dashboard-text">Último Acceso</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dashboard-text">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dashboard-border">
                {filteredTiendas.map((tienda) => (
                  <tr key={tienda.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedTiendas.includes(tienda.id)}
                        onChange={(e) => handleSelectTienda(tienda.id, e.target.checked)}
                        className="rounded border-dashboard-border"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                          {tienda.logo}
                        </div>
                        <div>
                          <p className="font-medium text-dashboard-text">{tienda.nombre}</p>
                          <p className="text-sm text-dashboard-text-muted">{tienda.propietario}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        tienda.plan === 'Premium' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {tienda.plan}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getEstadoIcon(tienda.estado)}
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getEstadoColor(tienda.estado)}`}>
                          {tienda.estado}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-dashboard-text">{formatCOP(tienda.ventas)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-dashboard-text">{tienda.comision}%</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-dashboard-text-muted">{formatDate(tienda.ultimoAcceso)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/tiendas/${tienda.id}/overview`}
                          className="p-1 hover:bg-dashboard-hover rounded"
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button className="p-1 hover:bg-dashboard-hover rounded" title="Más opciones">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-dashboard-border p-4">
            <p className="text-sm text-dashboard-text-muted">Total Tiendas</p>
            <p className="text-2xl font-bold text-dashboard-text">{tiendas.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-dashboard-border p-4">
            <p className="text-sm text-dashboard-text-muted">Activas</p>
            <p className="text-2xl font-bold text-green-600">{tiendas.filter(t => t.estado === 'Activa').length}</p>
          </div>
          <div className="bg-white rounded-lg border border-dashboard-border p-4">
            <p className="text-sm text-dashboard-text-muted">Ventas Totales</p>
            <p className="text-2xl font-bold text-dashboard-text">{formatCOP(tiendas.reduce((sum, t) => sum + t.ventas, 0))}</p>
          </div>
          <div className="bg-white rounded-lg border border-dashboard-border p-4">
            <p className="text-sm text-dashboard-text-muted">Comisión Promedio</p>
            <p className="text-2xl font-bold text-dashboard-text">{(tiendas.reduce((sum, t) => sum + t.comision, 0) / tiendas.length).toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}