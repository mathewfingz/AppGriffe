import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import { 
  Dashboard as AdminDashboard, 
  Tiendas, 
  TiendaOverview, 
  Pedidos, 
  Finanzas, 
  Reportes, 
  Usuarios, 
  Soporte, 
  Configuracion 
} from "./pages/admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={
              <ProtectedRoute requiredRole="store">
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/tiendas" element={
              <ProtectedRoute requiredRole="admin">
                <Tiendas />
              </ProtectedRoute>
            } />
            <Route path="/admin/tiendas/:tiendaId/overview" element={
              <ProtectedRoute requiredRole="admin">
                <TiendaOverview />
              </ProtectedRoute>
            } />
            <Route path="/admin/pedidos" element={
              <ProtectedRoute requiredRole="admin">
                <Pedidos />
              </ProtectedRoute>
            } />
            <Route path="/admin/finanzas" element={
              <ProtectedRoute requiredRole="admin">
                <Finanzas />
              </ProtectedRoute>
            } />
            <Route path="/admin/reportes" element={
              <ProtectedRoute requiredRole="admin">
                <Reportes />
              </ProtectedRoute>
            } />
            <Route path="/admin/usuarios" element={
              <ProtectedRoute requiredRole="admin">
                <Usuarios />
              </ProtectedRoute>
            } />
            <Route path="/admin/soporte" element={
              <ProtectedRoute requiredRole="admin">
                <Soporte />
              </ProtectedRoute>
            } />
            <Route path="/admin/configuracion" element={
              <ProtectedRoute requiredRole="admin">
                <Configuracion />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
