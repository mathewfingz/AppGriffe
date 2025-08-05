import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Shield, Users } from "lucide-react";

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

interface PermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role | null;
  permissions: Permission[];
  onSave: (roleId: string, permissions: string[]) => void;
}

export default function PermissionsModal({ 
  isOpen, 
  onClose, 
  role, 
  permissions, 
  onSave 
}: PermissionsModalProps) {
  if (!role) return null;

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  const handleSave = () => {
    onSave(role.id, role.permissions);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Editar Permisos - {role.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Información del Rol */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{role.name}</h3>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">{role.userCount} usuarios</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">{role.description}</p>
          </div>

          {/* Permisos por Categoría */}
          {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
            <div key={category} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg">{category}</h3>
                <Badge className="bg-blue-100 text-blue-800">
                  {categoryPermissions.filter(p => role.permissions.includes(p.id)).length} / {categoryPermissions.length}
                </Badge>
              </div>
              
              <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                {categoryPermissions.map(permission => (
                  <div key={permission.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <Checkbox
                      id={permission.id}
                      checked={role.permissions.includes(permission.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor={permission.id} className="font-medium cursor-pointer">
                        {permission.name}
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">{permission.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Acciones */}
          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={handleSave} className="flex-1">
              Guardar Cambios
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}