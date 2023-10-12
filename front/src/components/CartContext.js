import React, { createContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (item, quantity) => {
        // Check if the item is already in the cart
        const existingItem = cart.find((cartItem) => cartItem._id === item._id); // changed id to _id

        if (existingItem) {
            // If the item is already in the cart, update its quantity
            const updatedCart = cart.map((cartItem) => {
                if (cartItem._id === item._id) { // changed id to _id
                    return { ...cartItem, quantity: cartItem.quantity + quantity };
                }
                return cartItem;
            });
            setCart(updatedCart);
        } else {
            // If the item is not in the cart, add it
            setCart([...cart, { ...item, quantity }]);
        }
    };

    const clearCart = () => {
        // Clear the cart by setting it to an empty array
        setCart([]);
    };

    // Other cart-related functions

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = React.useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
