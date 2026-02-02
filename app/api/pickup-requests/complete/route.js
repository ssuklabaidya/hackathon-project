import dbConnect from "@/utils/db";
import PickupRequest from "@/app/model/PickupRequest";
import Household from "@/app/model/Household";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { requestId, segregationStatus } = body;

    // 1️⃣ Validation
    if (!requestId || !segregationStatus) {
      return NextResponse.json(
        {
          success: false,
          message: "requestId and segregationStatus are required",
        },
        { status: 400 },
      );
    }

    if (!["correct", "incorrect"].includes(segregationStatus)) {
      return NextResponse.json(
        { success: false, message: "Invalid segregationStatus" },
        { status: 400 },
      );
    }

    // 2️⃣ Find pickup request
    const pickupRequest = await PickupRequest.findById(requestId);

    if (!pickupRequest) {
      return NextResponse.json(
        { success: false, message: "Pickup request not found" },
        { status: 404 },
      );
    }

    // Prevent double completion
    if (pickupRequest.status === "completed") {
      return NextResponse.json(
        { success: false, message: "Pickup already completed" },
        { status: 400 },
      );
    }

    // 3️⃣ Update pickup request
    pickupRequest.status = "completed";
    pickupRequest.segregationStatus = segregationStatus;
    pickupRequest.completedAt = new Date();

    await pickupRequest.save();

    // 4️⃣ Reward logic (ONLY if correct)
    let pointsAdded = 0;

    if (segregationStatus === "correct") {
      pointsAdded = 10;

      await Household.findOneAndUpdate(
        { houseId: pickupRequest.houseId },
        { $inc: { points: pointsAdded } },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Pickup completed successfully",
      pointsAdded,
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
