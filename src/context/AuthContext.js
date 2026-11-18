import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginRequest } from "../services/auth.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // al abrir la app, recuperar la sesión guardada
  useEffect(() => {
    const restaurar = async () => {
      const t = await AsyncStorage.getItem("token");
      const u = await AsyncStorage.getItem("usuario");
      if (t && u) {
        setToken(t);
        setUsuario(JSON.parse(u));
      }
      setCargando(false);
    };
    restaurar();
  }, []);

  const login = async (email, password) => {
    const data = await loginRequest(email, password);    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("usuario", JSON.stringify(data.usuario));
    setToken(data.token);
    setUsuario(data.usuario);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(["token", "usuario"]);
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        usuario,
        esAdmin: usuario?.rol === "admin",
        cargando,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
