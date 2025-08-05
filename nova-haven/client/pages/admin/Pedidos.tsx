import React, { useState } from "react";
import LeftSidebarNav from "../../components/LeftSidebarNav";
import Topbar from "../../components/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Checkbox } from "../../components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "../../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Label } from "../../components/ui/label";
import { 
  Search, 
  Filter, 
  Download, 
  FileText,
  MoreHorizontal,
  Eye,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Edit,
  Printer,
  RefreshCw,
  AlertCircle
} from "lucide-react";

interface Order {
  id: string;
  store: string;
  customer: string;
  customerEmail: string;
  customerPhone: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  date: string;
  items: number;
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  commission: number;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  notes?: string;
  priority: 'low' | 'medium' | 'high';
}

export default function AdminPedidos() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [storeFilter, setStoreFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const orders: Order[] = [
    {
      id: "ORD-001",
      store: "TechStore Pro",
      customer: "Juan Pérez",
      customerEmail: "juan@email.com",
      customerPhone: "+52 555 123 4567",
      total: 1199.00,
      status: "processing",
      date: "2024-01-15",
      items: 2,
      shippingAddress: "Av. Reforma 123, CDMX",
      paymentMethod: "Tarjeta de Crédito",
      trackingNumber: "TRK123456789",
      estimatedDelivery: "2024-01-18",
      commission: 119.90,
      priority: "high",
      products: [
        { name: "iPhone 15 Pro", quantity: 1, price: 999.00, image: "📱" },
        { name: "Funda Protectora", quantity: 1, price: 200.00, image: "🛡️" }
      ],
      notes: "Cliente solicita entrega urgente"
    },
    {
      id: "ORD-002", 
      store: "Fashion Hub",
      customer: "María García",
      customerEmail: "maria@email.com",
      customerPhone: "+52 555 987 6543",
      total: 299.99,
      status: "shipped",
      date: "2024-01-14",
      items: 1,
      shippingAddress: "Calle Moda 456, Guadalajara",
      paymentMethod: "PayPal",
      trackingNumber: "TRK987654321",
      estimatedDelivery: "2024-01-17",
      commission: 30.00,
      priority: "medium",
      products: [
        { name: "Vestido de Verano", quantity: 1, price: 299.99, image: "👗" }
      ]
    },
    {
      id: "ORD-003",
      store: "Home & Garden",
      customer: "Carlos López",
      customerEmail: "carlos@email.com",
      customerPhone: "+52 555 456 7890",
      total: 89.50,
      status: "delivered",
      date: "2024-01-13",
      items: 3,
      shippingAddress: "Blvd. Hogar 789, Monterrey",
      paymentMethod: "Transferencia",
      commission: 8.95,
      priority: "low",
      products: [
        { name: "Maceta Decorativa", quantity: 2, price: 35.00, image: "🪴" },
        { name: "Fertilizante", quantity: 1, price: 19.50, image: "🌱" }
      ]
    },
    {
      id: "ORD-004",
      store: "TechStore Pro",
      customer: "Ana Martínez",
      customerEmail: "ana@email.com",
      customerPhone: "+52 555 321 0987",
      total: 2499.00,
      status: "pending",
      date: "2024-01-12",
      items: 1,
      shippingAddress: "Av. Tecnología 321, Puebla",
      paymentMethod: "Tarjeta de Débito",
      commission: 249.90,
      priority: "high",
      products: [
        { name: "MacBook Pro M3", quantity: 1, price: 2499.00, image: "💻" }
      ],
      notes: "Verificar disponibilidad antes de procesar"
    },
    {
      id: "ORD-005",
      store: "Sports World",
      customer: "Roberto Silva",
      customerEmail: "roberto@email.com",
      customerPhone: "+52 555 654 3210",
      total: 156.75,
      status: "cancelled",
      date: "2024-01-11",
      items: 2,
      shippingAddress: "Av. Deportes 654, Tijuana",
      paymentMethod: "Efectivo",
      commission: 0,
      priority: "low",
      products: [
        { name: "Balón de Fútbol", quantity: 1, price: 89.99, image: "⚽" },
        { name: "Guantes de Portero", quantity: 1, price: 66.76, image: "🧤" }
      ],
      notes: "Cancelado por el cliente - reembolso procesado"
    },
    {
      id: "ORD-006",
      store: "Beauty Corner",
      customer: "Sofía Ramírez",
      customerEmail: "sofia@email.com",
      customerPhone: "+52 555 789 0123",
      total: 234.50,
      status: "refunded",
      date: "2024-01-10",
      items: 4,
      shippingAddress: "Plaza Belleza 987, Mérida",
      paymentMethod: "Tarjeta de Crédito",
      commission: 0,
      priority: "medium",
      products: [
        { name: "Set de Maquillaje", quantity: 1, price: 150.00, image: "💄" },
        { name: "Crema Facial", quantity: 2, price: 35.00, image: "🧴" },
        { name: "Perfume", quantity: 1, price: 49.50, image: "🌸" }
      ],
      notes: "Producto defectuoso - reembolso completo"
    }
  ];

  const stores = [...new Set(orders.map(order => order.store))];

  // Funciones auxiliares
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { 
        label: "Pendiente", 
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Clock
      },
      processing: { 
        label: "Procesando", 
        className: "bg-blue-100 text-blue-800 border-blue-200",
        icon: Package
      },
      shipped: { 
        label: "Enviado", 
        className: "bg-purple-100 text-purple-800 border-purple-200",
        icon: Truck
      },
      delivered: { 
        label: "Entregado", 
        className: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle
      },
      cancelled: { 
        label: "Cancelado", 
        className: "bg-red-100 text-red-800 border-red-200",
        icon: XCircle
      },
      refunded: { 
        label: "Reembolsado", 
        className: "bg-gray-100 text-gray-800 border-gray-200",
        icon: RefreshCw
      }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const IconComponent = config.icon;
    
    return (
      <Badge className={`${config.className} flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { label: "Baja", className: "bg-gray-100 text-gray-800" },
      medium: { label: "Media", className: "bg-blue-100 text-blue-800" },
      high: { label: "Alta", className: "bg-red-100 text-red-800" }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Estadísticas
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    totalRevenue: orders.filter(o => o.status !== 'cancelled' && o.status !== 'refunded').reduce((sum, o) => sum + o.total, 0),
    totalCommission: orders.filter(o => o.status !== 'cancelled' && o.status !== 'refunded').reduce((sum, o) => sum + o.commission, 0),
    avgOrderValue: orders.length > 0 ? orders.reduce((sum, o) => sum + o.total, 0) / orders.length : 0,
    highPriority: orders.filter(o => o.priority === 'high').length
  };

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    const filtered = getFilteredOrders();
    setSelectedOrders(
      selectedOrders.length === filtered.length ? [] : filtered.map(order => order.id)
    );
  };

  const getFilteredOrders = () => {
    return orders.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      const matchesStore = storeFilter === "all" || order.store === storeFilter;
      const matchesPriority = priorityFilter === "all" || order.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesStore && matchesPriority;
    });
  };

  const filteredOrders = getFilteredOrders();

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    // Aquí iría la lógica para actualizar el estado del pedido
    console.log(`Updating order ${orderId} to status ${newStatus}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <LeftSidebarNav />
      
      <div className="flex-1 flex flex-col">
        <Topbar title="Gestión de Pedidos" />
        
        <div className="flex-1 p-6 space-y-6">
          {/* Estadísticas principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Pedidos</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {stats.highPriority} de alta prioridad
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <ShoppingCart className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Comisión: {formatCurrency(stats.totalCommission)}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Valor Promedio</p>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.avgOrderValue)}</p>
                    <p className="text-sm text-green-600 mt-1">
                      <TrendingUp className="h-4 w-4 inline mr-1" />
                      +12.5% este mes
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pendientes</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.pending + stats.processing}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Requieren atención
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <AlertCircle className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros y controles */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar por ID, cliente, tienda o email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="processing">Procesando</SelectItem>
                      <SelectItem value="shipped">Enviado</SelectItem>
                      <SelectItem value="delivered">Entregado</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                      <SelectItem value="refunded">Reembolsado</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={storeFilter} onValueChange={setStoreFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Tienda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {stores.map(store => (
                        <SelectItem key={store} value={store}>{store}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="low">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Acciones en lote */}
              {selectedOrders.length > 0 && (
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-sm font-medium text-blue-900">
                    {selectedOrders.length} pedido(s) seleccionado(s)
                  </span>
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Cambiar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="processing">Marcar como Procesando</SelectItem>
                        <SelectItem value="shipped">Marcar como Enviado</SelectItem>
                        <SelectItem value="delivered">Marcar como Entregado</SelectItem>
                        <SelectItem value="cancelled">Cancelar</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Facturas
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tabla de pedidos */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 w-12">
                        <Checkbox
                          checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="text-left p-4 font-medium text-gray-900">Pedido</th>
                      <th className="text-left p-4 font-medium text-gray-900">Cliente</th>
                      <th className="text-left p-4 font-medium text-gray-900">Tienda</th>
                      <th className="text-left p-4 font-medium text-gray-900">Estado</th>
                      <th className="text-left p-4 font-medium text-gray-900">Prioridad</th>
                      <th className="text-left p-4 font-medium text-gray-900">Total</th>
                      <th className="text-left p-4 font-medium text-gray-900">Fecha</th>
                      <th className="text-left p-4 font-medium text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <Checkbox
                            checked={selectedOrders.includes(order.id)}
                            onCheckedChange={() => handleSelectOrder(order.id)}
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">{order.id}</span>
                            <span className="text-sm text-gray-500">{order.items} artículo(s)</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">{order.customer}</span>
                            <span className="text-sm text-gray-500">{order.customerEmail}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-gray-900">{order.store}</span>
                        </td>
                        <td className="p-4">
                          {getStatusBadge(order.status)}
                        </td>
                        <td className="p-4">
                          {getPriorityBadge(order.priority)}
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">{formatCurrency(order.total)}</span>
                            <span className="text-sm text-gray-500">Com: {formatCurrency(order.commission)}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="text-gray-900">{formatDate(order.date)}</span>
                            {order.estimatedDelivery && (
                              <span className="text-sm text-gray-500">
                                Entrega: {formatDate(order.estimatedDelivery)}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewOrder(order)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Modal de detalles del pedido */}
          <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Detalles del Pedido {selectedOrder?.id}</DialogTitle>
                <DialogDescription>
                  Información completa del pedido y opciones de gestión
                </DialogDescription>
              </DialogHeader>
              
              {selectedOrder && (
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Detalles</TabsTrigger>
                    <TabsTrigger value="products">Productos</TabsTrigger>
                    <TabsTrigger value="tracking">Seguimiento</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Información del Cliente
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Nombre</Label>
                            <p className="text-gray-900">{selectedOrder.customer}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Email</Label>
                            <p className="text-gray-900 flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              {selectedOrder.customerEmail}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Teléfono</Label>
                            <p className="text-gray-900 flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              {selectedOrder.customerPhone}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Dirección</Label>
                            <p className="text-gray-900 flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {selectedOrder.shippingAddress}
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <ShoppingCart className="h-5 w-5" />
                            Información del Pedido
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <Label className="text-sm font-medium text-gray-600">Estado</Label>
                            {getStatusBadge(selectedOrder.status)}
                          </div>
                          <div className="flex justify-between">
                            <Label className="text-sm font-medium text-gray-600">Prioridad</Label>
                            {getPriorityBadge(selectedOrder.priority)}
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Tienda</Label>
                            <p className="text-gray-900">{selectedOrder.store}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Método de Pago</Label>
                            <p className="text-gray-900">{selectedOrder.paymentMethod}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Fecha del Pedido</Label>
                            <p className="text-gray-900 flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {formatDate(selectedOrder.date)}
                            </p>
                          </div>
                          {selectedOrder.notes && (
                            <div>
                              <Label className="text-sm font-medium text-gray-600">Notas</Label>
                              <p className="text-gray-900 text-sm bg-gray-50 p-2 rounded">{selectedOrder.notes}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <DollarSign className="h-5 w-5" />
                          Resumen Financiero
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Subtotal</p>
                            <p className="text-lg font-bold text-gray-900">{formatCurrency(selectedOrder.total - selectedOrder.commission)}</p>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Comisión</p>
                            <p className="text-lg font-bold text-green-600">{formatCurrency(selectedOrder.commission)}</p>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Total</p>
                            <p className="text-lg font-bold text-gray-900">{formatCurrency(selectedOrder.total)}</p>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Artículos</p>
                            <p className="text-lg font-bold text-gray-900">{selectedOrder.items}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="products" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Productos del Pedido</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedOrder.products.map((product, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center gap-4">
                                <div className="text-2xl">{product.image}</div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                                  <p className="text-sm text-gray-500">Cantidad: {product.quantity}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-gray-900">{formatCurrency(product.price)}</p>
                                <p className="text-sm text-gray-500">c/u</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="tracking" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Truck className="h-5 w-5" />
                          Información de Envío
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {selectedOrder.trackingNumber && (
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Número de Seguimiento</Label>
                            <p className="text-gray-900 font-mono">{selectedOrder.trackingNumber}</p>
                          </div>
                        )}
                        {selectedOrder.estimatedDelivery && (
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Entrega Estimada</Label>
                            <p className="text-gray-900">{formatDate(selectedOrder.estimatedDelivery)}</p>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Printer className="h-4 w-4 mr-2" />
                            Imprimir Etiqueta
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4 mr-2" />
                            Notificar Cliente
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}