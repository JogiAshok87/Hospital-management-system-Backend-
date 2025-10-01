import asyncHandler from "express-async-handler";
import Patient from "../models/Patient.js";

// Create patient (reception)
export const createPatient = asyncHandler(async (req, res) => {
  const data = req.body;
  data.createdBy = req.user._id;
  const patient = await Patient.create(data);
  res.status(201).json(patient);
});

// Get patients with search, filter, pagination
export const getPatients = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10, q } = req.query;
  page = Number(page);
  limit = Number(limit);
  const filter = {};
  if (q) {
    filter.$or = [
      { name: { $regex: q, $options: "i" } },
      { phone: { $regex: q, $options: "i" } },
    ];
  }
  const total = await Patient.countDocuments(filter);
  const patients = await Patient.find(filter)
    .populate("assignedDoctor", "name email")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });
  res.json({
    data: patients,
    page,
    totalPages: Math.ceil(total / limit),
    total,
  });
});

// Get single patient and history
export const getPatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id).populate(
    "history.addedBy",
    "name"
  );
  if (!patient) return res.status(404).json({ message: "Patient not found" });
  res.json(patient);
});

// Update patient (doctor)
export const updatePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (!patient) return res.status(404).json({ message: "Patient not found" });
  // push history note if provided
  if (req.body.note) {
    patient.history.push({ notes: req.body.note, addedBy: req.user._id });
  }
  Object.assign(patient, req.body);
  await patient.save();
  res.json(patient);
});
