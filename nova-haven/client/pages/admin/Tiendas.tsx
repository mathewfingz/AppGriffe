import LeftSidebarNav from "@/components/LeftSidebarNav";
import Topbar from "@/components/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Store, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  MoreHorizontal,
  Download,
  Upload,
  Settings,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  Edit,
  Trash2,
  Copy
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Store {
  id: string;
  logo: string;
  name: string;
  plan: 'premium' | 'basic' | 'free';
  status: 'active' | 'paused' | 'inactive' | 'pending';
  sales: number;
  commission: number;
  lastAccess: string;
  owner: string;
  email: string;
  phone: string;
  website?: string;
  address: string;
  city: string;
  country: string;
  joinDate: string;
  products: number;
  orders: number;
  rating: number;
  reviews: number;
  category: string;
  verified: boolean;
  growth: number;
}

export default function AdminTiendas() {
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPlan, setFilterPlan] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [isNewStoreOpen, setIsNewStoreOpen] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showNewStoreDialog, setShowNewStoreDialog] = useState(false);

  const stores: Store[] = [
    {
      id: "1",
      logo: "🏪",
      name: "TechStore Pro",
      plan: "premium",
      status: "active",
      sales: 125000,
      commission: 15,
      lastAccess: "Hace 2 horas",
      owner: "Carlos Mendoza",
      email: "carlos@techstore.com",
      phone: "+1 234 567 8901",
      website: "www.techstore.com",
      address: "Av. Tecnología 123",
      city: "Ciudad de México",
      country: "México",
      joinDate: "2023-01-15",
      products: 245,
      orders: 1250,
      rating: 4.8,
      reviews: 324,
      category: "Electrónicos",
      verified: true,
      growth: 12.5
    },
    {
      id: "2", 
      logo: "👗",
      name: "Fashion Hub",
      plan: "basic",
      status: "active",
      sales: 98500,
      commission: 12,
      lastAccess: "Hace 1 día",
      owner: "María González",
      email: "maria@fashionhub.com",
      phone: "+1 234 567 8902",
      address: "Calle Moda 456",
      city: "Guadalajara",
      country: "México",
      joinDate: "2023-03-20",
      products: 189,
      orders: 890,
      rating: 4.6,
      reviews: 156,
      category: "Moda",
      verified: true,
      growth: 8.3
    },
    {
      id: "3",
      logo: "🏠",
      name: "Home & Garden",
      plan: "premium",
      status: "paused",
      sales: 87200,
      commission: 18,
      lastAccess: "Hace 3 días",
      owner: "Roberto Silva",
      email: "roberto@homegarden.com",
      phone: "+1 234 567 8903",
      website: "www.homegarden.com",
      address: "Blvd. Hogar 789",
      city: "Monterrey",
      country: "México",
      joinDate: "2022-11-10",
      products: 156,
      orders: 654,
      rating: 4.4,
      reviews: 89,
      category: "Hogar",
      verified: false,
      growth: -2.1
    },
    {
      id: "4",
      logo: "⚽",
      name: "Sports World",
      plan: "basic",
      status: "active",
      sales: 76800,
      commission: 10,
      lastAccess: "Hace 5 horas",
      owner: "Ana López",
      email: "ana@sportsworld.com",
      phone: "+1 234 567 8904",
      address: "Av. Deportes 321",
      city: "Puebla",
      country: "México",
      joinDate: "2023-06-05",
      products: 98,
      orders: 432,
      rating: 4.7,
      reviews: 67,
      category: "Deportes",
      verified: true,
      growth: 15.2
    },
    {
      id: "5",
      logo: "💄",
      name: "Beauty Corner",
      plan: "premium",
      status: "active",
      sales: 65400,
      commission: 20,
      lastAccess: "Hace 30 min",
      owner: "Sofía Ramírez",
      email: "sofia@beautycorner.com",
      phone: "+1 234 567 8905",
      website: "www.beautycorner.com",
      address: "Plaza Belleza 654",
      city: "Tijuana",
      country: "México",
      joinDate: "2023-08-12",
      products: 134,
      orders: 567,
      rating: 4.9,
      reviews: 203,
      category: "Belleza",
      verified: true,
      growth: 22.8
    },
    {
      id: "6",
      logo: "📚",
      name: "BookStore Plus",
      plan: "free",
      status: "pending",
      sales: 12300,
      commission: 8,
      lastAccess: "Hace 1 semana",
      owner: "Luis Herrera",
      email: "luis@bookstore.com",
      phone: "+1 234 567 8906",
      address: "Calle Libros 987",
      city: "Mérida",
      country: "México",
      joinDate: "2024-01-03",
      products: 45,
      orders: 89,
      rating: 4.2,
      reviews: 12,
      category: "Libros",
      verified: false,
      growth: 5.1
    }
  ];

  // Funciones auxiliares
  const handleSelectStore = (storeId: string) => {
    setSelectedStores(prev => 
      prev.includes(storeId) 
        ? prev.filter(id => id !== storeId)
        : [...prev, storeId]
    );
  };

  const handleSelectAll = () => {
    const filteredStores = getFilteredStores();
    if (selectedStores.length === filteredStores.length) {
      setSelectedStores([]);
    } else {
      setSelectedStores(filteredStores.map(s => s.id));
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800 border-green-200",
      paused: "bg-yellow-100 text-yellow-800 border-yellow-200",
      inactive: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-blue-100 text-blue-800 border-blue-200"
    };
    
    const labels = {
      active: "Activo",
      paused: "Pausado", 
      inactive: "Inactivo",
      pending: "Pendiente"
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getPlanBadge = (plan: string) => {
    const variants = {
      premium: "bg-purple-100 text-purple-800 border-purple-200",
      basic: "bg-blue-100 text-blue-800 border-blue-200",
      free: "bg-gray-100 text-gray-800 border-gray-200"
    };
    
    const labels = {
      premium: "Premium",
      basic: "Básico",
      free: "Gratuito"
    };

    return (
      <Badge className={variants[plan as keyof typeof variants]}>
        {labels[plan as keyof typeof labels]}
      </Badge>
    );
  };

  const getFilteredStores = () => {
    return stores.filter(store => {
      const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           store.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           store.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || store.status === filterStatus;
      const matchesPlan = filterPlan === "all" || store.plan === filterPlan;
      const matchesCategory = filterCategory === "all" || store.category === filterCategory;
      
      return matchesSearch && matchesStatus && matchesPlan && matchesCategory;
    });
  };

  const getSortedStores = () => {
    const filtered = getFilteredStores();
    return filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Store];
      let bValue: any = b[sortBy as keyof Store];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  };

  // Estadísticas
  const stats = {
    total: stores.length,
    active: stores.filter(s => s.status === 'active').length,
    totalSales: stores.reduce((sum, s) => sum + s.sales, 0),
    avgRating: stores.reduce((sum, s) => sum + s.rating, 0) / stores.length,
    totalProducts: stores.reduce((sum, s) => sum + s.products, 0),
    totalOrders: stores.reduce((sum, s) => sum + s.orders, 0),
    verified: stores.filter(s => s.verified).length,
    growth: stores.reduce((sum, s) => sum + s.growth, 0) / stores.length
  };

  const categories = [...new Set(stores.map(s => s.category))];

  const displayedStores = getSortedStores();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <LeftSidebarNav />
      <div className="flex-1 flex flex-col">
        <Topbar title="Gestión de Tiendas" />
        <div className="flex-1 p-6 space-y-6">
          {/* Estadísticas principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Tiendas</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                    <p className="text-sm text-green-600 mt-1">
                      <TrendingUp className="h-4 w-4 inline mr-1" />
                      +{stats.growth.toFixed(1)}% este mes
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Store className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tiendas Activas</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {((stats.active / stats.total) * 100).toFixed(1)}% del total
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Ventas Totales</p>
                    <p className="text-3xl font-bold text-gray-900">${(stats.totalSales / 1000000).toFixed(1)}M</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {stats.totalOrders.toLocaleString()} pedidos
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rating Promedio</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.avgRating.toFixed(1)}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {stats.verified} verificadas
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controles y filtros */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar por nombre, propietario o categoría..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="paused">Pausado</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterPlan} onValueChange={setFilterPlan}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="basic">Básico</SelectItem>
                      <SelectItem value="free">Gratuito</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {selectedStores.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {selectedStores.length} seleccionadas
                      </span>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Enviar mensaje
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Exportar
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar todo
                  </Button>
                  <Button size="sm" onClick={() => setShowNewStoreDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Tienda
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de tiendas */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 w-12">
                        <Checkbox
                          checked={selectedStores.length === displayedStores.length && displayedStores.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="text-left p-4 font-medium text-gray-900">Tienda</th>
                      <th className="text-left p-4 font-medium text-gray-900">Propietario</th>
                      <th className="text-left p-4 font-medium text-gray-900">Estado</th>
                      <th className="text-left p-4 font-medium text-gray-900">Plan</th>
                      <th className="text-left p-4 font-medium text-gray-900">Ventas</th>
                      <th className="text-left p-4 font-medium text-gray-900">Productos</th>
                      <th className="text-left p-4 font-medium text-gray-900">Rating</th>
                      <th className="text-left p-4 font-medium text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedStores.map((store) => (
                      <tr key={store.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <Checkbox
                            checked={selectedStores.includes(store.id)}
                            onCheckedChange={() => handleSelectStore(store.id)}
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-lg">
                                {store.logo}
                              </div>
                              {store.verified && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                  <CheckCircle className="h-3 w-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{store.name}</p>
                              <p className="text-sm text-gray-500">{store.category}</p>
                              <p className="text-xs text-gray-400">Desde {store.joinDate}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-gray-900">{store.owner}</p>
                            <p className="text-sm text-gray-500">{store.email}</p>
                            <p className="text-xs text-gray-400">{store.phone}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          {getStatusBadge(store.status)}
                        </td>
                        <td className="p-4">
                          {getPlanBadge(store.plan)}
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-semibold text-gray-900">${store.sales.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">{store.orders} pedidos</p>
                            <p className="text-xs text-green-600">+{store.growth}% mes</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-gray-900">{store.products}</p>
                          <p className="text-sm text-gray-500">productos</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{store.rating}</span>
                            <span className="text-sm text-gray-500">({store.reviews})</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Link to={`/admin/tiendas/${store.id}/overview`}>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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

          {/* Estado vacío */}
          {displayedStores.length === 0 && (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron tiendas</h3>
                <p className="text-gray-500 mb-4">
                  No hay tiendas que coincidan con los filtros seleccionados.
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                  setFilterPlan('all');
                  setFilterCategory('all');
                }}>
                  Limpiar filtros
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Dialog para nueva tienda */}
      <Dialog open={showNewStoreDialog} onOpenChange={setShowNewStoreDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Crear Nueva Tienda</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Información Básica</TabsTrigger>
              <TabsTrigger value="contact">Contacto</TabsTrigger>
              <TabsTrigger value="settings">Configuración</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="storeName">Nombre de la tienda</Label>
                  <Input id="storeName" placeholder="Ej: Mi Tienda Online" />
                </div>
                <div>
                  <Label htmlFor="category">Categoría</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electrónicos</SelectItem>
                      <SelectItem value="fashion">Moda</SelectItem>
                      <SelectItem value="home">Hogar</SelectItem>
                      <SelectItem value="sports">Deportes</SelectItem>
                      <SelectItem value="books">Libros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" placeholder="Describe tu tienda..." />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="plan">Plan</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Gratuito</SelectItem>
                      <SelectItem value="basic">Básico</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Estado inicial</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="active">Activo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ownerName">Nombre del propietario</Label>
                  <Input id="ownerName" placeholder="Nombre completo" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@ejemplo.com" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" placeholder="+1 234 567 8900" />
                </div>
                <div>
                  <Label htmlFor="website">Sitio web</Label>
                  <Input id="website" placeholder="https://mitienda.com" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Dirección</Label>
                <Textarea id="address" placeholder="Dirección completa..." />
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Verificación automática</Label>
                    <p className="text-sm text-gray-500">Verificar la tienda automáticamente al crearla</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notificaciones por email</Label>
                    <p className="text-sm text-gray-500">Enviar notificaciones al propietario</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Acceso al dashboard</Label>
                    <p className="text-sm text-gray-500">Permitir acceso inmediato al panel de control</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowNewStoreDialog(false)}>
              Cancelar
            </Button>
            <Button>
              Crear Tienda
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}