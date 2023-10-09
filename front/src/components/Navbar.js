import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/menu">Menu</Link>
        </li>
        <li>
          <Link to="/order-tracking">Suivi de Commande</Link>
        </li>
        {/* Ajoutez d'autres liens ici si nécessaire */}
      </ul>
    </nav>
  );
}

export default Navbar;
