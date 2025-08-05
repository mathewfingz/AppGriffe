import { Search, Moon, Sun, Command } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TopbarProps {
  title: string;
  showStoreSelector?: boolean;
}

export default function Topbar({ title, showStoreSelector = false }: TopbarProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="flex items-center justify-between h-[88px] px-4 sm:px-6 lg:px-10 bg-white border-b border-[#E8E8ED]">
      {/* Title */}
      <h1 className="text-2xl sm:text-[32px] font-extrabold text-[#303030] leading-[19px]">
        {title}
      </h1>

      {/* Right side controls */}
      <div className="flex items-center gap-4">
        {/* Store Selector */}
        {showStoreSelector && (
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Seleccionar tienda" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las tiendas</SelectItem>
              <SelectItem value="store1">Tienda Demo 1</SelectItem>
              <SelectItem value="store2">Tienda Demo 2</SelectItem>
              <SelectItem value="store3">Tienda Demo 3</SelectItem>
            </SelectContent>
          </Select>
        )}

        {/* Search */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Buscar...</span>
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          
          {searchOpen && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-[#E8E8ED] rounded-lg shadow-lg p-4 z-50">
              <Input
                placeholder="Buscar tiendas, pedidos, usuarios..."
                className="w-full"
                autoFocus
              />
              <div className="mt-2 text-xs text-muted-foreground">
                Presiona ESC para cerrar
              </div>
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={toggleDarkMode}
          className="p-2"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}