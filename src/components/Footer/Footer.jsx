import { Link } from "react-router-dom"; // Import Link for routing
import "./footer.css";

import Container from "react-bootstrap/Container";

function Footer() {
  return (
    <>
      <Container className="footer" style={{width:'100%'}}>
        <div className="footer-container">
          {/* Footer Brand Section */}
          <div className="footer-brand">
            <img
              src="https://i.ibb.co.com/BBjyM0b/Component-5.png"
              className="px-4 nav-link nav-link"
              alt="DriveNext"
              style={{ width: "auto", height: "40px" }}
            />
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <div className="footer-links-list">
              <div>
                <Link to="/">Home</Link>
              </div>
              <div>
                <Link to="/about">About Us</Link>
              </div>
              <div>
                <Link to="/services">Services</Link>
              </div>
              <div>
                <Link to="/contact">Contact</Link>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p>Email: support@drivenext.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 Banking Street, Finance City</p>
          </div>

          {/* Social Media Links */}
          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <Link to="/">
                <img src="https://i.ibb.co.com/1Grs0FC/Facebook.png" className="fab fa-facebook-f" style={{height:'50px'}}/>
              </Link>
              <Link to="/">
                <img src="https://i.ibb.co.com/ZHNQGG5/Instagram-Circle.png" className="fab fa-twitter" style={{height:'50px'}}/>
              </Link>
              <Link to="/">
                <img src="https://i.ibb.co.com/rcwFjvZ/TwitterX.png" className="fab fa-instagram" style={{height:'50px'}}/>
              </Link>
             
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 DriveNext. All Rights Reserved.</p>
        </div>
      </Container>
    </>
  );
}

export default Footer;
