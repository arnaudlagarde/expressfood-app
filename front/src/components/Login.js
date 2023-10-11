import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate(); // Utilisez useNavigate pour gérer la redirection

    const handleLogout = () => {
        // Déconnexion : supprimez les variables du localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async (user) => {
        // Stocker les informations de l'utilisateur dans le localStorage
        localStorage.setItem("user", JSON.stringify(user));
        // Marquer l'utilisateur comme connecté
        localStorage.setItem("isLoggedIn", "true");
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

                // Appeler la fonction pour gérer la connexion
                handleLogin(user);
                if (localStorage.getItem("isLoggedIn")){
                    // La variable user existe, vous pouvez l'afficher dans la console de log
                    console.log("Utilisateur connecté :", JSON.parse(localStorage.getItem("user")));
                }else{
                    console.log("Utilisateur non connecté");
                }
                
                // Redirigez l'utilisateur ou effectuez d'autres actions après la connexion réussie.
                navigate("/");
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
            {localStorage.getItem("isLoggedIn") === "true" && (
                <Button variant="danger" onClick={handleLogout}>
                    Déconnexion
                </Button>
            )}
        </Container>
    );
}

export default Login;
