import { api } from "./api.js";

export const loginRequest = async (email, password) => {
  return api(`/auth/login`, `POST`, { email, password });
};

export const registroRequest = async (nombre, email, password) => {
  return api(`/auth/registro`, `POST`, { nombre, email, password });
};
