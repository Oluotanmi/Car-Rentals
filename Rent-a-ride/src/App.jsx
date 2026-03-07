import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/user/Home'
import SignIn from './redux/user/signin'
import SignUp from './redux/user/signUp'


function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
           <Route>
              <Route path='/' element={<Home />}/>
           </Route>

           <Route>
              {/* <Route path="/signin" element={<SignIn />}  /> */}
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
           </Route>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App;
