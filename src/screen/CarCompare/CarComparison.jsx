import React, { useState } from "react";
import "./CarComparison.css";
import CustomNavbar from "../../components/Customnavbar/Customnavbar";
import CarSearch from "../CarSearch/CarSearch";

const CarComparison = () => {
  const [selectedCars, setSelectedCars] = useState([null, null, null, null]);

  const handleAddCar = (index, car) => {
    setSelectedCars((prev) => {
      const updatedCars = [...prev];
      updatedCars[index] = car;
      return updatedCars;
    });
  };

  const handleRemoveCar = (index) => {
    setSelectedCars((prev) => {
      const updatedCars = [...prev];
      updatedCars[index] = null;
      return updatedCars;
    });
  };

  const renderRow = (label, key) => (
    <tr>
      <td>{label}</td>
      {selectedCars.map((car, index) => (
        <td key={index}>{car ? car[key] || "" : ""}</td>
      ))}
    </tr>
  );

  return (
    <>
      <CustomNavbar />
      <div className="comparison-container">
        <h1>Car Comparison</h1>
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Choose your car</th>
                {selectedCars.map((_, index) => (
                  <th key={index}>
                    <CarSearch index={index} onAddCar={handleAddCar} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedCars.some((car) => car !== null) && (
                <>
                  {renderRow("Brand", "brand")}
                  {renderRow("Model", "model")}
                  {renderRow("Year", "year")}
                  {renderRow("Mileage", "mileage")}
                  {renderRow("Color", "color")}
                  {renderRow("Transmission", "transmission")}
                  {renderRow("Label", "label")}
                  {renderRow("Condition", "condition")}
                  {renderRow("Purchase Location", "purchase_location")}
                  {renderRow("Price", "price")}
                  <tr>
                    <td>Image</td>
                    {selectedCars.map((car, index) => (
                      <td key={index}>
                        {car && car.img ? (
                          <img
                            src={car.img}
                            alt={`${car.brand} ${car.model}`}
                            className="car-image"
                          />
                        ) : (
                          "N/A"
                        )}
                      </td>
                    ))}
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CarComparison;
