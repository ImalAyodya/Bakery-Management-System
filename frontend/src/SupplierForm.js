import React, { useState } from 'react';
import axios from 'axios';
import './SupplierForm.css';

function App() {
  const [newItem, setNewItem] = useState({
    companyName: '',
    companyAddress: '',
    email: '',
    mobileNumber: '',
    businessRegistrationNumber: '',
    supplierType: '',
    productCategories: '',
    price: ''
  });

  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};

    if (!newItem.companyName.trim()) formErrors.companyName = 'Company name is required';
    if (!newItem.companyAddress.trim()) formErrors.companyAddress = 'Company address is required';
    if (!newItem.email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(newItem.email)) {
      formErrors.email = 'Email is invalid';
    }
    if (!newItem.mobileNumber.trim()) {
      formErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(newItem.mobileNumber)) {
      formErrors.mobileNumber = 'Mobile number must be 10 digits';
    }
    if (!newItem.businessRegistrationNumber.trim()) formErrors.businessRegistrationNumber = 'Business Registration Number is required';
    if (!newItem.supplierType) formErrors.supplierType = 'Supplier type is required';
    if (!newItem.productCategories) formErrors.productCategories = 'Product category is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios
        .post('http://localhost:8000/SupplierTable/save', { supplierTable: newItem })
        .then((response) => {
          if (response.data.success) {
            setItems([...items, response.data.supplierTable]);
            setNewItem({
              companyName: '',
              companyAddress: '',
              email: '',
              mobileNumber: '',
              businessRegistrationNumber: '',
              supplierType: '',
              productCategories: '',
              price: ''
            });
          } else {
            alert('Failed to add new item');
          }
        })
        .catch((error) => {
          console.error('Error saving item:', error);
        });
    }
  };

  return (
    <div>
      <header></header>
      <div className="container">
        <h2>Supplier Registration</h2>
        <form onSubmit={handleFormSubmit}>
          <p>Company Name :</p>
          <div className="input_box">
            <input
              type="text"
              placeholder="Enter your Company Name"
              name="companyName"
              className="name"
              value={newItem.companyName}
              onChange={handleInputChange}
            />
            {errors.companyName && <p className="error">{errors.companyName}</p>}
          </div>
          <br />

          <p>Address :</p>
          <div className="input_box">
            <input
              type="text"
              placeholder="Enter your Address"
              name="companyAddress"
              className="name"
              value={newItem.companyAddress}
              onChange={handleInputChange}
            />
            {errors.companyAddress && <p className="error">{errors.companyAddress}</p>}
          </div>
          <br />

          <p>Email :</p>
          <div className="input_box">
            <input
              type="email"
              placeholder="Enter your Email"
              name="email"
              className="name"
              value={newItem.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <br />

          <p>Mobile Number :</p>
          <div className="input_box">
            <input
              type="text"
              placeholder="Enter your Mobile Number"
              name="mobileNumber"
              className="name"
              value={newItem.mobileNumber}
              onChange={handleInputChange}
            />
            {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}
          </div>
          <br />

          <p>Business Registration Number :</p>
          <div className="input_box">
            <input
              type="text"
              placeholder="Enter your Business Registration Number"
              name="businessRegistrationNumber"
              className="name"
              value={newItem.businessRegistrationNumber}
              onChange={handleInputChange}
            />
            {errors.businessRegistrationNumber && <p className="error">{errors.businessRegistrationNumber}</p>}
          </div>
          <br />

          <p>Supplier Type :</p>
          <div className="input_box">
            <select
              name="supplierType"
              className="order_type"
              value={newItem.supplierType}
              onChange={handleInputChange}
            >
              <option value="">Select Supplier Type</option>
              <option value="raw-materials">Raw Materials</option>
              <option value="packaging">Packaging</option>
            </select>
            {errors.supplierType && <p className="error">{errors.supplierType}</p>}
          </div>
          <br />

          <p>Product Categories :</p>
          <div className="input_box">
            <select
              name="productCategories"
              className="order_type"
              value={newItem.productCategories}
              onChange={handleInputChange}
            >
              <option value="">Select Product Category</option>
              <option value="flour">Flour</option>
              <option value="sugar">Sugar</option>
              <option value="butter">Butter</option>
              <option value="egg">Egg</option>
              <option value="yeast">Yeast</option>
            </select>
            {errors.productCategories && <p className="error">{errors.productCategories}</p>}
          </div>
          <br />
          <p>Price :</p>
          <div className="input_box">
            <input
              type="text"
              placeholder="Enter Price"
              name="Price"
              className="name"
              value={newItem.price}
              onChange={handleInputChange}
            />
          </div>
          <br />

          <div className="input_group">
            <div className="input_box">
              <button className='add' type="submit">Send</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
