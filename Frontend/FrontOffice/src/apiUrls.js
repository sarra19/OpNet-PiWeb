/* eslint-disable */

const BASE_URL = "http://localhost:5000";

const API_URLS = {
  signup: `${BASE_URL}/user`,
  login: `${BASE_URL}/user/login`,
  addUser: `${BASE_URL}/user/add`,   // Ajoutez d'autres URL ici
  auth: `${BASE_URL}/auth`, 
  google: `${BASE_URL}/auth/google`, 
  reset: `${BASE_URL}/password-reset`,
  checkEmail:`${BASE_URL}/user/checkEmail`, 
//  verifyUser: (param) => `${BASE_URL}/user/${param.id}/verify/${param.token}`,

};

export default API_URLS;
