import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import CustomNavbar from "../../components/Customnavbar/Customnavbar";

function TransactionPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the car data from the location's state
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


  const handleConfirmBooking = async () => {
    const name = document.getElementById("formName").value;
    const email = document.getElementById("formEmail").value;
    const phone = document.getElementById("formPhone").value;
    const paymentMethod = document.getElementById("formPaymentMethod").value;

    if (!name || !email || !phone || !paymentMethod) {
      alert("Please fill out all fields before confirming.");
      return;
    }

    const userDetails = {
      name,
      email,
      phone,
      paymentMethod,
      car, // Include the car details
      transaction: Math.floor(Math.random() * 1000000), // Generate a random transaction ID
    };

    try {
      // Send data to backend
      const response = await fetch("http://localhost:8000/api/user_history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Booking saved:", result);

        // Navigate to receipt page with necessary data
        navigate("/reciept", { state: { car, userDetails, paymentMethod } });
      } else {
        console.error("Failed to save booking:", response.statusText);
        alert("Failed to confirm booking. Please try again.");
      }
    } catch (error) {
      console.error("Error during booking:", error);
      alert("An error occurred. Please try again later.");
    }
  };













  return (
    <>
      <CustomNavbar />
      <Container className="my-4">
        <h2 className="text-center mb-4">Transaction Page</h2>
        <Row>
          {/* Car Details Section */}
          <Col md={6}>
            <Card>
              <Card.Img
                variant="top"
                src={car.img}
                alt={`${car.brand} ${car.model}`}
                style={{ objectFit: "cover", height: "300px" }}
              />
              <Card.Body>
                <Card.Title>
                  {car.brand} {car.model}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Model Year: {car.year}
                </Card.Subtitle>
                <Card.Text>Price: ${car.price} +5%</Card.Text>
                <Card.Text> {car.offer_price}</Card.Text>
                <Card.Text>Condition: {car.label}</Card.Text>
                <Card.Text>Location: {car.purchase_location}</Card.Text>
                <Card.Text>Mileage: {car.mileage}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Transaction Form Section */}
          <Col md={6}>
            <Card>
              <Card.Body>
                <h4>Confirm Your Details</h4>
                <h6>*You Need to atleast pay the half for booking</h6>
                <h6>*5% will be included as charge</h6>

                <Form>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter your phone number"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPaymentMethod">
                    <Form.Label>Payment Method</Form.Label>

                    <Form.Select required>
                      <option value="">Select a payment method</option>
                      <option value="credit-card">Credit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="bank-transfer">Bank Transfer</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
            <div
              className="text-center mt-4"
              style={{
                display: "flex",
                marginLeft: "auto",
                marginRight: "auto",
                gap: "1rem",
              }}
            >
              <Button
                className="text-center mt-2 w-50"
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="text-center mt-2 w-50"
                onClick={handleConfirmBooking} // Ensure this calls the updated function
              >
                Confirm Booking
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TransactionPage;
