import LeftSidebarNav from "@/components/LeftSidebarNav";
import Topbar from "@/components/Topbar";
import MetricsCard from "@/components/MetricsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Download, 
  FileText, 
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  MapPin,
  Clock,
  Mail
} from "lucide-react";
import { useState } from "react";

export default function AdminReportes() {
  const [selectedStores, setSelectedStores] = useState<string[]>(["all"]);
  const [dateRange, setDateRange] = useState("30d");
  const [reportType, setReportType] = useState("overview");

  const stores = [
    { id: "all", name: "Todas las tiendas" },
    { id: "tech", name: "TechStore Pro" },
    { id: "fashion", name: "Fashion Hub" },
    { id: "home", name: "Home & Garden" },
    { id: "sports", name: "Sports World" }
  ];

  const kpiData = [
    { title: "Revenue Total", value: "$2,450,000", change: "+15.2%", changeType: "positive" as const },
    { title: "LTV Promedio", value: "$485", change: "+8.7%", changeType: "positive" as const },
    { title: "Retención 30d", value: "68%", change: "+3.2%", changeType: "positive" as const },
    { title: "AOV", value: "$127", change: "-2.1%", changeType: "negative" as const }
  ];

  const cohortData = [
    { month: "Enero 2024", users: 1250, retention30: "72%", retention60: "45%", retention90: "32%" },
    { month: "Febrero 2024", users: 1380, retention30: "68%", retention60: "42%", retention90: "29%" },
    { month: "Marzo 2024", users: 1520, retention30: "75%", retention60: "48%", retention90: "35%" }
  ];

  const topCategories = [
    { category: "Electrónicos", sales: "$890,000", percentage: "36.3%", growth: "+12%" },
    { category: "Ropa & Moda", sales: "$650,000", percentage: "26.5%", growth: "+8%" },
    { category: "Hogar & Jardín", sales: "$420,000", percentage: "17.1%", growth: "+15%" },
    { category: "Deportes", sales: "$290,000", percentage: "11.8%", growth: "+5%" },
    { category: "Otros", sales: "$200,000", percentage: "8.2%", growth: "+3%" }
  ];

  const regionData = [
    { region: "Bogotá", sales: "$980,000", orders: 3250, percentage: "40%" },
    { region: "Medellín", sales: "$620,000", orders: 2100, percentage: "25%" },
    { region: "Cali", sales: "$450,000", orders: 1580, percentage: "18%" },
    { region: "Barranquilla", sales: "$280,000", orders: 920, percentage: "11%" },
    { region: "Otras", sales: "$120,000", orders: 450, percentage: "5%" }
  ];

  const handleStoreSelection = (storeId: string) => {
    if (storeId === "all") {
      setSelectedStores(["all"]);
    } else {
      setSelectedStores(prev => {
        const filtered = prev.filter(id => id !== "all");
        return filtered.includes(storeId) 
          ? filtered.filter(id => id !== storeId)
          : [...filtered, storeId];
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <LeftSidebarNav />
      
      <div className="flex-1 flex flex-col">
        <Topbar title="Reportes" />
        
        <div className="flex-1 px-4 sm:px-6 lg:px-10 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl sm:text-[32px] font-extrabold text-[#303030] leading-[19px]">
              Dashboard de Reportes BI
            </h1>
            <div className="flex gap-2">
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Programar Envío
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Controles de Filtros */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Controles de Análisis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Selector de Tiendas */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Tiendas</Label>
                  <div className="space-y-2 max-h-32 overflow-y-auto border rounded-md p-2">
                    {stores.map(store => (
                      <div key={store.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={store.id}
                          checked={selectedStores.includes(store.id)}
                          onCheckedChange={() => handleStoreSelection(store.id)}
                        />
                        <Label htmlFor={store.id} className="text-sm">{store.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Intervalo de Tiempo */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Período</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Últimos 7 días</SelectItem>
                      <SelectItem value="30d">Últimos 30 días</SelectItem>
                      <SelectItem value="90d">Últimos 90 días</SelectItem>
                      <SelectItem value="6m">Últimos 6 meses</SelectItem>
                      <SelectItem value="1y">Último año</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tipo de Reporte */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Tipo de Reporte</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="overview">Vista General</SelectItem>
                      <SelectItem value="cohorts">Análisis de Cohortes</SelectItem>
                      <SelectItem value="categories">Top Categorías</SelectItem>
                      <SelectItem value="regions">Análisis Regional</SelectItem>
                      <SelectItem value="ltv">Lifetime Value</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KPIs Principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {kpiData.map((kpi, index) => (
              <MetricsCard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                changeType={kpi.changeType}
                showSparkline={true}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Análisis de Cohortes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Análisis de Cohortes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Cohorte</th>
                        <th className="text-right p-2">Usuarios</th>
                        <th className="text-right p-2">30d</th>
                        <th className="text-right p-2">60d</th>
                        <th className="text-right p-2">90d</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cohortData.map((cohort, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-medium">{cohort.month}</td>
                          <td className="p-2 text-right">{cohort.users}</td>
                          <td className="p-2 text-right">
                            <Badge className="bg-green-100 text-green-800">{cohort.retention30}</Badge>
                          </td>
                          <td className="p-2 text-right">
                            <Badge className="bg-yellow-100 text-yellow-800">{cohort.retention60}</Badge>
                          </td>
                          <td className="p-2 text-right">
                            <Badge className="bg-orange-100 text-orange-800">{cohort.retention90}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Top Categorías */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Top Categorías
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{category.category}</p>
                        <p className="text-sm text-gray-500">{category.percentage} del total</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{category.sales}</p>
                        <p className="text-sm text-green-600">{category.growth}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Heatmap por Región */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Análisis Regional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {regionData.map((region, index) => (
                  <div key={index} className="p-4 border rounded-lg text-center">
                    <h3 className="font-medium mb-2">{region.region}</h3>
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-blue-600">{region.sales}</p>
                      <p className="text-sm text-gray-500">{region.orders} pedidos</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: region.percentage }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-400">{region.percentage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}