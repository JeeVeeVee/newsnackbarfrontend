import axiosRoot from 'axios';
import config from '../config.json';

export const axios = axiosRoot.create({
    baseURL: config.base_url,
    headers: {
        // Make sure an existing token is set before the first request is executed
        Authorization: `Bearer invalidToken`,
    }
});

export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
        console.log(axios.defaults.headers['Authorization'])
    } else {
        delete axios.defaults.headers['Authorization'];
    }
}
