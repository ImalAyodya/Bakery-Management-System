

import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './Header.css';
import Bakerylogo from './images/logo.png';

function Header(){
  const navigate = useNavigate ();
  const Homepage = useNavigate ();
  const CommercialOrder = useNavigate();
  
    return(
<>
 
 <header>
            <div className="nav-bar">
                <h2 className="logo">Miyurasa Bakers</h2>
                {/*<img src={Bakerylogo}/>*/}
                <div className="nav-item">
                    <div className="nav-items">
                       <ul>
                        <li onClick={ ()=> Homepage ('/home')}><a href= "#home">Home</a></li>

                        <li onClick={ ()=> navigate ('/Online')}><a href="#home" class="dropbtn">Our Products</a>
                          
                        </li>
                        <li><a href="#home">Sign Up</a></li>
                        <li><a href="#home">Login</a></li>
                        <li onClick={ ()=> CommercialOrder('/')}><a href="#home">Profile</a></li>
                     
                       </ul> 
                        
                        
                    </div>
                </div>
             </div>
           
        </header>
        </>
    );

 
 

}

export default Header;