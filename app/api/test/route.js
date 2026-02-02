import dbConnect from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({
      success: true,
      message: "Database connection successful"
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}
