import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Investment } from "@/types";
import  sql from "@/lib/db"

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(value);
};

interface InvestmentResult {
  rendimientoAcumulado: number;
  rendimientoPorPagar: number;
}



function diffInMonths(startDate: Date, endDate: Date): number {
  return (
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) -
    (endDate.getDate() < startDate.getDate() ? 1 : 0)
  );
}

function diffInDays(startDate: Date, endDate: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((endDate.getTime() - startDate.getTime()) / msPerDay);
}

function diffInYears(startDate: Date, endDate: Date): number {
  let years = endDate.getFullYear() - startDate.getFullYear();
  if (
    endDate.getMonth() < startDate.getMonth() ||
    (endDate.getMonth() === startDate.getMonth() && endDate.getDate() < startDate.getDate())
  ) {
    years--;
  }
  return years;
}

function calculateInvestmentResults(
  investments: Investment[],
  referenceDate: Date = new Date()
): InvestmentResult[] {
  return investments.map(
    ({ initialAmount, startDate, termMonths, annualRate, frequency }) => {
      let periodsPassed: number;

      switch (frequency) {
        case "monthly":
          periodsPassed = diffInMonths(startDate, referenceDate);
          break;
        case "daily":
          periodsPassed = diffInDays(startDate, referenceDate);
          break;
        case "annual":
          periodsPassed = diffInYears(startDate, referenceDate);
          break;
        default:
          throw new Error(`Frecuencia no soportada: ${frequency}`);
      }

      // Limitar periodsPassed al término máximo
      const maxPeriods =
  frequency === "daily"
    ? termMonths * 30
    : frequency === "annual"
    ? Math.floor(termMonths / 12)
    : termMonths;

if (periodsPassed > maxPeriods) periodsPassed = maxPeriods;
      if (periodsPassed < 0) periodsPassed = 0;

      const rendimientoFinal = initialAmount * annualRate * (termMonths / 12)

      let rendimientoPorPeriodo: number;

      if (frequency === "monthly") {
        rendimientoPorPeriodo = rendimientoFinal / termMonths;
      } else if (frequency === "daily") {
        const totalDays = termMonths * 30;
        rendimientoPorPeriodo = rendimientoFinal / totalDays;
      } else {
        const totalYears = termMonths / 12;
        rendimientoPorPeriodo = rendimientoFinal / totalYears;
      }

      const rendimientoAcumulado = rendimientoPorPeriodo * periodsPassed;
      const rendimientoPorPagar = rendimientoFinal - rendimientoAcumulado;

      return {
        rendimientoAcumulado,
        rendimientoPorPagar,
      };
    }
  );
}

async function fetchInvestments(): Promise<Investment[]> {
  const rows = await sql`
    SELECT
      investments.initial_amount AS "initialAmount",
      investments.start_date AS "startDate",
      investments.term AS "termMonths",
      investments.rate AS "annualRate",
      investments.payment_frequency AS "frequency",
      institutions.name AS "institution",
      investments.type
    FROM investments
    JOIN institutions ON investments.institution_id = institutions.id;
  `;

  return rows as Investment[];
}



const colors = [
  "bg-blue-100 text-blue-900",
  "bg-green-100 text-green-900",
  "bg-yellow-100 text-yellow-900",
  "bg-purple-100 text-purple-900",
  "bg-pink-100 text-pink-900",
  "bg-indigo-100 text-indigo-900",
  "bg-teal-100 text-teal-900",
  "bg-orange-100 text-orange-900",
];




export default async function Dashboard() {
  const investments = await fetchInvestments();
  const institutions = Array.from(
    new Set(investments.map((inv) => inv.institution))
  );


  const groupedByInstitution = investments.reduce<Record<string, Investment[]>>(
    (acc, inv) => {
      if (!acc[inv.institution]) acc[inv.institution] = [];
      acc[inv.institution].push(inv);
      return acc;
    },
    {}
  );

  const summaryByInstitution = Object.entries(groupedByInstitution).map(
    ([institution, invs]) => {
      const today = new Date();
      const totalInitial = invs.reduce((a, c) => a + Number(c.initialAmount), 0);
      const results = calculateInvestmentResults(invs, today);
      const totalPaid = results.reduce((total, current) => total + current.rendimientoAcumulado , 0);
      const totalPending = results.reduce((total, current) => total + current.rendimientoPorPagar , 0);
      const expectedRev = totalPaid + totalPending;
      const avgRate =
        invs.reduce((a, c) => a + c.annualRate * Number(c.initialAmount), 0) /
        totalInitial;
      return { institution, totalInitial, totalPaid, totalPending, avgRate, expectedRev };
    }
  );

  

  const totalInvested = investments.reduce((a, c) => a + Number(c.initialAmount), 0);
  const globalAvgRate =
    totalInvested > 0
      ? investments.reduce((a, c) => a + c.annualRate * Number(c.initialAmount), 0) /
        totalInvested
      : 0;
  const annualReturnExpected = summaryByInstitution.reduce((total, current) => total + current.expectedRev, 0)
  

  const typeColors: Record<string, string> = {};

  institutions.forEach((inst, index) => {
    typeColors[inst] = colors[index % colors.length];
  });

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 bg-gray-50 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Dashboard de Inversiones
      </h1>

      <Card className="border border-gray-300">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 font-semibold">
            Resumen Global
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <p>
            <strong>Monto total invertido:</strong>{" "}
            {formatCurrency(totalInvested)}
          </p>
          <p>
            <strong>Tasa promedio anual:</strong>{" "}
            {(globalAvgRate * 100).toFixed(2)}%
          </p>
          <p>
            <strong>Rendimiento diario estimado:</strong>{" "}
            {formatCurrency(annualReturnExpected / 360)}
          </p>
          <p>
            <strong>Rendimiento semanal estimado:</strong>{" "}
            {formatCurrency(annualReturnExpected / 52)}
          </p>
          <p>
            <strong>Rendimiento mensual estimado:</strong>{" "}
            {formatCurrency(annualReturnExpected / 12)}
          </p>
          <p>
            <strong>Rendimiento anual estimado:</strong>{" "}
            {formatCurrency(annualReturnExpected)}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {summaryByInstitution.map(
          ({ institution, totalInitial, totalPaid, totalPending, avgRate, expectedRev }) => (
            <Card
              key={institution}
              className={`${typeColors[institution]} border-0 shadow-md`}
            >
              <CardHeader>
                <CardTitle className="capitalize">{`${institution}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Monto invertido:</strong>{" "}
                  {formatCurrency(totalInitial)}
                </p>
                <p>
                  <strong>Rendimiento Esperado:</strong>{" "}
                  {formatCurrency(expectedRev)}
                </p>
                <p>
                  <strong>Rendimiento acumulado:</strong>{" "}
                  {formatCurrency(totalPaid)}
                </p>
                <p>
                  <strong>Rendimiento pendiente:</strong>{" "}
                  {formatCurrency(totalPending)}
                </p>
                <p>
                  <strong>Tasa promedio anual:</strong>{" "}
                  {(avgRate * 100).toFixed(2)}%
                </p>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
