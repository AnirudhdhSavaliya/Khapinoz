import React from 'react';
import {  Routes, Route } from "react-router-dom";
import Login from './Component/Login';
import Register from './Component/Register';
import Home from './Pages/Home';
import ProtectedRoutes from './Services/ProtectedRoutes';
import ForgetPassword from './Component/ForgetPassword';
import Navbar from './Global/Navbar'; 
import Footer from './Global/Footer'; 
import Cart from './Pages/Cart';
import AddToCart from './Pages/AddToCart';
import Profile from './Pages/Profile';

function App() {
  return (
   
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />

        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<><Navbar />   <Home />  <Footer /> </>} />
          <Route path="/cart/:productId" element={<><Navbar />   <Cart /><Footer /></>} />
          <Route path="/profile" element={<><Navbar />   <Profile />  <Footer /> </>} />
          <Route path="/addtocart" element={<><Navbar />   <AddToCart /><Footer /></>} />
        </Route>

      </Routes>

   
  );
}

export default App;
