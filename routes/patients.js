import express from "express";
import { protect } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/roles.js";
import {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
} from "../controllers/patientController.js";

const router = express.Router();

// @route   POST /api/patients
// @desc    Register a new patient
// @access  reception, admin
router.post("/", protect, authorizeRoles("reception", "admin"), createPatient);

// @route   GET /api/patients
// @desc    Get all patients with pagination, search
// @access  reception, admin, doctor, lab
router.get("/", protect, authorizeRoles("reception", "admin", "doctor", "lab"), getPatients);

// @route   GET /api/patients/:id
// @desc    Get patient details by ID
// @access  reception, admin, doctor
router.get("/:id", protect, authorizeRoles("reception", "admin", "doctor"), getPatient);

// @route   PUT /api/patients/:id
// @desc    Update patient info or add treatment notes
// @access  doctor, admin
router.put("/:id", protect, authorizeRoles("doctor", "admin"), updatePatient);

export default router;
