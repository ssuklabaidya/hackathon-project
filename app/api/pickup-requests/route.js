import dbConnect from "@/utils/db";
import PickupRequest from "@/app/model/PickupRequest";
import Household from "@/app/model/Household";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { houseId, wasteTypes, shift } = body;
    // Validation
    if (
      !houseId ||
      !wasteTypes ||
      !Array.isArray(wasteTypes) ||
      wasteTypes.length === 0 ||
      !shift
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "houseId, wasteTypes array, and shift are required",
        },
        { status: 400 },
      );
    }

    // Create pickup request
    const pickupRequest = await PickupRequest.create({
      houseId,
      wasteTypes,
      shift,
    });

    // 2️⃣ Check if household exists & active
    const household = await Household.findOne({ houseId, isActive: true });
    if (!household) {
      return NextResponse.json(
        { success: false, message: "Household not found or inactive" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Pickup request created successfully",
      data: pickupRequest,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
