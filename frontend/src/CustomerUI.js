import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerUI.css';

function View(){
    const navigate = useNavigate();
    return(
    <>
        <header>
        </header>
    <div class="container">
        <div class="c-m-s">
            <h2><b>Customer Management System</b></h2>
            <div class="img">
            </div>
            <div class="p">
                <p>A Customer Management System for a bakery management system helps track customer interactions, manage orders, and maintain customer satisfaction.</p>
                <p>It enables efficient handling of customer data, automates communication, and personalizes services.</p>
                <p>By integrating customer management into the bakery's operations, the system ensures timely responses, fosters customer loyalty, and drives sales growth.</p>
            </div>
            <div class="customer">
                <h3>Customer Details</h3><br></br>
                <button type="submit" onClick={() => navigate('/CustomerView')}>Click here</button>
            </div>
            <div class="inquiry">
                <h3>Customer Inquiry</h3><br></br>
                <button type="submit" onClick={() => navigate('/AdminInquiryView')}>Click here</button>
            </div>
        </div>
    </div>

    </>
  );
}

export default View;