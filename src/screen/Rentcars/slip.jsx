import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Card, Row, Col, Alert, Spinner } from "react-bootstrap";

function Slip() {
  const location = useLocation();
  const { car, user, driver } = location.state || {}; // Retrieve car, user, and driver objects from state

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [price, setPrice] = useState(null);

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
  console.log(car, user, driver);
  useEffect(() => {
    if (!car || !user || !driver) {
      setErrorMessage("Invalid data received. Please try again.");
      setLoading(false);
      return;
    }

    const calculatePrice = () => {
      const normalizedPickup = user.PickUp.trim().toLowerCase();
      const normalizedDestination = user.Where_to_go.trim().toLowerCase();

      const route = destinations.find(
        (d) =>
          d.to.toLowerCase() === normalizedPickup &&
          d.from.toLowerCase() === normalizedDestination
      );

      if (!route) {
        setErrorMessage(
          `Invalid route from ${user.PickUp} to ${user.Where_to_go}.`
        );
        setLoading(false);
        return;
      }

      const ratePerKm = car.sit > 4 ? 8 : 5;
      const calculatedPrice = route.distance * ratePerKm;
      setPrice(calculatedPrice);
      setLoading(false);
    };

    calculatePrice();
  }, [car, user, driver, destinations]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (errorMessage) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="danger">{errorMessage}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-center my-4">Booking Slip</h1>

      {/* Car Details */}
      {car && (
        <Card className="mb-4">
          <Card.Body>
            <h2>Car Details</h2>
            <Row>
              <Col md={6}>
                <p>
                  <strong>Brand:</strong> {car.brand}
                </p>
                <p>
                  <strong>Model:</strong> {car.model}
                </p>
                <p>
                  <strong>Year:</strong> {car.year}
                </p>
                <p>
                  <strong>Color:</strong> {car.color}
                </p>
                <p>
                  <strong>Seats:</strong> {car.sit}
                </p>
              </Col>
              <Col md={6}>
                <Card.Img
                  variant="top"
                  src={car.img}
                  alt={`${car.brand} ${car.model}`}
                  className="img-fluid"
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* Booking Details */}
      {user && (
        <Card className="mb-4">
          <Card.Body>
            <h2>Booking Details</h2>
            <p>
              <strong>Name:</strong> {`${user.firstName} ${user.lastName}`}
            </p>
            <p>
              <strong>Phone:</strong> {user.number}
            </p>
            <p>
              <strong>Pick Up:</strong> {user.PickUp}
            </p>
            <p>
              <strong>Destination:</strong> {user.Where_to_go}
            </p>
            <p>
              <strong>Price:</strong> {price ? `${price} TK` : "Calculating..."}
            </p>
          </Card.Body>
        </Card>
      )}

      {/* Driver Details */}
      {driver && (
        <Card className="mb-4">
          <Card.Body>
            <h2>Driver Details</h2>
            <p>
              <strong>Name:</strong> {driver.name}
            </p>
            <p>
              <strong>Experience:</strong> {driver.experience_years} years
            </p>
            <p>
              <strong>Contact:</strong> {driver.phone}
            </p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default Slip;
