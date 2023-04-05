import axios from 'axios';
const BASE_URL = "https://api.openai.com/";
const OPENAI_KEY = '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';

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + OPENAI_KEY,
    },
});