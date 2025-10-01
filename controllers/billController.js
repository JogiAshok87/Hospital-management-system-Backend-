import asyncHandler from "express-async-handler";
import Bill from "../models/Bill.js";
import Patient from "../models/Patient.js";
import { generateInvoice } from "../utils/pdf.js";
import path from "path";
import fs from "fs";

// Create a new bill
export const createBill = asyncHandler(async (req, res) => {
  const { patient, items } = req.body;
  const total = items.reduce((sum, item) => sum + item.amount, 0);
  const bill = await Bill.create({
    patient,
    items,
    total,
    createdBy: req.user._id,
  });

  // Populate patient for PDF
  const populatedBill = await Bill.findById(bill._id).populate("patient");
  const patientData = populatedBill.patient;

  // Generate PDF
  const pdfPath = path.join(path.dirname(new URL(import.meta.url).pathname), `../invoices/bill_${bill._id}.pdf`);
  // Ensure directory exists
  if (!fs.existsSync(path.dirname(pdfPath))) {
    fs.mkdirSync(path.dirname(pdfPath), { recursive: true });
  }
  await generateInvoice(populatedBill, patientData, pdfPath);

  res.status(201).json(bill);
});

// Get bill by ID
export const getBillById = asyncHandler(async (req, res) => {
  const bill = await Bill.findById(req.params.id).populate("patient", "name");
  if (!bill) {
    return res.status(404).json({ message: "Bill not found" });
  }
  res.json(bill);
});

// Mark bill as paid
export const payBill = asyncHandler(async (req, res) => {
  const bill = await Bill.findById(req.params.id);
  if (!bill) {
    return res.status(404).json({ message: "Bill not found" });
  }
  bill.paid = true;
  await bill.save();
  res.json(bill);
});
