import React from 'react';
import ProductManagement from './pages/ProductManagement';
import ProductWastageManagement from './pages/ProductWastageManagement';
import RequestStaff from './pages/RequestStaff';
import ProductionForm from './components/ProductionForm';
import IngredientRequest from './pages/IngredientRequest';
import UpdateProduct from './pages/updateProduct';
import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="/products" element={<ProductWastageManagement />} />
                <Route path="/product-management" element={<ProductManagement />} />
                <Route path="/request-staff" element={<RequestStaff />} />
                <Route path='/request-ingredient' element={<IngredientRequest />} />
                <Route path='/daily-production' element={<ProductionForm />} />
                <Route path='/updateProduct/:id' element={<UpdateProduct />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
