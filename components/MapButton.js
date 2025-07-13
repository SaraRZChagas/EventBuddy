import React from "react";
import { TouchableOpacity, Text, Linking } from "react-native";
import { styles } from "../styles";

export default function MapButton({ latitude, longitude }) {
  const openMap = () => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={openMap}>
      <Text style={styles.buttonText}>Ver no mapa</Text>
    </TouchableOpacity>
  );
}