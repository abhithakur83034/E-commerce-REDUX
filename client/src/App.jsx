import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./component/Register";
import Add from "./component/Add";
import Login from "./component/Login";
import Show from "./component/Show";
import { ToastContainer } from "react-toastify";
import Admin from "./component/Admin";
import Home from "./component/Home";
import "./global.css";
import Cart from "./component/Cart";
// import Component from './redux/container/Component';
const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  console.log("user",user)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {user || admin ?
              <Route path="/register" element={<h1>404 error</h1>} />              
            :           
              <Route path="/register" element={<Register />} />                        
          }


          {user || admin ?
              <Route path="/login" element={<h1>404 error</h1>} />
            : 
               <Route path="/login" element={<Login />} />
              }


          {user || !admin ? 
              <Route path="/add" element={<h1>404 error</h1>} />
              :
              <Route path="/add" element={<Add />} />
              }


          {user || admin ?
              <Route path="/show" element={<Show />} />
              : 
              <Route path="/show" element={<h1>404 error</h1>} />
            }
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/cart" element={<Cart/>}/>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;
