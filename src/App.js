import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import ProtectedRoutes from './Services/ProtectedRoutes';
import Navbar from './Global/Navbar';
import Footer from './Global/Footer';
import Cart from './Pages/Cart';
import AddToCart from './Pages/AddToCart';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<><Navbar />   <Home />  <Footer /> </>} />
        <Route path="/cart/:productId" element={<><Navbar />   <Cart /><Footer /></>} />
        <Route path="/addtocart/" element={<><Navbar />   <AddToCart /><Footer /></>} />
      </Route>
    </Routes>



  );
}

export default App;
