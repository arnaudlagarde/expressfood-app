// api.js

import axios from 'axios';

// Récupérez le jeton CSRF depuis Django
async function getCSRFToken() {
    try {
        const response = await axios.get('/get-csrf-token/'); // Remplacez par l'URL correcte pour obtenir le jeton CSRF
        return response.data.csrfToken; // Assurez-vous que la réponse de Django renvoie le jeton CSRF
    } catch (error) {
        throw error;
    }
}

// Effectuez des requêtes POST, GET, etc. en incluant le jeton CSRF
async function sendPostRequest(data) {
    try {
        const csrfToken = await getCSRFToken();
        const response = await axios.post('/votre-endpoint-api/', data, {
            headers: {
                'X-CSRFToken': csrfToken, // Assurez-vous que le nom de l'en-tête CSRF est correct
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Autres fonctions pour gérer d'autres types de requêtes

export { sendPostRequest };
