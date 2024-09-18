// import './App.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Dashboard from './Dashboard';
// // import AddQuantity from './AddQuantity';
// import Inventory from './Inventory';
// import OrderRequest from './OrderRequest';

// function App() {
  
//   return (

//     <BrowserRouter>
//   <Routes>
//     <Route path = '/' element={<Inventory/>} />
//     {/* <Route path = '/AddQuantity' element={<AddQuantity/>}/> */}
//     <Route path = '/dashboard' element={<Dashboard/>} />
//     <Route path = '/dashboard/request' element={<OrderRequest/>}/>

//     </Routes>
//   </BrowserRouter>
//   );
// }

// export default App;

// /*import React, { Component } from 'react';
// import axios from 'axios';

// export default class App extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       posts: []
//     };
//   }

//   componentDidMount() {
//     this.getPosts(); // Added missing semicolon
//   }

//   getPosts() {
//     axios.get("http://localhost:8001/posts").then(res => {
//       if (res.data.success) {
//         this.setState({
//           posts: res.data.existingPosts
//         });

//         console.log(this.state.posts);
//       }
//     }); // Added missing semicolon
//   }

//   render() {
//     return (
//       <div>App</div>
//     );
//   }
// }*/


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
                <Route path = '/' element={<Inventory/>} />
                <Route path = '/AddQuantity' element={<AddQuantity/>}/> 
                <Route path = '/dashboard' element={<Dashboard/>} />
                <Route path = '/dashboard/request' element={<OrderRequest/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;