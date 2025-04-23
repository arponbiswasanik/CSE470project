import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

const carData = [
  { id: 1, brand: 'Tesla', model: 'Model S', year: 2023, price: 79999, description: 'Electric car', image: 'path/to/image1.jpg' },
];

function CarDetails() {
  const { carId } = useParams();
  const car = carData.find(car => car.id === parseInt(carId));

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <Container className="my-4">
      <Card>
        <Card.Img variant="top" src={car.image} />
        <Card.Body>
          <Card.Title>{car.brand} {car.model}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{car.year}</Card.Subtitle>
          <Card.Text>{car.description}</Card.Text>
          <Card.Text>Price: ${car.price}</Card.Text>
          <Button variant="secondary" href="/cars-page">Back to Listings</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CarDetails;
