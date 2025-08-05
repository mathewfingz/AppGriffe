import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Search, Filter, Download, Eye, Package } from 'lucide-react';

const pedidos = [
  { id: 'PED-001', tienda: 'TechStore Pro', cliente: 'Carlos López', total: 4500000, estado: 'Enviado', fecha: '2024-01-15' },
  { id: 'PED-002', tienda: 'Fashion Hub', cliente: 'Ana García', total: 890000, estado: 'Pendiente', fecha: '2024-01-15' },
  { id: 'PED-003', tienda: 'Sports Zone', cliente: 'Luis Martín', total: 1250000, estado: 'Entregado', fecha: '2024-01-14' }
];

const formatCOP = (amount: number) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(amount);
};

export function AdminPedidos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-dashboard-text">Pedidos Globales</h1>
            <p className="text-dashboard-text-muted">Gestiona todos los pedidos del marketplace</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-dashboard-border rounded-lg text-sm">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>

        <div className="bg-white rounded-lg border border-dashboard-border p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-dashboard-text-muted" />
              <input
                type="text"
                placeholder="Buscar pedidos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-dashboard-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="px-3 py-2 border border-dashboard-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="todos">Todos</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Enviado">Enviado</option>
              <option value="Entregado">Entregado</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-dashboard-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-dashboard-border">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-dashboard-text">ID Pedido</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-dashboard-text">Tienda</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-dashboard-text">Cliente</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-dashboard-text">Total</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-dashboard-text">Estado</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-dashboard-text">Fecha</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-dashboard-text">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dashboard-border">
              {pedidos.map((pedido) => (
                <tr key={pedido.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-dashboard-text">{pedido.id}</td>
                  <td className="px-4 py-3 text-dashboard-text">{pedido.tienda}</td>
                  <td className="px-4 py-3 text-dashboard-text">{pedido.cliente}</td>
                  <td className="px-4 py-3 font-medium text-dashboard-text">{formatCOP(pedido.total)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      pedido.estado === 'Entregado' ? 'bg-green-100 text-green-800' :
                      pedido.estado === 'Enviado' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {pedido.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-dashboard-text-muted">{pedido.fecha}</td>
                  <td className="px-4 py-3">
                    <button className="p-1 hover:bg-dashboard-hover rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}