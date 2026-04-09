import axios from 'axios';
import keycloak from './keycloak';

const api = axios.create({
  baseURL: import.meta.env.DEV ? 'http://127.0.0.1:8000' : '',
});

api.interceptors.request.use(async (config) => {
  if (keycloak.authenticated) {
    try {
      await keycloak.updateToken(5);
    } catch {
      // token refresh failed — will get 401
    }
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && keycloak.authenticated) {
      keycloak.login();
    }
    return Promise.reject(error);
  }
);

export default api;
