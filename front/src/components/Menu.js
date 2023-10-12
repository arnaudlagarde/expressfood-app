import React, { useState, useEffect } from "react";
import { Container, Card, Button, Dropdown } from "react-bootstrap";
import axios from "axios";
import "./Menu.css"; // Add your custom styles here for hover effect

function Menu() {
  const [platsDuJour, setPlatsDuJour] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const api = axios.create({
    baseURL: "http://localhost:8000",
  });

  const addToCart = (plat, quantity) => {
    const updatedCart = [...cart, { ...plat, quantity: quantity }];
    setCart(updatedCart);
  };

  const handleCommande = () => {
    const clientId = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))._id
      : null;

    if (!clientId) {
      console.error("Client ID not found in localStorage.");
      return;
    }

    api
      .get("/livreurs-libres")
      .then((response) => {
        const livreursLibres = response.data;

        if (livreursLibres.length === 0) {
          console.error("No available delivery drivers.");
          return;
        }

        const premierLivreurLibre = livreursLibres[0];

        const nouvelleCommande = {
          clientId: clientId,
          plats: cart.map((plat) => ({
            platId: plat._id,
            quantite: plat.quantity,
          })),
          dateCommande: new Date(),
          livreurId: premierLivreurLibre._id,
        };

        api
          .post("/commandes", nouvelleCommande)
          .then((response) => {
            console.log("Commande créée avec succès !", response.data);
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
    api
      .get("/plats_du_jour")
      .then((response) => {
        setPlatsDuJour(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des plats du jour :", error);
      });
  }, []);

  return (
    <div>
      <Container>
        <h2>Plats du Jour</h2>
        <div className="row">
          {platsDuJour.map((plat) => (
            <div key={plat._id} className="col-md-4">
              <Card className="card-space">
                <Card.Img
                  variant="top"
                  src={plat.image}
                  height="250"
                  alt={plat.nom}
                  className="dish-image" // Add this class for hover effect
                />
                <Card.Body>
                  <Card.Title>{plat.nom}</Card.Title>
                  <Card.Text>{plat.description}</Card.Text>
                  <hr />
                  <Card.Text>Prix : {plat.prix} €</Card.Text>
                </Card.Body>
                {isLoggedIn && (
                  <>
                    <Dropdown>
                      <Dropdown.Toggle variant="info">
                        Quantité: {quantities[plat._id] || 1}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {[1, 2, 3, 4, 5].map((quantity) => (
                          <Dropdown.Item
                            key={quantity}
                            onClick={() => setQuantities({ ...quantities, [plat._id]: quantity })}
                          >
                            {quantity}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Button
                      variant="info" // Change to gray-blue color
                      onClick={() => addToCart(plat, quantities[plat._id] || 1)}
                      className="add-to-cart-button" // Add this class for hover effect
                    >
                      Ajouter au panier
                    </Button>
                  </>
                )}
              </Card>
            </div>
          ))}
        </div>
      </Container>
      <br />
      {isLoggedIn && (
        <div>
          <h2>Panier</h2>
          {cart.map((plat) => (
            <div key={plat._id}>
              {plat.nom} - Quantité : {plat.quantity}
            </div>
          ))}
          {cart.length > 0 && (
            <Button variant="success" onClick={handleCommande}>
              Confirmer la commande
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Menu;
