import React, { useState, useEffect } from "react";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";

function AdminLivreursPage() {
    const [livreurs, setLivreurs] = useState([]);

    useEffect(() => {
        // Effectuez votre requête API pour récupérer tous les livreurs depuis votre serveur
        fetch("http://localhost:8000/livreurs") // Assurez-vous que l'URL est correcte
            .then((response) => response.json())
            .then((data) => setLivreurs(data))
            .catch((error) => console.error("Erreur lors de la récupération des livreurs :", error));
    }, []);

    return (
        <Container>
            <h1 className="my-4">Tous les livreurs</h1>
            <ListGroup>
                {livreurs.map((livreur) => (
                    <ListGroupItem key={livreur._id}>
                        <h3>{livreur.nom}</h3>
                        <p>Statut: {livreur.statut}</p>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Container>
    );
}

export default AdminLivreursPage;
