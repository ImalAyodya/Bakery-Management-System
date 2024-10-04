import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import AdminDashboard from './AdminDashboard';
import Supplier from './Supplier';
import SupplierForm from './SupplierForm';
import View from './View';
import OrderView from './OrderView';
import OrderForm from './OrderForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<AdminDashboard />} />
        <Route path='AdminDashboard' element={<AdminDashboard />} />
        <Route path="/Supplier" element={<Supplier/>} />
        <Route path="/SupplierForm" element={<SupplierForm />} />
        <Route path="/View" element={<View />} />
        <Route path='/OrderView' element={<OrderView />} />
        <Route path="/OrderForm" element={<OrderForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

