import React, { useState } from 'react';
import './OrderRequest.css';
import { useNavigate } from 'react-router-dom';

function OrderRequest(){

    const Navigate = useNavigate();

    return(
    <>

        <div className='addOrder-main'>
        <p className = 'topic'><b>Place Order Request</b></p>
            <div className='addOrder-body'>

                <div className = 'addOrder-topic'>
                    <br/>
                </div>

                <form className = 'addOrder-form'>
                    <p>Enter ingredient code : <br/>
                    <input type='text' className = 'addOrder-input' name='itemCode'/></p>

                    <p>Enter ingredient Name : <br/>
                    <input type='text' className = 'addOrder-input' name='itemName'/></p>

                    <p>Enter the Stock Quantity : <br/>
                    <input type='text' className = 'addOrder-input' name='stockLevel'/></p>

                    <input type='submit'className = 'addOrder-btn'/><br/>
                    <button className='cancelBtn' onClick={()=>Navigate('/dashboard')}>Cancel</button>
                                    
                </form>
            </div>
        </div>


    </>
    )
}

export default OrderRequest;