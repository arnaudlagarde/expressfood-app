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
            const jsonData = JSON.stringify(formData);

            const response = await fetch("http://localhost:8000/connexion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: jsonData,
            });

            if (response.status === 200) {
                const user = await response.json();
                console.log('Connexion réussie', user);
                // Redirigez l'utilisateur ou effectuez d'autres actions après la connexion réussie.
            } else {
                console.log('Échec de la connexion');
                // La connexion a échoué, affichez un message d'erreur.
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
        }
    };

    return (
        <Container>
            <h2>Connexion</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Se connecter
                </Button>
            </Form>
        </Container>
    );
}

export default Login;
