/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DailyRoutes.css';
import axios from 'axios';

function DailyRoutes() {
  const navigate = useNavigate();
  

  // State for the entire form data
  const [dailydelivery, setdailydelivery] = useState([]);
  const [newrouteDelivery, setnewrouteDelivery] = useState({
    date: '',
    vehicleno: '',
    drivername: '',
    products: [{ product: '', quantity: '', unitPrice: '', totalPrice: '' }],
  });
  const [products, setProducts] = useState([{ product: '', quantity: '', unitPrice: '', totalPrice: '' }]);
  const handleChange = (index, e) => {
    const newProducts = [...products];
    const { name, value } = e.target;

    newProducts[index][name] = value;

    if (name === 'product') {
      switch (value) {
        case 'bread':
          newProducts[index].unitPrice = 100;
          break;
        case 'buns':
          newProducts[index].unitPrice = 50;
          break;
        case 'cake':
        case 'Muffins':
        case 'Doughnuts':
          newProducts[index].unitPrice = 75;
          break;
        default:
          newProducts[index].unitPrice = 0;
      }
    }

    if (name === 'quantity' || name === 'unitPrice') {
      newProducts[index].totalPrice = newProducts[index].quantity * newProducts[index].unitPrice;
    }

    setProducts(newProducts);
    setnewrouteDelivery({ ...newrouteDelivery, products: newProducts });  // Update the main state too
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewrouteDelivery({ ...newrouteDelivery, [name]: value });
  };

  const addProductRow = () => {
    setProducts([...products, { product: '', quantity: '', unitPrice: '', totalPrice: '' }]);
  };

  const removeProductRow = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
    setnewrouteDelivery({ ...newrouteDelivery, products: newProducts });  // Update the main state too
  };
//create ekah
  const handleSubmit = (e) => {
    e.preventDefault();//aluth ekk hadanna
    
    axios
      .post('http://localhost:8000/deliverysales/save', { dailydelivery: newrouteDelivery })//aluthen dan ahdna eka
      .then((response) => {
        if (response.data.success) {
          alert('New delivery added successfully!');
          setnewrouteDelivery({
            date: '',
            vehicleno: '',
            drivername: '',
            products: [{ product: '', quantity: '', unitPrice: '', totalPrice: '' }],
          });
          setProducts([{ product: '', quantity: '', unitPrice: '', totalPrice: '' }]); // Clear the form
        } else {
          alert('Failed to add new delivery');
        }
      })
      .catch((error) => {
        alert(`There was an error: ${error}`);
      });
  };

  return (
    <div className="admin-form-container">
      <div className="button-container1">
        <button className="btn1" onClick={() => navigate('/')}>View Vehicles and Drivers</button><br />
        <button className="btn1" onClick={() => navigate('/OrderDelivery')}>Order Delivery</button><br />
        <button className="btn1" onClick={() => navigate('/dailyroute')}>Daily Delivery Stocks</button>
      </div>

      <h1>Daily Delivery Stock Management</h1><br />
      <hr />
      <div className="admin-page-container">
        <div className="admin-right-side">
          <div className="admin-container">
            <h2>New Daily Delivery Stocks</h2>
            <form onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newrouteDelivery.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="vehicleNumber">Vehicle No:</label>
                <input
                  type="text"
                  id="vehicleNumber"
                  name="vehicleno"
                  value={newrouteDelivery.vehicleno}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="driverName">Driver Name:</label>
                <input
                  type="text"
                  id="driverName"
                  name="drivername"
                  value={newrouteDelivery.drivername}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <h3>Daily Stock Management</h3>
              <div className="stock-management-container">
                {products.map((product, index) => (
                  <div key={index} className="admin-product-row">
                    <div className="admin-form-group">
                      <label htmlFor={`product-${index}`}>Product:</label>
                      <select
                        id={`product-${index}`}
                        name="product"
                        value={product.product}
                        onChange={(e) => handleChange(index, e)}
                      >
                        <option value="">Select Product</option>
                        <option value="bread">Bread</option>
                        <option value="buns">Fish Bun</option>
                        <option value="cake">Cake</option>
                        <option value="Muffins">Muffins</option>
                        <option value="Doughnuts">Doughnuts</option>
                      </select>
                    </div>

                    <div className="admin-form-group">
                      <label htmlFor={`quantity-${index}`}>Quantity:</label>
                      <input
                        type="number"
                        id={`quantity-${index}`}
                        name="quantity"
                        value={product.quantity}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label htmlFor={`unitPrice-${index}`}>Unit Price:</label>
                      <input
                        type="number"
                        id={`unitPrice-${index}`}
                        name="unitPrice"
                        value={product.unitPrice}
                        readOnly
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Total Price:</label>
                      <input
                        type="number"
                        value={product.totalPrice}
                        readOnly
                      />
                    </div>

                    <div className="admin-product-actions-container">
                      <div className="admin-product-actions1">
                        <button type="button" onClick={addProductRow}>Add</button>
                      </div>
                      <div className="admin-product-actions2">
                        <button type="button" onClick={() => removeProductRow(index)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="admin-button" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyRoutes;*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DailyRoutes.css';
import axios from 'axios';

function DailyRoutes() {
  const navigate = useNavigate();

  // State for the entire form data
  const [newrouteDelivery, setnewrouteDelivery] = useState({
    date: '',
    vehicleno: '',
    drivername: '',
    products: [{ product: '', quantity: '', unitprice: '', totalprice: '' }],
  });

  const [products, setProducts] = useState([{ product: '', quantity: '', unitprice: '', totalprice: '' }]);

  // Handle product input change
  const handleChange = (index, e) => {
    const newProducts = [...products];
    const { name, value } = e.target;

    newProducts[index][name] = value;

    // Set unit price based on product type
    if (name === 'product') {
      let unitPriceValue = 0;
      switch (value) {
        case 'bread':
          unitPriceValue = 80;
          break;
        case 'buns':
          unitPriceValue = 80;
          break;
        case 'cake':
          unitPriceValue = 60;
          break;
        case 'Muffins':
          unitPriceValue = 100;
          break;
        case 'Doughnuts':
          unitPriceValue = 150;
          break;
          
        default:
          unitPriceValue = 0;
      }
      newProducts[index].unitprice = unitPriceValue;
    }

    // Calculate total price
    if (name === 'quantity' || name === 'unitprice' || name === 'product') {
      const quantity = parseFloat(newProducts[index].quantity) || 0;
      const unitprice = parseFloat(newProducts[index].unitprice) || 0;
      newProducts[index].totalprice = quantity * unitprice;
    }

    setProducts(newProducts);
    setnewrouteDelivery({ ...newrouteDelivery, products: newProducts }); // Update main state
  };

  // Handle general input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewrouteDelivery({ ...newrouteDelivery, [name]: value });
  };

  // Add new product row
  const addProductRow = () => {
    setProducts([...products, { product: '', quantity: '', unitprice: '', totalprice: '' }]);
  };

  // Remove product row
  const removeProductRow = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
    setnewrouteDelivery({ ...newrouteDelivery, products: newProducts }); // Update main state
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure all required fields are filled
    if (!newrouteDelivery.date || !newrouteDelivery.vehicleno || !newrouteDelivery.drivername) {
      alert('Please fill all the required fields.');
      return;
    }

    // Log data being sent to the backend for debugging
    console.log('Submitting data:', newrouteDelivery);

    // Send form data to backend
    axios
      .post('http://localhost:8000/deliverysales/save', { dailydelivery: newrouteDelivery })
      .then((response) => {
        if (response.data.success) {
          alert('New delivery added successfully!');
          // Clear form after successful submission
          setnewrouteDelivery({
            date: '',
            vehicleno: '',
            drivername: '',
            products: [{ product: '', quantity: '', unitprice: '', totalprice: '' }],
          });
          setProducts([{ product: '', quantity: '', unitprice: '', totalprice: '' }]);
        } else {
          alert('Failed to add new delivery');
        }
      })
      .catch((error) => {
        console.error('There was an error:', error.response ? error.response.data.error : error.message);
        alert(`There was an error: ${error.response ? error.response.data.error : error.message}`);
      });
  };

  return (
    <div className="admin-form-container">
      <div className="button-container1">
        <button className="btn1" onClick={() => navigate('/Form')}>View Vehicles and Drivers</button><br />
        <button className="btn1" onClick={() => navigate('/OrderDelivery')}>Order Delivery</button><br />
        <button className="btn1" onClick={() => navigate('/dailyroute')}>Daily Delivery Stocks</button>
      </div>

      <h1>Daily Delivery Stock Management</h1><br />
      <button className="dassales" onClick={() => navigate('/ViewDailySales')}>+ View Daily Sales</button>
      <br></br> 
      <div className="admin-page-container">
        <div className="admin-right-side">
        
          <div className="admin-container">
            <h2>New Daily Delivery Stocks</h2>
            <form onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newrouteDelivery.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="vehicleno">Vehicle ID:</label>
                <select
                  type="text"
                  id="vehicleno"
                  name="vehicleno"
                  value={newrouteDelivery.vehicleno}
                  onChange={handleInputChange}
                  required
                >
                 <option value="" disabled>Select a Vehicle</option>
              <option value="vehicle1">T001-three wheeler</option>
              <option value="vehicle2">T002-three wheeler</option>
              <option value="vehicle3">V003-Mini van</option>
              <option value="vehicle4">V004-Mini Van</option>
              <option value="vehicle5">T005-three wheeler</option>
              </select>
              </div>

              <div className="admin-form-group">
                <label htmlFor="drivername">Driver Name:</label>
                <select
                  type="text"
                  id="drivername"
                  name="drivername"
                  value={newrouteDelivery.drivername}
                  onChange={handleInputChange}
                  required
                >
                <option value="" disabled>Select a driver</option>
              <option value="driver1">d001-Mr.kamal</option>
              <option value="driver2">d002-Mr.Namal</option>
              <option value="driver3">d003-Mr.Perera</option>
              <option value="driver4">d004-Mr.Lohith</option>
              <option value="driver5">d005-Mr.Nawan</option>
              </select>
                
              </div>

              <h3>Daily Stock Management</h3>
              <div className="stock-management-container">
                {products.map((product, index) => (
                  <div key={index} className="admin-product-row">
                    <div className="admin-form-group">
                      <label htmlFor={`product-${index}`}>Product:</label>
                      <select
                        id={`product-${index}`}
                        name="product"
                        value={product.product}
                        onChange={(e) => handleChange(index, e)}
                        required
                      >
                        <option value="" disabled>Select Product</option>
                        <option value="bread">Sausage Bun</option>
                        <option value="buns">Egg Bun</option>
                        <option value="cake">Fish Bun</option>
                        <option value="Muffins">Chicken Bun</option>
                        <option value="Doughnuts">Kibula Bun</option>
                      </select>
                    </div>

                    <div className="admin-form-group">
                      <label htmlFor={`quantity-${index}`}>Quantity:</label>
                      <input
                        type="number"
                        id={`quantity-${index}`}
                        name="quantity"
                        value={product.quantity}
                        onChange={(e) => handleChange(index, e)}
                        min="0"
                        max="100"
                        required
                      />
                    </div>

                    <div className="admin-form-group">
                      <label htmlFor={`unitprice-${index}`}>Unit Price:</label>
                      <input
                        type="number"
                        id={`unitprice-${index}`}
                        name="unitprice"
                        value={product.unitprice}
                        readOnly
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Total Price:</label>
                      <input
                        type="number"
                        value={product.totalprice}
                        readOnly
                      />
                    </div>

                    <div className="admin-product-actions-container">
                      <div className="admin-product-actions1">
                        <button type="button" onClick={addProductRow}>Add</button>
                      </div>
                      <div className="admin-product-actions2">
                        <button type="button" onClick={() => removeProductRow(index)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="admin-button" type="submit">Submit</button>
            </form>
            


          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyRoutes;
