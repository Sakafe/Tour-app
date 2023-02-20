import React, { createContext, useState } from 'react';
import * as firebase from "firebase/app";
import { initializeApp } from 'firebase/app';
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { getAuth } from "firebase/auth";
import './App.css';
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import Home from './Components/Home';
import NotFound from './Components/Pages/NotFound';
import Header from './Components/Header/Header';
import Booking from './Components/Booking/Booking';
import LogIn2 from './Components/Pages/LogIn2';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';


export const MyContext = createContext()

firebase.initializeApp(firebaseConfig);

function App(props) {
  
  const [showarea, setShowarea] = useState(
    {
      id:1,
      title:"Cox's Bazar",
      description:"Why Cox's Bazar is a Great Tourist Attraction Cox's Bazar Review. Cox's Bazar is famous for its long natural sandy sea beach. ... Cox's Bazar has the world's largest unbroken sea beach which stretches more than 120 km. The entire beach is a stretch of golden sandy sea beach which is reachable by motorbike.",
      img:'https://myownwaytotravel.com/wp-content/uploads/2021/01/Coxs-Bazar-Beach-sunset-moment-with-Canon-PowerShot-G7-X-Mark-III.jpg'
    }
  )
  const [loggedIn,setLoggedIn]=useState({});
  const [name, setName]=useState("user")
  return (
    <div className="App">
      <MyContext.Provider value={[loggedIn,setLoggedIn,name, setName,showarea, setShowarea]}>
      <h3>Email:{loggedIn.email}</h3>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/booking' element={<PrivateRoute><Booking/></PrivateRoute>}/>
          {/* <Route path='/booking' element={<Booking/>}/> */}
          <Route path='/login' element={<LogIn2/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
      </MyContext.Provider>
    </div>
  );
}

export default App;
