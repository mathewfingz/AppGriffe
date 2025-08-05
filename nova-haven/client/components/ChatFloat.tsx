import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Minimize2,
  Maximize2,
  Sparkles
} from "lucide-react";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
  type?: "command" | "suggestion";
}

interface SlashCommand {
  command: string;
  description: string;
  example: string;
}

export default function ChatFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "¡Hola! Soy tu asistente IA de Nova Haven. Puedo ayudarte con análisis de datos, reportes, y gestión de tu dashboard. ¿En qué puedo ayudarte hoy?",
      sender: "ai",
      timestamp: "14:30"
    }
  ]);

  const slashCommands: SlashCommand[] = [
    {
      command: "/ventas",
      description: "Mostrar resumen de ventas",
      example: "/ventas últimos 30 días"
    },
    {
      command: "/tiendas",
      description: "Información sobre tiendas",
      example: "/tiendas top 5"
    },
    {
      command: "/reportes",
      description: "Generar reportes",
      example: "/reportes financiero mensual"
    },
    {
      command: "/alertas",
      description: "Ver alertas del sistema",
      example: "/alertas críticas"
    },
    {
      command: "/ayuda",
      description: "Mostrar comandos disponibles",
      example: "/ayuda"
    }
  ];

  const suggestions = [
    "¿Cuáles son las tiendas con mejor rendimiento?",
    "Mostrar alertas pendientes",
    "Generar reporte de ventas del mes",
    "¿Qué tiendas necesitan atención?"
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date().toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      type: message.startsWith('/') ? 'command' : undefined
    };

    setMessages(prev => [...prev, newMessage]);

    // Simular respuesta de IA
    setTimeout(() => {
      let aiResponse = "";
      
      if (message.startsWith('/ventas')) {
        aiResponse = "📊 **Resumen de Ventas (Últimos 30 días)**\n\n• Total: $2,450,000 COP\n• Crecimiento: +15.3%\n• Tiendas activas: 45\n• Pedidos: 1,234\n\n¿Te gustaría ver más detalles de alguna métrica específica?";
      } else if (message.startsWith('/tiendas')) {
        aiResponse = "🏪 **Top 5 Tiendas por Ventas**\n\n1. TechStore Pro - $450,000\n2. Fashion Boutique - $380,000\n3. Home & Garden - $320,000\n4. Sports World - $290,000\n5. Beauty Corner - $250,000\n\n¿Quieres analizar alguna tienda en particular?";
      } else if (message.startsWith('/alertas')) {
        aiResponse = "⚠️ **Alertas Activas**\n\n• 3 tiendas con stock crítico\n• 2 pagos pendientes de liberación\n• 1 webhook fallando\n\n¿Te ayudo a resolver alguna de estas alertas?";
      } else if (message.startsWith('/ayuda')) {
        aiResponse = "🤖 **Comandos Disponibles**\n\n" + 
          slashCommands.map(cmd => `**${cmd.command}** - ${cmd.description}\nEjemplo: \`${cmd.example}\``).join('\n\n');
      } else {
        aiResponse = "Entiendo tu consulta. Basándome en los datos actuales del dashboard, puedo ayudarte con análisis específicos. ¿Podrías ser más específico sobre qué información necesitas? También puedes usar comandos como /ventas, /tiendas, o /reportes para obtener datos rápidos.";
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setMessage("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  const formatMessage = (content: string) => {
    // Convertir markdown básico a JSX
    const parts = content.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={index} className="bg-gray-100 px-1 rounded text-sm">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-96 shadow-xl transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[600px]'
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="relative">
                <Bot className="w-5 h-5 text-blue-600" />
                <Sparkles className="w-3 h-3 text-yellow-500 absolute -top-1 -right-1" />
              </div>
              Asistente IA
              <Badge className="bg-green-100 text-green-800 text-xs">Online</Badge>
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex flex-col h-[520px]">
            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {msg.sender === 'ai' ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                      <span className="text-xs opacity-70">{msg.timestamp}</span>
                      {msg.type === 'command' && (
                        <Badge className="bg-purple-100 text-purple-800 text-xs">Comando</Badge>
                      )}
                    </div>
                    <div className="text-sm whitespace-pre-line">
                      {formatMessage(msg.content)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sugerencias */}
            {messages.length === 1 && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Sugerencias:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu mensaje o usa /comandos..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm">
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Comandos disponibles */}
            {message.startsWith('/') && (
              <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                <p className="font-medium mb-1">Comandos disponibles:</p>
                {slashCommands
                  .filter(cmd => cmd.command.includes(message))
                  .map(cmd => (
                    <div key={cmd.command} className="mb-1">
                      <span className="font-mono text-blue-600">{cmd.command}</span> - {cmd.description}
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}