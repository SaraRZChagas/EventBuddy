import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import FavoritosScreen from "../screens/Favorites"; 
import PerfilScreen from "../screens/Profile";       

const Tab = createBottomTabNavigator();

export default function MainTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconSource;

            if (route.name === "Home") {
              iconSource = require("../assets/icons/home_24dp_google.png");
            } else if (route.name === "Favorites") {
              iconSource = require("../assets/icons/favorite_24dp_google.png");
            } else if (route.name === "Profile") {
              iconSource = require("../assets/icons/profile_24dp_google.png");
            }

            return (
              <Image
                source={iconSource}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "#6200ee" : "gray",
                }}
              />
            );
          },
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#6200ee",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Favorites" component={FavoritosScreen}  options={{ headerShown: true }}/>
      <Tab.Screen name="Profile" component={PerfilScreen}  options={{ headerShown: true }} />
    </Tab.Navigator>
  );
}