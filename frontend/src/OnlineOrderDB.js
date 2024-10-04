import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function OnlineOrderDB(){

    const[orders,setOrders] = useState([]);    //to read the data
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [temporaryStatus, setTemporaryStatus] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() =>{
        axios.get('http://localhost:8000/onlineorder')
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
      axios.put(`http://localhost:8000/onlineorder/update/${orderId}`, { status: newStatus })
        .then(response => {
          if (response.data.success) {
            // Update the local state with the new data
            setOrders(orders.map(order => 
              order._id === orderId ? { ...order, OnlineOrder: { ...order.OnlineOrder, status: newStatus } } : order
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
       axios.delete(`http://localhost:8000/onlineorder/delete/${id}`)
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
  //for search option
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const filteredOrders = orders.filter(order => 
      order.OnlineOrder.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.OnlineOrder.status.toLowerCase().includes(searchQuery.toLowerCase())
    );




    const generateReport = () => {
      const doc = new jsPDF();
      doc.text('Online Orders Report', 14, 16);
  
      // Define table columns and rows
      const columns = [
          { title: 'Customer Name', dataKey: 'customerName' },
          { title: 'Phone Number', dataKey: 'phoneNumber' },
          { title: 'Address', dataKey: 'address' },
          { title: 'Payment Method', dataKey: 'paymentMethod' },
          { title: 'Product', dataKey: 'productName' },
          { title: 'Unit Price', dataKey: 'unitPrice' },
          { title: 'Quantity', dataKey: 'quantity' },
          { title: 'Total Quantity', dataKey: 'totQuantity' },
          { title: 'Total Amount', dataKey: 'totPrice' },
          { title: 'Order Date', dataKey: 'createdAt' },
          { title: 'Status', dataKey: 'status' },
      ];
  
      const rows = filteredOrders.flatMap(order =>
          order.OnlineOrder.cartItems.map(product => ({
              customerName: order.OnlineOrder.customerName,
              phoneNumber: order.OnlineOrder.phoneNumber,
              address: order.OnlineOrder.address,
              paymentMethod: order.OnlineOrder.paymentMethod,
              productName: product.productName,
              unitPrice: product.unitPrice,
              quantity: product.quantity,
              totQuantity: order.OnlineOrder.totQuantity,
              totPrice: order.OnlineOrder.totPrice,
              createdAt: new Date(order.OnlineOrder.createdAt).toLocaleDateString(),
              status: order.OnlineOrder.status
          }))
      );
  
      doc.autoTable(columns, rows, { startY: 30 });
      doc.save('online-orders-report.pdf');
  };


  


    return(
        <>
        <h1>Online Order Dashboard</h1>
        <div className="report-container">
       <button className="generate-report-button" onClick={generateReport}>Generate Report</button>
        </div>
<div className="search-container">
        <input
            type="text"
            className="search-input-online"
            placeholder="Search by Customer Name or Order Status"
           value={searchQuery}
            onChange={handleSearchChange}
        
        />
        <button className="search-button" onClick={handleSearchChange}>Search</button>
        
</div>
<table className='ordertable'>
<thead className='ordertbheading'>
  <tr className='ordertbtr'>
    <th className='orderth'>Customer Name</th>
    <th className='orderth'>Customer PhoneNumber</th>
    <th className='orderth'>Customer Address</th>
    <th className='orderth'>Payment Method</th>
    <th colSpan="3" className='orderthpp'>Cart Items</th>
    <th className='orderth'>Total Product Qty</th>
    <th className='orderth'>Total Amount</th>
    <th className='orderth'>Order Date</th>
    <th className='orderth'>Order Status</th>
    <th className='orderth'>Action</th>
  </tr>

 
  <tr className='ordertbtr'>
    <th className='orderth'></th> 
    <th className='orderth'></th> 
    <th className='orderth'></th> 
    <th className='orderth'></th> 
    <th className='orderth'>Product</th>
    <th className='orderth'>Unit Price</th>
    <th className='orderth'>Quantity</th>
    <th className='orderth'></th> 
    <th className='orderth'></th> 
    <th className='orderth'></th> 
    <th className='orderth'></th> 
    <th className='orderth'></th> 
  </tr>
</thead>

<tbody className='orderbdy'>
{filteredOrders.map((order) =>(
  order.OnlineOrder.cartItems.map((product, index) => (    //product--> pahala array eke dane name eke
    <tr className='ordertrbdy' key={`${order._id}-${index}`}>
      {index === 0 && (
        <>
          <td rowSpan={order.OnlineOrder.cartItems.length}>{order.OnlineOrder.customerName}</td>
          <td rowSpan={order.OnlineOrder.cartItems.length}>{order.OnlineOrder.phoneNumber}</td>
          <td rowSpan={order.OnlineOrder.cartItems.length}>{order.OnlineOrder.address}</td>
          <td rowSpan={order.OnlineOrder.cartItems.length}>{order.OnlineOrder.paymentMethod}</td>
        </>
      )}
      <td>{product.productName}</td>
      <td>{product.unitPrice}</td>
      <td>{product.quantity}</td>

      {index === 0 && (
        <>
          <td rowSpan={order.OnlineOrder.cartItems.length}> {order.OnlineOrder.totQuantity }</td>
          <td rowSpan={order.OnlineOrder.cartItems.length}> {order.OnlineOrder.totPrice}</td>
          <td rowSpan={order.OnlineOrder.cartItems.length}> {order.OnlineOrder.createdAt}</td>
          <td>
                {editingOrderId === order._id ? (
                <select
                    value={order.OnlineOrder.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Prepared">Prepared</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            
                ) : (
                <span>{order.OnlineOrder.status}</span>
                )}
          </td>
          <td rowSpan={order.OnlineOrder.cartItems.length}>
            {editingOrderId === order._id ? (
          <>
            <button className="action-button save-button" onClick={() => {
                            updateOrderStatus(order._id, order.OnlineOrder.status);
                            alert('Data updated successfully');
                            setEditingOrderId(null);
                            }}>
            Save
            </button>
            <button className="action-button cancel-button" onClick={() => {handleCancelClick();setTemporaryStatus(order.OnlineOrder.status); }}>
            Cancel
            </button>
          </>
        ) : (
          <button className="action-button update-button" onClick={() => handleUpdateClick(order._id)}>Update</button>
        )}
          
            <button className="action-button delete-button" onClick={() => handleDelete(order._id)}>Delete</button>
          </td>
        </>
      )}
    </tr>
  ))
))}
</tbody>
</table>

        </>
    );
}

export default OnlineOrderDB;