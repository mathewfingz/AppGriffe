import { useState } from "react";
import LeftSidebarNav from "../../components/LeftSidebarNav";
import Topbar from "../../components/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Checkbox } from "../../components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Copy,
  Calendar,
  Percent,
  Users,
  ShoppingCart,
  Eye,
  MoreHorizontal
} from "lucide-react";

interface Discount {
  id: string;
  code: string;
  name: string;
  type: 'percentage' | 'fixed' | 'shipping';
  value: number;
  minAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'expired' | 'scheduled';
  stores: string[];
  categories: string[];
  customers: string[];
  description: string;
}

export default function AdminDescuentos() {
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isNewDiscountOpen, setIsNewDiscountOpen] = useState(false);

  // Mock data para descuentos
  const discounts: Discount[] = [
    {
      id: "DESC001",
      code: "WELCOME20",
      name: "Descuento de Bienvenida",
      type: "percentage",
      value: 20,
      minAmount: 50,
      maxDiscount: 100,
      usageLimit: 1000,
      usedCount: 245,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
      stores: ["Tienda A", "Tienda B"],
      categories: ["Electrónicos", "Ropa"],
      customers: ["Nuevos clientes"],
      description: "Descuento especial para nuevos clientes"
    },
    {
      id: "DESC002",
      code: "SUMMER50",
      name: "Oferta de Verano",
      type: "fixed",
      value: 50,
      usageLimit: 500,
      usedCount: 123,
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      status: "active",
      stores: ["Tienda A"],
      categories: ["Ropa", "Accesorios"],
      customers: ["Todos"],
      description: "Descuento fijo para la temporada de verano"
    },
    {
      id: "DESC003",
      code: "FREESHIP",
      name: "Envío Gratis",
      type: "shipping",
      value: 100,
      minAmount: 75,
      usageLimit: 2000,
      usedCount: 1456,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
      stores: ["Todas"],
      categories: ["Todas"],
      customers: ["Todos"],
      description: "Envío gratuito en compras superiores a $75"
    },
    {
      id: "DESC004",
      code: "BLACK30",
      name: "Black Friday",
      type: "percentage",
      value: 30,
      maxDiscount: 200,
      usageLimit: 10000,
      usedCount: 8945,
      startDate: "2024-11-29",
      endDate: "2024-11-29",
      status: "expired",
      stores: ["Todas"],
      categories: ["Todas"],
      customers: ["Todos"],
      description: "Descuento especial Black Friday"
    },
    {
      id: "DESC005",
      code: "XMAS25",
      name: "Navidad 2024",
      type: "percentage",
      value: 25,
      minAmount: 100,
      maxDiscount: 150,
      usageLimit: 5000,
      usedCount: 0,
      startDate: "2024-12-20",
      endDate: "2024-12-26",
      status: "scheduled",
      stores: ["Todas"],
      categories: ["Regalos", "Juguetes"],
      customers: ["Todos"],
      description: "Descuento especial para Navidad"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-gray-100 text-gray-800 border-gray-200",
      expired: "bg-red-100 text-red-800 border-red-200",
      scheduled: "bg-blue-100 text-blue-800 border-blue-200"
    };
    
    const labels = {
      active: "Activo",
      inactive: "Inactivo",
      expired: "Expirado",
      scheduled: "Programado"
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      percentage: "bg-purple-100 text-purple-800 border-purple-200",
      fixed: "bg-orange-100 text-orange-800 border-orange-200",
      shipping: "bg-cyan-100 text-cyan-800 border-cyan-200"
    };
    
    const labels = {
      percentage: "Porcentaje",
      fixed: "Monto Fijo",
      shipping: "Envío Gratis"
    };

    return (
      <Badge className={variants[type as keyof typeof variants]}>
        {labels[type as keyof typeof labels]}
      </Badge>
    );
  };

  const handleSelectDiscount = (discountId: string) => {
    setSelectedDiscounts(prev => 
      prev.includes(discountId) 
        ? prev.filter(id => id !== discountId)
        : [...prev, discountId]
    );
  };

  const handleSelectAll = () => {
    const filteredDiscounts = discounts.filter(discount => {
      const matchesSearch = discount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           discount.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || discount.status === statusFilter;
      const matchesType = typeFilter === "all" || discount.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });

    if (selectedDiscounts.length === filteredDiscounts.length) {
      setSelectedDiscounts([]);
    } else {
      setSelectedDiscounts(filteredDiscounts.map(d => d.id));
    }
  };

  const filteredDiscounts = discounts.filter(discount => {
    const matchesSearch = discount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discount.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || discount.status === statusFilter;
    const matchesType = typeFilter === "all" || discount.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Estadísticas
  const stats = {
    total: discounts.length,
    active: discounts.filter(d => d.status === 'active').length,
    totalUsage: discounts.reduce((sum, d) => sum + d.usedCount, 0),
    totalSavings: discounts.reduce((sum, d) => {
      if (d.type === 'percentage') {
        return sum + (d.usedCount * (d.maxDiscount || 50));
      } else if (d.type === 'fixed') {
        return sum + (d.usedCount * d.value);
      }
      return sum + (d.usedCount * 15); // Estimado para envío gratis
    }, 0)
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <LeftSidebarNav />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar title="Gestión de Descuentos" />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Descuentos</h1>
                <p className="text-gray-600 mt-1">Administra códigos promocionales y ofertas especiales</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Exportar
                </Button>
                
                <Dialog open={isNewDiscountOpen} onOpenChange={setIsNewDiscountOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4" />
                      Nuevo Descuento
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Crear Nuevo Descuento</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="code">Código del Descuento</Label>
                          <Input id="code" placeholder="ej. WELCOME20" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre del Descuento</Label>
                          <Input id="name" placeholder="ej. Descuento de Bienvenida" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="type">Tipo de Descuento</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="percentage">Porcentaje</SelectItem>
                              <SelectItem value="fixed">Monto Fijo</SelectItem>
                              <SelectItem value="shipping">Envío Gratis</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="value">Valor</Label>
                          <Input id="value" type="number" placeholder="20" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="minAmount">Monto Mínimo</Label>
                          <Input id="minAmount" type="number" placeholder="50" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="usageLimit">Límite de Uso</Label>
                          <Input id="usageLimit" type="number" placeholder="1000" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Fecha de Inicio</Label>
                          <Input id="startDate" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endDate">Fecha de Fin</Label>
                          <Input id="endDate" type="date" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea id="description" placeholder="Descripción del descuento..." />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="active" />
                        <Label htmlFor="active">Activar descuento inmediatamente</Label>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setIsNewDiscountOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={() => setIsNewDiscountOpen(false)}>
                        Crear Descuento
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Descuentos</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Percent className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Descuentos Activos</p>
                      <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                    </div>
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Usos</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.totalUsage.toLocaleString()}</p>
                    </div>
                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Ahorros Totales</p>
                      <p className="text-2xl font-bold text-orange-600">${stats.totalSavings.toLocaleString()}</p>
                    </div>
                    <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Buscar por nombre o código..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los estados</SelectItem>
                        <SelectItem value="active">Activo</SelectItem>
                        <SelectItem value="inactive">Inactivo</SelectItem>
                        <SelectItem value="expired">Expirado</SelectItem>
                        <SelectItem value="scheduled">Programado</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los tipos</SelectItem>
                        <SelectItem value="percentage">Porcentaje</SelectItem>
                        <SelectItem value="fixed">Monto Fijo</SelectItem>
                        <SelectItem value="shipping">Envío Gratis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {selectedDiscounts.length > 0 && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <span className="text-sm text-blue-800">
                        {selectedDiscounts.length} descuento(s) seleccionado(s)
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Activar
                        </Button>
                        <Button size="sm" variant="outline">
                          Desactivar
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Discounts Table */}
            <Card>
              <CardHeader>
                <CardTitle>Lista de Descuentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedDiscounts.length === filteredDiscounts.length && filteredDiscounts.length > 0}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead>Código</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Usos</TableHead>
                        <TableHead>Vigencia</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDiscounts.map((discount) => (
                        <TableRow key={discount.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedDiscounts.includes(discount.id)}
                              onCheckedChange={() => handleSelectDiscount(discount.id)}
                            />
                          </TableCell>
                          <TableCell className="font-mono font-medium">
                            {discount.code}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{discount.name}</div>
                              <div className="text-sm text-gray-500">{discount.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getTypeBadge(discount.type)}
                          </TableCell>
                          <TableCell>
                            {discount.type === 'percentage' ? `${discount.value}%` : 
                             discount.type === 'fixed' ? `$${discount.value}` : 
                             'Gratis'}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{discount.usedCount.toLocaleString()}</div>
                              {discount.usageLimit && (
                                <div className="text-gray-500">
                                  de {discount.usageLimit.toLocaleString()}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{new Date(discount.startDate).toLocaleDateString()}</div>
                              <div className="text-gray-500">
                                {new Date(discount.endDate).toLocaleDateString()}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(discount.status)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="ghost">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {filteredDiscounts.length === 0 && (
                    <div className="text-center py-12">
                      <Percent className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No se encontraron descuentos
                      </h3>
                      <p className="text-gray-500">
                        Intenta ajustar los filtros o crear un nuevo descuento.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}