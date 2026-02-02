import mongoose from "mongoose";

const CollectorSchema = new mongoose.Schema({
  collectorId: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  lat: {
    type: Number,
    required: true,
  },

  lng: {
    type: Number,
    required: true,
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

export default mongoose.models.Collector ||
  mongoose.model("Collector", CollectorSchema);
