import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom'; // Use useLocation to detect the current route

function CustomNavbar() {
  const location = useLocation(); // Hook to get the current location

  return (
    <>
      <Navbar bg="black" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" >DriveHub</Navbar.Brand>
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/buycars" className="px-4">Cars</Nav.Link>
            <Nav.Link as={Link} to="/rentcars" className="px-4">Rent</Nav.Link>
            <Nav.Link as={Link} to="/Repair" className="px-4">Repair</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login" className="px-4">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup" className="px-4">Signup</Nav.Link>
            {/* Conditionally render the Book Now button only on the Repair page */}
            {location.pathname === '/Repair' && (
              <Nav.Link as={Link} to="/booking" className="btn btn-success ms-auto px-4">Book Now</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
