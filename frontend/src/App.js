import React from 'react';
import ProductManagement from './pages/ProductManagement';
import ProductWastageManagement from './pages/ProductWastageManagement';
import RequestStaff from './pages/RequestStaff';
import ProductionForm from './components/ProductionForm';
import IngredientRequest from './pages/IngredientRequest';
import UpdateProduct from './pages/updateProduct';


import Inventory from './Inventory';
import OrderRequest from './OrderRequest';
import Dashboard from './Dashboard';
import OrderRequest from './OrderRequest';
import AddQuantity from './AddQuantity';
import Product_Report from './Product_Report';
import Order_Report from './Order_Report';
import Stock_Report from './Stock_Report';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


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
               
                <Route path = '/inventory' element={<Inventory/>} />
                <Route path = '/AddQuantity' element={<AddQuantity/>}/>
                <Route path = '/dashboard' element={<Dashboard/>} />
                <Route path = '/dashboard/request' element={<OrderRequest/>}/>
                <Route path = '/dashboard/productreport' element={<Product_Report/>}/>
                <Route path = '/dashboard/orderreport' element={<Order_Report/>}/>
                <Route path = '/dashboard/generatereport' element={<Stock_Report/>}/>
</Routes>
        </BrowserRouter>
    );
}

export default App;