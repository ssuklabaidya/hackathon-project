import dbConnect from "@/utils/db";
import Issue from "@/app/model/Issue";
import Household from "@/app/model/Household";
import PickupRequest from "@/app/model/PickupRequest";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { issueId, adminAction, adminRemark } = body;

    // 1️⃣ Validation
    if (!issueId || !adminAction) {
      return NextResponse.json(
        { success: false, message: "issueId and adminAction are required" },
        { status: 400 },
      );
    }

    if (
      !["warning", "points_deducted", "fine", "no_action"].includes(adminAction)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid adminAction" },
        { status: 400 },
      );
    }

    // 2️⃣ Find issue
    const issue = await Issue.findById(issueId);
    if (!issue) {
      return NextResponse.json(
        { success: false, message: "Issue not found" },
        { status: 404 },
      );
    }

    // Prevent double review
    if (issue.status === "resolved") {
      return NextResponse.json(
        { success: false, message: "Issue already resolved" },
        { status: 400 },
      );
    }

    // Count previous resolved issues for same house & issue type
    const previousIssuesCount = await Issue.countDocuments({
      houseId: issue.houseId,
      issueType: issue.issueType,
      status: "resolved",
    });

    // 3️⃣ Apply penalty if required
    let penaltyResult = "none";

    if (adminAction === "points_deducted") {
      await Household.findOneAndUpdate(
        { houseId: issue.houseId },
        { $inc: { points: -10 } }, // penalty = -10 points
      );
      penaltyResult = "10 points deducted";
    }

    // (Fine is logical here, not payment gateway)
    if (adminAction === "fine") {
      penaltyResult = "Fine issued (manual collection)";
    }

    // 4️⃣ Update issue
    issue.status = "resolved";
    issue.adminAction = adminAction;
    issue.adminRemark = adminRemark || "";
    issue.resolvedAt = new Date();
    await issue.save();

    return NextResponse.json({
      success: true,
      message: "Issue reviewed and resolved",
      penaltyResult,
      data: issue,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
