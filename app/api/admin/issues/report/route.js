import dbConnect from "@/utils/db";
import Issue from "@/app/model/Issue";
import PickupRequest from "@/app/model/PickupRequest";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { pickupRequestId, collectorId, issueType, description } = body;

    // 1️⃣ Validation
    if (!pickupRequestId || !collectorId || !issueType) {
      return NextResponse.json(
        { success: false, message: "pickupRequestId, collectorId, issueType are required" },
        { status: 400 }
      );
    }

    // 2️⃣ Check pickup request exists
    const pickupRequest = await PickupRequest.findById(pickupRequestId);
    if (!pickupRequest) {
      return NextResponse.json(
        { success: false, message: "Pickup request not found" },
        { status: 404 }
      );
    }

    // Prevent reporting issue after completion
    if (pickupRequest.status === "completed") {
      return NextResponse.json(
        { success: false, message: "Pickup already completed" },
        { status: 400 }
      );
    }

    // 3️⃣ Create issue
    const issue = await Issue.create({
      pickupRequestId,
      houseId: pickupRequest.houseId,
      collectorId,
      issueType,
      description: description || ""
    });

    // 4️⃣ Update pickup request status (optional but useful)
    pickupRequest.status = "assigned"; // still assigned, but issue exists
    await pickupRequest.save();

    return NextResponse.json({
      success: true,
      message: "Issue reported successfully",
      data: issue
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
