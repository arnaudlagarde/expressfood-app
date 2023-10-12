import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function Profile() {
    const [formData, setFormData] = useState({});

    // Fetch the user's email from local storage
    const user = JSON.parse(localStorage.getItem('user') || "{}");
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
            })
            .catch(error => {
                console.error('Error updating profile', error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div>
            <h1>Profile of {formData.firstName} {formData.lastName}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} />
                </Form.Group>
                {/* Add other fields here as needed */}
                <Button type="submit">Update</Button>
            </Form>
        </div>
    );
}

export default Profile;
