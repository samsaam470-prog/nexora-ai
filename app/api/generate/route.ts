import { NextResponse } from "next/server";
import { generateBusinessPlan } from "@/lib/framework/planGenerator";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { idea } = body;

    if (!idea) {
      return NextResponse.json(
        {
          error: "Business idea is required"
        },
        { status: 400 }
      );
    }

    const plan = generateBusinessPlan(idea);

    return NextResponse.json({
      success: true,
      plan
    });

  } catch (error) {

    return NextResponse.json(
      {
        error: "Something went wrong"
      },
      { status: 500 }
    );

  }
}