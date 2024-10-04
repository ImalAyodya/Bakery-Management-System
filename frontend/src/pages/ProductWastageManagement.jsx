import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import '../ProductBackground.css'


const ProductWastageManagement = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    function getProducts() {
      axios.get("http://localhost:8000/products").then((response) => {
        setProducts(response.data);
      });
    }
    getProducts();
  }, []);

  const deleteProduct = (id) => {
    const confirm = window.confirm("Do you want to Delete?");
    if (confirm) {
      axios.delete(`http://localhost:8000/products/delete/${id}`).then(res => {
        alert("Product Deleted");
        window.location.reload();
      }).catch(err => {
        console.log(err);
      });
    }
  };

  const navigateToUpdate = (id) => {
    navigate(`/updateProduct/${id}`);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h1>Product &<br />Wastage<br />Management</h1>
        <Link to="/product-management" className="no-underline"><button className="sidebar-btn">New Product</button></Link>
        <Link to="/request-ingredient" className="no-underline"><button className="sidebar-btn">Ingredient Request</button></Link>
        <Link to="/request-staff" className="no-underline"><button className="sidebar-btn">Staff Request</button></Link>
      </div>
      <div className="main-content">
        <div className="header">
          <input type="text" className="search-bar" placeholder="Search" />
          <Link to="/product-management" className="no-underline"><button className="header-btn">Add New Product</button></Link>
          <Link to="/request-ingredient" className="no-underline"><button className="header-btn">Ingredient Request</button></Link>
          <Link to="/daily-production" className="no-underline"><button className="header-btn">Daily Production</button></Link>
          <div className="profile-icon">&#128100;</div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product Code</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Net Cost</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.productCode}</td>
                  <td>{product.productName}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>{product.cost}</td>
                  <td>
                    <button onClick={() => navigateToUpdate(product._id)} className="edit-btn">Edit</button><br /><br />
                    <button onClick={() => deleteProduct(product._id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductWastageManagement;
