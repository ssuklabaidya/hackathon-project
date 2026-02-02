import dbConnect from "@/utils/db";
import Collector from "@/app/model/Collector";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { collectorId, name, lat, lng } = body;

    // 1️⃣ Validation
    if (!collectorId || !name || lat === undefined || lng === undefined) {
      return NextResponse.json(
        { success: false, message: "collectorId, name, lat, lng are required" },
        { status: 400 },
      );
    }

    // 2️⃣ Prevent duplicate collectorId
    const existingCollector = await Collector.findOne({ collectorId });
    if (existingCollector) {
      return NextResponse.json(
        { success: false, message: "Collector already exists" },
        { status: 409 },
      );
    }

    // 3️⃣ Create collector
    const collector = await Collector.create({
      collectorId,
      name,
      lat,
      lng,
    });

    return NextResponse.json({
      success: true,
      message: "Collector added successfully",
      data: collector,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
