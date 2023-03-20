import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate ,useParams} from "react-router-dom";
import Country from "./Country";
import Navigation from "./Navigation";
import "./Signup.css";
const SignUp = (props) => {
  const [username, setUser] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password,setPassword]=useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [userNameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  
  const [selectedCity, setSelectedCity] = useState();
  const [country,setCountry]=useState();
  const [state,setState]=useState();
 
  const Navigate = useNavigate();
 const {id}=useParams();
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/signup?id=${id}`).then(response => {
        response.json().then(result => {
        //   console.log(result.username);
        //   console.log(result._id);
          // console.log(result.username);
          setUser(result.username);
          setEmail(result.email);
          setDob(result.dob);
          setMobile(result.mobile);
          setCountry(result.country);
          setState(result.state);
          setSelectedCity(result.city);
          // console.log(userData[0]);
        });
      });
    }
  }, [id]);
  useEffect(() => {
    // Fetch countries
    fetch('http://localhost:5000/country')
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.error(err));
  }, []);

  const handleUsernameChange = (event) => {
    const { value } = event.target;
    setUser(value);
    setIsFormValid(validateForm(value, dob, email, mobile));
   
  };

  const handleDobChange = (event) => {
    const { value } = event.target;
    setDob(value);
    setIsFormValid(validateForm(username, value, email, mobile));
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setIsFormValid(validateForm(username, dob, value, mobile));
  };

  const handleMobileChange = (event) => {
    const { value } = event.target;
    setMobile(value);
    setIsFormValid(validateForm(username, dob, email, value));
  };

  const passwordHandleChange=(event)=>{
    const {value}=event.target;
    setPassword(value);
    // setIsFormValid(validateForm(username, dob, email, mobile,value));
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('Submitted!');
   
  };
 
  async function onUpdataHandler(event) {
    event.preventDefault();

    const signupData = {
      username: username,
      dob: dob,
      email: email,
      mobile: mobile,
      password:password,
      country:country,
      state:state,
      city:selectedCity
    };


    const response = await fetch(`http://localhost:5000/signup/${id}` , {
      method: "PUT",
      body: JSON.stringify(signupData),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
  
   Navigate("/profile");
  }


 
  const validateForm = (username, dob, email, mobile) => {
    // Username should contain only letters
    const usernameRegex = /^[A-Za-z]+$/;
    if (!usernameRegex.test(username)) {
      setUsernameError("Username should be in characters only");
      return false;
    } else{
      setUsernameError("");
    }

    // Date of birth should be in the past
    const dobDate = new Date(dob);
    if (dobDate >= new Date()) {
      return false;
    }

    // Email should be a valid email address
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please Enter Valid Email address");
      return false;
    } else{
      setEmailError("");
    }

   
    // Mobile number should be 10 digits
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      setMobileError("Mobile No should be 10 digits only")
      return false;
    }else{
      setMobileError("");
    }
    // const passwordRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    // if(!password.match(passwordRegex)){
    //   setPasswordError(`Password should contain at least 8 characters
    //   At least 1 lowercase
    //   At least 1 Uppercase
    //   At least 1 special character
    //   At least 1 digit`);
    //   return false;
    // } else{
    //   setPasswordError("");
    // }

    return true;
  };
  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    // Fetch states for selected country
    fetch(`http://localhost:5000/state?country=${countryId}`)
      .then(res => res.json())
      .then(data => setStates(data))
      .catch(err => console.error(err));

      const selectCountry = countries.find(country => country._id === countryId);
      setCountry(selectCountry ? selectCountry.name : "");
      // console.log(country);
     
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    // Fetch cities for selected state
    fetch(`http://localhost:5000/city?state=${stateId}`)
      .then(res => res.json())
      .then(data => setCities(data))
      .catch(err => console.error(err));

      const selectState = states.find(state => state._id === stateId);
      setState(selectState ? selectState.name : "");
    
      // console.log(country);
  };

 
  const handleLocationsData=(e)=>{
// console.log(cities);
    const selectedId = e.target.value;
    const selectCity = cities.find(city => city._id === selectedId);
    setSelectedCity(selectCity ? selectCity.name : "");
    // console.log(selectedCity);
    
   
   
  }

  return (
    <div>
     <Navigation></Navigation>
      <div className="mx-auto col-12 col-md-6 col-lg-4 col-sm-12 bgdiv">
      <h1>Update Profile</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter UserName"
              value={username}
              onChange={handleUsernameChange}
              // required
            />
            {userNameError && <div className="error">{userNameError}</div>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date Of Birth</Form.Label>
            <Form.Control
             
              type="date"
              id="dob"
              max={new Date().toISOString().split("T")[0]}
              value={dob}
              onChange={handleDobChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              // required
            />
             {emailError && <div className="error">{emailError}</div>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="tel"
              id="mobile"
              pattern="[0-9]{10}"
              value={mobile}
              onChange={handleMobileChange}
              // required
            >
              
            </Form.Control>
            {mobileError && <div className="error">{mobileError}</div>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            {passwordError && <div className="error">{passwordError}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Reset Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={passwordHandleChange} />
            {passwordError && <div className="error">{passwordError}</div>}
          </Form.Group>


          
          <div className='dropdown'>
      <label htmlFor="country">Country:</label>
      <select id="country" onChange={handleCountryChange} placeholder="Select Country" className='dropdownSelect'>
      <option value="" >{country}</option>
        {countries.map(country => (
          <>
           
          <option key={country._id} value={country._id}  >{country.name}</option>
          </>
        ))}
      </select>
      </div>
      <div className='dropdown'>
      <label htmlFor="state">State:</label>
      <select id="state" onChange={handleStateChange} className='dropdownSelect'>
        <option value="">{state}</option>
        {states.map(state => (
          <option key={state._id} value={state._id}>{state.name}</option>
        ))}
      </select>
      </div>
<div className='dropdown'>
      <label htmlFor="city">City:</label>
      <select id="city" onChange={handleLocationsData} className='dropdownSelect'>
        <option value="" >{selectedCity}</option>
        {cities.map(city => (
          <option key={city._id} value={city._id}>{city.name}</option>
        ))}
      </select>
      </div>
      <div class="col-md-12 text-center" >
      <Button
            variant="primary"
            type="submit"
            className="button"
            onClick={onUpdataHandler}
            // disabled={!isFormValid}
          >
            Update
          </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
