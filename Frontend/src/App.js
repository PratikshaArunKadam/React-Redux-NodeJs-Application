import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import { Route, Routes, useNavigate } from 'react-router';
import SignUp from './components/SignUp';
import Country from './components/Country';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import Home from './components/Home';
import { useSelector } from 'react-redux';
import { selectUser } from './loginFeatures/userSlice';
import { useEffect } from 'react';
import Logout from './components/Logout';


function App() {
  const navigate=useNavigate();
  const user=useSelector(selectUser);
  useEffect(()=>{
    
    user ? navigate('/home') :  navigate('/');

   
  },[]);
  
  return (
    <div >
      <Routes>
      <Route path='/' element={<LoginPage></LoginPage>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/profile' element={<Profile></Profile>}></Route>
      <Route path='/update/:id' element={<UpdateProfile></UpdateProfile>}></Route>
      <Route path='/home' element={<Home></Home>}></Route>
      <Route path='/logout' element={<Logout></Logout>}></Route>
 
      </Routes>
    
    </div>
  );
}

export default App;
