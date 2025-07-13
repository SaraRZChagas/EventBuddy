import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { database } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { styles } from "../styles";
import MapButton from "../components/MapButton";

export default function Home() {
  const { logout } = useAuth();
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();
  const isWeb = Platform.OS === "web";
  const screenWidth = Dimensions.get("window").width;
  const numColumns = isWeb && screenWidth > 800 ? 2 : 1;

  useEffect(() => {
    const unsubscribe = database
      .collection("events")
      .orderBy("datetime", "asc")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(data.slice(0, 4));
      });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => {
    const dateObj = item.datetime.toDate();
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const { latitude, longitude } = item.location;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("EventDetails", { eventId: item.id })}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.date}>{`${date} ${time}`}</Text>
        {item.venue ? (
          <Text style={styles.venue}>{item.venue}</Text>
        ) : null}
        <MapButton latitude={latitude} longitude={longitude} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Próximos eventos</Text>
      <FlatList
        data={events}
        key={numColumns}
        numColumns={numColumns}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Events")}>
        <Text style={styles.buttonText}>Ver todos os eventos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
