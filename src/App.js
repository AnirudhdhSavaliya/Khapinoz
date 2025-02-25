import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Component/Login';
import Register from './Component/Register';
import Home from './Pages/Home';
import ProtectedRoutes from './Services/ProtectedRoutes';
import ForgetPassword from './Component/ForgetPassword';
import Navbar from './Global/Navbar'; 
import Footer from './Global/Footer'; 
import Cart from './Pages/Cart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />

        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<><Navbar />   <Home />  <Footer /> </>} />
          <Route path="/cart/:productId" element={<><Navbar />   <Cart /></>} />
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
