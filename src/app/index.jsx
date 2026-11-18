import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext.js";
import { ActivityIndicator } from "react-native";

export default function Index() {
  const { token, cargando } = useAuth();
  if (cargando) return <ActivityIndicator style={{ marginTop: 40 }} />;
  return <Redirect href={token ? "/vehiculos" : "/login"} />;
}
