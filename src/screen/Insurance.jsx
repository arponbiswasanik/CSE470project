import { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";
import CustomNavbar from "../components/Customnavbar/Customnavbar";

export default function InsuranceCalculator() {
  const [formData, setFormData] = useState({
    carDetails: { value: "", year: "", type: "" },
    driverDetails: { age: "", history: "", location: "" },
    policyDetails: { coverage: "", deductible: "", addOns: [] },
  });

  const [premium, setPremium] = useState(null);
  const [insuranceStatus, setInsuranceStatus] = useState(null);
  const [email, setEmail] = useState(null);

  const decodeToken = (token) => {
    try {
      const parts = token.split(".");
      if (parts.length === 3) {
        const payload = parts[1];
        const decoded = JSON.parse(atob(payload));
        return decoded;
      }
      return null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Get the token from localStorage
    if (token) {
      const decoded = decodeToken(token); // Decode the token
      setEmail(decoded.email);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, key] = name.split(".");
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const calculatePremium = () => {
    let basePremium = formData.carDetails.value * 0.01; // Initial base premium

    try {
      // Adjust based on car age
      const carAge = new Date().getFullYear() - formData.carDetails.year;
      if (carAge > 10) basePremium *= 0.8; // 20% discount for old cars
      else if (carAge < 3) basePremium *= 1.2; // 20% increase for new cars

      // Adjust based on car type
      if (formData.carDetails.type === "sports")
        basePremium *= 1.5; // High risk for sports cars
      else if (formData.carDetails.type === "SUV") basePremium *= 1.2;

      // Adjust based on driver details
      if (formData.driverDetails.age < 25) basePremium *= 1.3; // Young drivers pay more
      if (formData.driverDetails.history === "clean") basePremium *= 0.9; // 10% discount for clean record
      if (formData.driverDetails.location === "high-risk") basePremium *= 1.4;

      // Adjust based on policy details
      if (formData.policyDetails.coverage === "comprehensive")
        basePremium *= 1.5;
      if (formData.policyDetails.deductible > 1000) basePremium *= 0.85; // Discount for high deductible

      // Add-ons
      if (formData.policyDetails.addOns.includes("roadside")) basePremium += 50;
      if (formData.policyDetails.addOns.includes("glassProtection"))
        basePremium += 30;

      setPremium(basePremium.toFixed(2)); // Set the calculated premium
    } catch (error) {
      console.error("Error calculating premium:", error);
    }
  };

  const handleSubmit = async () => {
    calculatePremium();
    await sendBack(); // Ensure the data is sent back after premium calculation
  };

  const sendBack = async () => {
    try {
      console.log(email);
      // Send the form data and premium to the backend
      const response = await fetch("http://localhost:8000/api/insurance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          premium,
          email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Failed to save insurance history");
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  // Function to check if the insurance has been approved
  const checkApprovalStatus = async () => {
    console.log('hi');
    try {
      const response = await fetch("http://localhost:8000/api/applyinsurance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();
      console.log("Insurance status:", data);

      if (data.approved) {
        setInsuranceStatus("Your insurance has been approved!");
      }
    } catch (error) {
      console.error("Error fetching insurance status:", error);
    }
  };

  const handleApply = async () => {
    // Submit the form and set submit flag to true
    checkApprovalStatus(); // Setting submit to true
  };

  useEffect(() => {
    if (premium !== null) {  // Trigger only when premium is calculated
      checkApprovalStatus(); // Ensure status is checked after premium calculation
    }
  }, [premium]);

  return (
    <>
      <CustomNavbar />
      <Container className="py-5">
        <Card className="shadow-lg">
          <Card.Body>
            <Card.Title className="text-center mb-4">
              Insurance Calculator
            </Card.Title>
            <Form>
              {/* Car Details */}
              <h5>Car Details</h5>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Car Value</Form.Label>
                    <Form.Control
                      type="number"
                      name="carDetails.value"
                      placeholder="Enter car value"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Car Year</Form.Label>
                    <Form.Control
                      type="number"
                      name="carDetails.year"
                      placeholder="Enter car year"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Car Type</Form.Label>
                    <Form.Select name="carDetails.type" onChange={handleChange}>
                      <option value="">Select Type</option>
                      <option value="sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="sports">Sports</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Driver Details */}
              <h5>Driver Details</h5>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Driver Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="driverDetails.age"
                      placeholder="Enter driver age"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Driving History</Form.Label>
                    <Form.Select
                      name="driverDetails.history"
                      onChange={handleChange}
                    >
                      <option value="">Select History</option>
                      <option value="clean">Clean</option>
                      <option value="accidents">Accidents</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Location Risk</Form.Label>
                    <Form.Select
                      name="driverDetails.location"
                      onChange={handleChange}
                    >
                      <option value="">Select Risk Level</option>
                      <option value="low-risk">Low Risk</option>
                      <option value="high-risk">High Risk</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Policy Details */}
              <h5>Policy Details</h5>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Coverage Type</Form.Label>
                    <Form.Select
                      name="policyDetails.coverage"
                      onChange={handleChange}
                    >
                      <option value="">Select Coverage</option>
                      <option value="third-party">Third-Party</option>
                      <option value="comprehensive">Comprehensive</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Deductible</Form.Label>
                    <Form.Control
                      type="number"
                      name="policyDetails.deductible"
                      placeholder="Enter deductible amount"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Add-ons</Form.Label>
                    <div>
                      <Form.Check
                        type="checkbox"
                        label="Roadside Assistance"
                        value="roadside"
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            policyDetails: {
                              ...prev.policyDetails,
                              addOns: e.target.checked
                                ? [...prev.policyDetails.addOns, e.target.value]
                                : prev.policyDetails.addOns.filter(
                                    (a) => a !== e.target.value
                                  ),
                            },
                          }))
                        }
                      />
                      <Form.Check
                        type="checkbox"
                        label="Glass Protection"
                        value="glassProtection"
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            policyDetails: {
                              ...prev.policyDetails,
                              addOns: e.target.checked
                                ? [...prev.policyDetails.addOns, e.target.value]
                                : prev.policyDetails.addOns.filter(
                                    (a) => a !== e.target.value
                                  ),
                            },
                          }))
                        }
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <Button className="mt-3" variant="primary" onClick={handleSubmit}>
              Calculate Premium
            </Button>
            <Button className="mt-3" variant="primary" onClick={handleApply}>
              Apply for Insurance
            </Button>
            {premium && (
              <h4 className="text-success text-center mt-4">
                Estimated Premium: ${premium}
              </h4>
            )}
            {insuranceStatus && (
              <h4 className="text-center mt-4">{insuranceStatus}</h4>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
