import styles from "../../index"
import  Footer  from "../../components/utls/Footer";
import Herocar from "../../assets/homepage_car_copy.jpeg"
import { useRef } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import { HeroParallax } from "../../components/ui/Paralax";
import CarSearch from "./CarSearch";
import { setIsSweetAlert }  from "../../redux/user/userSlice"

function Home() {
   const navigate = useNavigate()
   const dispatch = useDispatch();
   
   const { isSweetAlert } = useSelector((state) => state.user);
   console.log(isSweetAlert)

    const ref = useRef(null);

   const sweetalert = () => {
      Swal.fire({
          
         show: true,
         title: "",
         text: "Vehicle Booked Successfully!",
         icon: "success",
         showDenyButton: true,
         confirmButtonText: "Go to Home",
         confirmButtonColor:"#22c55e",
         denyButtonColor:'black',
         denyButtonText: `See Orders`, 
      }).then((result) => {
        if( result.isConfirmed ) {
          navigate('/')
        }
         else if (result.isDenied) {
          navigate('/profile/orders')
        }
      })
      dispatch(setIsSweetAlert(false))
   };

    return(
      <>
        {isSweetAlert && sweetalert()}
    
        <div className="relative w-full mx-auto sm:max-w-[900px] lg:max-w-[1500px] bg-white min-h-screen overflow-hidden">
          
          <div className="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
    
          <div
            className={`relative z-10 px-5 sm:px-10 lg:px-28 py-16 md:py-24 lg:py-32 flex flex-col-reverse sm:flex-row justify-between items-center gap-10`}
          >
            
            <div className="w-full sm:w-[55%] text-center sm:text-left">
              
              <p className={`py-2 text-[10px] md:text-[12px] ${styles.paragraph}`}>
                Plan your trip
              </p>
    
              <h1
                className={`${styles.heading2} font-extrabold text-[32px] leading-tight md:text-[45px] lg:text-[58px] mb-5`}
              >
                Save <span className="text-green-600">big</span> with our <br className="hidden md:block" />
                car rental
              </h1>
    
              <p
                className={`${styles.paragraph} text-center sm:text-left text-sm md:text-base`}
              >
                Rent the car of your dreams. Unbeatable prices, unlimited miles,
                flexible pick up options and much more.
              </p>
    
              <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row gap-3 sm:items-center">
                
                <button
                  onClick={() => {
                    ref.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                  className="bg-green-500 text-black text-[13px] md:text-[16px] py-3 px-4 rounded-sm font-semibold lg:py-3 lg:px-5 w-full sm:w-auto"
                >
                  Book Ride{" "}
                  <span className="ml-2">
                    <i className="bi bi-check-circle-fill"></i>
                  </span>
                </button>
    
                <button
                  onClick={() => {
                    ref.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                  className="bg-black text-white rounded-sm text-[13px] md:text-[16px] px-4 py-3 lg:px-5 w-full sm:w-auto"
                >
                  Learn More{" "}
                  <span>
                    <i className="bi bi-chevron-right"></i>
                  </span>
                </button>
    
              </div>
            </div>
    
            <div className="w-full sm:w-[45%] flex justify-center">
              <img
                src={Herocar}
                alt="Hero car"
                className="w-full max-w-[500px] object-contain"
              />
            </div>
    
          </div>
    
          <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>
    
        <div ref={ref} className="flex justify-center px-4">
          <CarSearch />
        </div>
    
        <HeroParallax />
        <Footer />
      </>
    )
   }

export default Home;