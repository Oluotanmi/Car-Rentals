import React, {useState} from "react"
import { UseDispatch, useDispatch } from "react-redux"
import { setModelData } from "../redux/adminSlices/adminDashboardSlice/CarModelDataSlice";
import { setCompanyData, setDistrictData, setLocationData } from "../redux/adminSlices/adminDashboardSlice/CarModelDataSlice";
import { setWholeData } from "../redux/user/selectRideSlice";

const useFetchLocationLuv = () => {
    const dispatch = useDispatch();
    const [isLoading , setIsLoading] = useState(true);

    const fetchLov = async () => {
        try {

          setIsLoading(true);
          const res = await fetch("api/admin/getVehicleModels", {
            method: "GET",
            headers: {
                "content-Type": "application/json"
            }
          });
          
          if(res.ok) {
            const data = await res.json();

            // console.log(data)
            
            //getting models from data
            const models = data.filter((cur) => cur.type === "car").map((cur) => cur.model)
            dispatch(setModelData(models));
            
            //getting districts from data
            const districts = data.filter ((cur) => cur.type === "location").map((cur) => cur.district);
            const uniqueDistricts = districts.filter((cur, idx) => {
               return districts.indexOf(cur) === idx;
            });
            dispatch(setDistrictData(uniqueDistricts));
            
            //getting locations from data
            const locations = data.filter((cur) => cur.type === "location").map((cur) => cur.location);
            dispatch(setLocationData(locations));

             //setting whole data
            const wholeData = data.filter((cur) => cur.type === "location");
            dispatch(setWholeData(wholeData));

          } else {
            return "no data found";
          }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    };

    return{ fetchLov, isLoading }
};

export default useFetchLocationLuv;