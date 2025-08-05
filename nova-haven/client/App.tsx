import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";

// Admin Dashboard Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminTiendas from "./pages/admin/Tiendas";
import AdminTiendaOverview from "./pages/admin/TiendaOverview";
import AdminPedidos from "./pages/admin/Pedidos";
import AdminFinanzas from "./pages/admin/Finanzas";
import AdminDescuentos from "./pages/admin/Descuentos";
import AdminReportes from "./pages/admin/Reportes";
import AdminUsuarios from "./pages/admin/Usuarios";
import AdminSoporte from "./pages/admin/Soporte";
import AdminConfiguracion from "./pages/admin/Configuracion";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen bg-gray-50">
    <Sidebar />
    <main className="flex-1 overflow-auto">
      {children}
    </main>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <AppLayout>
                  <Index />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <AppLayout>
                  <Index />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <AppLayout>
                  <PlaceholderPage title="Orders" />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/products" element={
              <ProtectedRoute>
                <AppLayout>
                  <PlaceholderPage title="Products" />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/customers" element={
              <ProtectedRoute>
                <AppLayout>
                  <PlaceholderPage title="Customers" />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/content" element={
              <ProtectedRoute>
                <AppLayout>
                  <PlaceholderPage title="Content" />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/finances" element={
              <ProtectedRoute>
                <AppLayout>
                  <PlaceholderPage title="Finances" />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/marketing" element={
              <ProtectedRoute>
                <AppLayout>
                  <PlaceholderPage title="Marketing" />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/discounts" element={
              <ProtectedRoute>
                <AppLayout>
                  <PlaceholderPage title="Discounts" />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <AppLayout>
                  <PlaceholderPage title="Settings" />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            {/* Admin Dashboard Routes - Protected and Admin Only */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute adminOnly>
                <AppLayout>
                  <AdminDashboard />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/tiendas" element={
              <ProtectedRoute adminOnly>
                <AppLayout>
                  <AdminTiendas />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/tiendas/:tiendaId/overview" element={
              <ProtectedRoute adminOnly>
                <AppLayout>
                  <AdminTiendaOverview />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/pedidos" element={
              <ProtectedRoute adminOnly>
                <AppLayout>
                  <AdminPedidos />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/finanzas" element={
              <ProtectedRoute adminOnly>
                <AppLayout>
                  <AdminFinanzas />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/descuentos" element={
              <ProtectedRoute adminOnly>
                <AppLayout>
                  <AdminDescuentos />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/reportes" element={
              <ProtectedRoute adminOnly>
                <AppLayout>
                  <AdminReportes />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/usuarios" element={
              <ProtectedRoute adminOnly>
                <AppLayout>
                  <AdminUsuarios />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/soporte" element={
              <ProtectedRoute adminOnly>
                <AppLayout>
                  <AdminSoporte />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/configuracion" element={
              <ProtectedRoute adminOnly>
                <AppLayout>
                  <AdminConfiguracion />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
