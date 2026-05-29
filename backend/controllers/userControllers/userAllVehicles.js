import Vehicle from "../../models/vehicleModel.js"; // ✅ PascalCase
import { errorHandler } from "../../utils/error.js";
import vehicleData from "./vehicles.js";

export const listAllVehicles = async (req, res, next) => {
    try {
        const vehicles = await Vehicle.find();

        if (!vehicles || vehicles.length === 0) {
            return next(errorHandler(404, "No vehicles found"));
        }

        res.status(200).json(vehicles);

    } catch (error) {
        console.log(error, "no list of vehicles");
        next(errorHandler(500, "Something went wrong on listVehicles route"));
    }
};

//show one vehicle Detail to user
export const showVehicleDetails = async(req, res, next) => {
    try {
      if(!req.body) {
          next(errorHandler(409, "body cannot be empty"))
      }
      const { id } = req.body;
      const vehicleDetails = await Vehicle.findById(id);

      if(!vehicleDetails) {
        return next(errorHandler(404, "no vehicles found"))
      }

      res.status(200).json(vehicleDetails);

    } catch (error) {
        console.log(error);
    }
}