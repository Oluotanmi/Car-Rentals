import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/user/Home'


function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
           <Route>
              <Route path='/' element={<Home />}/>
           </Route>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App;
