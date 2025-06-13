import { fetchIntitutions } from "@/app/new/actions"
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await fetchIntitutions();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching institutions:", error);
    return NextResponse.json({ error: "Failed to fetch institutions" }, { status: 500 });
  }
}