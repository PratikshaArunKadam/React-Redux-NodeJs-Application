import React, { useEffect, useState } from 'react';
import { Button, NavLink ,Navbar} from 'react-bootstrap';
import { Link } from "react-router-dom";
import Navigation from './Navigation';
import './Profile.css'
const Profile = () => {
    const [username,setUserName]=useState();
    const [email,setEmail]=useState();
    const [dob,setDob]=useState();
    const [mobile,setMobile]=useState();
    const [country,setCountry]=useState();
    const [state,setState]=useState();
    const [city,setCity]=useState();
    const str=localStorage.getItem('users');
     const id=JSON.parse(str);
    useEffect(() => {
        if (id) {
          fetch(`http://localhost:5000/signup?id=${id}`).then(response => {
            response.json().then(result => {
              console.log(result.username);
              console.log(result._id);
              // console.log(result.username);
              setUserName(result.username);
              setEmail(result.email);
              setDob(result.dob);
              setMobile(result.mobile);
              setCountry(result.country);
              setState(result.state);
              setCity(result.city);
              // console.log(userData[0]);
            });
          });
        }
      }, [id]);
    

    return (
       
      <>
    <Navigation></Navigation>
      <div class="mx-auto col-12 col-md-12 col-lg-12 col-sm-12">
      
       
  <div class="row">
    <div class="col-md-8 mx-auto">
      <div class="card shadow">
        <div class="card-body bgdiv">
          <h4 class="card-title md-9 heading">Profile Information</h4>
          <hr/>
          <div class="row">
            <div class="col-md-3">
              <h5 class="card-subtitle mb-2">Full Name</h5>
            </div>
            <div class="col-md-9">
              <p class="card-text">{username}</p>
            </div>
          </div>
          <hr/>
          <div class="row">
            <div class="col-md-3">
              <h5 class="card-subtitle mb-2">Email</h5>
            </div>
            <div class="col-md-9">
              <p class="card-text">{email}</p>
            </div>
          </div>
          <hr/>
          <div class="row">
            <div class="col-md-3">
              <h5 class="card-subtitle mb-2">Phone</h5>
            </div>
            <div class="col-md-9">
              <p class="card-text">{mobile}</p>
            </div>
          </div>
          <hr/>
          <div class="row">
            <div class="col-md-3">
              <h5 class="card-subtitle mb-2">Date of Birth</h5>
            </div>
            <div class="col-md-9">
              <p class="card-text">{dob}</p>
            </div>
          </div>
          <hr/>
          <div class="row">
            <div class="col-md-3">
              <h5 class="card-subtitle mb-2">Location</h5>
            </div>
            <div class="col-md-9">
              <p class="card-text">{city}, {state}, {country}</p>
            </div>
          </div>
          <hr/>
          <div class="row">
            <div class="col-md-12 text-center">
              <Link to={'/update/'+id} ><Button class="btn btn-primary">Edit</Button></Link>
          
            
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</>
    );
};

export default Profile;