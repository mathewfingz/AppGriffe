import { DashboardSidebar } from '../components/DashboardSidebar';
import { DashboardHeader } from '../components/DashboardHeader';
import { DashboardStats } from '../components/DashboardStats';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        <DashboardSidebar />
        
        <div className="flex-1">
          <DashboardHeader />
          
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-dashboard-text">Dashboard de Tienda</h1>
              <p className="text-dashboard-text-muted">Gestiona tu tienda desde aquí</p>
            </div>
            
            <DashboardStats />
            
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-dashboard-border p-6">
                <h3 className="text-lg font-semibold text-dashboard-text mb-4">Ventas Recientes</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium text-dashboard-text">Producto Premium #001</p>
                      <p className="text-sm text-dashboard-text-muted">Hace 2 horas</p>
                    </div>
                    <p className="font-bold text-green-600">$450.000</p>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium text-dashboard-text">Producto Básico #002</p>
                      <p className="text-sm text-dashboard-text-muted">Hace 4 horas</p>
                    </div>
                    <p className="font-bold text-green-600">$120.000</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-dashboard-border p-6">
                <h3 className="text-lg font-semibold text-dashboard-text mb-4">Productos Populares</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-dashboard-text">Producto Premium</span>
                    <span className="font-bold text-dashboard-text">156 ventas</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-dashboard-text">Producto Estándar</span>
                    <span className="font-bold text-dashboard-text">89 ventas</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-dashboard-text">Producto Básico</span>
                    <span className="font-bold text-dashboard-text">67 ventas</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}