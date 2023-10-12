import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useCart } from "./CartContext";
import axios from 'axios';

function Cart() {
    const { cart, clearCart } = useCart();
    const [quantities, setQuantities] = useState({});
    const api = axios.create({
        baseURL: "http://localhost:8000",
      });

    const getTotalPrice = () => {
        return cart.reduce((total, plat) => total + plat.prix * plat.quantity, 0);
    };

    const shippingCost = (getTotalPrice() >= 19.99) ? 0 : 5;  // Frais de livraison gratuits à partir de 19,99€, sinon 5€

    // Fonction pour soumettre la commande
    const submitOrder = async () => {
        /*try {
            // Remplacez ceci par l'ID du client connecté
            const clientId = "Votre_Id_Client";

            // Création des données de la commande
            const orderData = {
                clientId,
                plats: cart.map(plat => ({ platId: plat._id, quantite: plat.quantity })),
                dateCommande: new Date(),
            };

            // Envoi de la requête POST pour créer une nouvelle commande
            const response = await axios.post("http://localhost:8000/commandes", orderData);

            console.log("Commande envoyée avec succès:", response.data);

            // Effacer le panier si la commande est passée avec succès
            clearCart();
        } catch (error) {
            console.error("Erreur lors de l'envoi de la commande:", error);
        }*/
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

    return (
        <div className="cart">
            <h2>Panier</h2>
            {cart.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((plat) => (
                            <li key={plat._id}>
                                {plat.nom} - Quantité : {plat.quantity}
                            </li>
                        ))}
                    </ul>
                    <p>Total : {getTotalPrice()} €</p>
                    <p>Frais de livraison : {shippingCost === 0 ? 'Gratuits' : shippingCost + ' €'}</p>
                    <Button variant="secondary" onClick={clearCart}>
                        Vider le panier
                    </Button>
                    <Button variant="success" onClick={submitOrder}>
                        Valider la commande
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Cart;
