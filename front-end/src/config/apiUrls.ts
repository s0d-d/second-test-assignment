const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/api/login`,
  SIGNUP: `${BASE_URL}/api/signup`,
  USER_INFO: `${BASE_URL}/api/user`,
  DISCUSSIONS: `${BASE_URL}/api/discussions`,
  LOGOUT: `${BASE_URL}/api/logout`,
};

export default API_ENDPOINTS;
