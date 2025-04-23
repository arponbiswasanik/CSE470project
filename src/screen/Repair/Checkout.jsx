import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../style/Checkout.css"; // Add styling here

const Checkout = () => {
  const { state } = useLocation();
  const { part, quantity, total } = state || {};

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    region: "",
    city: "",
    area: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToPay = () => {
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert("Please fill in all required fields!");
      return;
    }

    // Call your API or redirect
    console.log("Order Placed:", { part, quantity, total, formData });
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h2>Delivery Information</h2>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Region"
            name="region"
            value={formData.region}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Area"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="checkout-summary">
        <h2>Order Summary</h2>
        <p>Product: {part.name}</p>
        <p>Quantity: {quantity}</p>
        <p>Price: ৳ {part.price}</p>
        <p>Delivery Fee: ৳ 60</p>
        <h3>Total: ৳ {total + 60}</h3>
        <button className="proceed-to-pay-btn" onClick={handleProceedToPay}>
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default Checkout;
