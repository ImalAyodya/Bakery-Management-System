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
import AdminDashboard from './AdminDashboard';
import OrderDBUI from './OrderDBUI';
import NotificationDashboard from './NotificationDashboard';





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
                <Route path="/" element={<Home/>}/>
                <Route path= "/commercial" element={<CommercialOrder/>}/>
                <Route path="/Online" element={<Onlineorder/>}/>
                <Route path="/CheckoutOrder" element={<Checkout/>}/>
                <Route path="/orderDashbrd" element={<OrderDashboard/>}/>
                <Route path="/onlineOrderDashbrd" element={<OnlineOrderDB/>}/>
                <Route path="/AdminDashbrd" element={<AdminDashboard/>}/>
                <Route path="/orderDBUI" element={<OrderDBUI/>}/>
                <Route path="/notification" element={<NotificationDashboard/>}/>



                

            </Routes>
        </BrowserRouter>
    );
}


export default App;

