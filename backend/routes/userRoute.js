import express from "express";
import { getVehiclesWithoutBooking, showOneofkind } from "../controllers/userControllers/userBookingController.js";
import { listAllVehicles,showVehicleDetails } from "../controllers/userControllers/userAllVehicles.js";

const router = express.Router();

router.post('/showSingleofSameModel',getVehiclesWithoutBooking,showOneofkind)
router.get('/listAllVehicles',listAllVehicles)
router.post('/showVehicleDetails',showVehicleDetails)

export default router;