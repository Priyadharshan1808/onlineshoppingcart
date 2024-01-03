import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import firebase from "firebase/app"; 
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; 


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const firebaseConfig = {
    apiKey: "AIzaSyA6euFseg63zYAXBvdBzosrq2i3x7lz79c",
  authDomain: "onlineshopping-61224.firebaseapp.com",
  projectId: "onlineshopping-61224",
  storageBucket: "onlineshopping-61224.appspot.com",
  messagingSenderId: "1067296327971",
  appId: "1:1067296327971:web:4ef3bbf03ee7b8f046a496",
  measurementId: "G-SGDCYBT0MT"
  };
  
 
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app); // Pass the app instance to getAuth      
  

    
  const handleLogin = (e) => {
    e.preventDefault();
    const signInPromise = signInWithEmailAndPassword(auth, email, password)
  
    const fetchPromise = fetch("https://onlineshopping-api-wtx9.onrender.com/Registration")
      .then((resp) => resp.json())
      .then((res) => {
        const user = res.find((user) => user.email === email && user.password === password);
        if (user) {
          alert("Login Successful in Local Server....!");
          navigate("/home");
        } else {
          alert("Invalid Email or Password");
        }
      })
      .catch((error) => {
        alert("Error: " + error);
      });

      Promise.all([signInPromise, fetchPromise])
      .then((results) => {
        const [signInResult] = results;
        alert("Logged Successfully in Firebase..!");
        navigate("/home");
      })
      .catch((errors) => {
        console.error(errors);
      });
  };
  


  return (
    <div className="container w-25">
      <div className="card px-3 mt-5">
        <div className="card-title text-center">
          <h3>Login Form</h3>
        </div>
        <div className="card-bodybg">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input value={email} onChange={changeEmail} type="email" className="form-control" placeholder="Enter Your Email" />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input value={password} onChange={changePassword} type="password" className="form-control" placeholder="Enter Your Password"/>
            </div>
            <br />
            <input type="submit" className="btn btn-primary mx-1 px-4 " value="Login" />
            <label>Click the link to<Link to="/" className="mx-2">Register</Link></label>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;