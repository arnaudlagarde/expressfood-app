import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import axios from "axios"; // Importez Axios

//import platsDuJourData from "../data/platsDuJour.json";

function Menu() {
  const [platsDuJour, setPlatsDuJour] = useState([]); // État pour stocker les plats du jour
  const api = axios.create({
    baseURL: "http://localhost:8000", // Assurez-vous que l'URL correspond à l'endroit où votre serveur Express est en cours d'exécution
  });


  useEffect(() => {
    // Effectuez une requête pour obtenir les plats du jour depuis la route
    api.get("/plats_du_jour")
      .then((response) => {
        // Mettez à jour l'état avec les données récupérées
        setPlatsDuJour(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des plats du jour :", error);
      });
  }, []); // Utilisez une dépendance vide pour effectuer la requête une seule fois


  return (
    <div>
      <Container>
        <h2>Plats du Jour</h2>
        <div className="row">
          {platsDuJour.map((plat, index) => (
            <div key={index} className="col-md-4">
              <Card className="card-space">
                <Card.Img
                  variant="top"
                  src={plat.image}
                  height="250"
                  alt={plat.nom}
                />
                <Card.Body>
                  <Card.Title>{plat.nom}</Card.Title>
                  <Card.Text>{plat.description}</Card.Text>
                  <hr />
                  <Card.Text>Prix : {plat.prix} €</Card.Text>
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
