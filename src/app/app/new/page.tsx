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
  initialAmount: string;
  startDate: string;
  term: string;
  rate: string;
  paymentFrequency: "diaria" | "semanal" | "mensual" | "anual";
  institution: string;
  type: "vista" | "corto" | "mediano" | "largo";
};

export default function InversionForm() {
  const [formData, setFormData] = useState<FormData>({
    initialAmount: "",
    startDate: "",
    term: "",
    rate: "",
    paymentFrequency: "mensual",
    institution: "",
    type: "vista",
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      initialAmount: Number(formData.initialAmount),
      startDate: new Date(formData.startDate),
      term: Number(formData.term),
      rate: Number(formData.rate),
      paymentFrequency: formData.paymentFrequency,
      institution: formData.institution,
      type: formData.type,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-4">
      <div>
        <Label htmlFor="initialAmount" className="mb-1 block">
          Monto Inicial
        </Label>
        <Input
          id="initialAmount"
          type="number"
          value={formData.initialAmount}
          onChange={(e) => handleChange("initialAmount", e.target.value)}
          placeholder="10000"
          step="0.01"
          min="0"
          required
        />
      </div>

      <div>
        <Label htmlFor="startDate" className="mb-1 block">
          Fecha de Inicio
        </Label>
        <Input
          id="startDate"
          type="date"
          value={formData.startDate}
          onChange={(e) => handleChange("startDate", e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="term" className="mb-1 block">
          Plazo (meses)
        </Label>
        <Input
          id="term"
          type="number"
          value={formData.term}
          onChange={(e) => handleChange("term", e.target.value)}
          min="1"
          required
        />
      </div>

      <div>
        <Label htmlFor="rate" className="mb-1 block">
          Tasa Anual (ej: 8 para 8%)
        </Label>
        <Input
          id="rate"
          type="number"
          value={formData.rate}
          onChange={(e) => handleChange("rate", e.target.value)}
          step="0.1"
          min="0"
          max="100"
          required
        />
      </div>

      <div>
        <Label htmlFor="paymentFrequency" className="mb-1 block">
          Frecuencia de pago de rendimientos
        </Label>
        <Select
          value={formData.paymentFrequency}
          onValueChange={(value) => handleChange("paymentFrequency", value)}
        >
          <SelectTrigger id="paymentFrequency" className="w-full">
            <SelectValue placeholder="Selecciona una paymentFrequency" />
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
  <Label htmlFor="institution" className="mb-1 block">
    Institución
  </Label>
  <Select
    value={formData.institution}
    onValueChange={(value) => handleChange("institution", value)}
  >
    <SelectTrigger id="institution" className="w-full">
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
          value={formData.type}
          onValueChange={(value) => handleChange("type", value)}
          aria-label="Tipo de inversión"
        >
          <div className="flex gap-4 mt-1">
            {["vista", "corto", "mediano", "largo"].map((val) => (
              <label
                key={val}
                className="flex items-center space-x-2 cursor-pointer"
                htmlFor={`type-${val}`}
              >
                <RadioGroupItem value={val} id={`type-${val}`} />
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
