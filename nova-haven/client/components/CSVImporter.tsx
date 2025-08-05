import { useState } from "react";
import { Upload, Download, Check, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface CSVImporterProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onImport?: (data: any[]) => void;
  onExport?: () => void;
  sampleData?: any[];
}

type Step = "upload" | "map" | "validate" | "confirm";

export default function CSVImporter({
  isOpen,
  onClose,
  title,
  onImport,
  onExport,
  sampleData = []
}: CSVImporterProps) {
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const nextStep = () => {
    const steps: Step[] = ['upload', 'map', 'validate', 'confirm'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const steps = [
    { key: "upload", label: "Subir", icon: Upload },
    { key: "map", label: "Mapear", icon: FileText },
    { key: "validate", label: "Validar", icon: Check },
    { key: "confirm", label: "Confirmar", icon: Check }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setCurrentStep("map");
    }
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
    }
    onClose();
  };

  const getStepIndex = (step: Step) => steps.findIndex(s => s.key === step);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {/* Export Option */}
        <div className="mb-6">
          <Button
            onClick={handleExport}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </Button>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.key === currentStep;
            const isCompleted = getStepIndex(step.key) < getStepIndex(currentStep);
            
            return (
              <div key={step.key} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    isActive
                      ? "border-blue-500 bg-blue-500 text-white"
                      : isCompleted
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`ml-2 text-sm ${isActive ? "font-medium" : ""}`}>
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-8 h-px bg-gray-300 mx-4" />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <Progress value={(getStepIndex(currentStep) + 1) * 25} className="mb-6" />

        {/* Step Content */}
        <div className="min-h-[200px]">
          {currentStep === "upload" && (
            <div className="text-center">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Subir archivo CSV</p>
                <p className="text-gray-500 mb-4">
                  Arrastra y suelta tu archivo aquí o haz clic para seleccionar
                </p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="csv-upload"
                />
                <label htmlFor="csv-upload">
                  <Button variant="outline" className="cursor-pointer">
                    Seleccionar archivo
                  </Button>
                </label>
              </div>
            </div>
          )}

          {currentStep === "map" && (
            <div>
              <h3 className="text-lg font-medium mb-4">Mapear columnas</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-700">
                  <div>Columna CSV</div>
                  <div>Campo del sistema</div>
                </div>
                {["Nombre", "Email", "Teléfono", "Dirección"].map((field, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4">
                    <div className="p-2 border rounded">{field}</div>
                    <select className="p-2 border rounded">
                      <option>Seleccionar campo...</option>
                      <option value={field.toLowerCase()}>{field}</option>
                    </select>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={() => setCurrentStep("validate")}>
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {currentStep === "validate" && (
            <div>
              <h3 className="text-lg font-medium mb-4">Validar datos</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="w-4 h-4" />
                  <span>150 registros válidos</span>
                </div>
                <div className="flex items-center gap-2 text-red-600">
                  <X className="w-4 h-4" />
                  <span>5 registros con errores</span>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={() => setCurrentStep("confirm")}>
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {currentStep === "confirm" && (
            <div>
              <h3 className="text-lg font-medium mb-4">Confirmar importación</h3>
              <p className="text-gray-600 mb-4">
                Se importarán 150 registros. Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button onClick={() => {
                  if (onImport) onImport([]);
                  onClose();
                }}>
                  Confirmar importación
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}