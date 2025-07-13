import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function EventMap({ latitude, longitude }) {
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 300,
    width: Dimensions.get("window").width - 40,
    marginVertical: 20,
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
});
