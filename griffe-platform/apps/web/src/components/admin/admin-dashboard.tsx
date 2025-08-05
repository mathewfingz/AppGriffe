'use client'

import { 
  DollarSign, 
  Store, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  AlertTriangle
} from "lucide-react";
import { Button, cn, Card, CardContent, CardHeader, CardTitle } from "@griffe/ui";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<any>;
}

function KPICard({ title, value, change, changeType, icon: Icon }: KPICardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <span
            className={cn(
              "text-sm font-medium",
              changeType === "increase" ? "text-green-600" : "text-red-600"
            )}
          >
            {change}
          </span>
          <span className="text-sm text-gray-500 ml-2">vs mes anterior</span>
        </div>
      </CardContent>
    </Card>
  )
}

interface TopStoreProps {
  name: string;
  sales: string;
  margin: string;
  growth: string;
  rank: number;
}

function TopStoreItem({ name, sales, margin, growth, rank }: TopStoreProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
          {rank}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">Ventas: {sales}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-1">
          {margin}
        </div>
        <p className="text-sm text-green-600 font-medium">{growth}</p>
      </div>
    </div>
  );
}

interface AlertItemProps {
  type: 'critical' | 'warning' | 'error';
  message: string;
  action: string;
}

function AlertItem({ type, message, action }: AlertItemProps) {
  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-orange-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-3 mb-2">
        <div className={cn("w-2 h-2 rounded-full mt-2", getAlertColor(type))} />
        <span className="text-sm text-gray-700 flex-1">{message}</span>
      </div>
      <Button variant="outline" size="sm" className="w-full">
        {action}
      </Button>
    </div>
  );
}

export function AdminDashboard() {
  const kpiData = [
    {
      title: "Ventas Totales",
      value: "$2,450,000",
      change: "+12.5%",
      changeType: "increase" as const,
      icon: DollarSign
    },
    {
      title: "Tiendas Activas",
      value: "156",
      change: "+8",
      changeType: "increase" as const,
      icon: Store
    },
    {
      title: "Pedidos Globales",
      value: "3,247",
      change: "+15.2%",
      changeType: "increase" as const,
      icon: ShoppingCart
    },
    {
      title: "Clientes",
      value: "12,890",
      change: "+5.8%",
      changeType: "increase" as const,
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
    { type: "critical" as const, message: "15 productos con stock crítico", action: "Ver detalles" },
    { type: "warning" as const, message: "3 pagos vencidos pendientes", action: "Revisar" },
    { type: "error" as const, message: "2 webhooks fallidos", action: "Reintentar" }
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
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Chart Area */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top 5 Stores */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top 5 Tiendas del Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topStores.map((store, index) => (
                <TopStoreItem key={index} {...store} rank={index + 1} />
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
                <AlertItem key={index} {...alert} />
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
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.store}</p>
                </div>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}