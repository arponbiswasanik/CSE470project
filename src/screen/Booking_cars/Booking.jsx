import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Customnavbar from "../../components/Customnavbar/Customnavbar";

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const car = location.state?.car;
  const driver = location.state?.driver;

  const [validated, setValidated] = useState(false);
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    number: "",
    PickUp: "",
    Where_to_go: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
    setErrorMessage("");
  };

  const handleViewDetails = (car, userInfo, driver) => {
    console.log("Navigating to book page with car, user, and driver details:", {
      car,
      userInfo,
      driver,
    });

    navigate("/p", { state: { car, user: userInfo, driver } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const response = await fetch("http://localhost:8000/api/book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${info.firstName} ${info.lastName}`,
            number: info.number,
            PickUp: info.PickUp,
            Where_to_go: info.Where_to_go,
            carId: car._id,
            carBrand: car.brand,
            carModel: car.model,
            carYear: car.year,
            carColor: car.color,
            carSit: car.sit,
            carDetails: car.details,
            carImg: car.img,
            driverId: driver?._id,
            driverName: driver?.name,
            driverPhone: driver?.phone,
            driverExperience: driver?.experience_years,
          }),
        });

        const data = await response.json();
        if (!data.success) {
          setErrorMessage(data.message);
        } else {
          setErrorMessage("");
          setInfo({
            firstName: "",
            lastName: "",
            number: "",
            PickUp: "",
            Where_to_go: "",
          });
          handleViewDetails(
            car,
            {
              firstName: info.firstName,
              lastName: info.lastName,
              number: info.number,
              PickUp: info.PickUp,
              Where_to_go: info.Where_to_go,
            },
            driver
          );
        }
      } catch (error) {
        setErrorMessage("An error occurred while processing your booking.");
        console.error("Error:", error);
      }
    }

    setValidated(true);
  };

  return (
    <>
      <Customnavbar />
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="w-100">
          <Col md={6} className="d-flex flex-column justify-content-center">
            {car && (
              <Card className="shadow-lg p-4 mb-4">
                <Card.Body>
                  <h5>Selected Car Details</h5>
                  <div className="mb-3 text-center">
                    <img
                      src={car.img}
                      alt={`${car.brand} ${car.model}`}
                      style={{
                        width: "100%",
                        maxWidth: "300px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <p>
                    <strong>Brand:</strong> {car.brand}
                    <br />
                    <strong>Model:</strong> {car.model}
                    <br />
                    <strong>Year:</strong> {car.year}
                    <br />
                    <strong>Price:</strong> ${car.price}
                    <br />
                    <strong>Color:</strong> {car.color}
                    <br />
                    <strong>Seats:</strong> {car.sit}
                    <br />
                    <strong>Details:</strong> {car.details}
                  </p>
                </Card.Body>
              </Card>
            )}
            {driver && (
              <Card className="shadow-lg p-4 mb-4">
                <Card.Body>
                  <h5>Assigned Driver</h5>
                  <p>
                    <strong>Name:</strong> {driver.name}
                    <br />
                    <strong>Phone:</strong> {driver.phone}
                    <br />
                    <strong>Experience:</strong> {driver.experience_years} years
                  </p>
                </Card.Body>
              </Card>
            )}
          </Col>

          <Col md={6}>
            <Card className="shadow-lg p-4">
              <Card.Body>
                <Card.Title className="text-center mb-4">Booking</Card.Title>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                        name="firstName"
                        value={info.firstName}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Last name"
                        name="lastName"
                        value={info.lastName}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationCustomPhone"
                    >
                      <Form.Label>Phone Number</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="tel"
                          placeholder="Enter your Phone number"
                          name="number"
                          value={info.number}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter a valid number.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      md="6"
                      controlId="validationCustomPickUp"
                    >
                      <Form.Label>Pick Up Location</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Pick Up location"
                        name="PickUp"
                        value={info.PickUp}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="6"
                      controlId="validationCustomWhereToGo"
                    >
                      <Form.Label>Where to Go</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Destination"
                        name="Where_to_go"
                        value={info.Where_to_go}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                      Book Confirm
                    </Button>
                    {errorMessage && (
                      <div className="alert alert-danger" role="alert">
                        {errorMessage}
                      </div>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Signup;
