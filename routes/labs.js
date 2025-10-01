import express from "express";
import multer from "multer";
import { protect } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/roles.js";
import {
  uploadReport,
  getReportsForPatient,
} from "../controllers/labController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// @route   POST /api/labs/upload
// @desc    Upload lab report for a patient
// @access  lab, admin
router.post(
  "/upload",
  protect,
  authorizeRoles("lab", "admin"),
  upload.single("file"),
  uploadReport
);

// @route   GET /api/labs/patient/:patientId
// @desc    Get all lab reports for a patient
// @access  lab, doctor, admin, reception
router.get(
  "/patient/:patientId",
  protect,
  authorizeRoles("lab", "doctor", "admin", "reception"),
  getReportsForPatient
);

export default router;
