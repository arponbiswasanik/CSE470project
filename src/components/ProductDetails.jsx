import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/ProductDetails.css"; // Make sure to style this page

const ProductDetails = () => {
  const { state } = useLocation();
  const { part } = state || {};
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "increment" ? prev + 1 : prev > 1 ? prev - 1 : 1));
  };

  const handleProceedToCheckout = () => {
    const total = part.price * quantity;
    navigate("/repair/checkout", { state: { part, quantity, total } });
  };

  return (
    <div className="product-details-container">
      <div className="product-details-card">
        <img
          src={part.image}
          alt={part.name}
          className="product-details-image"
        />
        <div className="product-details-info">
          <h1 className="product-details-title">{part.name}</h1>
          <p className="product-details-price">Price: ৳ {part.price}</p>
          <div className="quantity-selector">
            <button onClick={() => handleQuantityChange("decrement")}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange("increment")}>+</button>
          </div>
          <p className="product-details-total">
            Total: ৳ {part.price * quantity}
          </p>
          <button
            className="proceed-to-checkout-btn"
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
