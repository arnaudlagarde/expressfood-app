import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import axios from "axios"; // Importez Axios

//import platsDuJourData from "../data/platsDuJour.json";

function Menu() {
  const [platsDuJour, setPlatsDuJour] = useState([]); // État pour stocker les plats du jour
  const [cart, setCart] = useState([]); // État pour gérer le panier
  const [quantities, setQuantities] = useState({}); // État pour gérer les quantités

  
  const api = axios.create({
    baseURL: "http://localhost:8000", // Assurez-vous que l'URL correspond à l'endroit où votre serveur Express est en cours d'exécution
  });

  const addToCart = (plat) => {
    // Fonction pour ajouter un plat au panier
    const updatedCart = [...cart, plat];
    setCart(updatedCart);
  };

  const updateQuantity = (plat, quantity) => {
    // Fonction pour mettre à jour la quantité
    setQuantities({ ...quantities, [plat._id]: quantity });
  };

  const handleCommande = () => {
    // Cette fonction doit être appelée lorsque le client confirme la commande
    // Vous enverrez les données du panier au serveur ici
  };

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
                <Button variant="primary" onClick={() => addToCart(plat)}>
                  Commander
                </Button>
                <input
                  type="number"
                  value={quantities[plat._id] || 1}
                  onChange={(e) => updateQuantity(plat, e.target.value)}
                />
              </Card>
            </div>
          ))}
        </div>
      </Container>
      <br />
      <div>
        <h2>Panier</h2>
        {cart.map((plat) => (
          <div key={plat._id}>
            {plat.nom} - Quantité : {quantities[plat._id] || 1}
          </div>
        ))}
      </div>
      <Button variant="success" onClick={handleCommande}>
          Confirmer la commande
      </Button>
    </div>
  );

}

export default Menu;
