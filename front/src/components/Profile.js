import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

function Profile() {
    const [formData, setFormData] = useState({});
    const [updateStatus, setUpdateStatus] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');

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

    const handleSubmit = (e) => {
        e.preventDefault();

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
                setUpdateStatus('error');
                setAlertMessage('Erreur lors de la mise à jour du profil.');
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div>
            <h1>Bienvenue {formData.firstName} {formData.lastName} !</h1>
            <Form onSubmit={handleSubmit}>
                {updateStatus === 'success' && (
                    <Alert variant="success">{alertMessage}</Alert>
                )}
                {updateStatus === 'error' && (
                    <Alert variant="danger">{alertMessage}</Alert>
                )}
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nom de famille</Form.Label>
                    <Form.Control type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Téléphone</Form.Label>
                    <Form.Control type="text" name="phone" value={formData.phone || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control type="text" name="address" value={formData.address || ''} onChange={handleChange} />
                </Form.Group>
                <Button type="submit">Mettre à jour</Button>
            </Form>
        </div>
    );
}

export default Profile;
