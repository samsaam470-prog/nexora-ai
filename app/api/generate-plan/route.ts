import { NextResponse } from "next/server";
import { generateBusinessPlan } from "@/lib/ai/generatePlan";

export async function POST(request: Request) {
  try {
    const { idea, industryId } = await request.json();

    if (!idea) {
      return NextResponse.json(
        { error: "Business idea is required" },
        { status: 400 }
      );
    }

    if (!industryId) {
      return NextResponse.json(
        { error: "Industry is required" },
        { status: 400 }
      );
    }

    const plan = await generateBusinessPlan(idea, industryId);

    return NextResponse.json({
      plan,
    });
  } catch (error) {
    console.error("Business plan generation error:", error);

    return NextResponse.json(
      { error: "Something went wrong while generating the business plan." },
      { status: 500 }
    );
  }
}