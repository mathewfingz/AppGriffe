import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, LogIn } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (!success) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl border-2 border-gray-300 shadow-lg p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets%2Fba13dea2100e443594be28096ef0e240%2F32c0fc8ad84747b1ad73c52cc874a901?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Fba13dea2100e443594be28096ef0e240%2F32c0fc8ad84747b1ad73c52cc874a901?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Fba13dea2100e443594be28096ef0e240%2F32c0fc8ad84747b1ad73c52cc874a901?width=400 400w"
              className="mx-auto max-w-40 w-full object-cover object-center overflow-hidden mb-4"
              style={{ aspectRatio: '3.72' }}
              alt="Logo"
            />
            <h1 className="text-xl font-medium text-dashboard-text">Iniciar Sesión</h1>
            <p className="text-sm text-dashboard-text-muted mt-2">Accede a tu panel de control</p>
          </div>

          {/* Credenciales de ejemplo */}
          <div className="mb-6 p-3 bg-gray-50 rounded border">
            <p className="text-xs font-medium text-dashboard-text mb-2">Credenciales de prueba:</p>
            <div className="text-xs text-dashboard-text-muted space-y-1">
              <div><strong>Admin:</strong> admin@marketplace.com / admin123</div>
              <div><strong>Tienda:</strong> tienda@ejemplo.com / tienda123</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dashboard-text mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-dashboard-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dashboard-text mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-dashboard-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dashboard-text-muted"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-dashboard-danger bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-2 px-4 rounded text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}