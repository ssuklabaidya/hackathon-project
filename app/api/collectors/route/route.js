import dbConnect from "@/utils/db";
import PickupRequest from "@/app/model/PickupRequest";
import Household from "@/app/model/Household";
import { optimizeRoute } from "@/utils/routeOptimizer";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const shift = searchParams.get("shift");

    // 1️⃣ Fetch pending pickup requests
    const pickupRequests = await PickupRequest.find({
      status: "pending",
      ...(shift ? { shift } : {}),
    });

    if (pickupRequests.length === 0) {
      return NextResponse.json({
        success: true,
        route: [],
        message: "No pending pickups",
      });
    }

    // 2️⃣ Attach household GPS locations
    const stops = [];

    for (const p of pickupRequests) {
      const house = await Household.findOne(
        { houseId: p.houseId },
        { _id: 0, lat: 1, lng: 1 }
      );

      if (!house) continue;

      stops.push({
        pickupRequestId: p._id,
        houseId: p.houseId,
        lat: house.lat,
        lng: house.lng,
        wasteTypes: p.wasteTypes,
      });
    }

    if (stops.length === 0) {
      return NextResponse.json({
        success: true,
        route: [],
        message: "No valid household locations",
      });
    }

    // 3️⃣ Start point (ward start / first pickup)
    const startPoint = {
      lat: stops[0].lat,
      lng: stops[0].lng,
    };

    // 4️⃣ Optimize route
    const result = optimizeRoute(stops, startPoint);

    return NextResponse.json({
      success: true,
      totalStops: result.totalStops,
      totalDistanceKm: result.totalDistanceKm,
      route: result.route,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
