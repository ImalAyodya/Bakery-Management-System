import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CommercialOrder from './CommercialOrder';
import Onlineorder from './OnlineOrder';
import Checkout from './Checkout';
import Home from './Home';
import OrderDashboard from './OrderDashboard';
import OnlineOrderDB from './OnlineOrderDB';



function App() {
  return(

    <BrowserRouter>
      <Routes>
        <Route path= "/" element={<CommercialOrder/>}/>
        <Route path="/Online" element={<Onlineorder/>}/>
        <Route path="/CheckoutOrder" element={<Checkout/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/orderDashbrd" element={<OrderDashboard/>}/>
        <Route path="/onlineOrderDashbrd" element={<OnlineOrderDB/>}/>
        
        



        
      </Routes>
      
  </BrowserRouter>
);}
export default App;
