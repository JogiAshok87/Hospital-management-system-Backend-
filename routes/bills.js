import express from "express";
import { protect } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/roles.js";
import {
  createBill,
  getBillById,
  payBill,
} from "../controllers/billController.js";

const router = express.Router();

// @route   POST /api/bills
// @desc    Create a new bill & generate PDF
// @access  reception, admin
router.post("/", protect, authorizeRoles("reception", "admin"), createBill);

// @route   GET /api/bills/:id
// @desc    Get bill details by ID
// @access  reception, admin, doctor
router.get("/:id", protect, authorizeRoles("reception", "admin", "doctor"), getBillById);

// @route   POST /api/bills/:id/pay
// @desc    Mark bill as paid
// @access  reception, admin
router.post("/:id/pay", protect, authorizeRoles("reception", "admin"), payBill);

export default router;
