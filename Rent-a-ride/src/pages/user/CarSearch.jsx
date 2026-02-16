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


import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";


const CarSearch = () => {

    const { 
            handleSubmit, 
            control, 
            reset, 
           formState : {errors},  } = useForm({
                // resolver: zodResolver(schema),
                defaultValues: {
                pickup_district: "",
                pickup_location: "",
                dropoff_location: "",
                pickuptime: null,
                dropofftime: null,
       },
    });

    const navigate = useNavigate();
    // const { districtData } = useSelector(( state ) => state.modelDataSlice);
    const { fetchLov, isLoading } = useFetchLocationLuv();
    // const uniqueDistrict = districtData?.filter(( cur, idx ) => {
    //     return cur !== districtData[idx + 1]
    // })
    
    const [pickup, setPickup] = useState(null);
    const [error, setError] = useState(null);

    return (
        <>
          <section id="booking-section" className="book-section relative z-10 mt-[50px]  mx-auto max-w-[1500px] bg-white">
              {/* overlay */}

                <div className="container bg-white">
                    <div className="book-content   ">
                        <div className="book-content__box ">
                            <h2>Book a car</h2>

                            <p className="error-message"> 
                              All fields required! <IconX width={20} height={20} /> 
                            </p>

                            <p className="booking-done">
                                Check your email to confirm an order. <IconX width={20} height={20} />
                            </p>

                            <form>
                              <div className="box-form">
                                    <div className="box-form__car-type">
                                        <label htmlFor="pickup_district">
                                        <IconMapPinFilled className="input-icon" /> &nbsp; Pick-up District <p className="text-red-500">*</p>
                                        </label>
                                        <Controller 
                                            name="pickup_district"
                                              control={control}
                                              render={({ field }) => (
                                                 <TextField
                                                    {...field}
                                                    id="pickup_district"
                                                    className="p-2 capitalize"
                                                    select
                                                    control={control}
                                                    error={Boolean(errors.pickup_district)}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);

                                                    }}                  
                                                 >
                                                    {/* {isLoading == true && (
                                                    <MenuItem value="">
                                                        <span className="animate-pulse">Loading</span>
                                                    </MenuItem>
                                                    )} */}
                                                    {!isLoading && <MenuItem value="">Select a Place</MenuItem>}
                                                    {/* {uniqueDistrict?.map( (cur, idx) => (
                                                        <MenuItem value={cur} key={idx}>
                                                          {cur}
                                                        </MenuItem>
                                                    ))} */}
                                                 </TextField>         
                                              )}                                    
                                        />
                                         {errors.pickup_district && <p className="text-red-500">{errors.pickup_district.message}</p>}
                                    </div>

                                    <div className="box-form__car-type ">
                                        <label htmlFor="pickup_location">
                                            <IconMapPinFilled className="input-icon" /> &nbsp; Pick-up Location <p className="text-red-500">*</p>
                                        </label>
                                        <Controller
                                            name="pickup_location"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                {...field}
                                                id="pickup_location"
                                                select
                                                // required
                                                className="md:mb-10 capitalize"
                                                placeholder={"pick up location"}
                                                >
                                                    
                                                </TextField>
                                            )}
                                        />
                                    </div>

                                    <div className="box-form__car-type">
                                        <label>
                                             <IconMapPinFilled className="input-icon" /> &nbsp; Drop-of Location <p className="text-red-500">*</p>
                                        </label>
                                        <Controller
                                            name="pickup_location"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    id="pickup_location"
                                                    select
                                                    className="md:mb-10 capitalize"
                                                    placeholder={"pick up location"}
                                                >

                                                </TextField>
                                            )}
                                        />
                                        {errors.pickup_location && <p className="text-red-500">{errors.pickup_location.message}</p>}

                                    </div>

                                    <div className="box-form__car-time">
                                        <label htmlFor="picktime" className="flex items-center">
                                             <IconCalendarEvent className="input-icon" /> &nbsp; Pick-up Date <p className="text-red-500">*</p>
                                        </label>
                                        <Controller
                                            name={"pickuptime"}
                                            control={control}
                                            render={({ field }) => (
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer components={["DateTimePicker"]}>
                                                        <DateTimePicker 
                                                            label="pickup time"
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            )}
                                        />
                                    </div>

                                    <div className="box-form__car-time">
                                        <label htmlFor="droptime" className="flex items-center">
                                             <IconCalendarEvent className="input-icon" /> &nbsp; Drop-of Date <p className="text-red-500">*</p>
                                        </label>
                                        <Controller 
                                          name={"dropoftime"}
                                          control={control}
                                          render={({ field }) => (
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={["DateTimePicker"]}> 
                                                    <DateTimePicker 
                                                       label="Dropoff time" 
                                                       {...field}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                          )}
                                        />
                                         {errors.dropofftime && <p className="text-red-500">{errors.dropofftime.message}</p>}
                                         {error && <p className="text-[8px] text-red-500">{error}</p>}
                                    </div>

                                    <button type="submit" className="book-content__box_button">
                                        Search
                                    </button>
                                    
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
