import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function Profile() {
    const [formData, setFormData] = useState({});

    // Récupérer l'email de l'utilisateur connecté depuis le localStorage
    const userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
        // Supposons que cette URL est celle de votre serveur qui renvoie les données du profil utilisateur
        axios.get(`http://localhost:8000/profile/${userEmail}`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du profil', error);
            });
    }, [userEmail]);  // Ne l'exécuter qu'une fois lors du montage du composant

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8000/update-profile/${userEmail}`, formData)
            .then(response => {
                console.log('Profil mis à jour', response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour du profil', error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div>
            <h1>Profil de {formData.firstName} {formData.lastName}</h1>
            <Form onSubmit={handleSubmit}>
                {/* Supposons que votre formulaire ressemble à cela */}
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email || ''} onChange={handleChange} />
                </Form.Group>
                {/* Ajoutez d'autres champs ici */}
                <Button type="submit">Mettre à jour</Button>
            </Form>
        </div>
    );
}

export default Profile;
