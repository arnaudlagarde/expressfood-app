import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const jsonData = JSON.stringify(formData); // Convertir les données en JSON

            const response = await fetch("http://localhost:8000/connexion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: jsonData,
            });

            if (response.status === 200) {
                console.log("Connexion réussie");
                // Redirigez l'utilisateur ou affichez un message de succès.
            } else {
                console.log("Échec de la connexion");
                // La connexion a échoué, affichez un message d'erreur.
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
        }
    }

    return (
        <Container>
            <h2>Connexion</h2>
            <Form onSubmit={handleSubmit}>
                {/* ... Autres champs de formulaire ... */}
                <Button variant="primary" type="submit">
                    Se connecter
                </Button>
            </Form>
        </Container>
    );
}

export default Login;
