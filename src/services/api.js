import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/config";

export async function api(ruta, metodo = "GET", body) {
  const token = await AsyncStorage.getItem("token");

  const res = await fetch(`${API_URL}${ruta}`, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? `Error ${res.status}`);
  return data;
}
