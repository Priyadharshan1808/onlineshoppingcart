import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import Footer from "./Footer";

import "./App.css"

import axios from "axios";

function Cart() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [value, setValue] = useState("")
    const [sort, setSort] = useState("")
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0); // State variable for cart count

    let options = ['name', 'price']


    useEffect(() => {
        // fetch("http://localhost:3006/Cart?_order=asc")
        //     .then((res) => res.json())
        //     .then((resp) => {
        //         setData(resp);
        //     })
        //     .catch((err) => {
        //         console.log("Error: ", err);
        //     });
        axios.get("https://onlineshopping-api-wtx9.onrender.com/Cart")
            .then((response) => {
                setData(response.data);
                setCartCount(response.data.length);
            })
            .catch((error) => {
                console.error("Error fetching cart data:", error);
            });
    }, []);

    // const addToCart = async (itemId) => {
    //     // Find the item with the specified ID in your product data
    //     const itemToAdd = data.find(item => item.id === itemId);

    //     if (!itemToAdd) {
    //         console.error("Item not found.");
    //         return;
    //     }

    //     // Check if the item is already in the cart
    //     const isItemInCart = cart.some(cartItem => cartItem.id === itemId);

    //     if (!isItemInCart) {
    //         // Update the cart count and setCart
    //         setCartCount(cartCount + 1);
    //         setCart([...cart, itemToAdd]);

    //         // Send a POST request to add the item to the cart on your local server
    //         axios.post("http://localhost:3006/Cart", itemToAdd)
    //             .then((response) => {
    //                 console.log("Product added to cart on the server.");
    //             })
    //             .catch((error) => {
    //                 console.error("Error adding product to cart:", error);
    //             });
    //     }
    // };

    const addToCart = async (itemId) => {
        // Find the item with the specified ID in your product data
        const itemToAdd = data.find(item => item.id === itemId);

        if (!itemToAdd) {
            console.error("Item not found.");
            return;
        }

        // Check if the item is already in the cart
        const isItemInCart = cart.some(cartItem => cartItem.id === itemId);

        if (!isItemInCart) {
            // Send a POST request to add the item to the cart on your local server
            axios.post("https://onlineshopping-api-wtx9.onrender.com/Cart", itemToAdd)
                .then((response) => {
                    console.log("Product added to cart on the server.");
                    // Update the cart count and setCart
                    setCartCount(cartCount + 1);
                    setCart([...cart, itemToAdd]);
                })
                .catch((error) => {
                    console.error("Error adding product to cart:", error);
                });
        }
    };




    const handleSearch = () => {
        if (value.trim() === "") {
         
            fetch("https://onlineshopping-api-wtx9.onrender.com/Cart?_order=asc")
                .then((res) => res.json())
                .then((resp) => {
                    setData(resp);
                })
                .catch((err) => {
                    console.log("Error: ", err);
                });
        } else {
            axios
                .get("https://onlineshopping-api-wtx9.onrender.com/Cart?q=${value}")
                .then((res) => {
                    setData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleInputChange = (e) => {
        setValue(e.target.value);
        handleSearch();
    };

    const handleInputChangeKeyPress = (e) => {
        // if (e.key === "Enter") {
        handleSearch();
        // }
    };

    const sortData = async (e) => {
        e.preventDefault();
        let value = e.target.value;
        setSort(value);
        return await axios.get("https://onlineshopping-api-wtx9.onrender.com/Cart?_sort=${value}&_order=asc")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const changeDelete = (id) => {
        fetch("https://onlineshopping-api-wtx9.onrender.com/Cart/" + id, {
            method: "DELETE",
        })
            .then(() => {
                
                window.location.reload()
               
                setCartCount(cartCount - 1);
                setCart(cart.filter(item => item.id !== id));
            })
            .catch((err) => {
                console.log("Error: ", err);
                alert("Error: " + err);
            });
    };

    const logout = () => {
        alert("Successfully Logout...!");
        navigate("/login");
    };

    const carts = () => {
        navigate("/cart");
    };

    

    return (
        <div class="">


            <div className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/home">
                        <img src="/image/Logo/OIP.jpeg" width="50" height="50" className="d-inline-block align-top" alt="" />
                        <span class="mx-5"></span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="input-group mb-3 mt-2 mx-sm-3" align="center">
                            <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
                            <input type="text" className="form-control form-control-sm" value={value} onChange={handleInputChange} onKeyPress={handleInputChangeKeyPress} placeholder="Filter Records..." />
                        </div>
                        <div>
                            {/* Display the cart count in a badge */}
                            <span className="position-relative">
                                <button class="rounded-circle mx-2" onClick={carts}>
                                    <i class="fa-regular fa-bell"></i>
                                    {cartCount > 0 && (
                                        <span className="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
                                            {cartCount}
                                        </span>
                                    )}
                                </button>
                            </span>
                        </div>

                        <div class="rounded-circle mx-2 d-flex">
                            <button class="border-0 mx-1" ><i class="fa-regular fa-circle-user"></i>
                                <span>user Name</span></button>
                        </div>
                        <form className="d-flex">
                            <span className="">
                                <input type="button" className="btn btn-outline-danger" onClick={logout} value="Logout" />
                            </span>
                        </form>
                    </div>
                </div>
            </div>


            <br />
            <div>
                <h3 className="mx-3">Products in Cart's</h3>
            </div>
            <div class="row mx-2 ">
                {/* right side */}
                <div className=" col-md-12 container-fluid-md my-2 p-1">
                    <div className="card px-3 card-table border-0">
                        <div className="card-title text-center"></div>
                        <div className="card-body">
                            {/* Create card for data */}
                            <div className="row my-3">
                                {data.length === 0 ? (
                                    <div className="col-12 text-center">No data found</div>
                                ) : (
                                    data.map((item) => (
                                        <div className="col-sm-3  mb-3" >
                                            <div class="card h-100" style={{ maxWidth: "540px" }} key={item.id}>
                                                <div class="row g-0">
                                                    <div class="col-md-4">
                                                        <img src={item.image} className="img-fluid rounded-start h-100 image" alt="..." />
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="card-body">
                                                            <h5 class="card-title text-truncate mouse" data-toggle="tooltip" data-placement="bottom" title={item.name}>{item.name}</h5>
                                                            <p class="card-text">&#8360;. {item.price}</p>
                                                        </div>
                                                        <div class="mb-3 mx-3">
                                                            <button onClick={() => changeDelete(item.id)} className="btn btn-outline-danger m-1 float-end">Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );

}
export default Cart;