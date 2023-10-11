import React from "react";
// import { Container, Button } from "react-bootstrap";

function Home() {
  return (
    // <div class="container">
    //   <img
    //     className="imagSize"
    //     src=""
    //     alt="Snow"
    //   />

    //   <div className="centered">Centered</div>
    // </div>
    <nav className="navbar bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="{home}">
          <img
            src="https://images.pexels.com/photos/326311/pexels-photo-326311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Logo"
            width="1350"
            height="500"
            className="d-inline-block align-text-top"
          />
          <div className="centered">
            <h1> NachoNova Grill</h1>
            <h3>Un menu à enporter</h3>
            <p>25 rue Claude Tillier, 75012 Paris.</p>
            <p>
              <a href="tel:+Tel : +33 1 55 43 26 65">Tel : 01 55 43 26 65</a>
            </p>
            <button>Commandez maintenant</button>
          </div>
        </a>
      </div>
    </nav>
  );
}

export default Home;
