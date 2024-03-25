/* eslint-disable */

const BASE_URL = "http://localhost:5000";

const API_URLS = {
  addUser: `${BASE_URL}/user/add`,   // Ajoutez d'autres URL ici
  getUsers:`${BASE_URL}/user/getall`,
  signup: `${BASE_URL}/user`,
  checkEmail:`${BASE_URL}/user/checkEmail`, 

};

export default API_URLS;
