
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'; //frontend connect
import  "./OrderDashboard.css";


function OrderDashboard() {
  

  const[orders,setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
 const [temporaryStatus, setTemporaryStatus] = useState('');
 const [searchQuery, setSearchQuery] = useState('');

  useEffect(() =>{
      axios.get('http://localhost:8000/order')
      .then(response =>{
        if(response.data.success){
          setOrders(response.data.ReadData);

        }else{
          alert("No data added");
        }
      })

      .catch(error =>{
        alert('There is a error feching data', error);
      });
  });


  const updateOrderStatus = (orderId, newStatus) => {
    axios.put(`http://localhost:8000/order/update/${orderId}`, { status: newStatus })
      .then(response => {
        if (response.data.success) {
          // Update the local state with the new data
          setOrders(orders.map(order => 
            order._id === orderId ? { ...order, WholesaleOrder: { ...order.WholesaleOrder, status: newStatus } } : order
          ));
         
        } else {
          alert("Failed to update status");
        }
      })
      .catch(error => {
        alert('There was an error updating the status', error);
      });
  };

  const handleUpdateClick = (orderId) => {
    setEditingOrderId(orderId); // Set the editing order ID to show the dropdown
  };

  const handleCancelClick = () => {
    setEditingOrderId(null); // Hide the dropdown without making any changes
  };
  const handleStatusChange = (e) => {
    setTemporaryStatus(e.target.value);
  };
  const handleDelete = (id)=>{
     axios.delete(`http://localhost:8000/order/delete/${id}`)
     .then(response => {
      if (response.data.success) {
        // Update the local state with the new data
        setOrders(orders.filter(order => order._id === id));
        alert("Data deleted successfully");
      } else {
        alert("Failed to Delete status");
      }
    })
    .catch(error => {
      console.error('There was an error deleting the item', error)
      alert('There was an error deleting the order');
    });

  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOrders = orders.filter(order => 
    order.WholesaleOrder.customerID.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.WholesaleOrder.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

    return(
        <>
        <h1>Wholesale Order Dashboard</h1>

        <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by CustomerID or Order Status"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    //value={searchQuery}
                    //onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-button" onClick={handleSearchChange}>Search</button>
            </div>
      <table className='ordertable'>
        <thead className='ordertbheading'>
          <tr className='ordertbtr'>
            <th className='orderth'>Customer ID</th>
            <th className='orderth'>Customer Name</th>
            <th colSpan="5" className='orderthpp'>Products{/*<th className='orderth1'>Product</th>
            <th className='orderth1'>Quantity</th>
            <th className='orderth1'>UOM</th>
            <th className='orderth1'>Unit Price</th>
            <th className='orderth1'>Amount</th>*/}</th>
            <th className='orderth'>Total Amount</th>
            <th className='orderth'>Order Schedule</th>
            <th className='orderth'>Delivery Date</th>
            <th className='orderth'>Order Date</th>
            <th className='orderth'>Order Status</th>
            <th className='orderth'>Action</th>
          </tr>

         
          <tr className='ordertbtr'>
            <th className='orderth'></th> 
            <th className='orderth'></th> 
            <th className='orderth'>Product</th>
            <th className='orderth'>Quantity</th>
            <th className='orderth'>UOM</th>
            <th className='orderth'>Unit Price</th>
            <th className='orderth'>Amount</th>
            <th className='orderth'></th> 
            <th className='orderth'></th> 
            <th className='orderth'></th> 
            <th className='orderth'></th> 
            <th className='orderth'></th> 
            <th className='orderth'></th> 
          </tr>
        </thead>
        <tbody className='orderbdy'>
        {filteredOrders.map((order) =>(
          order.WholesaleOrder.products.map((product, index) => (
            <tr className='ordertrbdy' key={`${order._id}-${index}`}>
              {index === 0 && (
                <>
                  <td rowSpan={order.WholesaleOrder.products.length}>
                    {order.WholesaleOrder.customerID}
                  </td>
                  <td rowSpan={order.WholesaleOrder.products.length}>
                    {order.WholesaleOrder.customerName}
                  </td>
                </>
              )}
              <td>{product.product}</td>
              <td>{product.quantity}</td>
              <td>{product.uom}</td>
              <td>{product.unitPrice}</td>
              <td>{product.amount}</td>
              {index === 0 && (
                <>
                  <td rowSpan={order.WholesaleOrder.products.length}>
                    {order.WholesaleOrder.totalAmount}
                  </td>
                  <td rowSpan={order.WholesaleOrder.products.length}>
                    {order.WholesaleOrder.orderSchedule}
                  </td>
                  <td rowSpan={order.WholesaleOrder.products.length}>
                    {order.WholesaleOrder.deliveryDate}
                  </td>
                  <td rowSpan={order.WholesaleOrder.products.length}>
                    {order.WholesaleOrder.createdAt}
                  </td>
                  <td>
                  {editingOrderId === order._id ? (
                  <select
                  value={order.WholesaleOrder.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  
                    
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Prepared">Prepared</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
              
                ) : (
                  <span>{order.WholesaleOrder.status}</span>
                )}

              
                 </td>
                  {/*<td rowSpan={order.WholesaleOrder.products.length}>
                    {order.WholesaleOrder.status}
                  </td>*/}
                  <td rowSpan={order.WholesaleOrder.products.length}>
                    {editingOrderId === order._id ? (
                  <>
                    {/*<button className="action-button save-button" onClick={() => updateOrderStatus(order._id, order.WholesaleOrder.status)} >Save</button>*/}
                    <button
        className="action-button save-button"
        onClick={() => {
          updateOrderStatus(order._id, order.WholesaleOrder.status);
          alert('Data updated successfully');
          setEditingOrderId(null);
        }}
      >
        Save
      </button>
                    <button className="action-button cancel-button" onClick={() => {handleCancelClick();setTemporaryStatus(order.WholesaleOrder.status); }}>
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      Cancel</button>
                  </>
                ) : (
                  <button className="action-button update-button" onClick={() => handleUpdateClick(order._id)}>Update</button>
                )}
                  {/*<button className="action-button update-button" onClick={() => updateOrderStatus(order._id, 'Confirmed')}>Update</button>*/}
               
                    {/*button className="action-button update-button">Update</button>*/}
                    <button className="action-button delete-button" onClick={() => handleDelete(order._id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))
        ))}
        </tbody>
          {/*<tr className='ordertrbdy' key={order._id}>
          <td>{order.WholesaleOrder.customerID}</td>
          <td>{order.WholesaleOrder.customerName}</td>
        

         {order.WholesaleOrder.products.map((product, index) => (
                    <div key={index}>
                       <td>
                        <td>{product.product}</td>
                          <td>{product.quantity}</td>
                          <td>{product.uom}</td>
                          <td>{product.unitPrice}</td>
                          <td>{product.amount}</td>
                       </td>
                        
                    </div>
                  ))}
        
            
                
             
            
          
          <td>{order.WholesaleOrder.totalAmount}</td>

          <td>{order.WholesaleOrder.orderSchedule}</td>
          <td>{order.WholesaleOrder.deliveryDate}</td>
          <td>{order.WholesaleOrder.createdAt}</td>
          <td>{order.WholesaleOrder.status}</td>
         <td>
                        <button className="action-button update-button">Update</button>
                        <button className="action-button delete-button">Delete</button>
         </td>
        </tr>

         ))}*/}


        
            
          
        
      </table>
        
        </>
    );
}

export default OrderDashboard;