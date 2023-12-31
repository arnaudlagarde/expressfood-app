import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="background-image">
      <h1 className="title">NachoNova Grill</h1>
      <h3>Un menu à emporter</h3>
      <p>25 rue Claude Tillier, 75012 Paris.</p>
      <p>
        <a href="tel:+33155432665" style={{ color: "white" }}>
          Tel : 01 55 43 26 65
        </a>
      </p>
      <Link to="/menu">
        <Button variant="primary">Commandez maintenant</Button>
      </Link>
    </div>
  );
}

export default Home;
