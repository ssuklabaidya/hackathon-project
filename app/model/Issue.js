import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema({
  pickupRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "PickupRequest",
  },

  houseId: {
    type: String,
    required: true,
  },

  collectorId: {
    type: String,
    required: true,
  },

  issueType: {
    type: String,
    enum: [
      "EMPTY_BIN",
      "WASTE_NOT_AVAILABLE",
      "HOUSE_CLOSED",
      "WRONG_WASTE_TYPE",
      "COLLECTOR_MISCONDUCT",
    ],
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  status: {
    type: String,
    enum: ["reported", "reviewed", "resolved"],
    default: "reported",
  },

  adminAction: {
    type: String,
    enum: ["warning", "points_deducted", "fine", "no_action"],
    default: null,
  },

  adminRemark: {
    type: String,
    default: "",
  },

  reportedAt: {
    type: Date,
    default: Date.now,
  },

  resolvedAt: {
    type: Date,
    default: null,
  },
});

export default mongoose.models.Issue || mongoose.model("Issue", IssueSchema);
