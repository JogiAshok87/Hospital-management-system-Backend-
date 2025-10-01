import mongoose from "mongoose";

const labReportSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  testName: { type: String, required: true },
  result: { type: String, required: true },
  filename: String,
  s3Key: String,
  url: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("LabReport", labReportSchema);
