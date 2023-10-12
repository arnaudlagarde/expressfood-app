import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

function Profile() {
    const [formData, setFormData] = useState({});
    const [updateStatus, setUpdateStatus] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const { email, firstName, lastName, phone, address } = formData;

    // Fetch the user's email from local storage
    const user = JSON.parse(localStorage.getItem('user') || {});
    const userEmail = user.email;

    useEffect(() => {
        axios.get(`http://localhost:8000/profile/${userEmail}`)
            .then(response => {
                const profileData = response.data;
                setFormData(profileData);
                // Update local storage with the latest profile data
                localStorage.setItem('user', JSON.stringify(profileData));
            })
            .catch(error => {
                console.error('Error fetching profile data', error);
            });
    }, [userEmail]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Ajoutez ici une validation de formulaire si nécessaire

        axios.put(`http://localhost:8000/update-profile/${userEmail}`, formData)
            .then(response => {
                console.log('Profile updated', response.data);
                // Update local storage with the updated profile data
                localStorage.setItem('user', JSON.stringify(response.data));
                // Set success alert
                setUpdateStatus('success');
                setAlertMessage('Profil mis à jour avec succès !');
            })
            .catch(error => {
                console.error('Error updating profile', error);
                // Set error alert
                setUpdateStatus('danger');
                setAlertMessage('Erreur lors de la mise à jour du profil.');
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1 className="mt-5 mb-4">Bienvenue {firstName} {lastName} !</h1>
                    {updateStatus && (
                        <Alert variant={updateStatus}>{alertMessage}</Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={email || ''} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="firstName">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control type="text" name="firstName" value={firstName || ''} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="lastName">
                            <Form.Label>Nom de famille</Form.Label>
                            <Form.Control type="text" name="lastName" value={lastName || ''} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Label>Téléphone</Form.Label>
                            <Form.Control type="text" name="phone" value={phone || ''} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="address">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control type="text" name="address" value={address || ''} onChange={handleChange} />
                        </Form.Group>
                        <Button type="submit" variant="primary">Mettre à jour</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;
