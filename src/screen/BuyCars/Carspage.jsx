import "bootstrap/dist/css/bootstrap.min.css";
import Customnavbar from "../../components/Customnavbar/Customnavbar";
import Footer from "../../components/Footer/Footer";
import { Card } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/Filter";
import "../Home.css";
import car2 from "../../assets/mainscreen/brombrom.jpg";

export default function CarsPage() {
  const [AllCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 12; 

  const navigate = useNavigate();
  
  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/displaydata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        const mergedCars = [...data.new_cars, ...data.used_cars];
        setAllCars(mergedCars);
        setFilteredCars(mergedCars); 
      } else {
        console.log("Error fetching data:", data.message);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } 
  };

  useEffect(() => {
    loadData();
  }, []);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const handleViewDetails = (car) => {
    navigate("/CarDetails", { state: { car } });
  };

  const handleFilterChange = (filters) => {
    const { brand, model, city, condition, priceRange } = filters;

    const filtered = AllCars.filter(car => {
      const matchesBrand = brand === "All" || car.brand === brand;
      const matchesModel = model === "Select brand first" || car.model === model;
      const matchesCity = city === "All" || car.purchase_location === city;
      const matchesCondition = condition === "All" || car.label === condition;
      const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];

      return matchesBrand && matchesModel && matchesCity && matchesCondition && matchesPrice;
    });

    setFilteredCars(filtered);
    setCurrentPage(1); 
  };

  return (
    <>
      <Customnavbar />
     
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Carousel>
          <Carousel.Item>
            <img
              src={car2}
              alt="First slide"
              className="d-block w-100"
              height={690}
              width={900}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>

 
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <Filter onFilterChange={handleFilterChange} />
        </div>
      </div>

     
      <Container className="my -4" overflow="hidden">
        <div className={`slider-container`}>
          <div className="cars" style={{ margin: "5px 10px 50px 10px", paddingBottom: "50px" }}>
            <h2>Choose Your Dream Car</h2>
            <div className="choose-cars">
              {currentCars.map((car, index) => (
                <div key={index} className="caritem" style={{ height: "100%" }}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src={car.img}
                      alt="Car Image"
                      style={{
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "5px 5px 0 0",
                      }}
                    />
                    <Card.Body>
                      <Row>
                        <Col xs={7}>
                          <Card.Title>{car.brand}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {car.model}
                          </Card.Subtitle>
                        </Col>
                        <Col xs={4} className="text-right">
                          <div
                            style={{
                              backgroundColor:
                                car.label === "imported"
                                  ? "yellow"
                                  : car.label === "new"
                                  ? "green"
                                  : "gray",
                              color: car.label === "imported" ? "black" : "white",
                              padding: "4px 8px",
                              borderRadius: "5px",
                              display: "inline-block",
                              fontSize: "0.9rem",
                              textAlign: "center",
                            }}
                          >
                            {car.label}
                          </div>
                          <div style={{ marginTop: "5px", color: "gray" }}>
                            {car.year}
                          </div>
                        </Col>
                      </Row>
                      <div style={{ textAlign: "center", margin: "10px 0" }}>
                        <h5> Price ${car.price} </h5>
                      </div>
                      <div style={{ textAlign: "center", margin: "10px 0", color: 'gray' }}>
                        <h5> {car.offer_price} </h5>
                      </div>
                      <Card.Text style={{ fontSize: "15px" }}>
                        {car.details}
                      </Card.Text>
                      <Button
                        variant="primary"
                        style={{ width: "100%", overflow: "hidden" }}
                        onClick={() => handleViewDetails(car)}
                      >
                        {car.label === "imported" ? "View details for Order" : "View details for Buy"}
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex justify-content-center my-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                variant={currentPage === i + 1 ? "primary" : "outline-primary"}
                className="mx-1"
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </div>
      </Container>

      {/* -----------------------Footer----------------------- */}
      <div className="footer-home">
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}