import React, { useEffect,useState } from 'react';
import './Product_Report.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Product_Report(){
    const Navigate = useNavigate();

    //Sent Ptoduction section: form data
    const [sentItems, setSentItems] = useState([]);
    

    useEffect(() => {
        // Fetch posts from the backend
        axios.get('http://localhost:8000/sendstock')
            .then(response => {
                if (response.data.success) {
                    const updatedItems = response.data.existingPosts.map(item => ({
                        ...item,
                    }));
                    setSentItems(updatedItems);
                }
                else {
                    alert('Failed to fetch posts');
                }
            })
            .catch(error => {
                alert('There was an error fetching the posts!', error);
            });  
    });

    return(
        <>
        <div className='product-main'>
            <h1><center><u>Sent stock Details to Production Section</u></center></h1><br/><br/>
            {sentItems.map((item)=>(
            <div className='product-content' key={item._id}>
                <h3 className='dateLabel'>Date: <label>{item.stock.date}</label></h3><br/>
                <h3>Ingredient ID : <label>{item.stock.ingredientCode}</label></h3>
                <h3>Ingredient Name : <label>{item.stock.ingredientName}</label></h3>
                <h3>Unit Price : <label>{item.stock.unitPrice}</label></h3>
                <h3>Sent Quantity : <label>{item.stock.sendQuantity}</label></h3>
                <p className="ingredientReceived"><b>Ingredient received successfully
                <input type="checkbox" id="ingredientReceived" name="ingredientReceived"/></b></p>
            </div>
            ))}

            <button className='backBtn' onClick={()=>Navigate('/dashboard')}>Back</button>
        </div>
        </>
    )

}

export default Product_Report