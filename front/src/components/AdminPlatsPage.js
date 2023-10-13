import React, { useState, useEffect } from "react";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";

function AdminPlatsPage() {
    const [plats, setPlats] = useState([]);

    useEffect(() => {

        fetch("http://localhost:8000/menu")
            .then((response) => response.json())
            .then((data) => setPlats(data))
            .catch((error) => console.error("Erreur lors de la récupération des plats :", error));
    }, []);

    return (
        <Container>
            <h1 className="my-4">Tous les plats</h1>
            <ListGroup>
                {plats.map((plat) => (
                    <ListGroupItem key={plat._id}>
                        <h3>{plat.nom}</h3>
                        <p>Type: {plat.type}</p>
                        <p>Description: {plat.description}</p>
                        <p>Prix: {plat.prix} €</p>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Container>
    );
}

export default AdminPlatsPage;
