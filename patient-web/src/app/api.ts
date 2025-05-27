import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// on expose juste l'instance, sans importer le store
export default api

// on exporte aussi un setter pour le token
export function setAuthToken(token?: string) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common.Authorization
  }
}
