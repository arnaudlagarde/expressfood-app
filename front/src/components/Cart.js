import React from "react";
import { Button } from "react-bootstrap";
import { useCart } from "./CartContext";

function Cart() {
    const { cart, clearCart } = useCart();

    const getTotalPrice = () => {
        return cart.reduce((total, plat) => total + plat.prix * plat.quantity, 0);
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
                            <li key={plat._id}> {/* changed id to _id */}
                                {plat.nom} - Quantité : {plat.quantity}
                            </li>
                        ))}
                    </ul>
                    <p>Total : {getTotalPrice()} €</p>
                    <Button variant="secondary" onClick={clearCart}>
                        Vider le panier
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Cart;
