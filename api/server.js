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

const __dirname = path.resolve();


// API routes
app.use('/api/users', userRouter);
app.use('/api/jobs', jobRouter);



// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/dist')));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
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

// Error-handling middleware should be placed after routes
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the stack trace for debugging
    res.status(500).send('Something broke!'); // Send a generic error response
});
