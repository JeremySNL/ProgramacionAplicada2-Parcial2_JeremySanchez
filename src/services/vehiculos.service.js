import { api } from "./api.js";

export const getVehiculos = async () => {
  return api(`/vehiculos`);
};

export const getVehiculosDisponibles = async () => {
  return api(`/vehiculos?estado=disponible`);
};

export const getVehiculoById = async (id) => {
  return api(`/vehiculos/${id}`);
};

export const createVehiculo = async (marca, modelo, anio, precio, imagen) => {
  return api(`/vehiculos`, `POST`, { marca, modelo, anio, precio, imagen });
};

export const updateVehiculo = async (id, precio) => {
  return api(`/vehiculos/${id}`, `PUT`, { precio });
};

export const deleteVehiculo = async (id) => {
  return api(`/vehiculos/${id}`, `DELETE`);
};
