import React, { useState } from 'react';
import '../App.css';

const ingredientsList = [
    { id: 1, name: 'Flour', costPerUnit: 34.5 },
    { id: 2, name: 'Sugar', costPerUnit: 35.5 },
    { id: 3, name: 'Butter', costPerUnit: 100.0 },
    { id: 4, name: 'Eggs', costPerUnit: 50.0 },
    { id: 5, name: 'Yeast', costPerUnit: 22.6 },
];

const IngredientRequest = () => {
    const [quantities, setQuantities] = useState({});
    const [totalCost, setTotalCost] = useState(0);

    const handleInputChange = (id, costPerUnit, value) => {
        const quantity = parseFloat(value) || 0;
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: quantity,
        }));

        const newTotalCost = Object.entries(quantities).reduce((acc, [ingredientId, qty]) => {
            return acc + (ingredientsList.find(ingredient => ingredient.id === parseInt(ingredientId)).costPerUnit * qty);
        }, costPerUnit * quantity);

        setTotalCost(newTotalCost);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Request submitted. Total cost: Rs.${totalCost.toFixed(2)}`);
    };

    return (
        <div className="ingredient-request-container">
            <h2>Request Ingredients</h2>
            <form onSubmit={handleSubmit}>
                {ingredientsList.map((ingredient) => (
                    <div key={ingredient.id} className="ingredient-item">
                        <label>{ingredient.name}</label>
                        <input
                            type="number"
                            min="0"
                            step="1"
                            placeholder="Quantity"
                            onChange={(e) => handleInputChange(ingredient.id, ingredient.costPerUnit, e.target.value)}
                        />
                        <span>Cost per unit: Rs.{ingredient.costPerUnit.toFixed(2)}</span>
                    </div>
                ))}
                <div className="total-cost">
                    <strong>Total Cost: Rs.{totalCost.toFixed(2)}</strong>
                </div>
                <button type="submit" className="submit-btn">Submit Request</button>
            </form>
        </div>
    );
};

export default IngredientRequest;
