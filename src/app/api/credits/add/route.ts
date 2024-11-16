import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Parse the request body to get `id` and `amount`
    const { amount, id } = await req.json() as { id: string; amount: number };

    // Log received data (for debugging)
    console.log("Received POST request with body:", { amount, id });

    // Validate input
    if (!id || typeof amount !== "number") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Retrieve the user by ID and update credits
    const user = await prisma.user.findUnique({
      where: { id },
      select: { credits: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate the new credit amount
    const updatedCredits = user.credits + amount;

    // Update the user's credits in the database
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { credits: updatedCredits },
      select: { credits: true },
    });

    // Respond with the updated credits
    return NextResponse.json({
      message: "Credits updated successfully",
      credits: updatedUser.credits,
    });

  } catch (error) {
    console.error("Error updating credits:", error);
    return NextResponse.json({ error: "Error updating credits" }, { status: 500 });
  }
}
