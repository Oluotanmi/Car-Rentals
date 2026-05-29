import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js"
import adminRoute from "./routes/adminRoute.js"
import Vehicle from "./models/vehicleModel.js";
import vehiclesData from "./controllers/userControllers/vehicles.js"

const App = express();

App.use(express.json())
App.use(cookieParser())

dotenv.config();
const port = 4000;



const allowedOrigins = [ "http://localhost:5173" ]

App.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    credentials: true // Enables the Access-Control-Allow-Credentials header
  })
);

mongoose
    .connect("mongodb://localhost:27017/Rent-a-Ride")
    .then(async () => {
        console.log("mongoDB is connected");

        await Vehicle.deleteMany({}); // ✅ empty filter = delete ALL
        console.log("🗑️ All vehicles deleted");

        await Vehicle.insertMany(vehiclesData);
        console.log("✅ Vehicles re-seeded successfully");

        App.listen(port, () => {
            console.log("Server is listening on port " + port);
        });
    })
    .catch((error) => console.error(error));
// App.use();

App.use("/api/user", userRoute);
App.use("/api/auth", authRoute);
App.use("/api/admin", adminRoute);


App.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error"
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode
  })
})




