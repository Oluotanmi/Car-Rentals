import mongoose from "mongoose";
import { availableAtDate } from "../../services/checkAvailableVehicle.js";
import { errorHandler } from "../../utils/error.js";
// import vehicle from "../../models/vehicleModel.js";
// import Booking from "../../models/BookingModel.js";


// export const BookCar = async (req, res, next) => {
//     try {
//         if(!req.body) {
//             next(errorHandler(401, "bad request on body"))
//         };

//         const {
//             user_id,
//             vehicle_id,
//             totalPrice,
//             pickupDate,
//             dropoffDate,
//             pickup_location,
//             dropoff_location,
//             pickup_district,
//             razorpayPaymentId,
//             razorpayOrderId,
//           } = req.body;

//     }catch(error) {

//     }
// }

export const getVehiclesWithoutBooking = async (req, res, next ) =>  {
   try {
    const { pickUpDistrict, pickUpLocation, pickupDate, dropOffDate, model } =
    req.body;

   if (!pickUpDistrict || !pickUpLocation)
   return next(errorHandler(409, "pickup District and location needed"));

   if (!pickupDate || !dropOffDate)
   return next(errorHandler(409, "pickupdate , dropffdate  is required"));

   if(pickupDate >= dropOffDate)
   return next(errorHandler(409, "Invalid date range"));

   console.log( pickUpDistrict, pickUpLocation, pickupDate, dropOffDate, model)
  
   const vehiclesAvailableAtDate = await availableAtDate(
    pickupDate,
    dropOffDate
   );

   console.log( " vehicle available at date ",vehiclesAvailableAtDate);

   if(!vehiclesAvailableAtDate) {
    return res.status(404).json({
        success: false,
        message: "No vehicles available for the specified time period"
    });
   }

   const availableVehicles = vehiclesAvailableAtDate.filter(
    (cur) => 
      cur.district === pickUpDistrict &&
      cur.location == pickUpLocation &&
      cur.isDeleted === "false"
   );

   if(!availableVehicles) {
    return res.status(404).json({
        success: false,
        message: "No vehicles available at this location",
    });
   }

   // If there is no next middleware after this one, send the response
   if(!req.route || !req.route.stack || req.route.stack.length === 1) {
      console.log("vehicles available");
      console.log({ success: "true", data: availableVehicles });

      return res.status(200).json({
        success: true,
        data: availableVehicles
      });
   }

    // If there is a next middleware, pass control to it
    res.locals.actionResult = [availableVehicles, model];
    next();
  } catch(error) {
    console.log(error);
    return next(
        errorHandler(500, "An error has occured while fetching vehicles.")
    )
  }
} 


export const showOneofkind = async(req, res, next) => {
  try {
    const actionResult = res.locals.actionResult

    const modelsMap = {};
    const singleVehicleofModel = [];

    if(!actionResult) {
      next(errorHandler(404, "no actionResult"));
      return;
    }

    actionResult[0].forEach((cur) => {
      if(!modelsMap[cur.model]) {
        modelsMap[cur.model] = true;
        singleVehicleofModel.push(cur)
      }
    });

    if(!singleVehicleofModel){
      next(errorHandler(404, "no vehicles available"));
      return;
    }

    res.status(200).json(singleVehicleofModel);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "error in showOneofkind"));
  }
}