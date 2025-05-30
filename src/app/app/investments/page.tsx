// src/app/investments/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


type Inversion = {
  id: number;
  montoInicial: number;
  fechaInicio: string;
  plazoMeses: number;
  tasaAnual: number;
  frecuencia: "diaria" | "semanal" | "mensual" | "anual";
  institucion: string;
  tipo: "vista" | "corto" | "mediano" | "largo";
};

// Simula fetch lento en server component
async function getInversions(): Promise<Inversion[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 2s delay
  return [
    {
      id: 1,
      montoInicial: 10000,
      fechaInicio: "2024-05-01",
      plazoMeses: 12,
      tasaAnual: 0.08,
      frecuencia: "mensual",
      institucion: "Banco XYZ",
      tipo: "vista",
    },
    {
      id: 2,
      montoInicial: 5000,
      fechaInicio: "2023-10-15",
      plazoMeses: 24,
      tasaAnual: 0.07,
      frecuencia: "anual",
      institucion: "Banco ABC",
      tipo: "largo",
    },
  ];
}

export default async function InvestmentsPage() {
  const inversions = await getInversions();

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      {inversions.map((inv) => (
        <Card key={inv.id}>
          <CardHeader>
            <CardTitle>
              {inv.institucion} - {inv.tipo.charAt(0).toUpperCase() + inv.tipo.slice(1)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p>
              <strong>Monto Inicial:</strong> ${inv.montoInicial.toLocaleString()}
            </p>
            <p>
              <strong>Fecha Inicio:</strong> {new Date(inv.fechaInicio).toLocaleDateString()}
            </p>
            <p>
              <strong>Plazo:</strong> {inv.plazoMeses} meses
            </p>
            <p>
              <strong>Tasa Anual:</strong> {(inv.tasaAnual * 100).toFixed(2)}%
            </p>
            <p>
              <strong>Frecuencia:</strong> {inv.frecuencia}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
