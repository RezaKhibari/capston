import axios from 'axios';

const API_URL = "http://localhost/fin-guard-api";

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth.php`, credentials);
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};