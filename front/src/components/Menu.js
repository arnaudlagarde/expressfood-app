import React, { useState, useEffect } from "react";
import { Container, Card, Button, Dropdown } from "react-bootstrap";
import axios from "axios";
import "./Menu.css"; // Add your custom styles here for hover effect
import { useCart } from "./CartContext"; // Correct import

function Menu() {
  const [platsDuJour, setPlatsDuJour] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const { addToCart, clearCart } = useCart(); // Use the addToCart and clearCart from the CartContext
  const [quantities, setQuantities] = useState({});
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const api = axios.create({
    baseURL: "http://localhost:8000",
  });

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
          plats: [], // Change this to an empty array as we're not using cart here
          dateCommande: new Date(),
          livreurId: premierLivreurLibre._id,
        };

        api
          .post("/commandes", nouvelleCommande)
          .then((response) => {
            console.log("Commande créée avec succès !", response.data);
            clearCart(); // Clear the cart using clearCart
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
      .get("/plats_et_desserts_du_jour") // Changed the endpoint to get both plats and desserts of the day
      .then((response) => {
        const { plats, desserts } = response.data; // Destructure the response

        // Set only the first 2 "Plat" and "Dessert" items
        setPlatsDuJour(plats.slice(0, 2));
        setDesserts(desserts.slice(0, 2));
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des plats et desserts du jour :", error);
      });
  }, []);

  return (
    <div>
      <Container>
        <h2>Plats du Jour</h2>
        <div className="row">
          {platsDuJour.map((plat) => (
            <div key={plat._id} className="col-md-4">
              <Card className="card-space dish-card">
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
                      <Dropdown.Toggle variant="secondary" className="quantity-toggle">
                        Quantité: {quantities[plat._id] || 1}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {[1, 2, 3, 4, 5].map((quantity) => (
                          <Dropdown.Item
                            key={quantity}
                            onClick={() => setQuantities({ ...quantities, [plat._id]: quantity })}
                            className="quantity-dropdown-item" // Add this class for gray/white color
                          >
                            {quantity}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Button
                      variant="secondary"
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

      <Container>
        <h2>Desserts</h2>
        <div className="row">
          {desserts.map((plat) => (
            <div key={plat._id} className="col-md-4">
              <Card className="card-space dish-card">
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
                      <Dropdown.Toggle variant="secondary" className="quantity-toggle">
                        Quantité: {quantities[plat._id] || 1}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {[1, 2, 3, 4, 5].map((quantity) => (
                          <Dropdown.Item
                            key={quantity}
                            onClick={() => setQuantities({ ...quantities, [plat._id]: quantity })}
                            className="quantity-dropdown-item" // Add this class for gray/white color
                          >
                            {quantity}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Button
                      variant="secondary"
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
    </div>
  );
}

export default Menu;
