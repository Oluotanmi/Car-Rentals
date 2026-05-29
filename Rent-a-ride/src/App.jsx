import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute, { PrivateSignin } from './components/utls/PrivateRoute'
import Header from '../../Rent-a-ride/src/components/ui/Header'

import Home from './pages/user/Home'
import SignIn from './pages/user/signin'
import SignUp from './pages/user/signUp'
import Vehicles from './pages/user/Vehicles'
import AvailableVehicles from './pages/user/AvailableVehiclesAfterSearch'
import VehicleDetails from './pages/user/VehicleDetails'
import Enterprise from './pages/user/Enterprise'
import Contact from './pages/user/contact'

function App() {

  return (
    <>

     {/* <BrowserRouter> */}
     <Header />

        <Routes>
           {/* <Route>               */}
              <Route path='/' element={<Home />}/>
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/enterprise" element={<Enterprise />} />
              <Route path="/contact" element={<Contact />} />
           {/* </Route> */}

           <Route element={<PrivateRoute />} >
              {/* <Route path="/signin" element={<SignIn />}  /> */}
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
           </Route>

            {/* user private routes */}
          <Route >
             <Route path="/availableVehicles" element={<AvailableVehicles />} />
             <Route path="/vehicleDetails" element={<VehicleDetails />} />
            
          </Route>
        </Routes>
     {/* </BrowserRouter> */}
    </>
  )
}

export default App;
