import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // Basic profile from OAuth provider
    name: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    image: {
      type: String, // profile picture URL
    },

    // OAuth specific fields
    provider: {
      type: String,
      enum: ["google", "github", "facebook"],
      required: true,
    },

    providerId: {
      type: String, // sub / id from OAuth provider
      required: true,
      unique: true,
    },

    // App-level role
    role: {
      type: String,
      enum: ["citizen", "collector", "admin"],
      default: "citizen",
    },

    // Account state
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Fix for Next.js hot reload
export default mongoose.models.UserModel ||
  mongoose.model("UserModel", UserSchema);
