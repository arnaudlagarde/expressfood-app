import React from "react";
import { Container, Card } from "react-bootstrap";
import platsDuJourData from "../data/platsDuJour.json";

function Menu() {
  return (
    <div>
      <Container>
        <h2>Plats du Jour</h2>
        <div className="row">
          {platsDuJourData.map((plat, index) => (
            <div key={index} className="col-md-4">
              <Card className="card-space">
                <Card.Img
                  variant="top"
                  src={plat.platImage}
                  height="250"
                  alt={plat.name}
                />
                <Card.Body>
                  <Card.Title>{plat.name}</Card.Title>
                  <Card.Text>{plat.description}</Card.Text>
                  <hr />
                  <Card.Text>Dessert : {plat.desert} </Card.Text>
                  <img src={plat.desertImage} height="180" alt="dessert" />
                  <hr />
                  <Card.Text>Prix : {plat.price} €</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>
      <br />
    </div>
  );
}

export default Menu;
