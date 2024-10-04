import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';



const ProductManagement = () => {
  

  const [productCode, setproductCode] = useState("");
  const [productName, setproductName] = useState("");
  const [description, setdescription] = useState("");
  const [cost, setcost] = useState("");
  const [category, setcategory] = useState("");

  function sendData(e){

    e.preventDefault();

    const newProduct = {
      productCode,
      productName,
      description,
      cost,
      category
      }

    axios.post("http://localhost:5080/products/insert", newProduct).then(() => {
      alert('Product Added')
      setproductCode("");
      setproductName("");
      setdescription("");
      setcost("");
      setcategory("")
    }).catch((err) => {
      alert("Something went wrong!",err)
    });

    console.log(newProduct);
  }

  return (
    <div className="modal">
      <div className="modal-header">
        <h2>Product Management</h2>
        <Link to="/" className='no-underline'><button className="close-btn" >&#x2716;</button></Link>
      </div>
      <div className="modal-body">
        <h3>Add New Product</h3>
        <form onSubmit={sendData}>
          <div className="form-group">
            <label htmlFor="product-id">Product ID</label>
            <input type="text" id="product-id" placeholder="Enter product ID" 
            onChange={(e) => {

              setproductCode(e.target.value);
              
              }}/>
          </div>
          <div className="form-group">
            <label htmlFor="product-name">Product Name</label>
            <input type="text" id="product-name" placeholder="Enter product name" 
            onChange={(e) => {

              setproductName(e.target.value);
              
              }}/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" placeholder="Enter product description"
            onChange={(e) => {

              setdescription(e.target.value);
              
              }}></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="net-cost">Net Cost</label>
            <input type="text" id="net-cost" placeholder="Enter net cost" 
            onChange={(e) => {

              setcost(e.target.value);
              
              }}/>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select value={category} onChange={(e) => setcategory(e.target.value)} id="category">
              <option>Select category</option>
              <option>Baked Goods</option>
              <option>Cakes</option>
              <option>Doughnuts</option>
            </select>
          </div>
          <button type="submit" className="save-btn">Save Product</button>
        </form>
      </div>
    </div>
  );
};

export default ProductManagement;
