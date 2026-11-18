import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext.js";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const entrar = async () => {
    if (!email.trim() || !password) {
      setError("Completa todos los campos");
      return;
    }
    try {
      setEnviando(true);
      setError("");
      await login(email.trim(), password);
      router.replace("/vehiculos");
    } catch (e) {
      setError(e.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Iniciar sesión</Text>
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
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable style={styles.boton} onPress={entrar} disabled={enviando}>
        <Text style={styles.botonTexto}>
          {enviando ? "Entrando..." : "Entrar"}
        </Text>
      </Pressable>
      <Link href="/registro" style={styles.enlace}>
        Crear cuenta
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, justifyContent: "center", padding: 24 },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
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
