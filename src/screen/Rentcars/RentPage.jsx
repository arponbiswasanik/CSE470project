import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "../../components/Customnavbar/Customnavbar";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
  Form,
} from "react-bootstrap";

const RentCars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [seatFilter, setSeatFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/rentCar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        const carsWithDrivers = data.data.map((car) => ({
          ...car,
          driver: car.driver || {
            name: "No driver assigned",
            phone: "N/A",
            experience_years: 0,
            status: "Unavailable",
          },
        }));
        setCars(carsWithDrivers);
        setFilteredCars(carsWithDrivers);
        setErrorMessage("");
      } else {
        setErrorMessage(data.message || "Failed to fetch cars.");
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      setErrorMessage(
        "An error occurred while fetching cars. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (car) => {
    console.log("Navigating to book page with car and driver details:", car);
    navigate("/book", { state: { car, driver: car.driver } });
  };

  const handleFilterChange = (e) => {
    const selectedSeat = e.target.value;
    setSeatFilter(selectedSeat);

    if (selectedSeat === "") {
      setFilteredCars(cars);
    } else {
      const filtered = cars.filter(
        (car) => parseInt(car.sit) === parseInt(selectedSeat)
      );
      setFilteredCars(filtered);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <>
      <CustomNavbar />
      <Container className="rent-cars-container">
        <Row className="align-items-center mb-4">
          <Col>
            <h1>Available Rental Cars</h1>
          </Col>
          <Col xs="auto">
            <Button
              variant="primary"
              onClick={() => navigate("/cal")}
              className="calculator-button"
            >
              Open Calculator
            </Button>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={4}>
            <Form.Group controlId="seatFilter">
              <Form.Label>Filter by Seat Number</Form.Label>
              <Form.Control
                as="select"
                value={seatFilter}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="4">4 Seats</option>
                <option value="5">5 Seats</option>
                <option value="6">6 Seats</option>
                <option value="7">7 Seats</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : errorMessage ? (
          <Alert variant="danger">{errorMessage}</Alert>
        ) : filteredCars.length > 0 ? (
          <Row className="cars-grid">
            {filteredCars.map((car) => (
              <Col key={car._id} md={4} className="mb-4">
                <Card className="car-card h-100">
                  <Card.Img
                    variant="top"
                    src={car.img}
                    alt={`${car.brand} ${car.model}`}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                    className="car-image"
                  />
                  <Card.Body>
                    <Card.Title>{`${car.brand} ${car.model} (${car.year})`}</Card.Title>
                    <Card.Text>
                      <strong>Rent Price:</strong> ${car.price}
                      <br />
                      <strong>Color:</strong> {car.color}
                      <br />
                      <strong>Details:</strong> {car.details}
                      <br />
                      <strong>Seat Number:</strong> {car.sit}
                      <br />
                      {/* <strong>Driver:</strong> {car.driver.name} */}
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleViewDetails(car)}
                    >
                      Book Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Alert variant="info">
            No cars available with the selected seat number.
          </Alert>
        )}
      </Container>
    </>
  );
};

export default RentCars;
