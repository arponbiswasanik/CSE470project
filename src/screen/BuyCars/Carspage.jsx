import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import CustomNavbar from '../../components/Customnavbar/Customnavbar';
import { Link } from 'react-router-dom';


const allCars = [
  { id: 1, brand: 'Tesla', model: 'Model S', year: 2023, price: 79999, image: 'path/to/image1.jpg' },
  { id: 2, brand: 'Ford', model: 'Mustang GT', year: 2021, price: 55999, image: 'path/to/image2.jpg' },
  { id: 3, brand: 'Chevrolet', model: 'Camaro ZL1', year: 2022, price: 65000, image: 'path/to/image3.jpg' },
  { id: 4, brand: 'BMW', model: 'M3', year: 2020, price: 70000, image: 'path/to/image4.jpg' },
  { id: 5, brand: 'Audi', model: 'A6', year: 2021, price: 50000, image: 'path/to/image5.jpg' },

];

function CarsPage() {
  const [cars, setCars] = useState(allCars);
  const [filters, setFilters] = useState({
    brand: '',
    model: '',
    year: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };


  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const filteredCars = allCars.filter((car) => {
      return (
        (filters.brand ? car.brand.toLowerCase().includes(filters.brand.toLowerCase()) : true) &&
        (filters.model ? car.model.toLowerCase().includes(filters.model.toLowerCase()) : true) &&
        (filters.year ? car.year.toString() === filters.year : true)
      );
    });
    setCars(filteredCars);
  };

  return (
    <>
      <CustomNavbar />
      <Container className="my-4">
        <Form onSubmit={handleFilterSubmit} className="mb-4">
          <Row>
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="Brand"
                name="brand"
                value={filters.brand}
                onChange={handleFilterChange}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="Model"
                name="model"
                value={filters.model}
                onChange={handleFilterChange}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="number"
                placeholder="Year"
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
              />
            </Col>
            <Col md={3}>
              <Button variant="primary" type="submit" className="w-100">
                Filter
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          {cars.length === 0 ? (
            <Col>
              <h3>No cars found with the given filters</h3>
            </Col>
          ) : (
            cars.map((car) => (
              <Col key={car.id} md={4} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={car.image} />
                  <Card.Body>
                    <Card.Title>{car.brand} {car.model}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{car.year}</Card.Subtitle>
                    <Card.Text>Price: ${car.price}</Card.Text>
                    <Link to="/CarDetails">
                      <Button variant="primary">
                        View Details
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
}

export default CarsPage;
