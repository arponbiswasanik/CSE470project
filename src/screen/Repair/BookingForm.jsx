import React, { useState } from 'react';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    carBrand: '',
    carModel: '',
    carNumber: '',
    services: [],
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'services') {
      // Toggle selection in an array for multi-select
      let servicesArray = [...formData.services];
      if (servicesArray.includes(value)) {
        servicesArray = servicesArray.filter((service) => service !== value);
      } else {
        servicesArray.push(value);
      }
      setFormData({ ...formData, services: servicesArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // Here you can send formData to the backend API
    alert('Booking submitted successfully!');
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: 'white' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#007BFF' }}>Book a Repair Service</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
        <input
          type="text"
          name="name"
          placeholder="Name *"
          value={formData.name}
          required
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone *"
          value={formData.phone}
          required
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          required
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="carBrand"
          placeholder="Car Brand *"
          value={formData.carBrand}
          required
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="carModel"
          placeholder="Car Model *"
          value={formData.carModel}
          required
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="carNumber"
          placeholder="Car Number *"
          value={formData.carNumber}
          required
          onChange={handleChange}
          style={inputStyle}
        />
        <select
          name="services"
          multiple
          onChange={handleChange}
          style={{ ...inputStyle, height: '120px' }}
        >
          <option value="Emergency Service">Emergency Service</option>
          <option value="Wheel Alignment">Wheel Alignment</option>
          <option value="Brake Service">Brake Service</option>
          <option value="Car AC Service">Car AC Service</option>
        </select>
        <textarea
          name="notes"
          placeholder="Additional Notes"
          value={formData.notes}
          onChange={handleChange}
          style={{ ...inputStyle, height: '80px' }}
        />
        <button
          type="submit"
          style={{
            background: '#007BFF',
            color: 'white',
            padding: '12px',
            fontSize: '1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            border: 'none',
            transition: 'background 0.3s ease',
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

// Input styling for consistency
const inputStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '1rem',
};

export default BookingForm;
