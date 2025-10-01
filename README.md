# Hospital Management System - Backend

A Node.js/Express backend for a hospital management system with role-based access control.

## Features

- **User Management**: Admin can create and manage users (doctors, receptionists, lab staff)
- **Patient Management**: Receptionists can register patients, doctors can update patient records
- **Billing System**: Generate bills and manage payments
- **Lab Reports**: Upload and manage lab reports for patients
- **Authentication**: JWT-based authentication with role-based access control
- **File Upload**: Support for lab report file uploads

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **PDF Generation**: PDFKit
- **Password Hashing**: bcryptjs

## Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGO_URI=mongodb://localhost:27017/hospital-management
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## Running the Application

1. Start MongoDB (if running locally)
2. Seed the database with initial users:
   ```bash
   npm run seed
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users (Admin only)
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `PUT /api/users/:id/role` - Update user role
- `DELETE /api/users/:id` - Delete user

### Patients
- `GET /api/patients` - Get all patients (Receptionist, Admin, Doctor)
- `POST /api/patients` - Create new patient (Receptionist, Admin)
- `GET /api/patients/:id` - Get patient details
- `PUT /api/patients/:id` - Update patient (Doctor, Admin)

### Bills
- `POST /api/bills` - Create bill (Receptionist, Admin)
- `GET /api/bills/:id` - Get bill details
- `POST /api/bills/:id/pay` - Mark bill as paid

### Lab Reports
- `POST /api/labs/upload` - Upload lab report (Lab Staff, Admin)
- `GET /api/labs/patient/:patientId` - Get reports for patient

## User Roles

- **Admin**: Full access to all features
- **Doctor**: View and update patient records
- **Receptionist**: Manage patients and bills
- **Lab Staff**: Upload and view lab reports

## Default Users

After seeding, the following users are available:

- Admin: admin@hospital.com / admin123
- Doctor: doctor@hospital.com / doctor123
- Receptionist: reception@hospital.com / reception123
- Lab Staff: lab@hospital.com / lab123
