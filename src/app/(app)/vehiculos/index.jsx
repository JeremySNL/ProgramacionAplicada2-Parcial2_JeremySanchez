import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../../../context/AuthContext.js";
import {
  getVehiculos,
  getVehiculosDisponibles,
} from "../../../services/vehiculos.service.js";

export default function Vehiculos() {
  const router = useRouter();
  const { logout, esAdmin } = useAuth();
  const [vehiculos, setVehiculos] = useState([]);
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargar = soloDisponibles ? getVehiculosDisponibles : getVehiculos;
    cargar()
      .then((res) => setVehiculos(res.data))
      .catch((e) => setError(e.message));
  }, [soloDisponibles]);

  const salir = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <View style={styles.contenedor}>
      <Pressable
        style={styles.boton}
        onPress={() => setSoloDisponibles(!soloDisponibles)}
      >
        <Text style={styles.botonTexto}>
          {soloDisponibles ? "Ver todos" : "Ver solo disponibles"}
        </Text>
      </Pressable>
      <Link href="/compras" style={styles.enlace}>
        {esAdmin ? "Todas las compras" : "Mis compras"}
      </Link>
      <Pressable style={[styles.boton, styles.botonSalir]} onPress={salir}>
        <Text style={styles.botonTexto}>Cerrar sesión</Text>
      </Pressable>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={vehiculos}
        keyExtractor={(v) => String(v.id)}
        renderItem={({ item }) => (
          <Pressable
            style={styles.tarjeta}
            onPress={() => router.push(`/vehiculos/${item.id}`)}
          >
            <Text style={styles.titulo}>
              {item.marca} {item.modelo}
            </Text>
            <Text style={styles.texto}>Año: {item.anio}</Text>
            <Text style={styles.precio}>${item.precio}</Text>
            <Text
              style={item.estado === "disponible" ? styles.verde : styles.rojo}
            >
              {item.estado}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 16, backgroundColor: "#f3f4f6" },
  boton: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  botonSalir: { backgroundColor: "#dc2626" },
  botonTexto: { color: "white", fontWeight: "bold" },
  enlace: { color: "#2563eb", textAlign: "center", marginVertical: 12 },
  tarjeta: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 14,
    marginTop: 10,
    elevation: 2,
  },
  titulo: { fontWeight: "bold", fontSize: 18, marginBottom: 4 },
  texto: { color: "#555" },
  precio: { fontSize: 16, fontWeight: "bold", marginVertical: 4 },
  verde: { color: "#16a34a", fontWeight: "bold" },
  rojo: { color: "#dc2626", fontWeight: "bold" },
  error: { color: "red", marginVertical: 8 },
});
