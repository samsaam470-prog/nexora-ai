import { NextResponse } from "next/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_ACCESS_PASSWORD = process.env.ADMIN_ACCESS_PASSWORD;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    const accessPassword = String(body.accessPassword || "");

    if (!ADMIN_EMAIL || !ADMIN_ACCESS_PASSWORD) {
      return NextResponse.json(
        {
          error: "Admin environment variables are not configured.",
        },
        { status: 500 }
      );
    }

    if (email !== ADMIN_EMAIL.trim().toLowerCase()) {
      return NextResponse.json(
        {
          error: "Admin verification failed.",
        },
        { status: 403 }
      );
    }

    if (accessPassword !== ADMIN_ACCESS_PASSWORD) {
      return NextResponse.json(
        {
          error: "Incorrect admin access password.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Invalid request.",
      },
      { status: 400 }
    );
  }
}