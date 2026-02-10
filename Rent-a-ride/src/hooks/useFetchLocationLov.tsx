import React, {useState} from "react"
import { UseDispatch, useDispatch } from "react-redux"

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