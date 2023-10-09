import React from 'react';
import { Container, Card } from 'react-bootstrap';
import platsDuJourData from '../data/platsDuJour.json';

function Menu() {
  return (
    <div>
      <Container>
        <h2>Plats du Jour</h2>
        <div className="row">
          {platsDuJourData.map((plat, index) => (
            <div key={index} className="col-md-4">
              <Card>
                <Card.Img variant="top" src={`images/${plat.image}`} alt={plat.name} />
                <Card.Body>
                  <Card.Title>{plat.name}</Card.Title>
                  <Card.Text>{plat.description}</Card.Text>
                  <Card.Text>Prix : {plat.price} €</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Menu;
