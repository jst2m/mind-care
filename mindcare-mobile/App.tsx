// App.tsx
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import tw from "twrnc";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { getToken } from "./src/utils/authStorage";

import LoginScreen, { RootStackParamList } from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import JournalScreen from "./src/screens/JournalScreen";
import PatientDrawerContent from "./src/screens/PatientDrawerContent";

import ProfileScreen from "./src/screens/ProfileScreen";
import AppointmentsScreen from "./src/screens/AppointmentsScreen";
import ExercisesScreen from "./src/screens/ExercisesScreen";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationRoot />
    </AuthProvider>
  );
}

function NavigationRoot() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
      ) : (
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <PatientDrawerContent {...props} />}
          screenOptions={{
            headerStyle: tw`bg-green-700`,
            headerTintColor: "#fff",
          }}
        >
          {/* Écran d’accueil */}
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{ drawerLabel: "Accueil" }}
          />
          {/* Journal Émotionnel */}
          <Drawer.Screen
            name="Journal"
            component={JournalScreen}
            options={{ drawerLabel: "Journal Émotionnel" }}
          />
          <Drawer.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ drawerLabel: "Profil" }}
          />
          <Drawer.Screen
            name="Appointments"
            component={AppointmentsScreen}
            options={{ drawerLabel: "Rendez-vous" }}
          />
          <Drawer.Screen
            name="Exercises"
            component={ExercisesScreen}
            options={{ drawerLabel: "Exercices" }}
          />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}
