import { NextResponse } from "next/server";
import { generateBusinessPlan } from "@/lib/ai/generatePlan";

export async function POST(request: Request) {
  try {
    const { idea } = await request.json();

    if (!idea) {
      return NextResponse.json(
        { error: "Business idea is required" },
        { status: 400 }
      );
    }

    const plan = await generateBusinessPlan(idea);

    return NextResponse.json({
      plan,
    });

  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}