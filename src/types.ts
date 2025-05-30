export type Investment = {
  initialAmount: number;
  startDate: Date;
  termMonths: number;
  annualRate: number;
  frequency: "daily" | "weekly" | "monthly" | "annual";
  institution: string;
  type: "vista" | "corto" | "mediano" | "largo";
};