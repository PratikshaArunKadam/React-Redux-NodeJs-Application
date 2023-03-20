import React, { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../loginFeatures/userSlice";
import "./LoginPage.css";
import Navigation from "./Navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const onClickHandler = async (event) => {
    event.preventDefault();
    let result;
    try {
      result = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result.email) {
        const user = {
          name: result.username,
          email: result.email,
          id: result._id,
          loggedIn: true,
        };
        localStorage.setItem('users', JSON.stringify(result._id));
        localStorage.setItem('username', JSON.stringify(result.username));
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(login(user));
        navigate("/home");
      } else {
        setLoginError("Enter Correct Email And Password");
      }
    } catch (error) {
      console.error(error);
      setLoginError("Unable to log in. Please try again later.");
    }
  };

  return (
    <>
    {/* <Navigation></Navigation> */}
      <div className="logindiv">
      <div  className="mx-auto col-12 col-md-6 col-lg-4 col-sm-12 shadow-lg p-3 mb-5 bg-white logindiv1 rounded ">
      <h1>Login</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="label">Email address</Form.Label>
            <FormControl type="email" placeholder="Enter email"  onChange={(e)=>{setEmail(e.target.value)}} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="label">Password</Form.Label>
            <FormControl type="password" placeholder="Password"  onChange={(e)=>{setPass(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
           
          </Form.Group>
          <div class="col-md-12 text-center" >
          <Link to={"/"}>
            <Button variant="primary" type="submit" className="button" onClick={onClickHandler}>
              Login
            </Button>
            </Link>
            <div>New User Click <Link to={"/signup"}> SignUp</Link>
            </div> 
            {loginError &&<div>{loginError}</div>}
            </div>

        
        </Form>
      </div>
      </div>
     
    </>
  );
};

export default LoginPage;
