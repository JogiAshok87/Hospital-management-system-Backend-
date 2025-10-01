import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  phone: String,
  address: String,
  assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  history: [
    {
      notes: String,
      date: { type: Date, default: Date.now },
      addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Patient", patientSchema);
