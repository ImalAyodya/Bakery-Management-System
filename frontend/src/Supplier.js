import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Supplier.css';
import supplierImage from './Images/supplier.jpg';

function SupplierUI(){
    const navigate = useNavigate();
    return(
    <>
    <header>
    </header>

      <div className='top-area'>
        <div className= 'topic'>
          <p><b>Supplier<br/>
          Management<br/>
          System</b></p>
        </div>
        <div className='top-image'>
          <img className = 'top-image' src={supplierImage} alt="Supplier" />
        </div>

      </div>

    <div className='img'>

        <div className='purpose'>
          <h2>Our Supplier Management System</h2>
          <p>A Supplier Management System for a bakery management system streamlines the procurement process, ensuring a seamless supply of high-quality ingredients and materials.</p>
          <p>It enables efficient tracking of supplier performance, automates order placements, and monitors inventory levels. </p>
          <p>By integrating supplier management into the bakery's operations, the system helps maintain optimal stock levels, reduces waste, and ensures timely deliveries, ultimately contributing to consistent product quality and operational efficiency.</p>
        </div>

      <div className= "body">

        <div className = 'supplier-btn'>
          <img className='supplier-img' alt=""/>
          <h2 align='center'>Supplier Details</h2>
          <button onClick={() => navigate('/View')}>Click here</button>
        </div>

        <div className = 'supplier-btn'>
          <img className='supplier-img' alt=""/>
          <h2 align='center'>Orders</h2>
          <button onClick={() => navigate('/OrderView')}>Click here</button>
        </div>
        
      </div>

    </div>

    <br/><br/><br/><br/>


    </>
  );
}

export default SupplierUI;