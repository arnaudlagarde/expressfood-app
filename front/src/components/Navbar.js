import React from "react";
import { Link } from "react-router-dom";
import bootstrap from "bootstrap";

function Navbar() {
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
              <a className="nav-link active" aria-current="page">
                <Link className="nav-link" to="/" element="{Home}">
                  Accueil
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <Link className="nav-link" to="/menu" element="{Menu}">
                  Menu
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <Link
                  className="nav-link"
                  to="/order-tracking"
                  element="{OrderTracking}"
                >
                  Order Tracking
                </Link>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
