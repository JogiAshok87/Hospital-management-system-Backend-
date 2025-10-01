import PDFDocument from "pdfkit";
import fs from "fs";

export const generateInvoice = (bill, patient, path) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      doc.pipe(fs.createWriteStream(path));
      doc.fontSize(20).text("Hospital Invoice", { align: "center" });
      doc.text(`Patient: ${patient.name}`);
      doc.text(`Amount: ₹${bill.amount}`);
      doc.text(`Status: ${bill.status}`);
      doc.end();
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
