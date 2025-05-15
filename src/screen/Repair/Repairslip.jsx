// ReceiptPage.js
import { useLocation } from 'react-router-dom';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function ReceiptPage() {
  const location = useLocation();
  const { repair, userDetails, paymentMethod } = location.state || {};

  if (!repair || !userDetails) {
    return (
      <Container className="text-center my-4">
        <h2>Error</h2>
        <p>Transaction details are missing.</p>
        <Button href="/" variant="primary">
          Back to Home
        </Button>
      </Container>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Car Purchase Receipt", 14, 20);
    doc.setFontSize(12);
    doc.text("Thank you for your purchase!", 14, 30);

    // Buyer Details
    doc.text("Buyer Details:", 14, 40);
    doc.text(`Name: ${userDetails.name}`, 14, 50);
    doc.text(`Email: ${userDetails.email}`, 14, 60);
    doc.text(`Phone: ${userDetails.phone}`, 14, 70);

    // Payment Details
    doc.text("Payment Details:", 14, 80);
    doc.text(`Payment Method: ${paymentMethod}`, 14, 90);
    doc.text(`Amount Paid: $${repair.price}`, 14, 100);
   
    doc.text(`TransactionId: $${repair.price}`, 14, 100);


    // Car Details
    doc.text("Car Details:", 14, 110);
    
    doc.text(`Model: ${repair.model}`, 14, 130);
    doc.text(`Year: ${repair.year}`, 14, 140);


    // Footer
    doc.text("Purchase Date: " + new Date().toLocaleDateString(), 14, 170);

    doc.save("receipt.pdf");
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Receipt</h2>
      <Card>
        <Card.Body>
          <div className="text-center mb-4" >
            <div  ><h4>Car Purchase Receipt</h4>
            <img src= "https://i.ibb.co.com/BBjyM0b/Component-5.png" alt="DriveNext" style={{ width: "200px", height: "50px", position:'absolute',left:'2rem',top:'1rem'}} />
            <p>Thank you for your purchase!</p></div>
          </div>
          <Row>
            <Col md={6}>
              <h5>Buyer Details</h5>
              <p><strong>Name:</strong> {userDetails.name}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Phone:</strong> {userDetails.phone}</p>
            </Col>
            <Col md={6}>
              <h5>Payment Details</h5>
              <p><strong>Payment Method:</strong> {paymentMethod}</p>
              <p><strong>Amount Paid:</strong> ${repair.price}</p>
              <p><strong>A Certain charge will be included</strong> 5%</p>
             
              <p><strong>TransactionID:</strong> {userDetails.transaction}</p>
            </Col>
          </Row>
          <hr />
          <h5>Car Details</h5>
          <Row>
            <Col md={6}>
              
              <p><strong>Model:</strong> {repair.model}</p>
              <p><strong>Year:</strong> {repair.year}</p>
            
            </Col>

          </Row>
          <hr />
          <div className="text-center">
            <p><strong>Purchase Date:</strong> {new Date().toLocaleDateString()}</p>
            <p>We hope you enjoy your new car!</p>
           
          </div>
        </Card.Body>
      </Card>
      <div className="text-center mt-4">
        <Button variant="primary" onClick={handlePrint}>
          Print Receipt
        </Button>
        <Button variant="secondary" className="ms-3" onClick={handleDownload}>
          Download Receipt
        </Button>
        <Button href="/" variant="secondary" className="ms-3">
          Back to Home
        </Button>
      </div>
    </Container>
  );
}

export default ReceiptPage;
