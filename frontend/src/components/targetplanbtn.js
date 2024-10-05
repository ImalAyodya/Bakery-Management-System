import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function TargetPlan() {
  const [product, setProduct] = useState([]);
  const [newProduct, setNewProduct] = useState({
    date: '',
    productID: '',
    predictedQuantity: '',
  });
  const [addtardet, setAddTarDet] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const Navigate = useNavigate();

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Function to handle form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation checks
    if (!newProduct.date || !newProduct.productID || !newProduct.predictedQuantity) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (isNaN(newProduct.predictedQuantity) || Number(newProduct.predictedQuantity) <= 0) {
      setErrorMessage('Predicted Quantity must be a positive number.');
      return;
    }

    // If validation passes, submit the form
    axios
      .post('http://localhost:8000/saleplan/save', { targetPlan: newProduct })
      .then((response) => {
        if (response.data.success) {
          setProduct([...product, response.data.targetPlan]);
          setNewProduct({ date: '', productID: '', predictedQuantity: '' });
          setErrorMessage(''); // Clear error message on successful submission
        } else {
          setErrorMessage('Failed to add new product.');
        }
      })
      .catch((error) => {
        setErrorMessage('There was an error when adding items.');
      });
  };

  return (
    <>
      <div className="-bmainbtnox">
        <button onClick={() => setAddTarDet(true)} className="tpmainbtn">
          + Add New Target Plan
        </button>
      </div>
      {addtardet && (
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Target Plan for the Next Week</h1>
          </div>

          <label htmlFor="tpdate">Date:</label>
          <input
            type="date"
            id="tpdate"
            name="date"
            value={newProduct.date}
            onChange={handleInputChange}
          /><br />

          <label htmlFor="productname">Product name:</label>
          <input
            type="text"
            id="productname"
            name="productID"
            value={newProduct.productID}
            onChange={handleInputChange}
          /><br />

          <label htmlFor="predictedqnty">Predicted Quantity:</label>
          <input
            type="text"
            id="predictedqnty"
            name="predictedQuantity"
            value={newProduct.predictedQuantity}
            onChange={handleInputChange}
          /><br />

          {/* Display error message if validation fails */}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <button type="submit" id="tplan">Save</button>
        </form>
      )}
    </>
  );
}

export default TargetPlan;