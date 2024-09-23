import React, { useState, useEffect } from 'react';
import Buttonrow from "./components/Buttonrow";
import './tables.css';

const API_URL_PRODUCTIONS = 'http://localhost:8001/productions';
const API_URL_ONLINE_SALES = 'http://localhost:8001/onlineorder';
const API_URL_WHOLESALE_SALES = 'http://localhost:8001/order';
const API_URL_DELIVERY_SALES = 'http://localhost:8001/post2';

function SalesSummaryTable() {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [onlineSales, setOnlineSales] = useState([]);
  const [wholesaleSales, setWholesaleSales] = useState([]);
  const [deliverySales, setDeliverySales] = useState([]);
  const [productions, setProductions] = useState([]);

  // Fetch production details
  const fetchProductions = async () => {
    try {
      const response = await fetch(API_URL_PRODUCTIONS);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setProductions(data || []);
    } catch (error) {
      console.error('Error fetching productions:', error);
      setError('Error fetching productions');
    }
  };

  // Fetch online orders
  const fetchOnlineSales = async () => {
    try {
      const response = await fetch(API_URL_ONLINE_SALES);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setOnlineSales(data.data || []);
    } catch (error) {
      console.error('Error fetching online sales:', error);
      setError('Error fetching online sales');
    }
  };

  // Fetch wholesale orders
  const fetchWholesaleSales = async () => {
    try {
      const response = await fetch(API_URL_WHOLESALE_SALES);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setWholesaleSales(data.ReadData || []);
    } catch (error) {
      console.error('Error fetching wholesale sales:', error);
      setError('Error fetching wholesale sales');
    }
  };

  // Fetch delivery orders
  const fetchDeliverySales = async () => {
    try {
      const response = await fetch(API_URL_DELIVERY_SALES);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setDeliverySales(data.data || []);
    } catch (error) {
      console.error('Error fetching delivery sales:', error);
      setError('Error fetching delivery sales');
    }
  };

  useEffect(() => {
    fetchProductions();
    fetchOnlineSales();
    fetchWholesaleSales();
    fetchDeliverySales();
  }, []);

  const calculateSalesSummary = () => {
    return productions.flatMap((production) => {
      // Iterate over each product in the products array
      return production.products.map((product) => {
        const { productName, quantity: productQuantity, unitPrice: unitCost } = product;

        // Initialize quantities and earnings
        let soldQuantity = 0;
        let totalEarnings = 0;

        // Initialize logs for sold quantities
        const onlineSoldQuantities = [];
        const wholesaleSoldQuantities = [];
        const deliverySoldQuantities = [];

        // Accumulate quantities and earnings from online sales
        onlineSales.forEach(sale => {
          const cartItems = sale.OnlineOrder?.cartItems || [];
          cartItems.forEach(item => {
            if (String(item.productName) === String(productName)) {
              const quantity = item.quantity || 0;
              const earnings = (item.unitPrice || 0) * quantity;
              soldQuantity += quantity;
              totalEarnings += earnings;
              onlineSoldQuantities.push(quantity);
            }
          });
        });

        // Accumulate quantities and earnings from wholesale sales
        wholesaleSales.forEach(sale => {
          const products = sale.WholesaleOrder?.products || [];
          products.forEach(item => {
            if (String(item.product) === String(productName)) {
              const quantity = item.quantity || 0;
              const earnings = (item.unitPrice || 0) * quantity;
              soldQuantity += quantity;
              totalEarnings += earnings;
              wholesaleSoldQuantities.push(quantity);
            }
          });
        });

        // Accumulate quantities and earnings from delivery sales
        deliverySales.forEach(delivery => {
          const products = delivery.dailydelivery?.products || [];
          products.forEach(item => {
            if (String(item.product) === String(productName)) {
              const quantity = parseInt(item.quantity, 10) || 0; // Convert string to integer
              const earnings = parseFloat(item.totalprice) || 0; // Use totalprice directly
              soldQuantity += quantity;
              totalEarnings += earnings;
              deliverySoldQuantities.push(quantity);
            }
          });
        });

        // Calculate remaining unsold quantity
        const notSoldQuantity = productQuantity - soldQuantity;

        // Calculate total production cost and net earnings
        const productionCost = productQuantity * unitCost;
        const netEarnings = totalEarnings;

        // Calculate profit
        const profit = totalEarnings - (soldQuantity * unitCost);

        return {
          productID: productName, // Change to productName since that's what your data has
          date: production.date,  // Use the date from production level
          productionCost,
          soldQuantity,
          notSoldQuantity,
          totalEarnings: netEarnings,
          profit
        };
      });
    });
  };

  useEffect(() => {
    if (productions.length > 0 && onlineSales.length > 0 && wholesaleSales.length > 0 && deliverySales.length > 0) {
      const summary = calculateSalesSummary();
      setSummary(summary);
      setLoading(false);
    }
  }, [productions, onlineSales, wholesaleSales, deliverySales]);

  // Function to format currency values for display
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR', // Change to LKR for Sri Lankan Rupees
      minimumFractionDigits: 2, // Ensures that the format includes two decimal places
    }).format(value);
  };

  // Function to format the date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <>
      <h1 className="salesmanag">Sales Summary</h1>
      <Buttonrow />
      <hr />

      <div className="table4">
        <h6 className="tableheading">Sales Summary Table</h6>

        {/* Display loading state */}
        {loading && <p>Loading data...</p>}

        {/* Display error message if any */}
        {error && <p className="error-message">{error}</p>}

        {/* Display table if data is available */}
        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Date</th>
                <th>Cost for Production</th>
                <th>Sold Quantity</th>
                <th>Not Sold Quantity</th>
                <th>Total Earnings</th>
                <th>Profit</th> {/* New column header */}
              </tr>
            </thead>
            <tbody>
              {summary.length > 0 ? (
                summary.map((item, index) => (
                  <tr key={index}>
                    <td>{item.productID}</td>
                    <td>{formatDate(item.date)}</td>
                    <td>{formatCurrency(item.productionCost)}</td>
                    <td>{item.soldQuantity}</td>
                    <td>{item.notSoldQuantity}</td>
                    <td>{formatCurrency(item.totalEarnings)}</td>
                    <td>{formatCurrency(item.profit)}</td> {/* New column data */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No sales summary data available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default SalesSummaryTable;