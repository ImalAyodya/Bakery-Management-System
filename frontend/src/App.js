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
import CustomerUI from './CustomerUI';  
import CustomerView from './CustomerView';
import Customer from './Customer';
import CustomerEditForm from './CustomerEditForm';
import Inquiry from './Inquiry';



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

                <Route path="/custormerUI" element={<CustomerUI/>} />
                <Route path="/CustomerView" element={<CustomerView/>} />
                <Route path='/Customer' element={<Customer/>} />
                <Route path='/CustomerEditForm' element={<CustomerEditForm/>} />
                <Route path="/inquiry" element={<Inquiry/>} />
      

            </Routes>
        </BrowserRouter>
    );
>>>>>>> Stashed changes
}

export default App;
