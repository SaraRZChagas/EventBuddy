import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { signUp } from "../services/firebaseAuth";
import { database } from "../firebaseConfig";
import { styles } from "../styles";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const isValidDate = (dateString) => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) return false;

    const [day, month, year] = dateString.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    const today = new Date();

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      date <= today
    );
  };

  const convertToISODate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const isValidPassword = (pwd) => {
    const minLength = pwd.length >= 6;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(pwd);
    return minLength && hasUpperCase && hasSpecialChar;
  };

  const handleSignUp = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (birthDate.trim() && !isValidDate(birthDate)) {
      Alert.alert("Erro", "Data de nascimento inválida. Use o formato DD/MM/AAAA.");
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert(
        "Erro",
        "Senha inválida. Deve ter pelo menos 6 caracteres, uma letra maiúscula e um caractere especial."
      );
      return;
    }

    try {
      const user = await signUp(email, password);
      const userId = user.uid;

      const formattedDate = birthDate ? convertToISODate(birthDate) : "";

      await database.collection("users").doc(userId).set({
        name,
        birthDate: formattedDate,
        photoUrl,
        email,
      });

    } catch (error) {
      let errorMsg = "Erro ao cadastrar.";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMsg = "Este email já está em uso.";
          break;
        case "auth/invalid-email":
          errorMsg = "Email inválido.";
          break;
        case "auth/weak-password":
          errorMsg = "Senha fraca. Reforce sua senha.";
          break;
        default:
          errorMsg = error.message;
      }

      Alert.alert("Erro", errorMsg);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
        <Image source={require("../assets/fundo.jpg")} style={{ position: "absolute" }} />
        <View style={{ width: "80%", backgroundColor: "#FFFFFFCC", padding: 15, borderRadius: 8 }}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Data de Nascimento (DD/MM/AAAA):</Text>
          <TextInput
            value={birthDate}
            onChangeText={setBirthDate}
            style={styles.input}
            placeholder="01/01/2000"
            keyboardType="words"
          />

          <Text style={styles.label}>URL da foto:</Text>
          <TextInput
            value={photoUrl}
            onChangeText={setPhotoUrl}
            style={styles.input}
            placeholder="https://example.com/photo.jpg"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Email: *</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Senha: *</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ marginTop: 10 }}>
            <Text style={styles.link}>Já tem uma conta? Faça login!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
