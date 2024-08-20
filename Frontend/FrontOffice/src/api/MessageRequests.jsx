/* eslint-disable */
import axios from 'axios'


const API = axios.create({ baseURL: 'https://opnet-piweb.onrender.com' });

export const getMessages = (id) => API.get(`/messages/${id}`);

export const addMessage = (data) => API.post('/messages/', data);
