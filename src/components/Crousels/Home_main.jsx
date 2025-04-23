import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import car1 from "../../assets/mainscreen/img2.png";
import car2 from "../../assets/mainscreen/brombrom.jpg";
import car3 from "../../assets/mainscreen/brombrom2.jpg";
import car4 from "../../assets/mainscreen/brombrom3.jpg";
import car5 from "../../assets/mainscreen/brombrom4.jpg";
import car6 from "../../assets/mainscreen/brombrom8-1.jpg";
import car7 from "../../assets/mainscreen/brombrom6.jpg";
import car8 from "../../assets/mainscreen/brombrom7.jpg";

function Carousels() {
  const [index, setIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`You searched for: ${searchTerm}`);
    setSearchTerm(""); // Reset search bar after submission
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            src={car1}
            alt="First slide"
            className="d-block w-100"
            height={640}
            width={900}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={car2}
            alt="Second slide"
            className="d-block w-100"
            height={640}
            width={900}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={car3}
            alt="Third slide"
            className="d-block w-100"
            height={640}
            width={900}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={car4}
            alt="Third slide"
            className="d-block w-100"
            height={640}
            width={900}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>{" "}
        <Carousel.Item>
          <img
            src={car5}
            alt="Third slide"
            className="d-block w-100"
            height={640}
            width={900}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>{" "}
        <Carousel.Item>
          <img
            src={car6}
            alt="Third slide"
            className="d-block w-100"
            height={640}
            width={900}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>{" "}
        <Carousel.Item>
          <img
            src={car7}
            alt="Third slide"
            className="d-block w-100"
            height={640}
            width={900}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>{" "}
        <Carousel.Item>
          <img
            src={car8}
            alt="Third slide"
            className="d-block w-100"
            height={640}
            width={900}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Fixed Search Bar */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          textAlign: "center",
          zIndex: 10, // Ensure it's above the carousel
        }}
      >
        <form onSubmit={handleSearch} style={{ display: "inline-block" }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            style={{
              width: "800px",
              padding: "10px",
              borderRadius: "18px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "16px",
              color: "black", // Ensures the text inside is black
              caretColor: "black", // Ensures the cursor is black
              backgroundColor: "white",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "15px 25px",
              marginLeft: "10px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "18px",
              cursor: "pointer",
              fontSize: "15px",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default Carousels;
