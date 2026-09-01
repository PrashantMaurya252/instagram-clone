import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL || 'https://instagram-clone-awa2.onrender.com'; // or whatever the env is

const api = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;