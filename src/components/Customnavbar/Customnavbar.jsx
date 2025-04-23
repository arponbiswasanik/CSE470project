import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';// Import Link for routing
import '../Customnavbar/Components.css'; // Import Link for routing

function CustomNavbar() {
  return (
    <>
      <Navbar bg="black" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" ><img src="https://i.ibb.co.com/KhVd4zj/Drive-Nextlogo.png" className="px-4 nav-link nav-link" alt="DriveNext" style={{width:'auto', height:'40px'}}/></Navbar.Brand> {/* Updated for routing */}
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/buycars" className="px-4 nav-link ">Cars</Nav.Link>
            <Nav.Link as={Link} to="/rentcars" className="px-4 nav-link" >Rent</Nav.Link>
            <Nav.Link as={Link} to="/Repair" className="px-4 nav-link">Repair</Nav.Link>
            <Nav.Link as={Link} to="/" className="px-4 nav-link">Insurance</Nav.Link>
            <Nav.Link as={Link} to="/" className="px-4 nav-link">Loan</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login" className="px-4 nav-link" >Login</Nav.Link>
            <Nav.Link as={Link} to="/signup" className="px-4 nav-link" >Signup</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
