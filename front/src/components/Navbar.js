import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimez les variables du localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    // Redirigez l'utilisateur vers la page d'accueil après la déconnexion
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          NachoNova Grill
          <span className="">
            <img
              src="https://seeklogo.com/images/R/restaurant-logo-7B8FF68CBF-seeklogo.com.png"
              height={50}
            />
          </span>
        </a>
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
              <Link to="/" className="nav-link">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link to="/menu" className="nav-link">Menu</Link>
            </li>
            <li className="nav-item">
              <Link to="/order-tracking" className="nav-link">Order Tracking</Link>
            </li>
            {isLoggedIn ? (
                            <li className="nav-item">
                                <a href="#/" className="nav-link" onClick={handleLogout}>Déconnexion</a>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">Inscription</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Connexion</Link>
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
