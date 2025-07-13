import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { signIn } from "../services/firebaseAuth";
import { styles } from "../styles";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    try {
      setErrorMsg(""); 
      await signIn(email, password);
    } catch (error) {
      console.log("Erro:", error); 
      console.log("Código:", error.code); 

      switch (error.code) {
        case "auth/user-not-found":
          setErrorMsg("Usuário não encontrado. Verifique o email.");
          break;
        case "auth/wrong-password":
          setErrorMsg("Senha incorreta. Tente novamente.");
          break;
        case "auth/invalid-email":
          setErrorMsg("Email inválido.");
          break;
        case "auth/too-many-requests":
          setErrorMsg("Muitas tentativas. Tente novamente mais tarde.");
          break;
        case "auth/invalid-login-credentials":
        case "auth/invalid-credential":
          setErrorMsg("Email ou senha incorretos.");
          break;
        default:
          setErrorMsg("Erro ao fazer login. Tente novamente.");
      }
    }
  };

  return (
    
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/fundo.jpg")}
          style={{ position: "absolute" }}
        />
        <View
          style={{
            width: "80%",
            backgroundColor: "#FFFFFFCC",
            padding: 15,
            borderRadius: 8,
          }}
        >
          <Text style={styles.label}>Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          {errorMsg !== "" && (
            <Text style={{ color: "red", marginBottom: 10 }}>{errorMsg}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Recover")}>
            <Text style={styles.link}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.link}>Criar uma conta?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
    </KeyboardAvoidingView>
    
  );
}
