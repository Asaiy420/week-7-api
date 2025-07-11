import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },
  },
  { timestmaps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
