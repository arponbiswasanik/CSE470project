import React, { useState } from "react";
import "./calculator.css";
import CustomNavbar from "../../components/Customnavbar/Customnavbar";

const destinations = [
  { to: "Dhaka", from: "Khulna", distance: 150 },
  { to: "Dhaka", from: "Cox Bazar", distance: 300 },
  { to: "Dhaka", from: "Sylhet", distance: 250 },
  { to: "Dhaka", from: "Rajshahi", distance: 200 },
  { to: "Dhaka", from: "Barishal", distance: 180 },
  { to: "Dhaka", from: "Rangpur", distance: 220 },
  { to: "Dhaka", from: "Mymensingh", distance: 160 },
  { to: "Dhaka", from: "Jessore", distance: 170 },
  { to: "Dhaka", from: "Comilla", distance: 190 },
  { to: "Dhaka", from: "Narayanganj", distance: 140 },
  { to: "Dhaka", from: "Bogra", distance: 210 },
  { to: "Dhaka", from: "Dinajpur", distance: 230 },
  { to: "Dhaka", from: "Feni", distance: 240 },
  { to: "a", from: "b", distance: 260 },
];

const RentCalculator = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [sit, setSit] = useState(null);
  const [price, setPrice] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setPrice(null);

    const normalizedPickup = pickup.trim().toLowerCase();
    const normalizedDestination = destination.trim().toLowerCase();

    const route = destinations.find(
      (d) =>
        d.from.toLowerCase() === normalizedDestination &&
        d.to.toLowerCase() === normalizedPickup
    );

    if (!route) {
      setError(`Invalid route from ${pickup} to ${destination}.`);
      return;
    }

    const ratePerKm = sit > 4 ? 10 : 5;
    const calculatedPrice = route.distance * ratePerKm;
    setPrice(calculatedPrice);
  };

  return (
    <>
      <CustomNavbar />
      <div className="rent-calculator-container">
        <h2 className="title">Rent Calculator</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Pick Up:</label>
            <input
              className="input-field"
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Enter pick-up location"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Destination:</label>
            <input
              className="input-field"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Seat Number:</label>
            <input
              className="input-field"
              type="number"
              value={sit}
              onChange={(e) => setSit(Number(e.target.value))}
              placeholder="Enter seat number"
              required
              min="4"
            />
          </div>
          <button className="submit-button" type="submit">
            Calculate Rent
          </button>
        </form>

        {price !== null && (
          <div className="result">
            <h3>Total Rent: {price} TK</h3>
          </div>
        )}
        {error && (
          <div className="error">
            <h3>{error}</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default RentCalculator;
