"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
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
import { InvestmentFormData, saveInvestment } from "./actions"
import SelectInstitutions from "./SelectInstitutions";

export default function NewPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState<InvestmentFormData>({
    initialAmount: "",
    startDate: "",
    term: "",
    rate: "",
    paymentFrequency: "monthly",
    institutionId: "",
    type: "vista",
  });

  const handleChange = (field: keyof InvestmentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveInvestment(formData);
      router.push("/app/dashboard");
    } catch (error) {
      // Optionally handle error
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-4">
      <div>
        <Label htmlFor="initialAmount" className="mb-1 block">
          Monto Inicial
        </Label>
        <Input
          id="initialAmount"
          name="initialAmount"
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
          name="startDate"
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
          name="term"
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
          name="rate"
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
          name="paymentFrequency"
          value={formData.paymentFrequency}
          onValueChange={(value) => handleChange("paymentFrequency", value)}
        >
          <SelectTrigger id="paymentFrequency" className="w-full">
            <SelectValue placeholder="Selecciona una paymentFrequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Diaria</SelectItem>
            <SelectItem value="weekly">Semanal</SelectItem>
            <SelectItem value="monthly">Mensual</SelectItem>
            <SelectItem value="anual">Anual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
  <Label htmlFor="institutionId" className="mb-1 block">
    Institución
  </Label>
  <SelectInstitutions 
    value={formData.institutionId}
    onChange={(val) => handleChange("institutionId", val)}
  />
 

  
</div>

      <div>
        <Label className="mb-2 block">Tipo de inversion</Label>
        <RadioGroup
        name="type"
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
        {loading && <Loader2Icon className="animate-spin" /> }
        {loading ? "Guardando" : "Guardar Inversion"}
      </Button>
    </form>
    
    </>
  );
}
