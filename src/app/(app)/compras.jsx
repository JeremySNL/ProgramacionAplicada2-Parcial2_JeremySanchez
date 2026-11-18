import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getVentas } from "../../services/ventas.service.js";

export default function Compras() {
  const router = useRouter();
  const [ventas, setVentas] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getVentas()
      .then((res) => setVentas(res.data))
      .catch((e) => setError(e.message));
  }, []);

  return (
    <View style={styles.contenedor}>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={ventas}
        keyExtractor={(v) => String(v.id)}
        renderItem={({ item }) => (
          <Pressable
            style={styles.tarjeta}
            onPress={() =>
              router.push(`/vehiculos/${item.vehiculoId ?? item.vehiculo?.id}`)
            }
          >
            <Text style={styles.titulo}>
              {item.vehiculo?.marca} {item.vehiculo?.modelo}
            </Text>
            <Text>Fecha: {new Date(item.fecha).toLocaleDateString()}</Text>
            <Text>Monto: ${item.monto}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 16, backgroundColor: "#f3f4f6" },
  tarjeta: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
  },
  titulo: { fontWeight: "bold", fontSize: 18, marginBottom: 4 },
  error: { color: "red", marginBottom: 8 },
});
