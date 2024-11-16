// import { decrypt, jwtData } from "@/hooks/jwtutility.hook";
import axios from "axios";
import prisma from "~/server/db";
// import { prisma } from "~/server/db";

export interface JwtData {
  sub: string;
  iat: number;
  exp: number;
}



export const checkCoins = (id: string) => {
  return new Promise<any>(async (resolve, reject) => {
    if (typeof window !== "undefined") {
      console.log("Request to Check Coins for user:", id);

      try {
        const data = await prisma.rg_game.findFirst({
          select:{
            count:true
          }
        })

        console.log("Data fetched from database:", data); // Log fetched data

        resolve(data?.count);
      } catch (error) {
        console.error("Error fetching data from database:", error);
        reject(error);
      }
    } else {
      console.log("Window is not available"); // Log if window is unavailable
      reject("Window not available");
    }
  });
};
