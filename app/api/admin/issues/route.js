import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Issue from "@/app/model/Issue";

export async function GET() {
  try {
    await dbConnect();

    const issues = await Issue.find({})
      .sort({ reportedAt: -1 }) // latest first
      .lean();

    return NextResponse.json({
      success: true,
      count: issues.length,
      data: issues,
    });
  } catch (error) {
    console.error("Fetch issues error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch issues",
      },
      { status: 500 },
    );
  }
}
