import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import userRouter from './routes/user.route.js';
import jobRouter from './routes/job.route.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/users', userRouter);
app.use('/api/jobs', jobRouter);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/client/dist')));

    app.get('*', (req, res) => {
        console.log(`Request for ${req.originalUrl}`);
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}

// Start server and connect to DB
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    });

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
