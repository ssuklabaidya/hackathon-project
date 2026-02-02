import dbConnect from "@/utils/db";
import Household from "@/app/model/Household";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const households = await Household.find({});

    return NextResponse.json({
      success: true,
      count: households.length,
      data: households,
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
