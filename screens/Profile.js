import React, { useEffect, useState } from "react";
import {View, Text, TextInput, Image, TouchableOpacity, Alert, ScrollView, } from "react-native";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebaseConfig";
import { styles } from "../styles";
import { doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

function formatDateToBR(dateIso) {
  if (!dateIso) return "";
  const parts = dateIso.split("-");
  if (parts.length !== 3) return dateIso;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function formatDateToISO(dateBR) {
  if (!dateBR) return "";
  const parts = dateBR.split("/");
  if (parts.length !== 3) return dateBR;
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

export default function PerfilScreen() {
  const { logout } = useAuth();
  const { user } = useAuth();
  const navigation = useNavigation();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    birthDate: "",
    photoUrl: "",
    participating: [],
  });
  const [eventTitles, setEventTitles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!user) return;

  const fetchProfile = async () => {
    try {
      const userRef = doc(database, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();

        setProfile({
          name: data.name || "",
          email: data.email || "",
          birthDate: formatDateToBR(data.birthDate || ""),
          photoUrl: data.photoUrl || "",
          participating: data.participating || [],
        });

        const titles = [];
        for (const eventId of data.participating || []) {
          const eventRef = doc(database, "events", eventId);
          const eventSnap = await getDoc(eventRef);
          if (eventSnap.exists()) {
            titles.push({ id: eventId, title: eventSnap.data().title });
          }
        }
        setEventTitles(titles);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar o perfil.");
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, [user]);


  const validateDate = (date) => {
    if (!date) return true;
    const re = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!re.test(date)) return false;

    const [_, day, month, year] = date.match(re);
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);
    if (m < 1 || m > 12) return false;
    const maxDays = new Date(y, m, 0).getDate();
    if (d < 1 || d > maxDays) return false;

    const inputDate = new Date(y, m - 1, d);
    if (inputDate > new Date()) return false;

    return true;
  };

  const onChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const onSave = async () => {
    if (!profile.name.trim()) {
      Alert.alert("Validação", "O nome é obrigatório.");
      return;
    }

    if (profile.birthDate && !validateDate(profile.birthDate.trim())) {
      Alert.alert("Validação", "Informe uma data de nascimento válida (dd/mm/aaaa).");
      return;
    }

    try {
      await database.collection("users").doc(user.uid).update({
        name: profile.name.trim(),
        birthDate: formatDateToISO(profile.birthDate.trim()),
        photoUrl: profile.photoUrl.trim(),
      });
      Alert.alert("Sucesso", "Perfil atualizado.");
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar o perfil.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={[styles.container, { paddingBottom: 40 }]}>
        {profile.photoUrl ? (
          <Image
            source={{ uri: profile.photoUrl }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
              alignSelf: "center",
              marginBottom: 20,
            }}
          />
        ) : (
          <View
            style={{
              height: 150,
              width: 150,
              borderRadius: 75,
              backgroundColor: "#ccc",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text>Sem foto</Text>
          </View>
        )}

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={profile.name}
          onChangeText={(text) => onChange("name", text)}
          placeholder="Seu nome"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={profile.email}
          editable={false}
          placeholder="seu@email.com"
        />

        <Text style={styles.label}>Data de nascimento (dd/mm/aaaa)</Text>
        <TextInput
          style={styles.input}
          value={profile.birthDate}
          onChangeText={(text) => onChange("birthDate", text)}
          placeholder="Ex: 31/12/1990"
        />

        <Text style={styles.label}>URL da Foto</Text>
        <TextInput
          style={styles.input}
          value={profile.photoUrl}
          onChangeText={(text) => onChange("photoUrl", text)}
          placeholder="https://..."
        />

        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <Text style={[styles.label, { marginTop: 20 }]}>Eventos que você participa:</Text>
        {eventTitles.length === 0 ? (
          <Text style={styles.text}>Você ainda não está participando de eventos.</Text>
        ) : (
          eventTitles.map((event) => (
            <TouchableOpacity
              key={event.id}
              onPress={() => navigation.navigate("EventDetails", { eventId: event.id })}
            >
              <Text style={[styles.text, { color: "#3b82f6", marginVertical: 4 }]}>
                {event.title}
              </Text>
            </TouchableOpacity>
          ))
        )}

        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

}
