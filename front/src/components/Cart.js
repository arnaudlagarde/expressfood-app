import React, { useState, useEffect } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import { useCart } from "./CartContext";
import axios from "axios";

function Cart() {
    const { cart, clearCart } = useCart();
    const [quantities, setQuantities] = useState({});
    const api = axios.create({
        baseURL: "http://localhost:8000",
    });

    const getTotalPrice = () => {
        return cart.reduce(
            (total, plat) => total + plat.prix * plat.quantity,
            0
        );
    };

    const shippingCost = getTotalPrice() >= 19.99 ? 0 : 5;

    const submitOrder = async () => {
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
                    plats: [],
                    dateCommande: new Date(),
                    livreurId: premierLivreurLibre._id,
                };

                api
                    .post("/commandes", nouvelleCommande)
                    .then((response) => {
                        console.log("Commande créée avec succès !", response.data);
                        clearCart();
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

    return (
        <Container className="cart">
            <h2 className="mb-4">Panier</h2>
            {cart.length === 0 ? (
                <p className="mb-4">Votre panier est vide.</p>
            ) : (
                <div>
                    <ListGroup>
                        {cart.map((plat) => (
                            <ListGroup.Item key={plat._id}>
                                {plat.nom} - Quantité : {plat.quantity}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <p className="mt-4">
                        Total : {getTotalPrice()} €
                    </p>
                    <p>Frais de livraison : {shippingCost === 0 ? "Gratuits" : shippingCost + " €"}</p>
                    <Button
                        variant="secondary"
                        className="mr-2"
                        onClick={clearCart}
                    >
                        Vider le panier
                    </Button>
                    <Button
                        variant="success"
                        onClick={submitOrder}
                    >
                        Valider la commande
                    </Button>
                </div>
            )}
        </Container>
    );
}

export default Cart;
