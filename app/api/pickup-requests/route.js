import dbConnect from "@/utils/db";
import PickupRequest from "@/app/model/PickupRequest";
import Household from "@/app/model/Household";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { houseId, wasteTypes, shift } = body;

    // 1️⃣ Basic validation
    if (
      !houseId ||
      !wasteTypes ||
      !Array.isArray(wasteTypes) ||
      wasteTypes.length === 0 ||
      !shift
    ) {
      return NextResponse.json(
        { success: false, message: "houseId, wasteTypes, shift are required" },
        { status: 400 },
      );
    }

    // 2️⃣ Check household exists & active
    const household = await Household.findOne({ houseId, isActive: true });
    if (!household) {
      return NextResponse.json(
        { success: false, message: "Household not found or inactive" },
        { status: 404 },
      );
    }

    // 3️⃣ 24-HOUR RULE (IMPORTANT)
    const lastRequest = await PickupRequest.findOne({ houseId }).sort({
      createdAt: -1,
    });

    if (lastRequest) {
      const now = new Date();
      const diffHours =
        (now.getTime() - lastRequest.createdAt.getTime()) / (1000 * 60 * 60);

      if (diffHours < 24) {
        return NextResponse.json(
          {
            success: false,
            message: "Pickup request already made in last 24 hours",
          },
          { status: 429 }, // Too Many Requests
        );
      }
    }

    // 4️⃣ Create pickup request
    const pickupRequest = await PickupRequest.create({
      houseId,
      wasteTypes,
      shift,
    });

    return NextResponse.json({
      success: true,
      message: "Pickup request created successfully",
      data: pickupRequest,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
