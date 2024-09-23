import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

 // You can style your table in this CSS file

const ViewDailySales = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  // Initialize navigate function
  const navigate = useNavigate();

  // Fetch sales data from the backend
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/deliverysales');
        if (response.data.success) {
          setSalesData(response.data.sales);
        } else {
          alert('Failed to fetch sales data');
        }
      } catch (error) {
        alert('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sales-container">
      <h1>Daily Delivery Sales</h1>
      <div className="button-container1">
        <button className="btn1" onClick={() => navigate('/Form')}>View Vehicles and Drivers</button><br />
        <button className="btn1" onClick={() => navigate('/OrderDelivery')}>Order Delivery</button><br />
        <button className="btn1" onClick={() => navigate('/dailyroute')}>Daily Delivery Stocks</button>
      </div>
      <table className="sales-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Vehicle No</th>
            <th>Driver Name</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale) => (
            <tr key={sale._id}>
              <td>{sale.dailydelivery.date}</td>
              <td>{sale.dailydelivery.vehicleno}</td>
              <td>{sale.dailydelivery.drivername}</td>
              <td>
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sale.dailydelivery.products.map((product, index) => (
                      <tr key={index}>
                        <td>{product.product}</td>
                        <td>{product.quantity}</td>
                        <td>{product.unitprice}</td>
                        <td>{product.totalprice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewDailySales;
