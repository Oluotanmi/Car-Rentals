import express from "express"
import { getCarModelData } from "../controllers/adminControllers/masterCollectionControllers.js"
import { insertDummyData } from "../controllers/adminControllers/masterCollectionControllers.js";

const router = express.Router();

router.get('/dummyData',insertDummyData);
router.get('/getVehicleModels', getCarModelData);


export default router;