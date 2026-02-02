import dbConnect from "@/utils/db";
import PickupRequest from "@/app/model/PickupRequest";
import Household from "@/app/model/Household";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    // 1️⃣ Fetch completed pickups
    const completedPickups = await PickupRequest.find(
      { status: "completed" },
      {
        wasteTypes: 1,
        segregationStatus: 1,
      }
    );

    // 2️⃣ Fetch household points
    const households = await Household.find(
      {},
      { _id: 0, points: 1 }
    );

    const totalCitizenPoints = households.reduce(
      (sum, h) => sum + (h.points || 0),
      0
    );

    // 3️⃣ Build summary
    const summary = {
      totalPickups: completedPickups.length,
      properPickups: 0,
      totalPoints: totalCitizenPoints,
      waste: {
        wet: { total: 0, proper: 0 },
        dry: { total: 0, proper: 0 },
        "e-waste": { total: 0, proper: 0 },
      },
    };

    completedPickups.forEach((p) => {
      const isCorrect = p.segregationStatus === "correct";
      if (isCorrect) summary.properPickups++;

      (p.wasteTypes || []).forEach((type) => {
        if (!summary.waste[type]) return;
        summary.waste[type].total++;
        if (isCorrect) summary.waste[type].proper++;
      });
    });

    return NextResponse.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
