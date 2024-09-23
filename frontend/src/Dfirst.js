 import React from 'react';
 import { useNavigate } from 'react-router-dom';
 import './Dfirst.css';

 function Dfirst() {
  const navigate = useNavigate();

   return (
    <div className="das-delivery-management-page">
       
      <div className="das-left-side">
       
         <img
           src="pic.jpeg" 
         
          className="das-delivery-image"
         />
       </div>
       <div className="das-right-side">
      <div className="das-topic">
         <h2>Welcome to Delivery Management </h2>
         </div>
        <p>
           Welcome to the Delivery Management System admin panel. Here you can oversee and manage various aspects of your delivery operations. This includes managing your vehicles, handling order deliveries, and keeping track of daily delivery stocks. Use the navigation buttons below to access different sections of the system.
         </p>
         <br></br><hr></hr><br></br>
        <div className="das-button-container">
          <button className="das-nav-button" onClick={() => navigate('/Form')}>
            Manage Vehicles
           </button>
          
           <button className="das-nav-button" onClick={() => navigate('/orderdelivery')}>
             Order Delivery
           </button>
         
           <button className="das-nav-button" onClick={() => navigate('/dailyroute')}>
             Daily Delivery Stocks
           </button>
        </div>
      </div>
    </div>
   );
 }

 export default Dfirst;
