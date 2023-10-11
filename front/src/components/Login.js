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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ajoutez ici la logique de traitement de la connexion
        // Utilisez formData pour récupérer les données du formulaire
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
