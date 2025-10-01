import express from "express";
import { protect, admin } from "../middleware/auth.js";
import {
  getAllUsers,
  createUser,
  updateUserRole,
  deleteUser,
} from "../controllers/adminController.js";

const router = express.Router();

// All routes below require admin access
router.use(protect);
router.use(admin);

// @route   GET /api/users
// @desc    Get all users
// @access  Admin
router.get("/", getAllUsers);

// @route   POST /api/users
// @desc    Create a new user
// @access  Admin
router.post("/", createUser);

// @route   PUT /api/users/:id/role
// @desc    Update a user role
// @access  Admin
router.put("/:id/role", updateUserRole);

// @route   DELETE /api/users/:id
// @desc    Delete a user
// @access  Admin
router.delete("/:id", deleteUser);

export default router;
