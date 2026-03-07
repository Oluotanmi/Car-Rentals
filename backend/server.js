import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js"

const App = express();

App.use(express.json())
App.use(cookieParser())

dotenv.config();
const port = 4000;

mongoose
    .connect("mongodb://localhost:27017/Rent-a-Ride")
    .then(console.log("mongoDB is connected"))
    .catch((error) => console.error(error))
  
 App.listen( port, () => {
  console.log("server is listening on port  " + port);
    
});

const allowedOrigins = [ "" ]

App.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    credentials: true // Enables the Access-Control-Allow-Credentials header
  })
);

// App.use();

App.use("/api/user", userRoute);
App.use("/api/auth", authRoute);

App.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error"
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode
  })
})




