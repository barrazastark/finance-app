export type Investment = {
  initialAmount: number;
  startDate: Date;
  termMonths: number;
  annualRate: number;
  frequency: string;
  institution: string;
  type: string;
};