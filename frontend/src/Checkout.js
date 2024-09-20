
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Header from "./Header";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

//import { useCart } from './CartContext';
import './Checkout.css';

function Checkout(){

  //const { cartItems, incrementQuantity, decrementQuantity } = useCart();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const navigate = useNavigate();

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  };
//newwwwwww
  const [items, setItems] = useState(cartItems);
    const [totalQuantity, setTotalQuantity] = useState(getTotalQuantity());
    const [totalPrice, setTotalPrice] = useState(getTotalPrice());

  
 
  
  //const [onlineOrder, setOnlineOrder] = useState([]);
  const [newOnlineOrder, setNewOnlineOrder] = useState({
    customerName : '',
    phoneNumber: '',
    address: '',
    paymentMethod: '',
    cartItems: items,
    totQuantity:totalQuantity,
    totPrice:totalPrice,
    createdAt: '',
    status: 'Pending'
  }); 

 
  useEffect(() => {
    // When cartItems changes, update total quantity and price
   
    setNewOnlineOrder((prevOrder) => ({
      ...prevOrder,
      cartItems: items,                         //change---------------------
      totQuantity:totalQuantity,
      totPrice: totalPrice,
    }));
  }, [items,totalQuantity, totalPrice]); //change--------------------------

 const handleInputChange = (e) => {

      const {name,value} = e.target;
      setNewOnlineOrder(prevOrder => ({
        ...prevOrder,
        [name]: value
      }));
  };
  const handleCartItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
    console.log('Updated cart items:', newItems);  // Debugging line
  
    // Update the newOnlineOrder's cartItems as well
    setNewOnlineOrder(prevOrder => ({
      ...prevOrder,
      cartItems: newItems,
    }));
  };

   {/*const handleCartItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
    setTotalQuantity(getTotalQuantity());
    setTotalPrice(getTotalPrice());
};*/}
{/*const handleInputChange = (e) => {
  const {name,value} = e.target;
  setNewOnlineOrder({...newOnlineOrder,[name]:value});
}
*/}
  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      customerName: newOnlineOrder.customerName,
      phoneNumber: newOnlineOrder.phoneNumber,
      address: newOnlineOrder.address,
      paymentMethod:newOnlineOrder.paymentMethod,
      cartItems: items, // using updated cart items
        totQuantity: getTotalQuantity(),
        totPrice: getTotalPrice(),
      createdAt: new Date().toISOString(),
      status: newOnlineOrder.status,
    };
    console.log('Order Data to be sent:', orderData);
    axios.post('http://localhost:8000/onlineorder/create', { OnlineOrder: orderData }) // Use 'WholesaleOrder' here
      .then(response => {
        if (response.data.success) {
          // Update the state with the newly added order
          //setOnlineOrder([...onlineOrder, response.data.Onlineorderdetails]);
          setItems([]);
          // Reset the form fields
          setNewOnlineOrder({
            customerName: '',
            phoneNumber: '',
            address: '',
            paymentMethod: '',
            cartItems: [],
            totQuantity: 0,
            totPrice: 0,
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
  

    return(
        <div className='checkout'>
                <Header/>

                <div class="checkoutLayout">

                    <div className="returnCart">
                                <button className='returncart-btn'onClick={() => navigate('/Online', { state: { cartItems } })}>Keep Shopping</button>
                        
                        <h1>List Product in Cart</h1>
                        <div className="list">
                            <div className="checkout-cartitemlist">
            
                                       <h2>Cart Items</h2>
                                        <ul>
                                            {items.map((item, index) => (
                                            <li key={index}>
                                                    <div className='item-info'>
                                                    <div className="item-info-name"> {item.productName}   </div>   
                                                    <div className="item-info-price">${item.unitPrice}</div>
                                                    <div className="item-info-qty">{item.quantity}</div>
                                                    </div>
                                               
                                            </li>
                                            ))}
                                        </ul>
                                        <h3>Total Price: ${getTotalPrice()}</h3>
                            </div>
                        </div>
                    </div>


            <div className="right">

            <form className="checkout-form" onSubmit={handleSubmit} > 
            <h1>Checkout</h1>

                    <div className="form">
                        <div className="group">
                            <label for="name"> Name</label>
                            <input type="text" name="customerName" id="customerName" value={newOnlineOrder.customerName} onChange={handleInputChange}/>
                        </div>

                        <div className="group">
                            <label for="phone">Phone Number</label>
                            <input type="phone" name="phoneNumber" id="phoneNumber" value={newOnlineOrder.phoneNumber} onChange={handleInputChange}/>
                        </div>

                        <div className="group">
                            <label for="address">Address</label>
                            <input type="text" name="address" id="address" value={newOnlineOrder.address} onChange={handleInputChange} />
                        </div>

                        <div className="group">
                            <label for="payment">Payment Method</label>
                            <select name="paymentMethod" id="paymentMethod" value={newOnlineOrder.paymentMethod} onChange={handleInputChange} >
                                <option value="cod">Cash On Delivery</option>
                                <option value="visaMaster">Pay with VISA/MASTER Card On Delivery</option>
                                <option value="Amex">Pay with AMEX Card On Delivery</option>
                            </select>
                        </div>


                    </div>

                    <div className="return">

                            <div className="list">
                                    <div className="checkout-cartitemlist">

                                            <h2>Cart Items</h2>
                                                <ul>
                                                    {items.map((item, index) => (
                                                    <li key={index}>
                                                            <div className='item-info'>
                                                            {/*<input type="text" name="productName" id="productName" value={cartItems.productName} onChange={handleInputChange} >{item.name} </input>
                                                            <input type="text" name="unitPrice" id="unitPrice" value={cartItems.unitPrice} onChange={handleInputChange} >${item.price}</input>
                                                            <input type="text" name="quantity" id="quantity" value={cartItems.quantity} onChange={handleInputChange} >{item.quantity} </input>
                                                            <div className="item-info-name"> {item.name}   </div>   
                                                            <div className="item-info-price">${item.price}</div>
                                                            <div className="item-info-qty">{item.quantity}</div>*/}
                                                            <input type="text" name="name" value={item.productName} onChange={(e) => handleCartItemChange(index, 'name', e.target.value)}  /> {/*onChange={(e) => handleCartItemChange(index, 'name', e.target.value)} */}
                                                            <input type="number" name="price" value={item.unitPrice} onChange={(e) => handleCartItemChange(index, 'price', e.target.value)}  /> {/*onChange={(e) => handleCartItemChange(index, 'price', e.target.value)}  */}
                                                            <input type="number" name="quantity"value={item.quantity} onChange={(e) => handleCartItemChange(index, 'quantity', e.target.value)}/>  {/* onChange={(e) => handleCartItemChange(index, 'quantity', e.target.value)}*/}
                                                            </div>
                                                    
                                                    </li>
                                                    ))}
                                                </ul>
                                                {/*<h3>Total Price: ${getTotalPrice()}</h3>*/}
                                    </div>
                            </div>

                            <div className="row">
                                <div>Total Quantity</div>
                                <input type="number"  name="totalQuantity" value={totalQuantity} onChange={handleInputChange} readOnly />
                                {/*<div className="totalQuantity" >{getTotalQuantity()}</div> */}  {/*value={newOnlineOrder.totQuantity} onChange={handleInputChange}*/}
                            </div>

                            <div className="row">
                                <div className='pricelabel' ><h3>Total Price</h3></div>
                                <input type="number" value={totalPrice} onChange={handleInputChange} readOnly />
                                {/*<div className="totalPrice" >${getTotalPrice()}</div>*/} {/*value={newOnlineOrder.totPrice} onChange={handleInputChange}*/}
                            </div>
                    </div>
                    <button type="submit" className="buttonCheckout">CHECKOUT</button>


            </form> 
                
            </div> 
          </div>



</div>
           
    

    );
}

export default Checkout;