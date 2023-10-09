import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Accueil</h1>
      <Link to="/menu">Voir le menu</Link>
      <Link to="/order">Passer une commande</Link>
    </div>
  );
}

export default Home;
