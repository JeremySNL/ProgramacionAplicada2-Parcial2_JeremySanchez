import { api } from "./api.js";

export const getVentas = async () => {
  return api(`/ventas`);
};

export const getDetalleVenta = async (id) => {
  return api(`/ventas/${id}`);
};

export const createVenta = async (idVehiculo, metodoPago) => {
  return api(`/ventas`, `POST`, { vehiculoId: idVehiculo, metodoPago });
};
