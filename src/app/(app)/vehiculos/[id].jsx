import { useEffect, useState } from "react";
import { View, Text, Image, Pressable, Alert, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getVehiculoById } from "../../../services/vehiculos.service.js";
import { createVenta } from "../../../services/ventas.service.js";

export default function DetalleVehiculo() {
  const { id } = useLocalSearchParams();
  const [vehiculo, setVehiculo] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    getVehiculoById(id)
      .then((res) => setVehiculo(res.data))
      .catch((e) => setMensaje(e.message));
  }, [id]);

  const comprar = async () => {
    try {
      await createVenta(vehiculo.id, "transferencia");
      setMensaje("Compra realizada con éxito");
      setVehiculo({ ...vehiculo, estado: "vendido" });
    } catch (e) {
      setMensaje(e.message);
    }
  };

  const confirmar = () => {
    Alert.alert("Confirmar", "¿Deseas comprar este vehículo?", [
      { text: "Cancelar" },
      { text: "Comprar", onPress: comprar },
    ]);
  };

  if (!vehiculo) return <Text style={styles.mensaje}>{mensaje || "Cargando..."}</Text>;

  return (
    <View style={styles.contenedor}>
      {vehiculo.imagen ? (
        <Image source={{ uri: vehiculo.imagen }} style={styles.imagen} />
      ) : null}
      <Text style={styles.titulo}>
        {vehiculo.marca} {vehiculo.modelo}
      </Text>
      <Text>Año: {vehiculo.anio}</Text>
      <Text style={styles.precio}>${vehiculo.precio}</Text>
      <Text style={vehiculo.estado === "disponible" ? styles.verde : styles.rojo}>
        {vehiculo.estado}
      </Text>
      {mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}
      {vehiculo.estado === "disponible" ? (
        <Pressable style={styles.boton} onPress={confirmar}>
          <Text style={styles.botonTexto}>Comprar</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 16, backgroundColor: "#f3f4f6" },
  imagen: { width: "100%", height: 220, borderRadius: 10, marginBottom: 12 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 4 },
  precio: { fontSize: 18, fontWeight: "bold", marginVertical: 4 },
  verde: { color: "#16a34a", fontWeight: "bold" },
  rojo: { color: "#dc2626", fontWeight: "bold" },
  boton: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  botonTexto: { color: "white", fontWeight: "bold" },
  mensaje: { marginVertical: 12, textAlign: "center" },
});
