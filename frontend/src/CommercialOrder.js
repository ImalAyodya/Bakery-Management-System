import orderimg from './images/orderimg.png';
import { Navigate, useNavigate } from 'react-router-dom';
import './CommercialOrder.css';
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import  Header from './Header';
import axios from 'axios';



function CommercialOrder() {


  
  const [wholesaleOrder, setWholesaleOrder] = useState([]);
  const [newWholesaleOrder, setNewWholesaleOrder] = useState({
    customerID: '',
    customerName: '',
    products: [{ product: '', quantity: 0, uom: '', unitPrice: 0, amount: 0 }],
    totalAmount: 0,
    orderSchedule: '',
    deliveryDate: '',
    createdAt: '',
    status: 'Pending'
  }); 

  const [products, setProducts] = useState([
    { id: 1, product: '', quantity: '', uom: '', unitPrice: '', amount: '' },
  ]);

  const [totalAmount, setTotalAmount] = useState(0);

  const productData = {
    Bread: { uom: 'Loaf', unitPrice: 2.5 },
    Bun: { uom: 'Piece', unitPrice: 1.0 },
    Donuts: { uom: 'Piece', unitPrice: 1.5 },
    FishBun: { uom: 'Piece', unitPrice: 2.0 },
  };
  const addProduct = () => {
    setProducts([...products, { id: products.length + 1, product: '', quantity: '', uom: '', unitPrice: '', amount: '' }]);
  };
  const removeProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
    calculateTotalAmount(newProducts); // Recalculate the total amount after removing a product
  };
  {/*const handleChange = (e, index = null) => {
    if (index !== null) {
      // Call handleProductChange for product-specific changes
      handleProductChange(index, e);
    } else {
      // Call handleInputChange for wholesale order changes
      handleInputChange(e);
    }
  };*/}
  const handleCombinedChange = (index, event) => {
    handleProductChange(index, event);  // Call the product change handler
    handleInputChange(event);  // Call the input change handler
  };

  const handleInputChange = (e) => {
      const {name,value} = e.target;
      setNewWholesaleOrder({...newWholesaleOrder,[name]:value});
  }
const handleProductChange = (index, event) => {
      const newProducts = [...products];
      //newProducts[index][event.target.name] = event.target.value;
      const { name, value } = event.target;

      newProducts[index][name] = value;
      if (name === 'product') {
        newProducts[index].uom = productData[value].uom;
        newProducts[index].unitPrice = productData[value].unitPrice;
      }

      if (name === 'quantity' || name === 'unitPrice') {
        newProducts[index].amount = newProducts[index].quantity * newProducts[index].unitPrice;
      }

      setProducts(newProducts);
      calculateTotalAmount(newProducts);
  };

  const calculateTotalAmount = (products) => {
    const total = products.reduce((accumulator, product) => accumulator + (parseFloat(product.amount) || 0), 0);
    setTotalAmount(total);
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate ();

  

  {/*const handleSubmit = async (e) => {
    e.preventDefault();          //Prevents page refresh on form submission.
    try {
      const response = await axios.post('http://localhost:8000/order/create', {wholesaleOrder:newWholesaleOrder });
      console.log('Order created:', response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };*/}

  
 {/* const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      customerID: newWholesaleOrder.customerID,
      customerName: newWholesaleOrder.customerName,
      products: products,
      totalAmount: totalAmount,
      orderSchedule: newWholesaleOrder.orderSchedule,
      deliveryDate: newWholesaleOrder.deliveryDate,
      createdAt: new Date().toISOString(),
      status: newWholesaleOrder.status,
    };

    try {
      const response = await axios.post('http://localhost:8000/order/create',orderData);
      if (response.status === 200) {
        alert('Order placed successfully!');
        console.log(response.data.wholsesaleorderdetails);
         //navigate('/main');  Redirect to main page after order is placed
      } else {
        alert('Failed to place the order.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order.');
    }
  };
*/}
const handleSubmit = (e) => {
  e.preventDefault();

  const orderData = {
    customerID: newWholesaleOrder.customerID,
    customerName: newWholesaleOrder.customerName,
    products: products,
    totalAmount: totalAmount,
    orderSchedule: newWholesaleOrder.orderSchedule,
    deliveryDate: newWholesaleOrder.deliveryDate,
    createdAt: new Date().toISOString(),
    status: newWholesaleOrder.status,
  };

  axios.post('http://localhost:8000/order/create', { WholesaleOrder: orderData }) // Use 'WholesaleOrder' here
    .then(response => {
      if (response.data.success) {
        // Update the state with the newly added order
        setWholesaleOrder([...wholesaleOrder, response.data.wholsesaleorderdetails]);

        // Reset the form fields
        setNewWholesaleOrder({
          customerID: '',
          customerName: '',
          products: [{ product: '', quantity: 0, uom: '', unitPrice: 0, amount: 0 }],
          totalAmount: 0,
          orderSchedule: '',
          deliveryDate: '',
          createdAt: '',  // Reset createdAt to empty or set to a new Date() if needed
          status: 'Pending'
        });

        alert('Data added successfully');
      } else {
        alert('Failed to add order');
      }
    })
    .catch(error => {
      // Log the error details
      console.error("There was an error creating the order:", error);
      alert('There was an error creating the order:', error);
    });
};


{/*neww----------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:8000/order/create', { wholesaleOrder: newWholesaleOrder })
      .then(response => {
        if (response.data.success) {
          // Update the state with the newly added order
          setWholesaleOrder([...wholesaleOrder, response.data.wholsesaleorderdetails]);
  
          // Reset the form fields
          setNewWholesaleOrder({
            customerID: '',
            customerName: '',
            products: [{ product: '', quantity: 0, uom: '', unitPrice: 0, amount: 0 }],
            totalAmount: 0,
            orderSchedule: '',
            deliveryDate: '',
            createdAt: '',  // Reset createdAt to empty or set to a new Date() if needed
            status: 'Pending'
          });
  
          alert('Data added successfully');
        } else {
          alert('Failed to add order');
        }
      })
      .catch(error => {
        // Handle any error that occurs during the API call
        //console.error("There was an error creating the order:", error);
        alert('There was an error creating the order',error);
      });
  };
  */}
  





  
{/*const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:8000/order/create',{wholesaleOrder:newWholesaleOrder })
    .then(response => {
      if(response.data.success){
        setWholesaleOrder([...wholesaleOrder,response.data.wholsesaleorderdetails]);
        newWholesaleOrder({
          customerID: '',
          customerName: '',
          products: [{ product: '', quantity: 0, uom: '', unitPrice: 0, amount: 0 }],
          totalAmount: 0,
          orderSchedule: '',
          deliveryDate: '',
          createdAt: new Date(),
          status: 'Pending'});
          alert('Data added successfully');
      }else{
        alert('Failed to add order');
      }
      
    })
    .catch(error => {
      // Handle any error that occurs during the API call
      console.error("There was an error creating the order:", error);
    });

  } */}
  
  return (
    
    
    <div className="Corder">
       <Header/>


      <div className="content">
        <h1 className="centered-heading">Place Your Orders</h1>
        <form className="order-form" onSubmit={handleSubmit} >   
          
            <label className="CustomerID">Customer ID</label>
            <input type="text" id="CustomerID" name="customerID" required placeholder="Customer ID" value={newWholesaleOrder.customerID}  onChange={handleInputChange}/> {/*value={newWholesaleOrder.customerName}  onChange={(e) => handleChange(e)}*/}

            <label htmlFor="CustomerName">Customer Name</label>
            <input type="text" id="CustomerName" name="customerName" required placeholder="Customer Name" value={newWholesaleOrder.customerName}  onChange={handleInputChange}/> {/*value={newWholesaleOrder.customerName}   onChange={(e) => handleChange(e)}*/}
            <br/>
            <div className="product-row">
              <label>Select the Product</label>
              <label>Quantity</label><t></t>
              <label>UOM</label><t></t>
              <label>Unit Price</label><t></t>
              <label>Amount</label>
            </div>

            {products.map((product, index) => (
              <div className="product" key={product.id}>
                <div className="select-bar2">
                  <select className="select-bar"name="product" value={product.product} onChange={(e) => handleCombinedChange(index, e)}  >  {/*onChange={(e) => handleProductChange(index, e)}*/}
                    <option value="" disabled>Select the product</option>
                    <option value="Bread">Bread</option>
                    <option value="Bun">Bun</option>
                    <option value="Donuts">Donuts</option>
                    <option value="FishBun">Fish Bun</option>
                
                  </select>
                </div>
                <input type="number" name="quantity" value={product.quantity} onChange={(e) => handleCombinedChange(index, e)} placeholder="Quantity" />
                <input type="text" name="uom" value={product.uom} onChange={(e) => handleCombinedChange(index, e)} placeholder="UOM" readOnly />
                <input type="text" name="unitPrice"value={product.unitPrice} onChange={(e) => handleCombinedChange(index, e)} placeholder="Unit price" readOnly/>
                <input type="text" name="amount" value={product.amount} onChange={(e) => handleCombinedChange(index, e)} placeholder="Amount" readOnly/>
                <button type="button" className="addbtn" onClick={addProduct}>+</button>
                <button type="button" className="removebtn" onClick={() => removeProduct(index)}>-</button>
              </div>
            ))}
            
  <br></br>
            <label>Total Amount</label>
            <input type="text"  placeholder="Total Amount" value={totalAmount.toFixed(2)} onChange={handleInputChange} readOnly />   {/*value={totalAmount.toFixed(2)}*/}

            <label>Order Schedule</label>
            <input type="text" placeholder="Daily" name="orderSchedule" value={newWholesaleOrder.orderSchedule} onChange={handleInputChange} />
            
            <label htmlFor="delivery-date" >Select Delivery Date: </label>
            <input type="date" id="date" name="deliveryDate" required placeholder="date" value={newWholesaleOrder.deliveryDate} onChange={handleInputChange} />
                {/*<DatePicker
                    id="delivery-date"
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy/MM/dd"
                    minDate={new Date()}
                />*/}

            
            <button type="submit" className="orderbtn" >Place Order</button> {/*onClick={ () => Navigate('/main')}*/}
         
        </form>
      </div>
    </div>
  );
}

export default CommercialOrder;

