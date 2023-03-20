import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import {Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Navigation = () => {
  const username=JSON.parse(localStorage.getItem('username'));
    return (
        <div >
            <Navbar expand="lg"  className='navigation' >
      <div >
        
     
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        
         
         <h4>Welcome, {username}</h4> 
         <div className='navbutton'>
            <Link to="/home" className='a'> Home</Link>
             <Link to="/profile" className='a'> Profile</Link>
              <Link to="/logout" className='a'> Logout</Link>
            

             </div>  
        </Navbar.Collapse>
      </div>
      
           
        
    </Navbar>
        </div>
    );
};

export default Navigation;