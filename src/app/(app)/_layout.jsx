import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../context/AuthContext.js";

export default function AppLayout() {
  const { token, cargando } = useAuth();

  if (cargando) return null;
  if (!token) return <Redirect href="/login" />;

  return (
    <Stack>
      <Stack.Screen name="vehiculos/index" options={{ title: "Catálogo" }} />
      <Stack.Screen name="vehiculos/[id]" options={{ title: "Detalle" }} />
      <Stack.Screen name="compras" options={{ title: "Mis compras" }} />
    </Stack>
  );
}
