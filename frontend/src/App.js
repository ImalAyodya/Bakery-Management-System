import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
// import AddQuantity from './AddQuantity';
import Inventory from './Inventory';
import OrderRequest from './OrderRequest';

function App() {
  
  return (

    <BrowserRouter>
  <Routes>
    <Route path = '/' element={<Inventory/>} />
    {/* <Route path = '/AddQuantity' element={<AddQuantity/>}/> */}
    <Route path = '/dashboard' element={<Dashboard/>} />
    <Route path = '/dashboard/request' element={<OrderRequest/>}/>

    </Routes>
  </BrowserRouter>
  );
}

export default App;

/*import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.getPosts(); // Added missing semicolon
  }

  getPosts() {
    axios.get("http://localhost:8001/posts").then(res => {
      if (res.data.success) {
        this.setState({
          posts: res.data.existingPosts
        });

        console.log(this.state.posts);
      }
    }); // Added missing semicolon
  }

  render() {
    return (
      <div>App</div>
    );
  }
}*/


