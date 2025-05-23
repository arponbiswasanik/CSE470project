import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Home from "./Customnavbar";

function Cards() {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg"
          alt="Red Alfa Romeo car on road near trees"
        />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default Cards;
