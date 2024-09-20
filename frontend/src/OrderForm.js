import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './SupplierForm.css';

function OrderForm() {
  const [newItem, setNewItem] = useState({
    companyName: '',
    date: '',
    productCategories: '',
    quantity: '',
  });

  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const validate = () => {
    let formErrors = {};

    if (!newItem.companyName.trim()) formErrors.companyName = 'Company name is required';
    if (!newItem.date) formErrors.date = 'Order date is required';
    if (!newItem.productCategories) formErrors.productCategories = 'Product category is required';
    if (!newItem.quantity.trim()) {
      formErrors.quantity = 'Quantity is required';
    } else if (!/^\d+$/.test(newItem.quantity) || parseInt(newItem.quantity, 10) <= 0) {
      formErrors.quantity = 'Quantity must be a positive number';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      axios
        .post('http://localhost:8000/order/save', { orderTable: newItem })
        .then((response) => {
          if (response.data.success) {
            setItems([...items, response.data.orderTable]);
            setNewItem({
              companyName: '',
              date: '',
              productCategories: '',
              quantity: '',
            });
          } else {
            alert('Failed to add new item');
          }
        })
        .catch((error) => {
          console.error('Error adding order:', error);
        });
    }
  };

  useEffect(() => {
    axios.get('http://localhost:8000/posts') 
        .then(response => {
            if (response.data.success) {
                setItems(response.data.supplier);
            } else {
                alert('Failed to fetch posts');
            }
        })
        .catch(error => {
            alert('There was an error fetching the posts!', error);
        });
});

  return (
    <div>
      <header></header>
      <div className="container">
        <h2>Order Placements</h2>
        <form onSubmit={handleFormSubmit}>

        <p>Company Name:</p>
          <div className="input_box">
            <select
              className="order_type"
              name="companyName"
              value={newItem.companyName}
              onChange={handleInputChange}
            >
              <option value="">Select Company Name</option>
              {items.map((item) => (
               <option key={item._id}>
                {item.supplierTable?.companyName}
               </option>
               ))}
            </select>
            {errors.companyName && <p className="error">{errors.companyName}</p>}
          </div>
          <br />

          <p>Order Date:</p>
          <div className="input_box">
            <input
              type="date"
              name="date"
              className="name"
              value={newItem.date}
              onChange={handleInputChange}
            />
            {errors.date && <p className="error">{errors.date}</p>}
          </div>
          <br />

          <p>Product Categories:</p>
          <div className="input_box">
            <select
              className="order_type"
              name="productCategories"
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

          <p>Quantity:</p>
          <div className="input_box">
            <input
              type="text"
              placeholder="Enter Quantity"
              name="quantity"
              className="name"
              value={newItem.quantity}
              onChange={handleInputChange}
            />
            {errors.quantity && <p className="error">{errors.quantity}</p>}
          </div>
          <br />

          <div className="input_group">
            <div className="input_box">
              <button type="submit">Send</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;

