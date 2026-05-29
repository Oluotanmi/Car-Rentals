import { IconCalendarEvent, IconMapPinFilled, IconX } from "@tabler/icons-react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import useFetchLocationLuv from "../../hooks/useFetchLocationLov";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { setAvailableCars, setLocationsOfDistrict, setSelectedDistrict } from "../../redux/user/selectRideSlice";
import { setSelectedData } from "../../redux/user/BookingDataSlice";

const schema = z.object({
    dropoff_location: z.string().min(1, {message: "Dropoff location needed"}),
    pickup_district: z.string().min(1, { message: "Pickup District needed" }),
    pickup_location: z.string().min(1, { message: "Pickup Location needed" }),
  
    pickuptime: z.object({
      $d: z.instanceof(Date).refine((date) => date !== null && date !== undefined, {
        message: "Date is not selected",
      }),
}),

dropofftime: z.object(
    {
       $L: z.string(), 
       $d: z.date(), // Date object
       $y: z.number(), // Year
       $M: z.number(), // Month (0-indexed)
       $D: z.number(), // Day of month
       $W: z.number(), // Day of week (0-indexed, starting from Sunday)
       $H: z.number(), // Hour
       $m: z.number(), // Minute
       $s: z.number(), // Second
       $ms: z.number(), // Millisecond
       $isDayjsObject: z.boolean(), // Indicator for Day.js object
    },
    { message: "drop-off time is required" }

  )
});

const CarSearch = () => {

    const { 
            handleSubmit, 
            control, 
            reset, 
           formState : {errors},  
         } = useForm({
                resolver: zodResolver(schema),
                defaultValues: {
                    pickup_district: "",
                    pickup_location: "",
                    dropoff_location: "",
                    pickuptime: null,
                    dropofftime: null,
                },
            });

    const navigate = useNavigate();
    const { districtData } = useSelector(( state ) => state.modelDataSlice);

    const { fetchLov, isLoading } = useFetchLocationLuv();
    const uniqueDistrict = districtData?.filter(( cur, idx ) => {
        return cur !== districtData[idx + 1]
    })
    
    const {selectedDistrict,wholeData, locationsOfDistrict } = useSelector((state) => state.selectRideSlice);

    // console.log(locationsOfDistrict)

    const [pickup, setPickup] = useState(null);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    //useEffect to fetch data from backend for locations   
    useEffect(() => {
       fetchLov();
    },[]);

    useEffect(() => {
        if(selectedDistrict !== null){
            // console.log(selectedDistrict)
            const showLocationInDistrict = wholeData 
               .filter((cur) => {
                  return cur.district ===  selectedDistrict
               })
                .map((cur) => cur.location)
             dispatch(setLocationsOfDistrict(showLocationInDistrict))
        }
    }, [selectedDistrict]);

    //search cars
    const handleData = async (data) => {
        try {
            if(data) {
                // console.log(data)
                //preseving the selected data for later use;
                dispatch(setSelectedData(data));

                const pickupDate = data.pickuptime.$d;
                const dropOffDate = data.dropofftime.$d;
                const datas = {
                    pickupDate,
                    dropOffDate,
                    pickUpDistrict: data.pickup_district,
                    pickUpLocation: data.pickup_location,
                };          
          
                const res = await fetch("api/user/showSingleofSameModel", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(datas),
                });
                console.log(res)

                // if(res.status === 200){
                //     // const result = await res.json()
                //     dispatch(setAvailableCars(res));
                //     // console.log(res)
                //     navigate("/availableVehicles")
                // }
                
                if(!res.ok) {
                    const data = await res.json();
                    setError(data.message);
                    return;
                }


                if (res.ok) {
                    reset({
                      pickuptime: null, // Reset pickuptime to null
                      dropofftime: null, // Reset dropofftime to null
                    });

                const pickupDistrictElement = document.getElementById("pickup_district")
                const pickupLocationElement = document.getElementById("pickup_location");
                const dropoffLocationElement = document.getElementById("dropoff_location");
      
                if (pickupDistrictElement) {
                  pickupDistrictElement.innerHTML = "";
                }
                if (pickupLocationElement) {
                  pickupLocationElement.innerHTML = "";
                }
                if (dropoffLocationElement) {
                  dropoffLocationElement.innerHTML = "";
                }

                }
               }
             } catch (error) {
                console.log("Error  : ", error);
           }
         } 

         //this is to ensure there will be 1 day gap between pickup and dropoff date
         const oneDayGap = pickup && pickup.add(1, "day");


    return (
        <>
        <section
          id="booking-section"
          className="book-section relative z-10 mt-[50px] px-4 sm:px-6 lg:px-10 mx-auto max-w-[1500px] bg-white"
        >
          <div className="container bg-white">
            <div className="book-content">
              
              <div className="book-content__box bg-white shadow-md rounded-xl p-5 sm:p-8 lg:p-10">
                
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center sm:text-left">
                  Book a car
                </h2>
      
                <p className="error-message flex items-center gap-2 text-red-500 text-sm mb-2">
                  All fields required! <IconX width={20} height={20} />
                </p>
      
                <p className="booking-done flex items-center gap-2 text-green-600 text-sm mb-4">
                  Check your email to confirm an order.
                  <IconX width={20} height={20} />
                </p>
      
                <form onSubmit={handleSubmit(handleData)}>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      
                    {/* Pickup District */}
                    <div className="w-full">
                      <label
                        htmlFor="pickup_district"
                        className="flex items-center gap-1 mb-2 font-medium text-sm"
                      >
                        <IconMapPinFilled className="input-icon" />
                        Pick-up District
                        <p className="text-red-500">*</p>
                      </label>
      
                      <Controller
                        name="pickup_district"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            id="pickup_district"
                            className="capitalize"
                            select
                            error={Boolean(errors.pickup_district)}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              dispatch(setSelectedDistrict(e.target.value));
                            }}
                          >
                            {isLoading == true && (
                              <MenuItem value="">
                                <span className="animate-pulse">Loading</span>
                              </MenuItem>
                            )}
      
                            {!isLoading && (
                              <MenuItem value="">Select a Place</MenuItem>
                            )}
      
                            {uniqueDistrict?.map((cur, idx) => (
                              <MenuItem value={cur} key={idx}>
                                {cur}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
      
                      {errors.pickup_district && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.pickup_district.message}
                        </p>
                      )}
                    </div>
      
                    {/* Pickup Location */}
                    <div className="w-full">
                      <label
                        htmlFor="pickup_location"
                        className="flex items-center gap-1 mb-2 font-medium text-sm"
                      >
                        <IconMapPinFilled className="input-icon" />
                        Pick-up Location
                        <p className="text-red-500">*</p>
                      </label>
      
                      <Controller
                        name="pickup_location"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            id="pickup_location"
                            select
                            className="capitalize"
                            placeholder={"pick up location"}
                            onChange={(e) => field.onChange(e.target.value)}
                            error={Boolean(errors.pickup_location)}
                          >
                            {isLoading && (
                              <MenuItem value="">
                                <span className="animate-pulse">Loading</span>
                                <span className="animate-pulse">...</span>
                              </MenuItem>
                            )}
      
                            {!isLoading && (
                              <MenuItem value="">
                                Select a specific location
                              </MenuItem>
                            )}
      
                            {locationsOfDistrict &&
                              locationsOfDistrict.map(
                                (availableLocation, idx) => (
                                  <MenuItem
                                    value={availableLocation}
                                    key={idx}
                                  >
                                    {availableLocation}
                                  </MenuItem>
                                )
                              )}
                          </TextField>
                        )}
                      />
      
                      {errors.pickup_location && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.pickup_location.message}
                        </p>
                      )}
                    </div>
      
                    {/* Dropoff Location */}
                    <div className="w-full">
                      <label className="flex items-center gap-1 mb-2 font-medium text-sm">
                        <IconMapPinFilled className="input-icon" />
                        Drop-of Location
                        <p className="text-red-500">*</p>
                      </label>
      
                      <Controller
                        name="dropoff_location"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            error={Boolean(errors.dropoff_location)}
                            id="dropoff_location"
                            select
                            className="capitalize"
                            placeholder={"pick up location"}
                          >
                            {isLoading && (
                              <MenuItem value="">
                                <span className="animate-pulse">Loading</span>
                                <span className="animate-pulse">...</span>
                              </MenuItem>
                            )}
      
                            {!isLoading && (
                              <MenuItem value="">
                                Select a specific location
                              </MenuItem>
                            )}
      
                            {locationsOfDistrict &&
                              locationsOfDistrict.map(
                                (availableLocations, idx) => (
                                  <MenuItem
                                    value={availableLocations}
                                    key={idx}
                                  >
                                    {availableLocations}
                                  </MenuItem>
                                )
                              )}
                          </TextField>
                        )}
                      />
      
                      {errors.dropoff_location && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.dropoff_location.message}
                        </p>
                      )}
                    </div>
      
                    {/* Pickup Date */}
                    <div className="w-full">
                      <label
                        htmlFor="picktime"
                        className="flex items-center gap-1 mb-2 font-medium text-sm"
                      >
                        <IconCalendarEvent className="input-icon" />
                        Pick-up Date
                        <p className="text-red-500">*</p>
                      </label>
      
                      <Controller
                        name={"pickuptime"}
                        control={control}
                        render={({ field }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DateTimePicker"]}>
                              <DateTimePicker
                                label="pickup time"
                                {...field}
                                value={field.value}
                                minDate={dayjs()}
                                onChange={(newValue) => {
                                  field.onChange(newValue);
                                  setPickup(newValue);
                                }}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        )}
                      />
      
                      {errors.pickuptime && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.pickuptime.message}
                        </p>
                      )}
                    </div>
      
                    {/* Dropoff Date */}
                    <div className="w-full">
                      <label
                        htmlFor="droptime"
                        className="flex items-center gap-1 mb-2 font-medium text-sm"
                      >
                        <IconCalendarEvent className="input-icon" />
                        Drop-of Date
                        <p className="text-red-500">*</p>
                      </label>
      
                      <Controller
                        name={"dropofftime"}
                        control={control}
                        render={({ field }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                              components={["DateTimePicker"]}
                            >
                              <DateTimePicker
                                label="Dropoff time"
                                {...field}
                                value={field.value ?? null}
                                onChange={(date) =>
                                  field.onChange(date)
                                }
                                minDate={pickup ? oneDayGap : dayjs()}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        )}
                      />
      
                      {errors.dropofftime && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.dropofftime.message}
                        </p>
                      )}
      
                      {error && (
                        <p className="text-[10px] text-red-500 mt-1">
                          {error}
                        </p>
                      )}
                    </div>
      
                    {/* Submit Button */}
                    <div className="w-full flex items-end">
                      <button
                        type="submit"
                        className="book-content__box_button w-full py-3 rounded-md bg-green-500 hover:bg-green-600 transition-all duration-300 text-black font-semibold"
                      >
                        Search
                      </button>
                    </div>
      
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    )
}

export default CarSearch;
