import axios from 'axios';

const REACT_APP_BASE_URL = 'http://localhost:3333';

const instance = axios.create({
    baseURL: REACT_APP_BASE_URL,
    headers: [
        { 'content-type': 'application/json' }
    ]
});

export default instance;