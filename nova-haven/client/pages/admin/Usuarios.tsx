import LeftSidebarNav from "@/components/LeftSidebarNav";
import Topbar from "@/components/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Plus, 
  Shield, 
  Key,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Settings,
  Clock,
  AlertTriangle
} from "lucide-react";
import { useState } from "react";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "suspended";
  lastLogin: string;
  twoFactorEnabled: boolean;
  createdAt: string;
}

export default function AdminUsuarios() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [permissionsModalOpen, setPermissionsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);

  const permissions: Permission[] = [
    { id: "dashboard_view", name: "Ver Dashboard", description: "Acceso al dashboard principal", category: "Dashboard" },
    { id: "stores_view", name: "Ver Tiendas", description: "Ver lista de tiendas", category: "Tiendas" },
    { id: "stores_edit", name: "Editar Tiendas", description: "Modificar configuración de tiendas", category: "Tiendas" },
    { id: "stores_delete", name: "Eliminar Tiendas", description: "Eliminar tiendas del sistema", category: "Tiendas" },
    { id: "orders_view", name: "Ver Pedidos", description: "Acceso a la gestión de pedidos", category: "Pedidos" },
    { id: "orders_edit", name: "Editar Pedidos", description: "Modificar estado de pedidos", category: "Pedidos" },
    { id: "finance_view", name: "Ver Finanzas", description: "Acceso a reportes financieros", category: "Finanzas" },
    { id: "finance_manage", name: "Gestionar Finanzas", description: "Liberar pagos y gestionar comisiones", category: "Finanzas" },
    { id: "users_view", name: "Ver Usuarios", description: "Ver lista de usuarios del sistema", category: "Usuarios" },
    { id: "users_manage", name: "Gestionar Usuarios", description: "Crear, editar y eliminar usuarios", category: "Usuarios" },
    { id: "reports_view", name: "Ver Reportes", description: "Acceso a reportes y analytics", category: "Reportes" },
    { id: "support_view", name: "Ver Soporte", description: "Acceso al sistema de tickets", category: "Soporte" },
    { id: "support_manage", name: "Gestionar Soporte", description: "Asignar y resolver tickets", category: "Soporte" },
    { id: "config_view", name: "Ver Configuración", description: "Acceso a configuración del sistema", category: "Configuración" },
    { id: "config_edit", name: "Editar Configuración", description: "Modificar configuración del sistema", category: "Configuración" }
  ];

  const roles: Role[] = [
    {
      id: "admin",
      name: "Administrador",
      description: "Acceso completo al sistema",
      permissions: permissions.map(p => p.id),
      userCount: 3
    },
    {
      id: "manager",
      name: "Gerente",
      description: "Gestión de tiendas y pedidos",
      permissions: ["dashboard_view", "stores_view", "stores_edit", "orders_view", "orders_edit", "finance_view", "reports_view"],
      userCount: 8
    },
    {
      id: "support",
      name: "Soporte",
      description: "Atención al cliente y tickets",
      permissions: ["dashboard_view", "stores_view", "orders_view", "support_view", "support_manage"],
      userCount: 12
    },
    {
      id: "analyst",
      name: "Analista",
      description: "Solo lectura y reportes",
      permissions: ["dashboard_view", "stores_view", "orders_view", "finance_view", "reports_view"],
      userCount: 5
    }
  ];

  const users: User[] = [
    {
      id: "1",
      name: "Juan Pérez",
      email: "juan@novahaven.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15 14:30",
      twoFactorEnabled: true,
      createdAt: "2023-06-15"
    },
    {
      id: "2",
      name: "María García",
      email: "maria@novahaven.com",
      role: "manager",
      status: "active",
      lastLogin: "2024-01-15 09:15",
      twoFactorEnabled: true,
      createdAt: "2023-08-20"
    },
    {
      id: "3",
      name: "Carlos López",
      email: "carlos@novahaven.com",
      role: "support",
      status: "active",
      lastLogin: "2024-01-14 16:45",
      twoFactorEnabled: false,
      createdAt: "2023-11-10"
    },
    {
      id: "4",
      name: "Ana Martínez",
      email: "ana@novahaven.com",
      role: "analyst",
      status: "inactive",
      lastLogin: "2024-01-10 11:20",
      twoFactorEnabled: true,
      createdAt: "2023-12-05"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Activo", className: "bg-green-100 text-green-800" },
      inactive: { label: "Inactivo", className: "bg-gray-100 text-gray-800" },
      suspended: { label: "Suspendido", className: "bg-red-100 text-red-800" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getRoleName = (roleId: string) => {
    return roles.find(r => r.id === roleId)?.name || roleId;
  };

  const openPermissionsModal = (role: Role) => {
    setSelectedRole(role);
    setPermissionsModalOpen(true);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="flex min-h-screen bg-white">
      <LeftSidebarNav />
      
      <div className="flex-1 flex flex-col">
        <Topbar title="Usuarios" />
        
        <div className="flex-1 px-4 sm:px-6 lg:px-10 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl sm:text-[32px] font-extrabold text-[#303030] leading-[19px]">
              Gestión de Usuarios
            </h1>
            <Dialog open={newUserModalOpen} onOpenChange={setNewUserModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Nuevo Usuario
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Usuario</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Nombre Completo</Label>
                    <Input placeholder="Ej: Juan Pérez" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="juan@novahaven.com" />
                  </div>
                  <div>
                    <Label>Rol</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar rol" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="force-2fa" />
                    <Label htmlFor="force-2fa">Forzar 2FA</Label>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1">Crear Usuario</Button>
                    <Button variant="outline" onClick={() => setNewUserModalOpen(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Gestión de Roles */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Roles y Permisos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {roles.map(role => (
                  <div key={role.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{role.name}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => openPermissionsModal(role)}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{role.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span>{role.userCount} usuarios</span>
                      <span>{role.permissions.length} permisos</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Filtros */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar usuarios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filtrar por rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los roles</SelectItem>
                    {roles.map(role => (
                      <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                    <SelectItem value="suspended">Suspendido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de Usuarios */}
          <Card>
            <CardHeader>
              <CardTitle>Usuarios del Sistema ({filteredUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>2FA</TableHead>
                      <TableHead>Último Acceso</TableHead>
                      <TableHead>Creado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800">
                            {getRoleName(user.role)}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {user.twoFactorEnabled ? (
                              <Shield className="w-4 h-4 text-green-500" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-orange-500" />
                            )}
                            <span className="text-sm">
                              {user.twoFactorEnabled ? "Habilitado" : "Deshabilitado"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{user.lastLogin}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{user.createdAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Key className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de Permisos */}
      <Dialog open={permissionsModalOpen} onOpenChange={setPermissionsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Editar Permisos - {selectedRole?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedRole && (
            <div className="space-y-6">
              {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                <div key={category}>
                  <h3 className="font-medium mb-3">{category}</h3>
                  <div className="space-y-2 pl-4">
                    {categoryPermissions.map(permission => (
                      <div key={permission.id} className="flex items-start space-x-3">
                        <Checkbox
                          id={permission.id}
                          checked={selectedRole.permissions.includes(permission.id)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={permission.id} className="font-medium">
                            {permission.name}
                          </Label>
                          <p className="text-sm text-gray-500">{permission.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Guardar Cambios</Button>
                <Button variant="outline" onClick={() => setPermissionsModalOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}