import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbarr() {
  return (
    <>
      <nav class="navbar navbar-light" style={{background: "#202c70 "}}>
        <NavLink to="/" class="navbar-brand text-white" >
          {/* <img src="./public/tpbazarlogo.jpg" width="30" height="30" class="d-inline-block align-top" alt="" /> */}
          Bazar 
        </NavLink>
      </nav>
    </>
  )
};

export default Navbarr