import React from 'react';
import { Container, Button } from 'react-bootstrap';

function Home() {
  return (
    <div>
      <Container>
        <h1>Bienvenue chez ExpressFood</h1>
        <p>Livraison de plats de qualité à domicile en moins de 20 minutes grâce à un réseau de livreurs à vélo.</p>
        <p>Commandez un ou plusieurs plats et desserts (les frais de livraison sont gratuits à partir de 19,99€).</p>
        <Button variant="primary">Commander maintenant</Button>
      </Container>
    </div>
  );
}

export default Home;
