import React, { useState } from 'react';
import ProductionTable from './ProductionTable';
import axios from 'axios';

const ProductionForm = ({ fetchProductions }) => {
    const [date, setDate] = useState('');
    const [products, setProducts] = useState([{ productName: '', quantity: '', unitPrice: '' }]);

    const handleAddProduct = () => {
        setProducts([...products, { productName: '', quantity: '', unitPrice: '' }]);
    };

    const handleProductChange = (index, event) => {
        const { name, value } = event.target;
        const newProducts = [...products];
        newProducts[index][name] = value;
        setProducts(newProducts);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5080/production/', { date, products });
            setDate('');
            setProducts([{ productName: '', quantity: '', unitPrice: '' }]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="App">
            <h1>Daily Production Tracker</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>

            {products.map((product, index) => (
                <div key={index} className="product-entry">
                    <input
                        type="text"
                        name="productName"
                        placeholder="Product Name"
                        value={product.productName}
                        onChange={(event) => handleProductChange(index, event)}
                        required
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={product.quantity}
                        onChange={(event) => handleProductChange(index, event)}
                        required
                    />
                    <input
                        type="number"
                        name="unitPrice"
                        placeholder="Unit Price"
                        value={product.unitPrice}
                        onChange={(event) => handleProductChange(index, event)}
                        required
                    />
                </div>
            ))}

            <button type="button" onClick={handleAddProduct}>
                Add Another Product
            </button>
            <button type="submit">Submit Production</button>
        </form>
        <h2>Production Records</h2>
        <ProductionTable  />
        </div>
    );
};

export default ProductionForm;
