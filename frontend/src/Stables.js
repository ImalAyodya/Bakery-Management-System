import React, { useState, useEffect } from 'react';
import Buttonrow from "./components/Buttonrow";
import './tables.css';
import { parse, format } from 'date-fns'; // Import date parsing functions

function Stables() {
    const [onlineSales, setOnlineSales] = useState([]);
    const [wholesaleSales, setWholesaleSales] = useState([]);
    const [deliverySales, setDeliverySales] = useState([]);

    const fetchOnlineSales = async () => {
        try {
            const response = await fetch('http://localhost:8001/onlineorder');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setOnlineSales(data.data || []);
        } catch (error) {
            console.error('Error fetching online sales:', error);
        }
    };

    const fetchWholesaleSales = async () => {
        try {
            const response = await fetch('http://localhost:8001/order');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setWholesaleSales(data.ReadData || []);
        } catch (error) {
            console.error('Error fetching wholesale sales:', error);
        }
    };

    const fetchDeliverySales = async () => {
        try {
            const response = await fetch('http://localhost:8001/post2');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log('Fetched data:', data); // Log the data for debugging
            setDeliverySales(data.data || []);
        } catch (error) {
            console.error('Error fetching delivery sales:', error);
        }
    };

    useEffect(() => {
        fetchOnlineSales();
        fetchWholesaleSales();
        fetchDeliverySales();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const date = event.target.date.value;
        const productId = event.target.productid.value;
        console.log('Date:', date);
        console.log('Product ID:', productId);
    };

    const formatDateString = (dateString) => {
        try {
            const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
            return format(parsedDate, 'MM/dd/yyyy'); // Format date for display
        } catch (error) {
            console.error('Error parsing date:', error);
            return dateString; // Return the original string if parsing fails
        }
    };

    return (
        <>
            <h1 className="salesmanag">Sales Records By Order Types</h1>
            <Buttonrow />
            <hr />

            <div className="table1">
                <h6 className="tableheading">Online Sales</h6>
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Date</th>
                            <th>Selling Price</th>
                            <th>Sold Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {onlineSales.length > 0 ? (
                            onlineSales.flatMap((order) =>
                                order.OnlineOrder.cartItems.map((item, index) => (
                                    <tr key={`${order._id}-${index}`}>
                                    <td>{item.productName}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>{item.unitPrice}</td>
                                    <td>{item.quantity}</td>
                                  </tr>
                                ))
                            )
                        ) : (
                            <tr>
                                <td colSpan="4">No online sales data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="table2">
                <h6 className="tableheading">Wholesale Sales</h6>
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Date</th>
                            <th>Selling Price</th>
                            <th>Quantity Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wholesaleSales.length > 0 ? (
                            wholesaleSales.flatMap((sale) => {
                                const order = sale.WholesaleOrder;
                                return order.products.map((product, index) => (
                                    <tr key={`${sale._id}-${index}`}>
  <td>{product.product}</td>
  <td>{new Date(order.deliveryDate).toLocaleDateString()}</td>
  <td>{product.unitPrice}</td>
  <td>{product.quantity}</td>
</tr>
                                ));
                            })
                        ) : (
                            <tr>
                                <td colSpan="4">No wholesale sales data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="table3">
                <h6 className="tableheading">Delivery Sales</h6>
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Date</th>
                            <th>Selling Price</th>
                            <th>Quantity Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliverySales.length > 0 ? (
                            deliverySales.flatMap((sale) => {
                                const order = sale.dailydelivery;
                                return order.products.map((product, index) => (
                                    <tr key={`${sale._id}-${index}`}>
  <td>{product.product}</td>
  <td>{formatDateString(order.date)}</td> {/* Use the custom date formatter */}
  <td>{product.unitprice}</td>
  <td>{product.quantity}</td>
</tr>
                                ));
                            })
                        ) : (
                            <tr>
                                <td colSpan="4">No delivery sales data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* <form onSubmit={handleSubmit}>
                <div>
                    <h1 className="getdet">Calculate And Proceed</h1>
                </div>

                <label htmlFor="date">Date :</label>
                <input type="date" id="date" name="date" /><br />
                <label htmlFor="productid">Product ID :</label>
                <input type="text" id="productid" name="productid" /><br />

                <button type="submit" id="calcbuttonn">Calculate</button>
            </form> */}
        </>
    );
}

export default Stables;