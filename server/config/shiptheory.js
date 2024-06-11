const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const SHIPTHEORY_API_URL = 'https://api.shiptheory.com/v1';
const SHIPTHEORY_AUTH_URL = `${SHIPTHEORY_API_URL}/token`;

// Function to request bearer token
// Function to request bearer token
async function getBearerToken() {
    try {
        const response = await axios.post(SHIPTHEORY_AUTH_URL, {
            email: 'harshalpawar667@gmail.com',
            password: 'Harshal@123'
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log("Respomse ------------------->>>>>>>>>>>>>",response.data.data)

        const token = response.data.data.token;
        return token;
    } catch (error) {
        console.error('Error obtaining bearer token:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Function to make a request to the Shiptheory API with the bearer token
// Function to make a request to the Shiptheory API with the bearer token
async function shiptheory(method, endpoint, data = {}) {
    try {
        const token = await getBearerToken();

        const config = {
            method: method,
            url: `${SHIPTHEORY_API_URL}${endpoint}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: method === 'POST' ? data : {}
        };

        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error(`Error making request to ${endpoint}:`, error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports = shiptheory;


