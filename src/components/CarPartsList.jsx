import React, { useState, useEffect } from "react";
import "../style/CarPartsList.css";
import { useNavigate } from "react-router-dom";

const CarPartsList = () => {
  const [parts, setParts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch car parts from the backend
  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/parts"); // Replace with your backend URL
        if (!response.ok) {
          throw new Error("Failed to fetch car parts");
        }
        const data = await response.json();
        setParts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParts();
  }, []);

  const handleBuyNow = (part) => {
    navigate("/product-details", { state: { part } });
  };

  if (isLoading) {
    return <p className="loading">Loading car parts...</p>; // Add spinner here
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  if (parts.length === 0) {
    return <p className="no-parts">No car parts available at the moment.</p>;
  }

  return (
    <div className="car-parts-grid">
      {parts.map((part) => (
        <div key={part._id || part.id} className="car-part-card">
          <img
            src={part.image || "https://via.placeholder.com/150"} // Fallback image
            alt={`${part.name || "Unknown Part"} image`}
            className="car-part-image"
          />
          <h3 className="car-part-title">{part.name}</h3>
          <p className="car-part-price">${part.price}</p>
          <button
            className="car-part-buy-button"
            onClick={() => handleBuyNow(part)}
          >
            Buy Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default CarPartsList;
