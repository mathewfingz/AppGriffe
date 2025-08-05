import LeftSidebarNav from "@/components/LeftSidebarNav";
import Topbar from "@/components/Topbar";
import MetricsCard from "@/components/MetricsCard";
import CSVImporter from "@/components/CSVImporter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Download, 
  Upload, 
  Check, 
  X, 
  Edit,
  RefreshCw,
  DollarSign,
  Package,
  Users,
  ShoppingCart,
  Settings,
  Bell
} from "lucide-react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function AdminTiendaOverview() {
  const { tiendaId } = useParams();
  const [csvImporterOpen, setCsvImporterOpen] = useState(false);
  const [csvImporterTitle, setCsvImporterTitle] = useState("");

  const storeData = {
    name: "TechStore Pro",
    plan: "Premium",
    status: "Activo",
    commission: "15%"
  };

  const kpiData = [
    { title: "Ventas del Mes", value: "$125,000", change: "+12.5%", changeType: "positive" as const },
    { title: "Pedidos", value: "847", change: "+8.2%", changeType: "positive" as const },
    { title: "Productos", value: "1,234", change: "+15", changeType: "positive" as const },
    { title: "Clientes", value: "2,890", change: "+5.8%", changeType: "positive" as const }
  ];

  const openCSVImporter = (title: string) => {
    setCsvImporterTitle(title);
    setCsvImporterOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <LeftSidebarNav />
      
      <div className="flex-1 flex flex-col">
        <div className="flex items-center h-[88px] px-4 sm:px-6 lg:px-10 bg-white border-b border-[#E8E8ED]">
          <Link to="/admin/tiendas" className="mr-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-[32px] font-extrabold text-[#303030] leading-[19px]">
            {storeData.name}
          </h1>
          <div className="ml-4 flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800">{storeData.status}</Badge>
            <Badge className="bg-purple-100 text-purple-800">{storeData.plan}</Badge>
          </div>
        </div>
        
        <div className="flex-1 px-4 sm:px-6 lg:px-10 py-6">
          <Tabs defaultValue="resumen" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9">
              <TabsTrigger value="resumen">Resumen</TabsTrigger>
              <TabsTrigger value="productos">Productos</TabsTrigger>
              <TabsTrigger value="categorias">Categorías</TabsTrigger>
              <TabsTrigger value="inventario">Inventario</TabsTrigger>
              <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
              <TabsTrigger value="clientes">Clientes</TabsTrigger>
              <TabsTrigger value="finanzas">Finanzas</TabsTrigger>
              <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
              <TabsTrigger value="ajustes">Ajustes</TabsTrigger>
            </TabsList>

            {/* Resumen Tab */}
            <TabsContent value="resumen" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              
              <Card>
                <CardHeader>
                  <CardTitle>Sugerencias de IA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm">💡 Considera aumentar el stock de "iPhone 15" - alta demanda detectada</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm">📈 Promociona "Auriculares Bluetooth" - margen alto y tendencia positiva</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Productos Tab */}
            <TabsContent value="productos" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Productos de Shopify</CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => openCSVImporter("Importar Productos")}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Importar CSV
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>iPhone 15 Pro</TableCell>
                        <TableCell>IP15P-128</TableCell>
                        <TableCell>$1,199</TableCell>
                        <TableCell>25</TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Categorías Tab */}
            <TabsContent value="categorias" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Gestión de Categorías</CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => openCSVImporter("Importar Categorías")}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Importar CSV
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span>📱 Electrónicos</span>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg ml-6">
                      <span>📱 Smartphones</span>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Inventario Tab */}
            <TabsContent value="inventario" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Control de Inventario</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Producto</TableHead>
                        <TableHead>Almacén</TableHead>
                        <TableHead>Stock Actual</TableHead>
                        <TableHead>Stock Mínimo</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>IP15P-128</TableCell>
                        <TableCell>iPhone 15 Pro</TableCell>
                        <TableCell>Principal</TableCell>
                        <TableCell>
                          <Input defaultValue="25" className="w-20" />
                        </TableCell>
                        <TableCell>10</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            Actualizar
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pedidos Tab */}
            <TabsContent value="pedidos" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de Pedidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Pedido</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>#ORD-001</TableCell>
                        <TableCell>Juan Pérez</TableCell>
                        <TableCell>$1,199</TableCell>
                        <TableCell>
                          <Select defaultValue="processing">
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pendiente</SelectItem>
                              <SelectItem value="processing">Procesando</SelectItem>
                              <SelectItem value="shipped">Enviado</SelectItem>
                              <SelectItem value="delivered">Entregado</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>2024-01-15</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            Reembolso
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Clientes Tab */}
            <TabsContent value="clientes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Base de Clientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Total Gastado</TableHead>
                        <TableHead>Pedidos</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Juan Pérez</TableCell>
                        <TableCell>juan@email.com</TableCell>
                        <TableCell>$2,398</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Activo</Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            Ban/Unban
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Finanzas Tab */}
            <TabsContent value="finanzas" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Flujo de Caja</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">+$15,240</div>
                    <p className="text-sm text-gray-500">Este mes</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Comisiones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$18,750</div>
                    <p className="text-sm text-gray-500">Total devengado</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Payouts Stripe</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$125,000</div>
                    <p className="text-sm text-gray-500">Último payout</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notificaciones Tab */}
            <TabsContent value="notificaciones" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Log de Webhooks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">order.created</p>
                        <p className="text-sm text-gray-500">2024-01-15 14:30:25</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">Éxito</Badge>
                        <Button size="sm" variant="outline">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Ajustes Tab */}
            <TabsContent value="ajustes" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración General</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Plan Actual</Label>
                      <Select defaultValue="premium">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Básico</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Comisión Override (%)</Label>
                      <Input defaultValue="15" />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="store-active" defaultChecked />
                      <Label htmlFor="store-active">Tienda Activa</Label>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>API Keys</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Shopify API Key</Label>
                      <Input type="password" defaultValue="sk_test_..." />
                    </div>
                    
                    <div>
                      <Label>Webhook Secret</Label>
                      <Input type="password" defaultValue="whsec_..." />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <CSVImporter
        isOpen={csvImporterOpen}
        onClose={() => setCsvImporterOpen(false)}
        title={csvImporterTitle}
        onImport={(data) => console.log("Imported:", data)}
        onExport={() => console.log("Exporting...")}
      />
    </div>
  );
}