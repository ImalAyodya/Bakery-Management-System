import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CustomerUI from './CustomerUI';  
import CustomerView from './CustomerView';
import Customer from './Customer';
import CustomerEditForm from './CustomerEditForm';
import InquiryForm from './InquiryForm';
import AdminDashboard from './AdminDashboard';
import AdminInquiryView from './AdminInquiryView';
import InquiryView from './InquiryView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/CustomerDB" element={<CustomerUI/>} />
        <Route path="/CustomerView" element={<CustomerView/>} />
        <Route path='/Customer' element={<Customer/>} />
        <Route path='/CustomerEditForm' element={<CustomerEditForm/>} />
        <Route path="/InquiryForm" element={<InquiryForm/>} />
        <Route path="/AdminInquiryView" element={<AdminInquiryView/>} />
        <Route path="/InquiryView" element={<InquiryView/>} />
        <Route path="/" element={<AdminDashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
