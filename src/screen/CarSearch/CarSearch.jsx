import React, { useState } from "react";


const CarSearch = ({ index, onAddCar }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = async (value) => {
    setSearchQuery(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/cars?q=${value}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
      } else {
        console.error("Failed to fetch suggestions:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleAddCar = (car) => {
    onAddCar(index, car);
    setSearchQuery("");
    setSuggestions([]);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        placeholder="Search and Select Car"
        className="search-bar"
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((car) => (
            <li key={car.id} onClick={() => handleAddCar(car)}>
              {car.img && <img src={car.img} alt={`${car.brand} ${car.model}`} />}
              {car.brand} {car.model} {car.label && `(${car.label})`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CarSearch;
