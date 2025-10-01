import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import patientRoutes from './routes/patients.js';
import billRoutes from './routes/bills.js';
import labRoutes from './routes/labs.js';
import winston from 'winston';


const app = express();
app.use(express.json());

// CORS middleware positioned before routes and other middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Handle preflight requests explicitly
app.options('*', cors());



// logger
const logger = winston.createLogger({
level: 'info',
transports: [new winston.transports.Console()],
});


// Connect DB
connectDB();


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/labs', labRoutes);


app.get('/', (req, res) => res.send('Hospital Management API running'));


// basic error handler fallback
app.use((err, req, res, next) => {
logger.error(err.stack || err.message);
res.status(500).json({ message: err.message || 'Server error' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server listening on ${PORT}`));