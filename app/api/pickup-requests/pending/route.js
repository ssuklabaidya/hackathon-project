import dbConnect from "@/utils/db";
import PickupRequest from "@/app/model/PickupRequest";
import Household from "@/app/model/Household";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const shift = searchParams.get("shift");

    // 1️⃣ Build query dynamically
    const query = { status: "pending" };

    if (shift) {
      query.shift = shift; // only filter if shift is provided
    }

    // 2️⃣ Fetch pending pickup requests
    const requests = await PickupRequest.find(query);

    // 3️⃣ Attach household location
    const enrichedRequests = [];

    for (const request of requests) {
      const house = await Household.findOne({ houseId: request.houseId });

      if (!house) continue;

      enrichedRequests.push({
        requestId: request._id,
        houseId: request.houseId,
        wasteTypes: request.wasteTypes,
        shift: request.shift,
        lat: house.lat,
        lng: house.lng,
      });
    }

    return NextResponse.json({
      success: true,
      count: enrichedRequests.length,
      data: enrichedRequests,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
