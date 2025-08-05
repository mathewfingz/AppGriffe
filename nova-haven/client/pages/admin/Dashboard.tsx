import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { AlertTriangle, TrendingUp, Store, ShoppingCart, Users, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function AdminDashboard() {
  const kpiData = [
    {
      title: "Ventas Totales",
      value: "$2,450,000",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign
    },
    {
      title: "Tiendas Activas",
      value: "156",
      change: "+8",
      changeType: "positive" as const,
      icon: Store
    },
    {
      title: "Pedidos Globales",
      value: "3,247",
      change: "+15.2%",
      changeType: "positive" as const,
      icon: ShoppingCart
    },
    {
      title: "Clientes",
      value: "12,890",
      change: "+5.8%",
      changeType: "positive" as const,
      icon: Users
    }
  ];

  const topStores = [
    { name: "TechStore Pro", sales: "$125,000", margin: "18.5%", growth: "+12%" },
    { name: "Fashion Hub", sales: "$98,500", margin: "22.1%", growth: "+8%" },
    { name: "Home & Garden", sales: "$87,200", margin: "15.8%", growth: "+15%" },
    { name: "Sports World", sales: "$76,800", margin: "19.2%", growth: "+5%" },
    { name: "Beauty Corner", sales: "$65,400", margin: "25.3%", growth: "+22%" }
  ];

  const alerts = [
    { type: "critical", message: "15 productos con stock crítico", action: "Ver detalles" },
    { type: "warning", message: "3 pagos vencidos pendientes", action: "Revisar" },
    { type: "error", message: "2 webhooks fallidos", action: "Reintentar" }
  ];

  const recentActivity = [
    { action: "Nueva tienda registrada", store: "Electronics Plus", time: "Hace 2 horas" },
    { action: "Pago procesado", store: "Fashion Hub", time: "Hace 4 horas" },
    { action: "Pedido completado", store: "Home & Garden", time: "Hace 6 horas" },
    { action: "Usuario registrado", store: "Sports World", time: "Hace 8 horas" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-600 mt-1">Resumen general de la plataforma</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <TrendingUp className="w-4 h-4 mr-2" />
            Exportar Reporte
          </Button>
          <Button>
            Ver Análisis Completo
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          const isPositive = kpi.changeType === "positive";
          
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                    <div className="flex items-center gap-1">
                      {isPositive ? (
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm font-medium ${
                        isPositive ? "text-green-600" : "text-red-600"
                      }`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-full">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Area */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Ventas por Período</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">7 días</Button>
              <Button variant="outline" size="sm">30 días</Button>
              <Button variant="outline" size="sm">90 días</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed border-blue-200">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <p className="text-blue-600 font-medium">Gráfico de Ventas</p>
                <p className="text-blue-500 text-sm">Datos de los últimos 30 días</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top 5 Stores */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top 5 Tiendas del Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topStores.map((store, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{store.name}</p>
                      <p className="text-sm text-gray-500">Ventas: {store.sales}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-1">{store.margin}</Badge>
                    <p className="text-sm text-green-600 font-medium">{store.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts Widget */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Alertas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.type === 'critical' ? 'bg-red-500' :
                      alert.type === 'warning' ? 'bg-orange-500' : 'bg-red-500'
                    }`} />
                    <span className="text-sm text-gray-700 flex-1">{alert.message}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    {alert.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.store}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="h-16 flex flex-col gap-1">
          <Store className="w-5 h-5" />
          <span>Gestionar Tiendas</span>
        </Button>
        <Button variant="outline" className="h-16 flex flex-col gap-1">
          <ShoppingCart className="w-5 h-5" />
          <span>Ver Pedidos</span>
        </Button>
        <Button variant="outline" className="h-16 flex flex-col gap-1">
          <DollarSign className="w-5 h-5" />
          <span>Revisar Finanzas</span>
        </Button>
      </div>

      {/* Search Shortcut Info */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700 flex items-center gap-2">
          💡 Usa <kbd className="px-2 py-1 bg-white rounded text-xs shadow">⌘ K</kbd> para búsqueda universal en toda la plataforma
        </p>
      </div>
    </div>
  );
}