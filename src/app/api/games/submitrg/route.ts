// src/app/api/hello/route.ts

import { NextResponse } from 'next/server';

let totalAmount = 0;

export async function GET() {
  // Respond with a message for GET requests
  return NextResponse.json({ message: "Hello! This is your first API GET request." });
}

export async function POST(req: Request) {
  // Parse the request body
  const body = await req.json() as { "choice": number, "amount": number } ;

  const { amount } = body;

  totalAmount += amount

  console.log("totalAmount",totalAmount)

  // Log the body to the console (for debugging)
  console.log('Received POST request with body:', body);

  // Respond with a confirmation message and the received data
  return NextResponse.json({ message: "POST request received", data: body });
}
