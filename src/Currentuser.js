import firebase from "firebase/app"; // Import only the base Firebase module
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";


    
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
const auth = getAuth()

function Currentuser(){
    const [user,setUser]=useState()
    useEffect(()=>{
        let x = onAuthStateChanged(auth,Cuser=>setUser(Cuser))
        return x
    },[])
    console.log("Current User :",user)
    return user
}
export default Currentuser;