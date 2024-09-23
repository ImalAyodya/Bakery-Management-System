import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inquiry.css';



function Inquiry() {

    const navigate = useNavigate();
    

    return (
         <div className='inquiry-body'>

            <h1>Inquiry Management</h1>
            
            <form className="inquiry-form" >
                <h2>Submit an Inquiry</h2>
                <label className='iName' htmlFor="name">Name:</label>
                <input type="text" id="name" name="name"  required />
                
                <label className htmlFor="iemail">Email:</label>
                <input type="email" id="email" name="email"required />
                
                <label className htmlFor="iphone">Phone Number:</label>
                <input type="tel" id="phone" name="phone"  required />
                
                <label className htmlFor="iresponse-method">Preferred Method of Response:</label>
                <select id="response-method" name="responseMethod"  required>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                </select>
                
                <label className htmlFor="imessage">Question or Concerns:</label>
                <textarea id="message" name="message"  required></textarea>
                
                <button type="submit">Submit</button>
            </form>
            
         </div>
        
    );
    }

export default Inquiry;
