'use server';
import sql from "@/lib/db"

export type Institution = {
  id: number;
  name: string;
}

export type InvestmentFormData = {
  initialAmount: string;
  startDate: string;
  term: string;
  rate: string;
  paymentFrequency: "daily" | "weekly" | "monthly" | "annual";
  institutionId: string;
  type: "vista" | "corto" | "mediano" | "largo";
};

export async function fetchIntitutions(): Promise<Institution[]> {
  const rows = await sql`
    SELECT
      id, name
    FROM institutions
  `;

  return rows as Institution[];
}

export async function saveInvestment(formData: FormData) {
  try {
    const initialAmount = formData.get("initialAmount") as string;
    const startDate = formData.get("startDate") as string;
    const term = formData.get("term") as string;
    const rate = formData.get("rate") as string;
    const paymentFrequency = formData.get("paymentFrequency") as string;
    const institutionId = formData.get("institutionId") as string;
    const type = formData.get("type") as string;

    // Validate presence if needed
    if (
      !initialAmount ||
      !startDate ||
      !term ||
      !rate ||
      !paymentFrequency ||
      !institutionId ||
      !type
    ) {
      throw new Error("Missing form fields");
    }

    // Now you have strings, you can parse numbers as needed
    await sql`
      INSERT INTO investments (
        initial_amount, 
        start_date, 
        term, 
        rate, 
        payment_frequency, 
        institution_id, 
        type
      )
      VALUES (
        ${Number(initialAmount)},
        ${startDate},
        ${Number(term)},
        ${Number(rate) / 100},
        ${paymentFrequency},
        ${Number(institutionId)},
        ${type}
      )
    `;
   
  } catch (error: any) {
    console.error("Insert failed:", error);
    throw new Error("Error Inserting");
    
  }
}