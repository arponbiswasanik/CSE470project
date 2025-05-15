import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Customnavbar from '../../components/Customnavbar/Customnavbar';

function Signup() {
  const [validated, setValidated] = useState(false);
  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: '',
    state: '',
    nid: '',
    img: null, // For image upload
    verified: false,
    submit: false,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigating to another route
  const location = useLocation();
  const userInfo = location.state?.userInfo; // Getting userInfo passed from navigate

  // Pre-fill the name and email fields if userInfo is passed
  useEffect(() => {
    if (userInfo) {
      const [firstName, lastName] = userInfo.name.split(' ');
      setInfo({
        ...info,
        firstName,
        lastName,
        email: userInfo.email,
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
    setErrorMessage('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInfo({
        ...info,
        image: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const formData = new FormData();
      formData.append('name', `${info.firstName} ${info.lastName}`);
      formData.append('email', info.email);
      formData.append('password', info.password);
      formData.append('country', info.country);
      formData.append('state', info.state);
      formData.append('nid', info.nid);
      // formData.append('verified', info.verified);
      formData.append('image', info.img); // Append image file

      try {
        const response = await fetch('http://localhost:8000/api/verify', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        console.log(data);

        if (!data.success) {
          setErrorMessage(data.message);
        } else {
          setErrorMessage('');

          // Store the authentication token or user data in localStorage
          if (data.token) {
            localStorage.setItem('authToken', data.token);  // Store token in localStorage
            localStorage.setItem('userInfo', JSON.stringify(data.user)); // Store user info if needed
          }
          // Navigate to the dashboard after successful verification
          alert('User verified successfully Need to login again');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error during registration:', error);
        setErrorMessage('There was an error during the registration process.');
      }
    }

    setValidated(true);
  };

  return (
    <>
      <Customnavbar />
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="shadow-lg p-4" style={{ maxWidth: '600px', width: '100%' }}>
          <Card.Body>
            <Card.Title className="text-center mb-4">Verify your account</Card.Title>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {/* Name fields */}
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={info.firstName}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    value={info.lastName}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Email field */}
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustomEmail">
                  <Form.Label>Email</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={info.email}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>

              {/* Password field (commented out but available if needed) */}
              {/* <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustomPassword">
                  <Form.Label>Password</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      value={info.password}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Enter your a password.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row> */}

              {/* NID field */}
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustomNID">
                  <Form.Label>National ID (NID)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your NID"
                    name="nid"
                    value={info.nid}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid NID.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Image Upload */}
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustomImage">
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  />
                </Form.Group>
              </Row>

              {/* Terms and Conditions */}
              <Form.Group className="mb-3">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
              </Form.Group>

              {/* Submit Button */}
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                  Request for Verification
                </Button>
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Signup;
