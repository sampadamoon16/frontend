import React from 'react'
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
  
  import { NavLink } from 'react-router-dom';



function Sidebarr() {
  return (
    <div style={{ display: 'flex', height: '94vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#202c70">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/dashboard" activeClassName="activeClicked">            
              <CDBSidebarMenuItem icon="clock"  >Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/user-admin" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Users</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/roles" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="ruler">Roles</CDBSidebarMenuItem>
            </NavLink>
            {/* <NavLink exact to="/role-assign" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Role Assign</CDBSidebarMenuItem>
            </NavLink> */}
            <NavLink exact to="/product-category" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="shapes">Category</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/product-sub-category"  activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="sitemap">Sub-category</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/retailers" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Retailer</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/customers" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="users">Customers</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/offers" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="percent">Offers</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/services" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="wrench">Others</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        {/* <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter> */}
      </CDBSidebar>
    </div>
  )
};

export default Sidebarr