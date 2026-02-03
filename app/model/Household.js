import mongoose from "mongoose";

const HouseholdSchema = new mongoose.Schema({
  houseId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  ward: {
    type: String,
    required: true,
    index: true,
  },
  points: {
    type: Number,
    default: 0,
    index: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Household ||
  mongoose.model("Household", HouseholdSchema);
