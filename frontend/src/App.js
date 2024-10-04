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
import AdminDashboard from './components/AdminDashboard';
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
import './index.css';
import Salesm from './Salesm';
import Nwplan from './Nwplan';
import Salesdash from './Salesdash';
import Prform from './Prform';
import Stables from './Stables';
import OrderDelivery from './OrderDelivery';
import Form from './Form';
import DailyRoutes from './DailyRoutes';
import Dfirst from './Dfirst';
import ViewDailySales from './ViewDailySales'
import AdminDashboard from './AdminDashboard'
import HeaderAdmin from './HeaderAdmin'




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
               
                <Route path = '/inventory' element={<Inventory/>} />
                <Route path = '/AddQuantity' element={<AddQuantity/>}/>
                <Route path = '/dashboard' element={<Dashboard/>} />
                <Route path = '/dashboard/request' element={<OrderRequest/>}/>
                <Route path = '/dashboard/productreport' element={<Product_Report/>}/>
                <Route path = '/dashboard/orderreport' element={<Order_Report/>}/>
                <Route path = '/dashboard/generatereport' element={<Stock_Report/>}/>

                <Route path="/" element={<Home/>}/>
                <Route path= "/commercial" element={<CommercialOrder/>}/>
                <Route path="/Online" element={<Onlineorder/>}/>
                <Route path="/CheckoutOrder" element={<Checkout/>}/>
                <Route path="/orderDashbrd" element={<OrderDashboard/>}/>
                <Route path="/onlineOrderDashbrd" element={<OnlineOrderDB/>}/>
                <Route path="/AdminDashbrd" element={<AdminDashboard/>}/>
                <Route path="/orderDBUI" element={<OrderDBUI/>}/>
                <Route path="/notification" element={<NotificationDashboard/>}/>



                


                <Route path='/sales' element={<Salesm/>}/>
                <Route path='/Prform' element={<Prform/>}/>
                
                <Route path='/plan' element={<Nwplan/>}/>
                <Route path='/Salesdash' element={<Salesdash/>}/>
                
                <Route path='/Stables' element={<Stables/>}/>
                <Route path='/Nwplan' element={<Nwplan/>}/>



                <Route path = '/Form' element={<Form/>}/>
                <Route path = '/orderdelivery'element={<OrderDelivery/>}/>
                <Route path = '/dailyroute'element={<DailyRoutes/>}/>
                <Route path = '/delivery'element={<Dfirst/>}/>
                <Route path = '/ViewDailySales'element={<ViewDailySales/>}/> 

            </Routes>
        </BrowserRouter>
    );
}



export default App;


