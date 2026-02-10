"use client"
import React, {useRef} from "react"
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
  } from "framer-motion";
  import { useMediaQuery } from 'react-responsive';

  


export const products = [
    {
      title: "",
      link: "https://userogue.com",
      thumbnail: "https://evmwheels.com/front-theme/images/Group%20316.png",
    },
  
    {
      title: "",
      link: "https://userogue.com",
      thumbnail: "https://img.freepik.com/premium-photo/luxury-car-rental-car-sale-social-media-instagram-post-template-design_1126722-2530.jpg",
    },
    {
      title: "",
      link: "https://userogue.com",
      thumbnail: "https://evmwheels.com/front-theme/images/Group%20316.png",
    },
    {
      title: "",
      link: "https://userogue.com",
      thumbnail: "https://evmwheels.com/front-theme/images/Group%20316.png",
    },
  
    
  ];

//   const ref = useRef(null)
  
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"]
//   })

  export const HeroParallax = () => {
    return (
        <>
         <div
            // ref={ref}
            className="h-full py-40 overflow-hidden mb-[200px]  antialiased relative flex flex-col self-auto [perspective:1000px]  [transform-style:preserve-3d] "          
         >
           <Header />
           {/* <motion.div
                style={{
                    // rotateX,
                    // rotateZ,
                    // translateY,
                    // opacity,
                    scrollBehavior:'smooth',
                    transition:'ease-in-out'
                }}
                className=""
            >
               <motion.div
                   className="flex flex-row-reverse   mb-[200px] "
               >
            

               </motion.div>
            </motion.div> */}
         </div>
        </>
    )
  }

  export const Header = () => {
    return (
      <div className="flex justify-between items-center max-w-7xl relative mx-auto py-20 z-20 md:py-40 px-4 w-full bg-transparent  left-0 top-0">
          <div>
        <h1 className="text-2xl md:text-7xl font-bold dark:text-black bg-transparent">
          The Ultimate <br /> Car rental For You
        </h1>
        <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-slate-800">
          We provide beautiful products with clean and trust We are a team of
          skilled and experienced professionals who are passionate about our work.
        </p>
        </div>
       
      </div>
    );
  };