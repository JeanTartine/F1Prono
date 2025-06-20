import axios from "axios";

// Axios conf for jolpica API
export const jolpicaApi = axios.create({
    withCredentials: false,
    baseURL: 'https://api.jolpi.ca/ergast',
})