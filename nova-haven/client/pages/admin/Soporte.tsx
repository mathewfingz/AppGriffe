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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  MessageSquare, 
  Clock,
  User,
  Store,
  AlertCircle,
  CheckCircle,
  XCircle,
  Send,
  Paperclip,
  Bot,
  Filter
} from "lucide-react";
import { useState } from "react";

interface Ticket {
  id: string;
  subject: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "resolved" | "closed";
  store: string;
  storeName: string;
  customer: string;
  customerEmail: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  messagesCount: number;
}

interface Message {
  id: string;
  ticketId: string;
  sender: string;
  senderType: "customer" | "agent" | "system";
  content: string;
  timestamp: string;
  attachments?: string[];
}

interface Agent {
  id: string;
  name: string;
  email: string;
  activeTickets: number;
  status: "online" | "offline" | "busy";
}

export default function AdminSoporte() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [storeFilter, setStoreFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketDetailOpen, setTicketDetailOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const agents: Agent[] = [
    { id: "1", name: "Ana García", email: "ana@novahaven.com", activeTickets: 8, status: "online" },
    { id: "2", name: "Carlos López", email: "carlos@novahaven.com", activeTickets: 5, status: "online" },
    { id: "3", name: "María Rodríguez", email: "maria@novahaven.com", activeTickets: 12, status: "busy" },
    { id: "4", name: "Juan Pérez", email: "juan@novahaven.com", activeTickets: 3, status: "offline" }
  ];

  const tickets: Ticket[] = [
    {
      id: "T-001",
      subject: "Problema con pagos en Stripe",
      description: "Los pagos no se están procesando correctamente desde ayer",
      priority: "urgent",
      status: "open",
      store: "store-1",
      storeName: "TechStore Pro",
      customer: "Pedro Martínez",
      customerEmail: "pedro@techstore.com",
      assignedTo: "1",
      createdAt: "2024-01-15 09:30",
      updatedAt: "2024-01-15 14:20",
      messagesCount: 5
    },
    {
      id: "T-002",
      subject: "Error en sincronización de inventario",
      description: "El inventario no se actualiza automáticamente desde Shopify",
      priority: "high",
      status: "in_progress",
      store: "store-2",
      storeName: "Fashion Boutique",
      customer: "Laura Gómez",
      customerEmail: "laura@fashionboutique.com",
      assignedTo: "2",
      createdAt: "2024-01-15 08:15",
      updatedAt: "2024-01-15 13:45",
      messagesCount: 8
    },
    {
      id: "T-003",
      subject: "Consulta sobre comisiones",
      description: "Necesito entender cómo se calculan las comisiones mensuales",
      priority: "medium",
      status: "resolved",
      store: "store-3",
      storeName: "Home & Garden",
      customer: "Roberto Silva",
      customerEmail: "roberto@homeandgarden.com",
      assignedTo: "3",
      createdAt: "2024-01-14 16:20",
      updatedAt: "2024-01-15 10:30",
      messagesCount: 3
    },
    {
      id: "T-004",
      subject: "Problema con webhooks",
      description: "Los webhooks fallan constantemente y no recibo notificaciones",
      priority: "high",
      status: "open",
      store: "store-4",
      storeName: "Sports World",
      customer: "Andrea López",
      customerEmail: "andrea@sportsworld.com",
      createdAt: "2024-01-15 11:45",
      updatedAt: "2024-01-15 11:45",
      messagesCount: 1
    }
  ];

  const messages: Message[] = [
    {
      id: "1",
      ticketId: "T-001",
      sender: "Pedro Martínez",
      senderType: "customer",
      content: "Hola, desde ayer los pagos con tarjeta no se están procesando en mi tienda. Los clientes reportan errores al finalizar la compra.",
      timestamp: "2024-01-15 09:30"
    },
    {
      id: "2",
      ticketId: "T-001",
      sender: "Ana García",
      senderType: "agent",
      content: "Hola Pedro, gracias por contactarnos. Voy a revisar la configuración de Stripe en tu cuenta. ¿Podrías confirmarme si has hecho algún cambio reciente en la configuración?",
      timestamp: "2024-01-15 10:15"
    },
    {
      id: "3",
      ticketId: "T-001",
      sender: "Pedro Martínez",
      senderType: "customer",
      content: "No he hecho ningún cambio. Todo funcionaba perfectamente hasta ayer por la tarde.",
      timestamp: "2024-01-15 10:45"
    },
    {
      id: "4",
      ticketId: "T-001",
      sender: "Sistema",
      senderType: "system",
      content: "Se ha detectado un problema en la conexión con Stripe. El equipo técnico está trabajando en una solución.",
      timestamp: "2024-01-15 12:30"
    },
    {
      id: "5",
      ticketId: "T-001",
      sender: "Ana García",
      senderType: "agent",
      content: "Pedro, hemos identificado el problema. Era un issue temporal con la API de Stripe que ya se ha resuelto. Por favor, prueba realizar un pago de prueba y confirma si todo funciona correctamente.",
      timestamp: "2024-01-15 14:20"
    }
  ];

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { label: "Baja", className: "bg-gray-100 text-gray-800" },
      medium: { label: "Media", className: "bg-yellow-100 text-yellow-800" },
      high: { label: "Alta", className: "bg-orange-100 text-orange-800" },
      urgent: { label: "Urgente", className: "bg-red-100 text-red-800" }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      open: { label: "Abierto", className: "bg-blue-100 text-blue-800", icon: AlertCircle },
      in_progress: { label: "En Progreso", className: "bg-yellow-100 text-yellow-800", icon: Clock },
      resolved: { label: "Resuelto", className: "bg-green-100 text-green-800", icon: CheckCircle },
      closed: { label: "Cerrado", className: "bg-gray-100 text-gray-800", icon: XCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.open;
    const Icon = config.icon;
    
    return (
      <Badge className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getAgentName = (agentId?: string) => {
    if (!agentId) return "Sin asignar";
    return agents.find(a => a.id === agentId)?.name || "Desconocido";
  };

  const openTicketDetail = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setTicketDetailOpen(true);
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.storeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesStore = storeFilter === "all" || ticket.store === storeFilter;
    
    return matchesSearch && matchesPriority && matchesStatus && matchesStore;
  });

  const ticketMessages = selectedTicket ? messages.filter(m => m.ticketId === selectedTicket.id) : [];

  const aiSuggestions = [
    "Verificar configuración de Stripe",
    "Revisar logs de webhooks",
    "Escalar a equipo técnico",
    "Solicitar más información al cliente",
    "Programar llamada de seguimiento"
  ];

  return (
    <div className="flex min-h-screen bg-white">
      <LeftSidebarNav />
      
      <div className="flex-1 flex flex-col">
        <Topbar title="Soporte" />
        
        <div className="flex-1 px-4 sm:px-6 lg:px-10 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl sm:text-[32px] font-extrabold text-[#303030] leading-[19px]">
              Centro de Soporte
            </h1>
          </div>

          {/* Estadísticas de Agentes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {agents.map(agent => (
              <Card key={agent.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-gray-500">{agent.activeTickets} tickets activos</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      agent.status === 'online' ? 'bg-green-500' :
                      agent.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filtros */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar tickets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full lg:w-40">
                    <SelectValue placeholder="Prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="low">Baja</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full lg:w-40">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="open">Abierto</SelectItem>
                    <SelectItem value="in_progress">En Progreso</SelectItem>
                    <SelectItem value="resolved">Resuelto</SelectItem>
                    <SelectItem value="closed">Cerrado</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={storeFilter} onValueChange={setStoreFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Tienda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las tiendas</SelectItem>
                    <SelectItem value="store-1">TechStore Pro</SelectItem>
                    <SelectItem value="store-2">Fashion Boutique</SelectItem>
                    <SelectItem value="store-3">Home & Garden</SelectItem>
                    <SelectItem value="store-4">Sports World</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de Tickets */}
          <Card>
            <CardHeader>
              <CardTitle>Tickets de Soporte ({filteredTickets.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Asunto</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Tienda</TableHead>
                      <TableHead>Prioridad</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Asignado</TableHead>
                      <TableHead>Mensajes</TableHead>
                      <TableHead>Actualizado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id} className="cursor-pointer hover:bg-gray-50">
                        <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <p className="font-medium truncate">{ticket.subject}</p>
                            <p className="text-sm text-gray-500 truncate">{ticket.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{ticket.customer}</p>
                            <p className="text-sm text-gray-500">{ticket.customerEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Store className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{ticket.storeName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{getAgentName(ticket.assignedTo)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{ticket.messagesCount}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{ticket.updatedAt}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openTicketDetail(ticket)}
                          >
                            Ver Detalle
                          </Button>
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

      {/* Modal de Detalle del Ticket */}
      <Dialog open={ticketDetailOpen} onOpenChange={setTicketDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedTicket?.subject}</span>
              <div className="flex items-center gap-2">
                {selectedTicket && getPriorityBadge(selectedTicket.priority)}
                {selectedTicket && getStatusBadge(selectedTicket.status)}
              </div>
            </DialogTitle>
          </DialogHeader>
          
          {selectedTicket && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Info del Ticket */}
              <div className="p-4 bg-gray-50 rounded-lg mb-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">ID:</span> {selectedTicket.id}
                  </div>
                  <div>
                    <span className="font-medium">Cliente:</span> {selectedTicket.customer}
                  </div>
                  <div>
                    <span className="font-medium">Tienda:</span> {selectedTicket.storeName}
                  </div>
                  <div>
                    <span className="font-medium">Asignado:</span> {getAgentName(selectedTicket.assignedTo)}
                  </div>
                </div>
              </div>

              {/* Mensajes */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {ticketMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.senderType === 'agent' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] p-3 rounded-lg ${
                      message.senderType === 'agent' 
                        ? 'bg-blue-500 text-white' 
                        : message.senderType === 'system'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-gray-200 text-gray-800'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{message.sender}</span>
                        <span className="text-xs opacity-70">{message.timestamp}</span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sugerencias IA */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Sugerencias IA:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {aiSuggestions.map((suggestion, index) => (
                    <Button key={index} variant="outline" size="sm" className="text-xs">
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Responder */}
              <div className="border-t pt-4">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Escribe tu respuesta..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                    rows={3}
                  />
                  <div className="flex flex-col gap-2">
                    <Button size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Abierto</SelectItem>
                        <SelectItem value="in_progress">En Progreso</SelectItem>
                        <SelectItem value="resolved">Resuelto</SelectItem>
                        <SelectItem value="closed">Cerrado</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Asignar a" />
                      </SelectTrigger>
                      <SelectContent>
                        {agents.map(agent => (
                          <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Enviar Respuesta</Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}