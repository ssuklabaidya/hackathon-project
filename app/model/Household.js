import mongoose from "mongoose";

const HouseholdSchema = new mongoose.Schema({
  houseId: {
    type: String,
    required: true,
    unique: true,
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
  },
  points: {
    type: Number,
    default: 0,
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
