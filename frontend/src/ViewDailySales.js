import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderAdmin from './HeaderAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

 

const ViewDailySales = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
 
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
    <div className="das-sales-container">
      <HeaderAdmin/>
      <br></br><br></br>
      <h1>Daily Delivery Sales</h1>
      <div className="das-button-container1">
        <button className="das-btn1" onClick={() => navigate('/Form')}>View Vehicles and Drivers</button><br />
        <button className="das-btn1" onClick={() => navigate('/OrderDelivery')}>Order Delivery</button><br />
        <button className="das-btn1" onClick={() => navigate('/dailyroute')}>Daily Delivery Stocks</button>
      </div>
      <table className="das-sales-table">
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
