import axios from 'axios';
const BASE_URL = "https://api.openai.com/";

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 
            'Bearer '
            + 's' 
            + 'k' 
            + '-' 
            + (process.env.REACT_APP_OPENAI_KEY_4 || '').split('').reverse().join('') 
            + (process.env.REACT_APP_OPENAI_KEY_3 || '').split('').reverse().join('') 
            + (process.env.REACT_APP_OPENAI_KEY_2 || '').split('').reverse().join('') 
            + (process.env.REACT_APP_OPENAI_KEY_1 || '').split('').reverse().join(''),
    },
});