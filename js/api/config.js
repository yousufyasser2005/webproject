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
        console.log('Making API call:', {
            url: `${API_BASE_URL}${endpoint}`,
            method,
            data
        });

        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        
        console.log('Response status:', response.status);
        
        // Get the text first to see what we're actually receiving
        const text = await response.text();
        console.log('Response text:', text);
        
        // Try to parse as JSON
        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error('Failed to parse JSON:', e);
            console.error('Received text:', text);
            return {
                success: false,
                message: 'Server returned invalid response. Check console for details.'
            };
        }
        
        return result;
    } catch (error) {
        console.error('API call error:', error);
        return {
            success: false,
            message: 'Network error. Please check your connection and ensure the backend is running.'
        };
    }
}
