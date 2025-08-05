import { Card, CardContent } from '@griffe/ui/card'

interface AuthLoadingProps {
  message?: string
}

export function AuthLoading({ message = 'Verificando autenticación...' }: AuthLoadingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200"></div>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
          </div>
          <p className="text-sm text-gray-600 text-center">{message}</p>
        </CardContent>
      </Card>
    </div>
  )
}