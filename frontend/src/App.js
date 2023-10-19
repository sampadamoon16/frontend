import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import User from './components/admin/AdminUsers/User';
import Dashboard from './components/admin/dashboard/Dashboard';
import Navbarr from './components/admin/navbar/Navbarr';
import Sidebarr from './components/admin/sidebar/Sidebarr';
import AddNewUser from './components/admin/AdminUsers/addNewUser';
import AdminRolePage from './components/admin/AdminRoles/AdminRolePage';
import CategoryData from './components/admin/ProductCategory/CategoryData';
import SubCategortData from './components/admin/AdminSubCategory/SubCategortData';
import AdminOfferData from './components/admin/AdminOffer/AdminOfferData';
import RoleAssignData from './components/admin/RoleAssign/RoleAssignData';



function App() {
  return (
    <>
      <BrowserRouter>
        <Navbarr />
        <div className='d-flex'>
          <div>< Sidebarr /></div>

          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-admin" element={<User />} />
            <Route path='/newuser' element={<AddNewUser />} />
            <Route path="/roles" element={<AdminRolePage />} />
            <Route path="/role-assign" element={<RoleAssignData />} />
            <Route path="/product-category" element={<CategoryData />} />
            <Route path="/product-sub-category" element={<SubCategortData />} />
            <Route path="/offers" element={<AdminOfferData />} />

          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
