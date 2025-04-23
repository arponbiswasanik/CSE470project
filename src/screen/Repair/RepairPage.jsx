import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import CustomNavbar from '../../components/Customnavbar/Customnavbar';
import ServiceCard from '../../components/ServiceCard';
import CarPartsList from '../../components/CarPartsList';
import '../../style/RepairPage.css'; // Correct relative path to the style file

const RepairPage = () => {
  const [services, setServices] = useState([]); // Combined services (frontend + backend)
  const [carParts, setCarParts] = useState([
    { id: 1, name: 'Brake Pads', image: 'src\assets\repair\images2.jpeg', price: '50' },
    { id: 2, name: 'Headlights', image: '/assets/repair/headlights.jpg', price: '100' },
    { id: 3, name: 'Car Battery', image: '/assets/repair/car_battery.jpg', price: '120' },
    { id: 4, name: 'Windshield Wipers', image: '/assets/repair/windshield_wipers.jpg', price: '30' },
    { id: 5, name: 'Air Filters', image: '/assets/repair/air_filters.jpg', price: '25' },
    { id: 6, name: 'Alternator', image: '/assets/repair/alternator.jpg', price: '200' },
    { id: 7, name: 'Spark Plugs', image: '/assets/repair/spark_plugs.jpg', price: '40' }
  ]);
  const [error, setError] = useState('');
  const [isLoadingServices, setIsLoadingServices] = useState(false); // Loading state for services
  const [isLoadingParts, setIsLoadingParts] = useState(false); // Loading state for parts
  const [currentServicePage, setCurrentServicePage] = useState(1); // For services pagination
  const [currentPartPage, setCurrentPartPage] = useState(1); // For car parts pagination
  const itemsPerPage = 4; // Items per page for both services and car parts

  const navigate = useNavigate();

  // Frontend predefined services
  const frontendServices = [
    { id: 1, name: 'Engine Repair', description: 'Fix engine issues such as overheating, oil leaks, or misfiring.', price: 300, available: true },
    { id: 2, name: 'Tire Replacement', description: 'Replace worn-out or damaged tires with new ones.', price: 100, available: true },
    { id: 3, name: 'Brake Replacement', description: 'Change brake pads or repair brake systems to ensure safety.', price: 150, available: false },
    { id: 4, name: 'Oil Change', description: 'Change the oil to keep the engine running smoothly.', price: 50, available: true },
    { id: 5, name: 'Battery Replacement', description: 'Replace old batteries with new ones to ensure reliable starts.', price: 120, available: true }
  ];

  // Fetch backend services and combine with frontend services
  useEffect(() => {
    setIsLoadingServices(true);
    fetch('http://localhost:8000/api/services')
      .then((response) => response.json())
      .then((fetchedServices) => {
        const combinedServices = [...frontendServices, ...fetchedServices];
        setServices(combinedServices); // Update the state with the combined services
        setIsLoadingServices(false);
      })
      .catch((err) => {
        console.error('Failed to fetch services:', err);
        setError('Failed to fetch services');
        setIsLoadingServices(false);
      });
  }, []);

  // Fetch backend car parts and combine with static car parts
  useEffect(() => {
    setIsLoadingParts(true);
    fetch('http://localhost:8000/api/parts')
      .then((response) => response.json())
      .then((fetchedParts) => {
        const combinedParts = [...carParts, ...fetchedParts];
        setCarParts(combinedParts); // Update the state with combined car parts
        setIsLoadingParts(false);
      })
      .catch((err) => {
        console.error('Failed to fetch car parts:', err);
        setError('Failed to fetch car parts');
        setIsLoadingParts(false);
      });
  }, []);

  const handleBookNowClick = () => {
    navigate('/booking');
  };

  // Pagination logic for services
  const totalServicePages = Math.ceil(services.length / itemsPerPage);
  const paginatedServices = services.slice(
    (currentServicePage - 1) * itemsPerPage,
    currentServicePage * itemsPerPage
  );

  const handleNextServicePage = () => {
    if (currentServicePage < totalServicePages) setCurrentServicePage(currentServicePage + 1);
  };

  const handlePreviousServicePage = () => {
    if (currentServicePage > 1) setCurrentServicePage(currentServicePage - 1);
  };

  // Pagination logic for car parts
  const totalPartPages = Math.ceil(carParts.length / itemsPerPage);
  const paginatedParts = carParts.slice(
    (currentPartPage - 1) * itemsPerPage,
    currentPartPage * itemsPerPage
  );

  const handleNextPartPage = () => {
    if (currentPartPage < totalPartPages) setCurrentPartPage(currentPartPage + 1);
  };

  const handlePreviousPartPage = () => {
    if (currentPartPage > 1) setCurrentPartPage(currentPartPage - 1);
  };

  return (
    <>
      <CustomNavbar />
      <Container className="my-4">
        <div className="repair-header">
          <h1>Car Repair</h1>
          <button className="book-now-btn" onClick={handleBookNowClick} aria-label="Book repair services">
            Book Now
          </button>
        </div>
        <h2 className="text-center mb-4">Repair Services</h2>
        {error && <p className="error-message">{error}</p>}
        {isLoadingServices ? (
          <p className="text-center">Loading services...</p>
        ) : (
          <div>
            <div className="services-container">
              {paginatedServices.map((service) => (
                <ServiceCard key={service.id || service._id} service={service} />
              ))}
            </div>
            <div className="pagination">
              <button onClick={handlePreviousServicePage} disabled={currentServicePage === 1}>
                Previous
              </button>
              {Array.from({ length: totalServicePages }, (_, index) => (
                <button
                  key={index + 1}
                  className={currentServicePage === index + 1 ? 'active' : ''}
                  onClick={() => setCurrentServicePage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button onClick={handleNextServicePage} disabled={currentServicePage === totalServicePages}>
                Next
              </button>
            </div>
          </div>
        )}
        <h2 className="text-center mt-4">Car Parts</h2>
        {isLoadingParts ? (
          <p className="text-center">Loading car parts...</p>
        ) : (
          <div>
            <CarPartsList parts={paginatedParts} />
            <div className="pagination">
              <button onClick={handlePreviousPartPage} disabled={currentPartPage === 1}>
                Previous
              </button>
              {Array.from({ length: totalPartPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={currentPartPage === index + 1 ? 'active' : ''}
                  onClick={() => setCurrentPartPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button onClick={handleNextPartPage} disabled={currentPartPage === totalPartPages}>
                Next
              </button>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default RepairPage;