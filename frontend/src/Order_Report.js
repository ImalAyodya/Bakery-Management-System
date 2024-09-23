import React, { useEffect,useState } from 'react';
import './Order_Report.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Order_Report(){
    const Navigate = useNavigate();

    const [items, setItems] = useState([]);

    useEffect(() => {
        // Fetch posts from the backend
        axios.get('http://localhost:8000/supplierrequest')
            .then(response => {
                if (response.data.success) {
                    const updatedItems = response.data.existingPosts.map(item => ({
                        ...item,
                    }));
                    setItems(updatedItems);
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
        <div className='Order-main'>
            <h1><center><u>Ingredient Order Request deails</u></center></h1><br/><br/>
            {items.map((item)=>(
            <div className='Order-content' key={item._id}>
                <h3 className='dateLabel'>Date: <label>{item.order?.date}</label></h3><br/>
                <h3>Ingredient ID : <label>{item.order?.ingredientCode}</label></h3>
                <h3>Ingredient Name : <label>{item.order?.ingredientName}</label></h3>
                <h3>Sent Quantity : <label>{item.order?.orderQuantity}</label></h3>
                <p className="ingredientReceived"><b>Ingredient received successfully
                <input type="checkbox" id="ingredientReceived" name="ingredientReceived"/></b></p>
            </div>
            ))}

            <button className='Order_backBtn' onClick={()=>Navigate('/dashboard')}>Back</button>
        </div>
        </>
    )


}

export default Order_Report;