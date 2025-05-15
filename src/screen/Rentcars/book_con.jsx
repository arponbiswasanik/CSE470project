import React, { useEffect, useState } from "react";
import { Table, Button, Alert, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const API_URL = "http://localhost:8000/api/admin_booking";
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (response.ok && data.success) {
        setBookings(data.data || []);
        setError("");
      } else {
        setBookings([]);
        setError(data.message || "Failed to fetch bookings.");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("An error occurred while fetching bookings.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessMessage(result.message);
        fetchBookings();
      } else {
        setError(result.message || "Failed to update booking status.");
      }
    } catch (error) {
      console.error("Network or Server Error:", error);
      setError("An error occurred while updating booking status.");
    } finally {
      setLoading(false);

      setTimeout(() => {
        setError("");
        setSuccessMessage("");
      }, 3000);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Admin Booking Management</h1>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      {!loading && bookings.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Pick Up</th>
              <th>Where to Go</th>
              <th>Car</th>
              <th>Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.name}</td>
                <td>{booking.PickUp}</td>
                <td>{booking.Where_to_go}</td>
                <td>{`${booking.carBrand} ${booking.carModel} (${booking.carYear})`}</td>
                <td>{booking.carSit}</td>
                <td>${booking.price}</td>
                <td>{booking.status}</td>
                <td>
                  {booking.status === "pending" && (
                    <>
                      <Button
                        variant="success"
                        className="me-2"
                        onClick={() => updateStatus(booking._id, "approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => updateStatus(booking._id, "cancelled")}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {!loading && bookings.length === 0 && (
        <Alert variant="info">No bookings available.</Alert>
      )}
    </div>
  );
};

export default AdminBookings;
