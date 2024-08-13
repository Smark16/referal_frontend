import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Login from './Components/login'
import PrivateRoute from './Components/PrivateRoute'
import { AuthContext } from './Context/AuthContext'
import Pages from './Components/pages'
import Logout from './Components/logout'
import BasicInfo from './formpages/background'
import BussinessInfo from './formpages/bussiness'
import Services from './formpages/services'
import Complete from './formpages/complete'


function Show() {
    const { display } = useContext(AuthContext)
    
    return (
        <>
        <Routes>

        <Route path='/complete' element={<Complete/>}/>
        </Routes>
      <Navbar/>

      <Routes>
        {/* public routes */}
        <Route path='/' element={<Login/>}></Route>
       
        {/* private Routes */}
        <Route path='/application/*'
          element={
            <PrivateRoute>
              <div className="sidebar">
                <div className={`sides ${display ? 'show' : ''}`}>
                  <Pages/>
                </div>
                <div className="routes">
                  <Routes>
                    <Route path='background_infomation' element={<BasicInfo/>}/>
                    <Route path="bussiness_information" element={<BussinessInfo/>}/>
                    <Route path='services' element={<Services/>}/>
                   <Route path='logout' element={<Logout/>}/>
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

export default Show
