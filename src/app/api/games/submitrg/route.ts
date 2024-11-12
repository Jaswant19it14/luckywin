// src/app/api/hello/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  // Respond with a message for GET requests
  return NextResponse.json({ message: "Hello! This is your first API GET request." });
}

export async function POST(req: Request) {
  // Parse the request body
  const body = await req.json();

  // Log the body to the console (for debugging)
  console.log('Received POST request with body:', body);

  // Respond with a confirmation message and the received data
  return NextResponse.json({ message: "POST request received", data: body });
}
