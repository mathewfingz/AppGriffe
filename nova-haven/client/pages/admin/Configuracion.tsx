import LeftSidebarNav from "@/components/LeftSidebarNav";
import Topbar from "@/components/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  CreditCard,
  Mail,
  Globe,
  Shield,
  Percent,
  FileText,
  Zap,
  Save,
  Eye,
  Code,
  Database
} from "lucide-react";
import { useState } from "react";

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: string;
}

interface PaymentGateway {
  id: string;
  name: string;
  status: "active" | "inactive";
  commission: number;
  config: Record<string, string>;
}

export default function AdminConfiguracion() {
  const [globalCommission, setGlobalCommission] = useState("3.5");
  const [companyName, setCompanyName] = useState("Nova Haven");
  const [companyEmail, setCompanyEmail] = useState("admin@novahaven.com");
  const [supportEmail, setSupportEmail] = useState("soporte@novahaven.com");
  const [mainDomain, setMainDomain] = useState("novahaven.com");

  const featureFlags: FeatureFlag[] = [
    {
      id: "ai_chat",
      name: "Chat IA",
      description: "Habilitar asistente de IA para tiendas",
      enabled: true,
      category: "IA"
    },
    {
      id: "loyalty_program",
      name: "Programa de Puntos",
      description: "Sistema de fidelización con puntos",
      enabled: false,
      category: "Marketing"
    },
    {
      id: "pwa_support",
      name: "PWA",
      description: "Progressive Web App para tiendas",
      enabled: true,
      category: "Tecnología"
    },
    {
      id: "advanced_analytics",
      name: "Analytics Avanzado",
      description: "Reportes y métricas detalladas",
      enabled: true,
      category: "Analytics"
    },
    {
      id: "multi_currency",
      name: "Multi-moneda",
      description: "Soporte para múltiples monedas",
      enabled: false,
      category: "Pagos"
    },
    {
      id: "inventory_sync",
      name: "Sincronización Inventario",
      description: "Sync automático con Shopify",
      enabled: true,
      category: "Inventario"
    },
    {
      id: "email_marketing",
      name: "Email Marketing",
      description: "Campañas automatizadas de email",
      enabled: false,
      category: "Marketing"
    },
    {
      id: "social_login",
      name: "Login Social",
      description: "Autenticación con redes sociales",
      enabled: true,
      category: "Autenticación"
    }
  ];

  const paymentGateways: PaymentGateway[] = [
    {
      id: "stripe",
      name: "Stripe",
      status: "active",
      commission: 2.9,
      config: {
        publishableKey: "pk_live_...",
        secretKey: "sk_live_...",
        webhookSecret: "whsec_..."
      }
    },
    {
      id: "mercadopago",
      name: "MercadoPago",
      status: "active",
      commission: 3.5,
      config: {
        accessToken: "APP_USR_...",
        publicKey: "APP_USR_...",
        clientId: "123456789"
      }
    },
    {
      id: "paypal",
      name: "PayPal",
      status: "inactive",
      commission: 3.4,
      config: {
        clientId: "",
        clientSecret: "",
        mode: "sandbox"
      }
    }
  ];

  const emailTemplates = [
    { id: "welcome", name: "Bienvenida", description: "Email de bienvenida para nuevas tiendas" },
    { id: "order_confirmation", name: "Confirmación de Pedido", description: "Confirmación automática de pedidos" },
    { id: "payment_received", name: "Pago Recibido", description: "Notificación de pago procesado" },
    { id: "payout_notification", name: "Notificación de Pago", description: "Aviso de transferencia realizada" },
    { id: "monthly_report", name: "Reporte Mensual", description: "Resumen mensual de ventas" }
  ];

  const groupedFeatures = featureFlags.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, FeatureFlag[]>);

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800">Activo</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">Inactivo</Badge>
    );
  };

  return (
    <div className="flex min-h-screen bg-white">
      <LeftSidebarNav />
      
      <div className="flex-1 flex flex-col">
        <Topbar title="Configuración" />
        
        <div className="flex-1 px-4 sm:px-6 lg:px-10 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl sm:text-[32px] font-extrabold text-[#303030] leading-[19px]">
              Configuración del Sistema
            </h1>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="payments">Pagos</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="emails">Emails</TabsTrigger>
              <TabsTrigger value="domains">Dominios</TabsTrigger>
              <TabsTrigger value="legal">Legal</TabsTrigger>
            </TabsList>

            {/* Configuración General */}
            <TabsContent value="general">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Información de la Empresa
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company-name">Nombre de la Empresa</Label>
                        <Input
                          id="company-name"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="company-email">Email Principal</Label>
                        <Input
                          id="company-email"
                          type="email"
                          value={companyEmail}
                          onChange={(e) => setCompanyEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="support-email">Email de Soporte</Label>
                        <Input
                          id="support-email"
                          type="email"
                          value={supportEmail}
                          onChange={(e) => setSupportEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="main-domain">Dominio Principal</Label>
                        <Input
                          id="main-domain"
                          value={mainDomain}
                          onChange={(e) => setMainDomain(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Percent className="w-5 h-5" />
                      Comisiones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="global-commission">Comisión Global (%)</Label>
                        <Input
                          id="global-commission"
                          type="number"
                          step="0.1"
                          value={globalCommission}
                          onChange={(e) => setGlobalCommission(e.target.value)}
                          className="w-32"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Comisión por defecto para nuevas tiendas
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Pasarelas de Pago */}
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Pasarelas de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {paymentGateways.map((gateway) => (
                      <div key={gateway.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <h3 className="font-medium">{gateway.name}</h3>
                            {getStatusBadge(gateway.status)}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              Comisión: {gateway.commission}%
                            </span>
                            <Switch checked={gateway.status === "active"} />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(gateway.config).map(([key, value]) => (
                            <div key={key}>
                              <Label className="capitalize">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                              </Label>
                              <div className="relative">
                                <Input
                                  type="password"
                                  value={value}
                                  placeholder={`Configurar ${key}`}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Feature Flags */}
            <TabsContent value="features">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Características del Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(groupedFeatures).map(([category, features]) => (
                      <div key={category}>
                        <h3 className="font-medium mb-3">{category}</h3>
                        <div className="space-y-3 pl-4">
                          {features.map((feature) => (
                            <div key={feature.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <h4 className="font-medium">{feature.name}</h4>
                                <p className="text-sm text-gray-500">{feature.description}</p>
                              </div>
                              <Switch checked={feature.enabled} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Plantillas de Email */}
            <TabsContent value="emails">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Plantillas de Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {emailTemplates.map((template) => (
                      <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{template.name}</h3>
                          <p className="text-sm text-gray-500">{template.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Vista Previa
                          </Button>
                          <Button variant="outline" size="sm">
                            <Code className="w-4 h-4 mr-2" />
                            Editar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configuración de Dominios */}
            <TabsContent value="domains">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Gestión de Dominios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Dominio Principal</Label>
                      <Input value="novahaven.com" readOnly />
                    </div>
                    
                    <div>
                      <Label>Subdominios Permitidos</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span>*.novahaven.com</span>
                          <Badge className="bg-green-100 text-green-800">Activo</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span>*.tienda.novahaven.com</span>
                          <Badge className="bg-green-100 text-green-800">Activo</Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Dominios Personalizados</Label>
                      <div className="space-y-2">
                        <Input placeholder="Agregar nuevo dominio personalizado" />
                        <Button variant="outline">Agregar Dominio</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configuración Legal */}
            <TabsContent value="legal">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Documentos Legales
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Términos y Condiciones</Label>
                      <Textarea
                        placeholder="Términos y condiciones del servicio..."
                        rows={6}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label>Política de Privacidad</Label>
                      <Textarea
                        placeholder="Política de privacidad..."
                        rows={6}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label>Política de Reembolsos</Label>
                      <Textarea
                        placeholder="Política de reembolsos..."
                        rows={4}
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Configuración de Seguridad
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Forzar 2FA para Administradores</Label>
                        <p className="text-sm text-gray-500">Requerir autenticación de dos factores</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Logs de Auditoría</Label>
                        <p className="text-sm text-gray-500">Registrar todas las acciones administrativas</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Notificaciones de Seguridad</Label>
                        <p className="text-sm text-gray-500">Alertas por actividad sospechosa</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}