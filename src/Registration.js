import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"


import firebase from "firebase/app"; 
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; 


function Registration() {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [passwordMatchError, setPasswordMatchError] = useState("");
    const [passwordcharacters, setPasswordcharacters] = useState("");

    const navigate=useNavigate()

    const changeName = (e) => {
        setName(e.target.value)
    }
    const changeEmail = (e) => {
        setEmail(e.target.value)
    }
    const changeMobile = (e) => {
        setMobile(e.target.value)
    }
    const changePassword = (e) => {
        setPassword(e.target.value)
    }
    const changeconfirmpassword = (e) => {
        setconfirmpassword(e.target.value)
    }

    useEffect(() => {
        if (password.length < 6) {
            setPasswordcharacters("Minimum 6 characters needed for Passwords");
        } else {
            setPasswordcharacters("  ");
        }
    }, [password]);

    useEffect(() => {
        if (password === confirmpassword) {
            setPasswordMatchError("");
        } else {
            setPasswordMatchError("Passwords do not match");
        }
    }, [password, confirmpassword]);

    const firebaseConfig = {
        apiKey: "AIzaSyA6euFseg63zYAXBvdBzosrq2i3x7lz79c",
        authDomain: "onlineshopping-61224.firebaseapp.com",
        projectId: "onlineshopping-61224",
        storageBucket: "onlineshopping-61224.appspot.com",
        messagingSenderId: "1067296327971",
        appId: "1:1067296327971:web:4ef3bbf03ee7b8f046a496",
        measurementId: "G-SGDCYBT0MT"
      };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app); // Pass the app instance to getAuth      


    const formSubmit = (e) => {
        e.preventDefault();
        let data = { id, name, email, mobile, password, confirmpassword };

        if (password === confirmpassword) {
            // Create a new user with Firebase Authentication
            const createUserPromise = createUserWithEmailAndPassword(auth, email, password)

            // Send data to the local server
            const sendDataToServerPromise = fetch("https://onlineshopping-api-wtx9.onrender.com/Registration", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(data)
            })
                .then((resp) => {
                    alert("Data Registered Successfully in Backend.....");
                    console.log("Test :", resp);
                    setName('');
                    setEmail('');
                    setMobile('');
                    setPassword('');
                    setconfirmpassword('');
                })
                .catch((err) => {
                    alert("Error: " + err);
                });


            // Use Promise.all to wait for both promises to complete
            Promise.all([createUserPromise, sendDataToServerPromise])
                .then((results) => {
                    // Additional actions after both promises have completed
                    const [signInResult] = results;
                    alert("Logged Successfully in Firebase..!");
                    navigate("/login")
                })
                .catch((errors) => {
                    // Handle errors if needed
                    console.error(errors);
                });
        } else {
            setPasswordMatchError("Passwords do not match");
        }
    };



    return (
        <div className="container w-50">
            <div className="card px-3 mt-5">
                <div className="card-title text-center">
                    <h3> Registration From</h3>
                </div>
                <div className="card-bodybg">
                    <form onSubmit={formSubmit}>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Name</label>
                            <input value={name} onChange={changeName} type="text" className="form-control" placeholder="Enter Name" required />
                        </div><br />
                        <div className="form-group">
                            <label for="exampleInputPassword1">Email ID</label>
                            <input value={email} onChange={changeEmail} type="email" className="form-control" placeholder="Enter Email ID" required />
                        </div><br />
                        <div className="form-group">
                            <label for="exampleInputPassword1">Mobile No</label>
                            <input value={mobile} onChange={changeMobile} type="number" className="form-control" placeholder="Enter Mobile No" required />
                        </div><br />
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input value={password} onChange={changePassword} type="password" className="form-control" placeholder="Enter Password" required />
                            <p><small className="text-danger">{passwordcharacters}</small></p>
                        </div><br />
                        <div className="form-group">
                            <label>confirm password</label>
                            <input value={confirmpassword} onChange={changeconfirmpassword} type="password" className="form-control" placeholder="Enter confirm password" required />
                        </div><p className="text-danger">{passwordMatchError}</p>
                        <br />
                        <div >
                            <span >
                                <input type="submit" className="btn btn-primary mx-1" value="Submit" />
                            </span>
                            <span className="float-end">
                                <Link to="/login" className="btn btn-success mx-1 px-3">Login Page</Link>
                            </span>
                        </div>


                    </form>

                </div>
            </div>

        </div>
    )
}

export default Registration;