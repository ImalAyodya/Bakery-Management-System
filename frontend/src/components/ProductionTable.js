import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ProductionTable = ({ productions }) => {

    const [production, setProductions] = useState([]);

    const fetchProductions = async () => {
        try {
            const response = await axios.get('http://localhost:5080/production');
            setProductions(response.data);
        } catch (error) {
            console.error('Error fetching production data', error);
        }
    };

    useEffect(() => {
        fetchProductions();
    }, []);

    return (
        <div className="production-table">
            <table productions={productions}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                    {production.map((production) => (
                        <tr key={production._id}>
                            <td>{new Date(production.date).toLocaleDateString()}</td>
                            <td>
                                {production.products.map((product, index) => (
                                    <div key={index}>
                                        <strong>{product.productName}</strong><br /> Units:{product.quantity} <br />Unit Price : Rs.{product.unitPrice}
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductionTable;
