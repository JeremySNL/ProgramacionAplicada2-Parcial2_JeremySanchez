import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { registroRequest } from "../../services/auth.service";

export default function Registro() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const registrar = async () => {
    if (!nombre.trim() || !email.trim() || !password || !confirmar) {
      return setError("Todos los campos son obligatorios");
    }
    if (!email.includes("@")) return setError("El email no es válido");
    if (password.length < 6)
      return setError("La contraseña debe tener al menos 6 caracteres");
    if (password !== confirmar) return setError("Las contraseñas no coinciden");

    try {
      setEnviando(true);
      setError("");
      await registroRequest(nombre.trim(), email.trim(), password);
      router.replace("/login");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        value={confirmar}
        onChangeText={setConfirmar}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable style={styles.boton} onPress={registrar} disabled={enviando}>
        <Text style={styles.botonTexto}>
          {enviando ? "Registrando..." : "Registrarme"}
        </Text>
      </Pressable>
      <Link href="/login" style={styles.enlace}>
        Ya tengo cuenta
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  contenedor: { flex: 1, justifyContent: "center", padding: 24 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  boton: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  botonTexto: { color: "white", fontWeight: "bold" },
  error: { color: "red", marginBottom: 12 },
  enlace: { marginTop: 16, textAlign: "center", color: "#2563eb" },
});
