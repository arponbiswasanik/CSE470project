import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import CustomNavbar from "../../components/Customnavbar/Customnavbar";

function CarDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;

  if (!car) {
    console.log("Car not found in location state");
    return (
      <Container className="text-center my-4">
        <h2>Error</h2>
        <p>No car details available.</p>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  const handleViewDetails = (car) => {
    navigate("/transaction", { state: { car } });
  };

  return (
    <>
      <CustomNavbar />
      <Container className="my-4">
        <h2 className="text-center mb-4">Car Details</h2>
        <Row>
          <Col md={6}>
            <Card>
              <Card.Img
                variant="top"
                src={car.img}
                alt={`${car.brand} ${car.model}`}
                style={{ width: "100%", height: "400px", objectFit: "cover" }}
              />
            </Card>
            {/* Button Section */}
            <div className="d-flex justify-content-center mt-3">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Go Back
              </Button>
              <Button
                onClick={() => handleViewDetails(car)}
                variant="primary"
                style={{ marginLeft: "10px" }}
              >
                Proceed To Book
              </Button>
            </div>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>
                  {car.brand} {car.model}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Model Year: {car.year}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Price:</strong> ${car.price}
                </Card.Text>
                <Card.Text>
                  <strong>Offer Price:</strong> {car.offer_price}
                </Card.Text>
                <Card.Text>
                  <strong>Condition:</strong> {car.label}
                </Card.Text>
                <Card.Text>
                  <strong>Location:</strong> {car.purchase_location}
                </Card.Text>
                <Card.Text>
                  <strong>Mileage:</strong> {car.mileage}
                </Card.Text>
                <Card.Text>
                  <strong>Transmission:</strong> {car.transmission}
                </Card.Text>
                <Card.Text>
                  <strong>Engine:</strong> {car.engine}
                </Card.Text>
                <Card.Text>
                  <strong>Color:</strong> {car.color}
                </Card.Text>
                <Card.Text>
                  <strong>Body Type:</strong> {car.body_type}
                </Card.Text>
                <Card.Text>
                  <strong>Drive Type:</strong> {car.drive_type}
                </Card.Text>
                <Card.Text>
                  <strong>Interior:</strong> {car.interior}
                </Card.Text>
                <Card.Text>
                  <strong>Exterior:</strong> {car.exterior}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CarDetails;
