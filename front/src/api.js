// api.js

import axios from 'axios';

async function getCSRFToken() {
    try {
        const response = await axios.get('/get-csrf-token/');
        return response.data.csrfToken;
    } catch (error) {
        throw error;
    }
}

async function sendPostRequest(data) {
    try {
        const csrfToken = await getCSRFToken();
        const response = await axios.post('/votre-endpoint-api/', data, {
            headers: {
                'X-CSRFToken': csrfToken,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}


export { sendPostRequest };
