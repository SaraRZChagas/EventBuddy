import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { auth } from "../firebaseConfig";
import { styles } from "../styles";

export default function Recuperacao({ navigation }) {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const recuperarSenha = () => {
    setErro("");
    if (email.trim() === "") {
      setErro("Digite o email da conta.");
      return;
    }

    if (!isValidEmail(email)) {
      setErro("Digite um email válido.");
      return;
    }

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setErro(""); 
        Alert.alert("Sucesso", "Email de recuperação enviado!");
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
        let mensagem = "Não foi possível enviar o email.";
        if (error.code === "auth/user-not-found") {
          mensagem = "Este email não está cadastrado.";
        } else if (error.code === "auth/invalid-email") {
          mensagem = "Formato de email inválido.";
        }
        setErro(mensagem);
      });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: "center" }}>
        <Image source={require("../assets/fundo.jpg")} style={{ position: "absolute" }} />
        <View style={{ width: "80%", backgroundColor: "#FFFFFFCC", padding: 15, borderRadius: 8 }}>
          <Text style={styles.label}>Digite seu Email:</Text>
          <TextInput
            placeholder="email@email.com"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {erro !== "" && (
          <Text style={{ color: "red", textAlign: "center", marginVertical: 8 }}>{erro}</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={recuperarSenha}>
            <Text style={styles.buttonText}>Recuperar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.link}>Não tem conta? Cadastre-se!</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Já tem conta? Entrar!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
