import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import mongoose from 'mongoose'
import router from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';

import cors from 'cors'
const app=express();
const allowOrigins=[
  "http://localhost:5173",
  "https://bamboo-myanmar.com"
]
//update to env
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)
const PORT=3000;

app.use(cookieParser())
app.use(express.json());

app.use('/',router);

const dbURI=process.env.MONGODB_URI;
if (!dbURI) {
  console.error(" ERROR: MONGODB_URI is not defined in the environment variables!");
  process.exit(1);
}
 await mongoose.connect(dbURI).then(()=>{
    console.log("connected to mongodb");

console.log("Connected DB name:", mongoose.connection.name);
console.log("Connected host:", mongoose.connection.host);
console.log("Ready state:", mongoose.connection.readyState);
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Local dev server running on port ${PORT}`);
  });
}
}).catch((err) => console.error('MongoDB connection error:', err));
export default app;