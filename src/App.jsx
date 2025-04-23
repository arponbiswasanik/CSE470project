import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screen/Home";
import Login from "./screen/Login&signup/Login";
import Signup from "./screen/Login&signup/SignUp";
import Cars from "./screen/BuyCars/Carspage";
import CarDetails from "./screen/BuyCars/CarDetails";
import Rent from "./screen/Rentcars/RentPage";
import Repair from "./screen/Repair/RepairPage";
import BookingForm from "./screen/Repair/BookingForm";
import ServicesList from "./components/ServicesList"; // Import ServicesList component

// Import New Components
import CarPartsList from "./components/CarPartsList"; // For car parts listing
import ProductDetails from "./components/ProductDetails"; // For individual product details
import Checkout from "./screen/Repair/Checkout"; // For checkout page

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/buycars" element={<Cars />} />
          <Route path="/cardetails" element={<CarDetails />} />
          <Route path="/rentcars" element={<Rent />} />
          <Route path="/repair" element={<Repair />} />
          <Route path="/booking" element={<BookingForm />} />
          
          {/* Existing Route for ServicesList */}
          <Route
            path="/services"
            element={
              <div>
                <h1>Available Services</h1>
                <ServicesList />
              </div>
            }
          />

          {/* New Routes for Car Parts and Checkout */}
          <Route path="/car-parts" element={<CarPartsList />} /> {/* Route for car parts */}
          <Route path="/product-details" element={<ProductDetails />} /> {/* Route for product details */}
          <Route path="/repair/checkout" element={<Checkout />} /> {/* Route for checkout */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
