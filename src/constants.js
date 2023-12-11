export const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

//auth
export const API_AUTH_LOGIN = API_BASE_URL + '/api/public/login'
export const API_AUTH_REGISTER = API_BASE_URL + '/api/public/signup'
export const API_AUTH_PROFILE = API_BASE_URL + '/api/protected/profile'