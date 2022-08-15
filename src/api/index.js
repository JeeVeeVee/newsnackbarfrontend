import axiosRoot from 'axios';
import config from '../config.json';

export const axios = axiosRoot.create({
    baseURL: config.base_url
});

export const setAuthToken = (token) => {
    console.log("setAuthToken", token);
    if (token) {
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers['Authorization'];
    }
}

export const setLanguage = (lang) => {
    axios.defaults.headers['i18n'] = lang;
}