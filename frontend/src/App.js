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
import Retailer from './components/retailer/Retailer';
import loginAdmin from './components/admin/Login/loginAdmin';
import BankDetails from './components/Banking/BankDetails';


function App() {
  return (
    <>
      <BrowserRouter>
        <loginAdmin />
        < div style={{ width: '100%' }}> <Navbarr /></div>
        <div className='d-flex'>
          <div >< Sidebarr /></div>

          <Routes  >
            <Route path="/" element={<Dashboard />} />
            <Route path="/user-admin" element={<User />} />
            <Route path='/newuser' element={<AddNewUser />} />
            <Route path="/roles" element={<AdminRolePage />} />
            <Route path="/role-assign" element={<RoleAssignData />} />
            <Route path="/product-category" element={<CategoryData />} />
            <Route path="/product-sub-category" element={<SubCategortData />} />
            <Route path="/offers" element={<AdminOfferData />} />
            <Route path="/retailers" element={<Retailer />} />
            <Route path='/banking' element={<BankDetails/>}/>
          </Routes>

        </div>
      </BrowserRouter>

      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={<loginAdmin />}></Route>
          <Route path='/dashboard' element={<Navbarr />} ></Route>
          <Route path='/dashboard' element={<Sidebarr />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-admin" element={<User />} />
            <Route path='/newuser' element={<AddNewUser />} />
            <Route path="/roles" element={<AdminRolePage />} />
            <Route path="/role-assign" element={<RoleAssignData />} />
            <Route path="/product-category" element={<CategoryData />} />
            <Route path="/product-sub-category" element={<SubCategortData />} />
            <Route path="/offers" element={<AdminOfferData />} />
            <Route path="/retailers" element={<Retailer />} />
          </Route>


        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;
