import React, { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard"; // Component to display individual services
import "../style/ServiceList.css"; // Import styling

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(""); // For success/error messages
  const [newService, setNewService] = useState({ name: "", description: "", price: "" });

  useEffect(() => {
    fetchServices();
  }, []);

  // Fetch services from the server
  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/services");
      if (!res.ok) throw new Error("Failed to fetch services");

      const data = await res.json();
      setServices(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new service
  const addService = async () => {
    if (!newService.name || !newService.description || !newService.price) {
      setMessage("All fields are required!");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      });

      if (!res.ok) throw new Error("Failed to add service");

      const addedService = await res.json();
      setServices((prev) => [...prev, addedService]);
      setMessage("Service added successfully!");
      setNewService({ name: "", description: "", price: "" }); // Reset the input fields
    } catch (err) {
      setError(err.message);
    }
  };

  // Update a service
  const updateService = async (id, updatedData) => {
    try {
      const res = await fetch(`http://localhost:8000/api/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update service");

      const updatedService = await res.json();
      setServices((prev) =>
        prev.map((service) => (service._id === id ? updatedService : service))
      );
      setMessage("Service updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a service
  const deleteService = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/services/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete service");

      setServices((prev) => prev.filter((service) => service._id !== id));
      setMessage("Service deleted successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return <p>Loading services...</p>;
  }

  return (
    <div>
      <h1>Manage Services</h1>
      
      {/* Success or Error Messages */}
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}

      {/* Add Service Form */}
      <div className="add-service-form">
        <h2>Add New Service</h2>
        <input
          type="text"
          placeholder="Service Name"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newService.price}
          onChange={(e) => setNewService({ ...newService, price: e.target.value })}
        />
        <button onClick={addService}>Add Service</button>
      </div>

      {/* Services Grid */}
      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            service={service}
            onUpdate={updateService}
            onDelete={deleteService}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
