import "bootstrap/dist/css/bootstrap.min.css";
import Customnavbar from "../../components/Customnavbar/Customnavbar";
import Footer from "../../components/Footer/Footer";
import { Card, Carousel, Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Home.css";

export default function CarsPage() {
  const [repair, setRepair] = useState([]);
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
        setRepair(data.repair || []);
        console.log(data.repair);
      } else {
        console.error("Error fetching data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleViewDetails = (repair) => {
    navigate("/repairtransaction", { state: { repair } });
  };

  return (
    <>
      <Customnavbar />

      <div style={{ position: "relative", overflow: "hidden" }}>
        <Carousel>
          <Carousel.Item>
            <img
              src="https://i.ibb.co.com/zSPKZq0/7.jpg" // Replace with a valid image URL
              alt="First slide"
              className="d-block w-100"
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <Container className="my-4">
        <h2 className="text-center mb-4">Welcome to Repair & Maintenance</h2>
        <div className="choose-cars d-flex flex-wrap justify-content-center">
          {repair.length > 0 ? (
            repair.map((repair, index) => (
              <Card key={index} style={{ width: "18rem", margin: "10px" }}>
                <Card.Img
                  variant="top"
                  src={repair.img}
                  alt="repair Image"
                  style={{
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "5px 5px 0 0",
                  }}
                />
                <Card.Body>
                  <Card.Title className="text-center">{repair.model}</Card.Title>
                  <Row>
                    <Col xs={7}></Col>
                    <Col xs={5} className="text-end">
                      <div className="text-muted">{repair.year}</div>
                    </Col>
                  </Row>
                  <div className="text-center my-2">
                    <h5>Price: ${repair.price}</h5>
                    {repair.offer_price && (
                      <h6 className="text-muted">Offer: ${repair.offer_price}</h6>
                    )}
                  </div>
                  <Card.Text>{repair.details}</Card.Text>
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={() => handleViewDetails(repair)}
                  >
                    {repair.label === "imported"
                      ? "View details for Order"
                      : "View details for Buy"}
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No cars available at the moment.</p>
          )}
        </div>
      </Container>

      <Footer />
    </>
  );
}
