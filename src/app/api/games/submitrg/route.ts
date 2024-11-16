import { NextResponse } from "next/server";
import { randomInt } from "crypto";
import prisma from "~/server/db";

let totalAmountRed = 0;
let totalAmountGreen = 0;
let winner = 0;
let count = 0;

export async function PUT() {
  if(count==0){
    console.log("deleting records")
    await prisma.rg_game.deleteMany({
      where:{
        count:{gte:0}
      }
    })
  }
  count += 1;


  console.log("AmountRed",totalAmountRed)
  console.log("AmountGreen",totalAmountGreen)

  if (totalAmountGreen > totalAmountRed) {
    winner = 0;
  } else if (totalAmountGreen == totalAmountRed) {
    winner = randomInt(0, 2);
  } else {
    winner = 1;
  }
  // winner=1

  const created = await prisma.rg_game.create({
    data: {
      winner: winner,
      count: count,
      amount_red: totalAmountRed,
      amount_green: totalAmountGreen,
      date_time: new Date()
    },
  });

  console.log("created", created);

  totalAmountGreen = 0;
  totalAmountRed = 0;
  console.log("resetted");

  return NextResponse.json({ winner: winner });
}

export async function POST(req: Request) {
  // Parse the request body
  const { amount, choice, id } = (await req.json()) as {
    choice: number;
    amount: number;
    id:string;
  };

  // const { amount } = body;

  if (choice == 0) {
    totalAmountRed += amount;
  } else {
    totalAmountGreen += amount;
  }
  // totalAmount += amount


  // Log the body to the console (for debugging)
  console.log("Received POST request with body:", { amount, choice });

  const user = await prisma.user.findUnique({
    where: { id },
    select: { credits: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Calculate the new credit amount
  const updatedCredits = user.credits - amount;

  // Update the user's credits in the database
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { credits: updatedCredits },
    select: { credits: true },
  });
  return NextResponse.json({
    message: "Credits updated successfully",
    credits: updatedUser.credits,
  });

  // Respond with a confirmation message and the received data
  // return NextResponse.json({
  //   message: "POST request received",
  //   data: { amount, choice },
  // });
}

export async function GET() {
  const data = await prisma.rg_game.findMany({
    select: {
      winner: true,
      count: true,
    },
    orderBy: { date_time: "desc" },
    take: 18,
  });
  // console.log(data);
  return NextResponse.json({
    data: { data },
  });
}
