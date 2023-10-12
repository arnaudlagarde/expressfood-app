import React from "react";
import { Button } from "react-bootstrap";
import { useCart } from "./CartContext";
import axios from 'axios';

function Cart() {
    const { cart, clearCart } = useCart();

    const getTotalPrice = () => {
        return cart.reduce((total, plat) => total + plat.prix * plat.quantity, 0);
    };

    // Fonction pour soumettre la commande
    const submitOrder = async () => {
        try {
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
        }
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
