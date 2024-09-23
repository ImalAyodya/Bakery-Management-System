<<<<<<< Updated upstream
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
=======
import React from 'react';
import ProductManagement from './pages/ProductManagement';
import ProductWastageManagement from './pages/ProductWastageManagement';
import RequestStaff from './pages/RequestStaff';
import ProductionForm from './components/ProductionForm';
import IngredientRequest from './pages/IngredientRequest';
import UpdateProduct from './pages/updateProduct';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CommercialOrder from './CommercialOrder';
import Onlineorder from './OnlineOrder';
import Checkout from './Checkout';
import Home from './Home';
import OrderDashboard from './OrderDashboard';
import OnlineOrderDB from './OnlineOrderDB';

import OrderDelivery from './OrderDelivery';
import Form from './Form';
import DailyRoutes from './DailyRoutes';
import Dfirst from './Dfirst';
import ViewDailySales from './ViewDailySales'
 



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<ProductWastageManagement />} />
                <Route path="/product-management" element={<ProductManagement />} />
                <Route path="/request-staff" element={<RequestStaff />} />
                <Route path='/request-ingredient' element={<IngredientRequest />} />
                <Route path='/daily-production' element={<ProductionForm />} />
                <Route path='/updateProduct/:id' element={<UpdateProduct />} />

                <Route path="/" element={<CommercialOrder />} />
                <Route path="/Online" element={<Onlineorder />} />
                <Route path="/CheckoutOrder" element={<Checkout />} />
                <Route path="/home" element={<Home />} />
                <Route path="/orderDashbrd" element={<OrderDashboard />} />
                <Route path="/onlineOrderDashbrd" element={<OnlineOrderDB />} />
                
                <Route path = '/Form' element={<Form/>}/>
                <Route path = '/orderdelivery'element={<OrderDelivery/>}/>
                <Route path = '/dailyroute'element={<DailyRoutes/>}/>
            
                <Route path = '/delivery'element={<Dfirst/>}/>
                <Route path = '/ViewDailySales'element={<ViewDailySales/>}/> 
                
            </Routes>
        </BrowserRouter>
    );
>>>>>>> Stashed changes
}

export default App;
