import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap'; // Import Badge component
import { useCart } from "./CartContext"; // Correct import

function Navbar() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const navigate = useNavigate();
  const { cart } = useCart(); // Use the cart from the CartContext

  const handleLogout = () => {
    // Supprimez les variables du localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    // Redirigez l'utilisateur vers la page d'accueil après la déconnexion
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          NachoNova Grill
          <span className="">
            <img
              src="https://seeklogo.com/images/R/restaurant-logo-7B8FF68CBF-seeklogo.com.png"
              height={50}
              alt="Logo"
            />
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Accueil
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/menu" className="nav-link">
                Menu
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/order-tracking" className="nav-link">
                Order Tracking
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/cart" className="nav-link">
                    <i className="bi bi-cart"></i> Cart{' '}
                    <Badge bg="secondary">{cart.length}</Badge>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link"> {/* Ajout du lien vers la page de profil */}
                    Mon Profil
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="#/" className="nav-link" onClick={handleLogout}>
                    Déconnexion
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Inscription
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Connexion
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
