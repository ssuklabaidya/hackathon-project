import mongoose from "mongoose";

const PickupRequestSchema = new mongoose.Schema({
  houseId: {
    type: String,
    required: true,
  },

  wasteTypes: {
    type: [String],
    enum: ["wet", "dry", "e-waste"],
    required: true
  },

  shift: {
    type: String,
    enum: ["morning", "evening"],
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "assigned", "completed"],
    default: "pending",
  },

  collectorId: {
    type: String,
    default: null,
  },

  segregationStatus: {
    type: String,
    enum: ["correct", "incorrect"],
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  completedAt: {
    type: Date,
    default: null,
  },
});

export default mongoose.models.PickupRequest ||
  mongoose.model("PickupRequest", PickupRequestSchema);
