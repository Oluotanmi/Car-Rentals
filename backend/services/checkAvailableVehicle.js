import Vehicle from "../models/vehicleModel.js";
import Booking from "../models/BookingModel.js";

export async function availableAtDate(pickupDate, dropOffDate) {
    try {
      // const { vehicleId } = req.body;

        const existingBookings = await Booking.find({
            $or: [
                { pickupDate: { $lt: dropOffDate }, dropOffDate: {$gt: pickupDate} },
                { pickupDate: { $gte: pickupDate, $lt: dropOffDate } }, // Start within range
                { dropOffDate: { $gt: pickupDate, $lte: dropOffDate } }, // End within range
                {
                  pickupDate: { $lte: pickupDate },
                  dropOffDate: { $gte: dropOffDate },
                }, // Booking includes the entire time range
          ],
          // vehicleId:  vehicleId,
          // status: {$nin: ["canceled", "norBooked"]},
      
        });

        if (existingBookings.length > 0) {
          return res.status(400).json({ message: "Vehicle already booked for this period" });
        }

        console.log("existing bookings, ", existingBookings)

        const vehicleIds = existingBookings.map((booking) => booking.vehicleId);
        console.log("vehicleIds , ", vehicleIds,)

        const uniqueVehicleIds = [...new Set(vehicleIds)];
        
        // Find vehicles with status "tripCompleted" during the specified date range
        const vehiclesWithCompletedTrips = await Booking.find(
          {
            $or: [
              {status: "tripCompleted"},
              { status: "canceled" },
              { status: "notBooked" },
            ],
            pickupDate: { $lt: dropOffDate },
            dropOffDate: { $gt: pickupDate },
          },
          { vehicleId: 1 }
        );

        const vehicleIdsWithCompletedTrips = vehiclesWithCompletedTrips.map(
          (booking) => booking.vehicleId
        );

        const vehiclesWithoutBookings = await Vehicle.find({
          $or: [
            { _id: { $nin: uniqueVehicleIds } }, // Vehicles without bookings
            { _id: { $in: vehicleIdsWithCompletedTrips } }, // Vehicles with completed trips
          ],
        });
          
    return vehiclesWithoutBookings || [];


      } catch (error) {
        console.error(error);
       throw error
;    }
}