import mongoose from "mongoose";
import Vehicle from "../../models/vehicleModel.js";
import vehicleData from "./vehicles.js";

const seed = async () => {
    try {
        await mongoose.connect("your_mongo_connection_string");
        
        await Vehicle.deleteMany(); // clear existing data
        await Vehicle.insertMany(vehicleData);
        
        console.log("✅ Vehicles seeded successfully");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
};

seed();