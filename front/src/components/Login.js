import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("isAdmin");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async (user) => {

        localStorage.setItem("user", JSON.stringify(user));

        localStorage.setItem("isLoggedIn", "true");

        localStorage.setItem("isAdmin", user.est_administrateur ? "true" : "false");
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


                handleLogin(user);
                if (localStorage.getItem("isLoggedIn")) {

                    console.log("Utilisateur connecté :", JSON.parse(localStorage.getItem("user")));
                    console.log("est administrateur :", JSON.parse(localStorage.getItem("isAdmin")));
                } else {
                    console.log("Utilisateur non connecté");
                }


                navigate("/");
            } else {
                console.log('Échec de la connexion');

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
            {localStorage.getItem("isLoggedIn") === "true" && (
                <Button variant="danger" onClick={handleLogout}>
                    Déconnexion
                </Button>
            )}
        </Container>
    );
}

export default Login;
