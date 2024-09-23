import { useState, useEffect } from 'react';
import Buttonrow from "./components/Buttonrow";
import './tables.css';

// Define the backend API endpoint
const API_URL = 'http://localhost:8001/productions';  // Update the URL if needed

function Prform() {
    const [productions, setProductions] = useState([]);
    const [productID, setProductID] = useState('');
    const [date, setDate] = useState('');
    const [unitCost, setUnitCost] = useState('');
    const [productQuantity, setProductQuantity] = useState('');

    // Fetch production details from the backend
    const fetchProductions = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setProductions(data);  // Ensure data matches the format from backend
        } catch (error) {
            console.error('Error fetching productions:', error);
        }
    };

    useEffect(() => {
        fetchProductions();
    }, []);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productID,
                    date,
                    unitCost,
                    productQuantity,
                }),
            });

            if (!response.ok) throw new Error('Failed to post production');
            const newProduction = await response.json();
            setProductions([...productions, newProduction]);
            // Reset form fields
            setProductID('');
            setDate('');
            setUnitCost('');
            setProductQuantity('');
        } catch (error) {
            console.error('Error submitting production:', error);
        }
    };

    return (
        <>
            <h1 className="salesmanag">Production Details</h1>
            <Buttonrow />
            <hr />

            <div className="table4">
                <h6 className="tableheading">Production Details</h6>
                <input 
                    type="search" 
                    className="search" 
                    id="search" 
                    name="search" 
                    placeholder='Search' 
                />
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productions.length > 0 ? (
                            productions.map((production, index) => (
                                <tr key={index}>
                                    <td>{new Date(production.date).toLocaleDateString()}</td>
                                    <td colSpan={3}>
                                        {production.products.map((product, productIndex) => (
                                            <div key={productIndex}>
                                                <strong>{product.productName}</strong> <br />
                                                Quantity: {product.quantity} <br />
                                                Unit Price: Rs. {product.unitPrice}
                                                <hr />
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No production data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* <form onSubmit={handleSubmit}>
                <div><h1 className="getdet">Calculate And Proceed</h1></div>
                <label htmlFor="date">Date :</label>
                <input 
                    type="date" 
                    id="date" 
                    name="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                /><br />
                <label htmlFor="productid">Product ID :</label>
                <input 
                    type="text" 
                    id="productid" 
                    name="productid" 
                    value={productID}
                    onChange={(e) => setProductID(e.target.value)}
                /><br />
                <label htmlFor="unitCost">Unit Cost :</label>
                <input 
                    type="text" 
                    id="unitCost" 
                    name="unitCost" 
                    value={unitCost}
                    onChange={(e) => setUnitCost(e.target.value)}
                /><br />
                <label htmlFor="productQuantity">Product Quantity :</label>
                <input 
                    type="text" 
                    id="productQuantity" 
                    name="productQuantity" 
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                /><br />
                <button type="submit" id="calcbuttonn">Calculate</button>
            </form> */}
        </>
    );
}

export default Prform;
