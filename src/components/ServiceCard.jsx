// Assuming ServiceCard.jsx is in src/components and ServiceList.css in src/style
import React from 'react';
import '../style/ServiceList.css';  // Assuming your style folder is directly under src



function ServiceCard({ service }) {
    return (
        <div className="service-card">
            <img src={service.icon} alt={service.name} className="service-icon" />
            <h3 className="service-title">{service.name}</h3>
            <p className="service-description">{service.description}</p>
        </div>
    );
}

export default ServiceCard;