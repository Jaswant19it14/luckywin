// src/app/api/credits/check/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { credits: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ credits: user.credits });
  } catch (error) {
    console.error("Database query failed:", error);
    return NextResponse.json({ error: "Database query failed" }, { status: 500 });
  }
}
