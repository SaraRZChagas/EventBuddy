import React from "react";
import { View, Text, Linking, StyleSheet } from "react-native";

export default function EventMap({ latitude, longitude }) {
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={() => Linking.openURL(mapUrl)}>
        Ver no Google Maps
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
  },
  text: {
    color: "#007AFF",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});
