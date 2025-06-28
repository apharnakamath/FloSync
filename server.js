import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path'; // Required for static file handling
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import trackRoutes from './routes/trackRoutes.js'; // Import the track routes here

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// CORS handling (allow requests from frontend on different port during development)
if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: 'http://localhost:3000', // React's development server
      credentials: true,
    })
  );
} else {
  app.use(cors()); // Enable CORS for all origins in production
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use('/api/users', userRoutes); // Connect user routes
app.use('/api/track', trackRoutes); // Connect track routes

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  // Simple message for development
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

