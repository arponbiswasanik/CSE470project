import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CustomNavbar from "../../components/Customnavbar/Customnavbar";
import Footer from "../../components/Footer/Footer";
import { Row, Col, Button } from "react-bootstrap";
import "./Admin.css";

export default function Admin() {
  const navigate = useNavigate();
  const [userinfo, setUserinfo] = useState({});
  const [users, setUsers] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCar, setTotalCar] = useState(0);
  const [totalKYC, setTotalKYC] = useState(0);

  const decodeToken = (token) => {
    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  console.log("Admin Dashboard");
  const fetchData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found.");
      return;
    }

    const user = decodeToken(token);
    setUserinfo(user);

    try {
      const response = await fetch("http://localhost:8000/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
        setTotalCar(data.totalCar);
        setTotalRevenue(data.totalRevenue);
        setTotalKYC(data.totalKYC);
      } else {
        console.error("Failed to fetch admin data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <CustomNavbar />
      <div className="admin-dashboard">
        <div className="admin-container">
          <h1 className="admin-title">Admin Dashboard</h1>

          <h2>Admin Information</h2>
          <div className="admin-info">
            <p>
              <strong>Email:</strong> {userinfo.email || "N/A"}
            </p>
            <p>
              <strong>Name:</strong> {userinfo.name || "N/A"}
            </p>
            <p>
              <strong>Role:</strong> {userinfo.role || "N/A"}
            </p>
          </div>

          <h1>Admin Stats</h1>
          <div className="admin-stats">
            <div className="stat-card">
              <h2>Total Revenue</h2>
              <p>${totalRevenue}</p>
            </div>
            <div className="stat-card">
              <h2>Existing Users</h2>
              <p>{users.length}</p>
            </div>
            <div className="stat-card">
              <h2>Total Cars</h2>
              <p>{totalCar}</p>
            </div>
            <div className="stat-card">
              <h2>KYC Applications</h2>

              <button
                className="btn btn-primary"
                onClick={() => handleNavigation("/kyc")}
              >
                KYC Applications
              </button>
            </div>
            <div className="stat-card">
              <h2>Rent Service</h2>
              <Row className="align-items-center">
                {/* <Col>
                  <Button
                    variant="primary"
                    onClick={() => handleNavigation("/cal")}
                  >
                    Open Calculator
                  </Button>
                </Col> */}
                <Col>
                  <Button
                    variant="primary"
                    onClick={() => handleNavigation("/admin_booking")}
                  >
                    Open Admin
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    onClick={() => handleNavigation("/dri")}
                  >
                    Open Driver
                  </Button>
                </Col>
              </Row>
            </div>
            <div className="stat-card">
              <h2>Repair Service</h2>
              <Link to="/Repair_service">
                <button className="btn btn-primary">Repair Portal</button>
              </Link>
            </div>
          </div>

          <h2>User Management</h2>
          <div className="user-table">
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.role}</td>
                      <td>
                        <Link to={`/user/${user._id}`}>
                          <button className="btn btn-view">View</button>
                        </Link>
                        <button className="btn btn-delete">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
