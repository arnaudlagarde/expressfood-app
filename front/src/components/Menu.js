import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import axios from "axios"; // Importez Axios

//import platsDuJourData from "../data/platsDuJour.json";

function Menu() {
  const [platsDuJour, setPlatsDuJour] = useState([]); // État pour stocker les plats du jour
  const [cart, setCart] = useState([]); // État pour gérer le panier
  const [quantities, setQuantities] = useState({}); // État pour gérer les quantités

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Vérifiez si l'utilisateur est connecté
  
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
    // Récupérez l'ID du client depuis le localStorage
    const clientId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : null;

    if (!clientId) {
      console.error("ID du client non trouvé dans le localStorage.");
      return;
    }

    // Récupérez la liste des livreurs libres
    api.get("/livreurs-libres")
      .then((response) => {
        const livreursLibres = response.data;

        if (livreursLibres.length === 0) {
          console.error("Aucun livreur libre disponible.");
          return;
        }

        // Prenez le premier livreur libre
        const premierLivreurLibre = livreursLibres[0];

        // Créez un objet qui représente la nouvelle commande avec le livreur attribué
        const nouvelleCommande = {
          clientId: clientId, // Remplacez par l'ID du client concerné
          plats: cart.map((plat) => ({ platId: plat._id, quantite: quantities[plat._id] || 1 })),
          dateCommande: new Date(),
          livreurId: premierLivreurLibre._id, // Utilisez l'ID du premier livreur libre
        };

        // Envoyez la demande au serveur pour créer la commande
        api.post("/commandes", nouvelleCommande)
          .then((response) => {
            console.log("Commande créée avec succès !", response.data);
            // Réinitialisez le panier et les quantités après la commande
            setCart([]);
            setQuantities({});
          })
          .catch((error) => {
            console.error("Erreur lors de la création de la commande :", error);
          });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des livreurs libres :", error);
      });
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
                {isLoggedIn ? ( // Condition pour afficher uniquement si l'utilisateur est connecté
                <>
                  <Button variant="primary" onClick={() => addToCart(plat)}>
                    Commander
                  </Button>
                  <input
                    type="number"
                    value={quantities[plat._id] || 1}
                    onChange={(e) => updateQuantity(plat, e.target.value)}
                  />
                </>
                ) : null}
              </Card>
            </div>
          ))}
        </div>
      </Container>
      <br />
      {isLoggedIn ? ( // Condition pour afficher uniquement si l'utilisateur est connecté
      <div>
        <h2>Panier</h2>
        {cart.map((plat) => (
          <div key={plat._id}>
            {plat.nom} - Quantité : {quantities[plat._id] || 1}
          </div>
        ))}
      </div>
      ) : null}
      {isLoggedIn ? ( // Condition pour afficher uniquement si l'utilisateur est connecté
        <Button variant="success" onClick={handleCommande}>
            Confirmer la commande
        </Button>
      ) : null}
    </div>
  );

}

export default Menu;
