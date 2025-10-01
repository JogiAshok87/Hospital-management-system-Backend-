import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  items: [{ description: String, amount: Number }],
  total: Number,
  paid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Bill", billSchema);
