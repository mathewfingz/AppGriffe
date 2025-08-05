import LeftSidebarNav from "../../components/LeftSidebarNav";
import Topbar from "../../components/Topbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Checkbox } from "../../components/ui/checkbox";
import { 
  Download, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  CreditCard,
  Unlock,
  Search,
  Filter,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Building2,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  RefreshCw,
  Settings,
  Plus,
  Minus,
  MoreHorizontal,
  ArrowRight,
  Banknote,
  Receipt,
  Target,
  Activity,
  Check,
  X
} from "lucide-react";
import { useState } from "react";

interface Transaction {
  id: string;
  type: 'payout' | 'commission' | 'refund' | 'fee';
  store: string;
  amount: number;
  commission: number;
  date: string;
  status: 'completed' | 'pending' | 'held' | 'failed' | 'processing';
  method: string;
  description: string;
  reference?: string;
  customerEmail?: string;
  orderId?: string;
}

interface FinancialMetric {
  title: string;
  value: number;
  change: number;
  period: string;
  trend: 'up' | 'down' | 'stable';
}

export default function AdminFinanzas() {
  const [selectedPayouts, setSelectedPayouts] = useState<string[]>([]);
  const [periodFilter, setPeriodFilter] = useState("30d");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const metrics: FinancialMetric[] = [
    { title: "Balance General", value: 2450000, change: 15.2, period: "30d", trend: "up" },
    { title: "Ingresos del Mes", value: 367500, change: 8.7, period: "30d", trend: "up" },
    { title: "Comisiones Ganadas", value: 125800, change: 12.3, period: "30d", trend: "up" },
    { title: "Pagos Pendientes", value: 45200, change: -5.1, period: "30d", trend: "down" }
  ];

  const transactions: Transaction[] = [
    {
      id: "TXN-001",
      type: "payout",
      store: "TechStore Pro",
      amount: 15240,
      commission: 2286,
      date: "2024-01-15T10:30:00Z",
      status: "completed",
      method: "Stripe",
      description: "Pago mensual de comisiones",
      reference: "pi_1234567890",
      orderId: "ORD-001"
    },
    {
      id: "TXN-002",
      type: "commission",
      store: "Fashion Hub",
      amount: 8950,
      commission: 1342.50,
      date: "2024-01-14T15:45:00Z",
      status: "pending",
      method: "Bank Transfer",
      description: "Comisión por venta #ORD-002",
      customerEmail: "cliente@email.com",
      orderId: "ORD-002"
    },
    {
      id: "TXN-003",
      type: "payout",
      store: "Home & Garden",
      amount: 12100,
      commission: 1815,
      date: "2024-01-13T09:15:00Z",
      status: "completed",
      method: "Stripe",
      description: "Pago semanal de comisiones",
      reference: "pi_0987654321"
    },
    {
      id: "TXN-004",
      type: "refund",
      store: "Sports World",
      amount: -6780,
      commission: -1017,
      date: "2024-01-12T14:20:00Z",
      status: "held",
      method: "PayPal",
      description: "Reembolso por cancelación",
      orderId: "ORD-004"
    },
    {
      id: "TXN-005",
      type: "fee",
      store: "TechStore Pro",
      amount: -250,
      commission: 0,
      date: "2024-01-11T11:00:00Z",
      status: "completed",
      method: "Stripe",
      description: "Tarifa de procesamiento mensual"
    },
    {
      id: "TXN-006",
      type: "commission",
      store: "Fashion Hub",
      amount: 4500,
      commission: 675,
      date: "2024-01-10T16:30:00Z",
      status: "processing",
      method: "Bank Transfer",
      description: "Comisión por venta #ORD-006",
      customerEmail: "otro@email.com",
      orderId: "ORD-006"
    }
  ];

  const storePerformance = [
    { 
      store: "TechStore Pro", 
      totalSales: 125000, 
      commissionRate: 15, 
      earned: 18750, 
      status: "active",
      growth: 12.5,
      transactions: 45
    },
    { 
      store: "Fashion Hub", 
      totalSales: 89500, 
      commissionRate: 12, 
      earned: 10740, 
      status: "active",
      growth: 8.3,
      transactions: 32
    },
    { 
      store: "Home & Garden", 
      totalSales: 67200, 
      commissionRate: 18, 
      earned: 12096, 
      status: "active",
      growth: 15.7,
      transactions: 28
    },
    { 
      store: "Sports World", 
      totalSales: 45300, 
      commissionRate: 14, 
      earned: 6342, 
      status: "paused",
      growth: -3.2,
      transactions: 18
    }
  ];

  // Funciones auxiliares
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: "Completado", className: "bg-green-100 text-green-800" },
      pending: { label: "Pendiente", className: "bg-yellow-100 text-yellow-800" },
      held: { label: "Retenido", className: "bg-red-100 text-red-800" },
      processing: { label: "Procesando", className: "bg-blue-100 text-blue-800" },
      failed: { label: "Fallido", className: "bg-red-100 text-red-800" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      payout: { label: "Pago", className: "bg-blue-100 text-blue-800" },
      commission: { label: "Comisión", className: "bg-green-100 text-green-800" },
      refund: { label: "Reembolso", className: "bg-orange-100 text-orange-800" },
      fee: { label: "Tarifa", className: "bg-gray-100 text-gray-800" }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.commission;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleSelectTransaction = (transactionId: string) => {
    setSelectedPayouts(prev => 
      prev.includes(transactionId) 
        ? prev.filter(id => id !== transactionId)
        : [...prev, transactionId]
    );
  };

  const handleSelectAll = () => {
    const filteredTransactions = getFilteredTransactions();
    setSelectedPayouts(prev => 
      prev.length === filteredTransactions.length ? [] : filteredTransactions.map(t => t.id)
    );
  };

  const getFilteredTransactions = () => {
    return transactions.filter(transaction => {
      const matchesSearch = searchTerm === '' || 
        transaction.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
      const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  };

  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionDetails(true);
  };

  // Estadísticas calculadas
  const stats = {
    totalTransactions: transactions.length,
    totalRevenue: transactions.reduce((sum, t) => sum + (t.amount > 0 ? t.amount : 0), 0),
    totalCommissions: transactions.reduce((sum, t) => sum + t.commission, 0),
    pendingAmount: transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0),
    completedTransactions: transactions.filter(t => t.status === 'completed').length,
    averageTransaction: transactions.length > 0 ? transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) / transactions.length : 0
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <LeftSidebarNav />
      <div className="flex-1 flex flex-col">
        <Topbar title="Finanzas" />
        <div className="flex-1 p-6 space-y-6">
          {/* Métricas principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(metric.value)}
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg ${
                    metric.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className={`text-sm font-medium ${
                    metric.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                  <span className="text-sm text-gray-500 ml-2">vs {metric.period}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Filtros y búsqueda */}
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar transacciones, tiendas o IDs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="completed">Completado</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="processing">Procesando</SelectItem>
                  <SelectItem value="held">Retenido</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="payout">Pagos</SelectItem>
                  <SelectItem value="commission">Comisiones</SelectItem>
                  <SelectItem value="refund">Reembolsos</SelectItem>
                  <SelectItem value="fee">Tarifas</SelectItem>
                </SelectContent>
              </Select>
              <Select value={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Últimos 7 días</SelectItem>
                  <SelectItem value="30d">Últimos 30 días</SelectItem>
                  <SelectItem value="90d">Últimos 90 días</SelectItem>
                  <SelectItem value="1y">Último año</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Acciones en lote */}
          {selectedPayouts.length > 0 && (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">
                  {selectedPayouts.length} transacción(es) seleccionada(s)
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                  <Button size="sm" variant="outline">
                     <Check className="h-4 w-4 mr-2" />
                     Aprobar
                   </Button>
                   <Button size="sm" variant="outline">
                     <X className="h-4 w-4 mr-2" />
                     Rechazar
                   </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Tabla de transacciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Transacciones Financieras</span>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </CardTitle>
              <CardDescription>
                Historial completo de todas las transacciones financieras
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">
                        <Checkbox 
                          checked={selectedPayouts.length === getFilteredTransactions().length}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="text-left p-4 font-medium">ID</th>
                      <th className="text-left p-4 font-medium">Tipo</th>
                      <th className="text-left p-4 font-medium">Tienda</th>
                      <th className="text-left p-4 font-medium">Monto</th>
                      <th className="text-left p-4 font-medium">Comisión</th>
                      <th className="text-left p-4 font-medium">Fecha</th>
                      <th className="text-left p-4 font-medium">Estado</th>
                      <th className="text-left p-4 font-medium">Método</th>
                      <th className="text-left p-4 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredTransactions().map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <Checkbox 
                            checked={selectedPayouts.includes(transaction.id)}
                            onCheckedChange={() => handleSelectTransaction(transaction.id)}
                          />
                        </td>
                        <td className="p-4 font-mono text-sm">{transaction.id}</td>
                        <td className="p-4">{getTypeBadge(transaction.type)}</td>
                        <td className="p-4 font-medium">{transaction.store}</td>
                        <td className="p-4">
                          <span className={`font-medium ${
                            transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatCurrency(transaction.amount)}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">
                          {formatCurrency(transaction.commission)}
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {formatDate(transaction.date)}
                        </td>
                        <td className="p-4">{getStatusBadge(transaction.status)}</td>
                        <td className="p-4 text-sm">{transaction.method}</td>
                        <td className="p-4">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewTransaction(transaction)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Rendimiento por tienda */}
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento por Tienda</CardTitle>
              <CardDescription>
                Análisis de ventas y comisiones por tienda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {storePerformance.map((store, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{store.store}</h3>
                          <p className="text-sm text-gray-500">{store.transactions} transacciones</p>
                        </div>
                      </div>
                      <Badge variant={store.status === "active" ? "default" : "secondary"}>
                        {store.status === "active" ? "Activa" : "Pausada"}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Ventas totales</span>
                        <span className="font-medium">{formatCurrency(store.totalSales)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Comisión ganada</span>
                        <span className="font-medium text-green-600">{formatCurrency(store.earned)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tasa de comisión</span>
                        <span className="font-medium">{store.commissionRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Crecimiento</span>
                        <span className={`font-medium ${
                          store.growth >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {store.growth >= 0 ? '+' : ''}{store.growth}%
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de detalles de transacción */}
      <Dialog open={showTransactionDetails} onOpenChange={setShowTransactionDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles de Transacción</DialogTitle>
            <DialogDescription>
              Información completa de la transacción seleccionada
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Detalles</TabsTrigger>
                <TabsTrigger value="history">Historial</TabsTrigger>
                <TabsTrigger value="actions">Acciones</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">ID de Transacción</Label>
                    <p className="font-mono">{selectedTransaction.id}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Tipo</Label>
                    <div className="mt-1">{getTypeBadge(selectedTransaction.type)}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Tienda</Label>
                    <p>{selectedTransaction.store}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Estado</Label>
                    <div className="mt-1">{getStatusBadge(selectedTransaction.status)}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Monto</Label>
                    <p className={`font-medium ${
                      selectedTransaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(selectedTransaction.amount)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Comisión</Label>
                    <p className="font-medium">{formatCurrency(selectedTransaction.commission)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Método de Pago</Label>
                    <p>{selectedTransaction.method}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Fecha</Label>
                    <p>{formatDate(selectedTransaction.date)}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Descripción</Label>
                  <p className="mt-1">{selectedTransaction.description}</p>
                </div>
                {selectedTransaction.reference && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Referencia</Label>
                    <p className="font-mono text-sm">{selectedTransaction.reference}</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="history">
                <p className="text-sm text-gray-500">Historial de cambios de estado...</p>
              </TabsContent>
              <TabsContent value="actions">
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Comprobante
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Enviar por Email
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}