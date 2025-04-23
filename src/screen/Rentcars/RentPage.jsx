import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import CustomNavbar from "../../components/Customnavbar/Customnavbar";

const carsForRent = [
  {
    id: 1,
    brand: "Tesla",
    model: "Model S",
    year: 2023,
    pricePerDay: 150,
    available: true,
    image: "path/to/tesla.jpg",
  },
  {
    id: 2,
    brand: "Ford",
    model: "Mustang GT",
    year: 2021,
    pricePerDay: 120,
    available: true,
    image: "path/to/ford.jpg",
  },
  {
    id: 3,
    brand: "Chevrolet",
    model: "Camaro ZL1",
    year: 2022,
    pricePerDay: 130,
    available: false,
    image: "path/to/chevy.jpg",
  },
  {
    id: 4,
    brand: "BMW",
    model: "M3",
    year: 2020,
    pricePerDay: 140,
    available: true,
    image: "path/to/bmw.jpg",
  },
  {
    id: 5,
    brand: "Audi",
    model: "A6",
    year: 2021,
    pricePerDay: 110,
    available: true,
    image: "path/to/audi.jpg",
  },
];

function RentPage() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rentalDays, setRentalDays] = useState(1);
  const [filters, setFilters] = useState({
    priceRange: [0, 200],
    availability: "all",
    model: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    time: "",
    date: "",
    model: "",
  });

  const filteredCars = carsForRent.filter((car) => {
    const inPriceRange =
      car.pricePerDay >= filters.priceRange[0] &&
      car.pricePerDay <= filters.priceRange[1];
    const matchesAvailability =
      filters.availability === "all" ||
      (filters.availability === "available" && car.available);
    const matchesModel =
      filters.model === "" ||
      car.model.toLowerCase().includes(filters.model.toLowerCase());

    return inPriceRange && matchesAvailability && matchesModel;
  });

  const handleSelectCar = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: name === "priceRange" ? JSON.parse(value) : value,
    }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    alert("Booking submitted successfully!");
    setFormData({
      name: "",
      phone: "",
      time: "",
      date: "",
      model: "",
    });
  };

  return (
    <>
      <CustomNavbar />

      <Container className="my-4">
        <h2 className="text-center mb-4">Rent a Car</h2>

        {/* Filter Section */}
        <Row className="mb-4">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Price Range</Form.Label>
              <Form.Control
                as="select"
                name="priceRange"
                onChange={handleFilterChange}
              >
                <option value="[0,200]">All</option>
                <option value="[0,100]">$0 - $100</option>
                <option value="[101,150]">$101 - $150</option>
                <option value="[151,200]">$151 - $200</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Availability</Form.Label>
              <Form.Control
                as="select"
                name="availability"
                onChange={handleFilterChange}
              >
                <option value="all">All</option>
                <option value="available">Available</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                placeholder="Enter model name"
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Filtered Car Cards */}
        <Row>
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <Col key={car.id} md={4} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={car.image} />
                  <Card.Body>
                    <Card.Title>
                      {car.brand} {car.model}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {car.year}
                    </Card.Subtitle>
                    <Card.Text>
                      {car.available ? (
                        <>
                          <strong>Price per day: </strong>${car.pricePerDay}
                        </>
                      ) : (
                        <strong className="text-danger">
                          Currently Unavailable
                        </strong>
                      )}
                    </Card.Text>
                    {car.available ? (
                      <Button
                        variant="primary"
                        onClick={() => handleSelectCar(car)}
                      >
                        Rent Now
                      </Button>
                    ) : (
                      <Button variant="secondary" disabled>
                        Not Available
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No cars match your criteria.</p>
          )}
        </Row>

        {/* Rent Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              Rent {selectedCar?.brand} {selectedCar?.model}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Rental Details</h5>
            <p>
              <strong>Brand:</strong> {selectedCar?.brand}
            </p>
            <p>
              <strong>Model:</strong> {selectedCar?.model}
            </p>
            <p>
              <strong>Year:</strong> {selectedCar?.year}
            </p>
            <p>
              <strong>Price per day:</strong> ${selectedCar?.pricePerDay}
            </p>

            <Form.Group controlId="rentalDays">
              <Form.Label>Number of days:</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={rentalDays}
                onChange={(e) => setRentalDays(e.target.value)}
              />
            </Form.Group>
            <hr />
            <p>
              <strong>Total Cost: </strong>$
              {selectedCar?.pricePerDay * rentalDays}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseModal}>
              Rent Now
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Booking Form */}
        <h3 className="mt-5">Booking Form</h3>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="Enter your name"
              required
            />
          </Form.Group>

          <Form.Group controlId="phone" className="mt-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              placeholder="Enter your phone number"
              required
            />
          </Form.Group>

          <Form.Group controlId="date" className="mt-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleFormChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="time" className="mt-3">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={formData.time}
              onChange={handleFormChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="model" className="mt-3">
            <Form.Label>Car Model</Form.Label>
            <Form.Control
              type="text"
              name="model"
              value={formData.model}
              onChange={handleFormChange}
              placeholder="Enter car model"
              required
            />
          </Form.Group>

          <Button variant="success" type="submit" className="mt-4">
            Submit Booking
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default RentPage;
