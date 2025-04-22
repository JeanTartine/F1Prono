import axios from "axios"

// Basic axios instance setup with our api address
export const f1PronoApi = axios.create({
    withCredentials: false,
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/ld+json',
    }
})