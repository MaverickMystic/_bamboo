import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

const allowOrigins = [
  "http://localhost:5173",
  "https://bamboo-myanmar.com"
];

// 2. Fixed CORS middleware configuration to read the array dynamically
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server tools)
      if (!origin) return callback(null, true);
      
      if (allowOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS Policy'));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// Main App API Routing Gateway
app.use('/', router);

const dbURI = process.env.MONGODB_URI;
if (!dbURI) {
  console.error("ERROR: MONGODB_URI is not defined in the environment variables!");
  process.exit(1);
}

// 3. Dynamic production-grade port fallback selection
const PORT = process.env.PORT || 3000;

// Removed top-level await to prevent thread blocking issues during build processes
mongoose.connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    console.log("Connected DB name:", mongoose.connection.name);
    console.log("Connected host:", mongoose.connection.host);
    console.log("Ready state:", mongoose.connection.readyState);

    // 4. Moved listener out of the 'if' check so it accepts connections on Render/Railway
    app.listen(PORT, () => {
      console.log(`Server executing successfully on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

export default app;