import dbConnect from "@/utils/db";
import Household from "@/app/model/Household";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    const houseId = searchParams.get("houseId");
    const ward = searchParams.get("ward");
    const sort = searchParams.get("sort"); // points
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    // ===============================
    // 1️⃣ houseId search (single record)
    // ===============================
    if (houseId) {
      // 🔒 Validation
      if (!/^H\d+$/i.test(houseId)) {
        return NextResponse.json(
          { success: false, message: "Invalid houseId format" },
          { status: 400 }
        );
      }

      const household = await Household.findOne(
        { houseId, isActive: true },
        { houseId: 1, points: 1, ward: 1 }
      );

      if (!household) {
        return NextResponse.json(
          { success: false, message: "Household not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: household,
      });
    }

    // ===============================
    // 2️⃣ Leaderboard + pagination
    // ===============================
    const query = { isActive: true };

    if (ward) {
      query.ward = ward;
    }

    const skip = (page - 1) * limit;

    const households = await Household.find(query)
      .sort(sort === "points" ? { points: -1 } : {}) // 🔥 leaderboard
      .skip(skip)
      .limit(limit)
      .select("houseId points ward"); // return only required data

    const total = await Household.countDocuments(query);

    return NextResponse.json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: households,
    });
  } catch (error) {
    console.error("Household API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
