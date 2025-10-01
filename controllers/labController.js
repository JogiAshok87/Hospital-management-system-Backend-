import asyncHandler from "express-async-handler";
import LabReport from "../models/LabReport.js";
import { uploadFile } from "../utils/s3.js";

// Upload lab report
export const uploadReport = asyncHandler(async (req, res) => {
  const { patientId, testName, result } = req.body;
  const file = req.file;

  // TODO: Upload to S3
  let url = '';
  let s3Key = '';
  if (file) {
    // url = await uploadFile(file);
    url = `https://s3-bucket-url/lab-reports/${Date.now()}-${file.originalname}`;
    s3Key = `lab-reports/${Date.now()}-${file.originalname}`;
  }

  const report = await LabReport.create({
    patient: patientId,
    testName,
    result,
    filename: file ? file.originalname : '',
    s3Key,
    url,
    uploadedBy: req.user._id,
  });

  res.status(201).json(report);
});

// Get reports for a patient
export const getReportsForPatient = asyncHandler(async (req, res) => {
  const reports = await LabReport.find({ patient: req.params.patientId })
    .populate("uploadedBy", "name")
    .sort({ createdAt: -1 });
  res.json(reports);
});
