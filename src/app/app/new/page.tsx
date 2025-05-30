"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui";

type FormData = {
  montoInicial: string;
  fechaInicio: string;
  plazoMeses: string;
  tasaAnual: string;
  frecuencia: "diaria" | "semanal" | "mensual" | "anual";
  institucion: string;
  tipo: "vista" | "corto" | "mediano" | "largo";
};

export default function InversionForm() {
  const [formData, setFormData] = useState<FormData>({
    montoInicial: "",
    fechaInicio: "",
    plazoMeses: "",
    tasaAnual: "",
    frecuencia: "mensual",
    institucion: "",
    tipo: "vista",
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      montoInicial: Number(formData.montoInicial),
      fechaInicio: new Date(formData.fechaInicio),
      plazoMeses: Number(formData.plazoMeses),
      tasaAnual: Number(formData.tasaAnual),
      frecuencia: formData.frecuencia,
      institucion: formData.institucion,
      tipo: formData.tipo,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-4">
      <div>
        <Label htmlFor="montoInicial" className="mb-1 block">
          Monto Inicial
        </Label>
        <Input
          id="montoInicial"
          type="number"
          value={formData.montoInicial}
          onChange={(e) => handleChange("montoInicial", e.target.value)}
          placeholder="10000"
          step="0.01"
          min="0"
          required
        />
      </div>

      <div>
        <Label htmlFor="fechaInicio" className="mb-1 block">
          Fecha de Inicio
        </Label>
        <Input
          id="fechaInicio"
          type="date"
          value={formData.fechaInicio}
          onChange={(e) => handleChange("fechaInicio", e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="plazoMeses" className="mb-1 block">
          Plazo (meses)
        </Label>
        <Input
          id="plazoMeses"
          type="number"
          value={formData.plazoMeses}
          onChange={(e) => handleChange("plazoMeses", e.target.value)}
          min="1"
          required
        />
      </div>

      <div>
        <Label htmlFor="tasaAnual" className="mb-1 block">
          Tasa Anual (ej: 8 para 8%)
        </Label>
        <Input
          id="tasaAnual"
          type="number"
          value={formData.tasaAnual}
          onChange={(e) => handleChange("tasaAnual", e.target.value)}
          step="0.1"
          min="0"
          max="100"
          required
        />
      </div>

      <div>
        <Label htmlFor="frecuencia" className="mb-1 block">
          Frecuencia de pago de rendimientos
        </Label>
        <Select
          value={formData.frecuencia}
          onValueChange={(value) => handleChange("frecuencia", value)}
        >
          <SelectTrigger id="frecuencia" className="w-full">
            <SelectValue placeholder="Selecciona una frecuencia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="diaria">Diaria</SelectItem>
            <SelectItem value="semanal">Semanal</SelectItem>
            <SelectItem value="mensual">Mensual</SelectItem>
            <SelectItem value="anual">Anual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
  <Label htmlFor="institucion" className="mb-1 block">
    Institución
  </Label>
  <Select
    value={formData.institucion}
    onValueChange={(value) => handleChange("institucion", value)}
  >
    <SelectTrigger id="institucion" className="w-full">
      <SelectValue placeholder="Selecciona una institución" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="finsus">Finsus</SelectItem>
      <SelectItem value="cetes">Cetes</SelectItem>
      <SelectItem value="stori">Stori</SelectItem>
    </SelectContent>
  </Select>
</div>

      <div>
        <Label className="mb-2 block">Tipo de inversion</Label>
        <RadioGroup
          value={formData.tipo}
          onValueChange={(value) => handleChange("tipo", value)}
          aria-label="Tipo de inversión"
        >
          <div className="flex gap-4 mt-1">
            {["vista", "corto", "mediano", "largo"].map((val) => (
              <label
                key={val}
                className="flex items-center space-x-2 cursor-pointer"
                htmlFor={`tipo-${val}`}
              >
                <RadioGroupItem value={val} id={`tipo-${val}`} />
                <span>{val.charAt(0).toUpperCase() + val.slice(1)}</span>
              </label>
            ))}
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" className="w-full">
        Guardar inversión
      </Button>
    </form>
  );
}
