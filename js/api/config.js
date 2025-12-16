// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to make API calls
async function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Add token to headers if it exists
    const token = localStorage.getItem('token');
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    // Add body for POST/PUT requests
    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('API call error:', error);
        return {
            success: false,
            message: 'Network error. Please check your connection.'
        };
    }
}
