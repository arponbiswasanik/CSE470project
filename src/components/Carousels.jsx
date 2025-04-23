import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg"; 

function Carousels() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          src={img2}
          alt="First slide"
          className="d-block w-100"
          height={640}
          weight={900}
        />
        <Carousel.Caption>
          <h3>Find Your Dream Car</h3>
          <p>BUY/RENT/SELL</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          src={img3}
          alt="Second slide"
          className="d-block w-100"
          height={640}
          weight={900}
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          src={img4}
          alt="Third slide"
          className="d-block w-100"
          height={640}
          weight={900}
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;
