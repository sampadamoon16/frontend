import React from 'react'
import { NavLink , } from 'react-router-dom'
import logo from '../../../pic/logo55.jpeg'

function Navbarr() {
  return (
    <>
      <nav class="navbar navbar-light  "  style={{background: "#202c70 " , width: "100%"}}>
        <NavLink to="/dashboard" class="navbar-brand text-white " >
          <img src={logo} width="110" height="25" class="d-inline-block align-top rounded-4 ms-4" alt="" className='ms-5 rounded-4'/>
          
        </NavLink>
      </nav>
    </>
  )
};

export default Navbarr