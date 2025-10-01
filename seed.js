import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI ;
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
    // Check if admin exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }

    // Create initial users
    const users = [
      {
        name: 'Admin User',
        email: 'admin@hospital.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
      },
      {
        name: 'Doctor User',
        email: 'doctor@hospital.com',
        password: await bcrypt.hash('doctor123', 10),
        role: 'doctor',
      },
      {
        name: 'Receptionist User',
        email: 'reception@hospital.com',
        password: await bcrypt.hash('reception123', 10),
        role: 'reception',
      },
      {
        name: 'Lab User',
        email: 'lab@hospital.com',
        password: await bcrypt.hash('lab123', 10),
        role: 'lab',
      },
    ];

    await User.insertMany(users);
    console.log('Initial users created');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

const runSeed = async () => {
  await connectDB();
  await seedUsers();
  process.exit();
};

runSeed();
