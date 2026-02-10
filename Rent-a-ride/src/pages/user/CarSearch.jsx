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
        formState : {errors}, 
       } = useForm({
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
                                                    )}
                                                    {!isLoading && <MenuItem value="">Select a Place</MenuItem>}
                                                    {uniqueDistrict?.map( (cur, idx) => (
                                                        <MenuItem value={cur} key={idx}>
                                                          {cur}
                                                        </MenuItem>
                                                    ))} */}
                                                 </TextField>         
                                              )}                                    
                                        />
                                         {errors.pickup_district && <p className="text-red-500">{errors.pickup_district.message}</p>}
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
