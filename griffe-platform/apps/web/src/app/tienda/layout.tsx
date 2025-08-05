import { TiendaSidebar } from '@/components/tienda/tienda-sidebar'

export default function TiendaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <TiendaSidebar />
      <main className="flex-1 lg:ml-0 ml-0">
        <div className="p-4 lg:p-6 pt-16 lg:pt-6">
          {children}
        </div>
      </main>
    </div>
  )
}