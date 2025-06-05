// App.tsx

import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  Alert,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";

import SearchProsScreen from "./src/screens/SearchProsScreen";
import ProProfileScreen from "./src/screens/ProProfileScreen";
import ConversationsScreen from "./src/screens/ConversationsScreen";
import ChatScreen from "./src/screens/ChatScreen";

import AppointmentsScreen from "./src/screens/AppointmentsScreen";
import JournalScreen from "./src/screens/JournalScreen";

import ExercisesScreen from "./src/screens/ExercisesScreen";
import ExerciseDetailScreen from "./src/screens/ExerciseDetailScreen";
import ExerciseFinishedScreen from "./src/screens/ExerciseFinishedScreen";

import ProfileScreen from "./src/screens/ProfileScreen";

import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import { apiFetch } from "./src/utils/api";

import { colors, typography, commonStyles } from "./src/styles/theme";

// --- 1) Configuration des notifications ---
Notifications.setNotificationHandler({
  handleNotification: async (): Promise<Notifications.NotificationBehavior> => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// --- 2) Public Stack (HomePublic, Login, Signup) ---
const PublicStack = createNativeStackNavigator<{}>();

function PublicStackNavigator() {
  return (
    <PublicStack.Navigator screenOptions={{ headerShown: false }}>
      <PublicStack.Screen name="HomePublic" component={HomeScreen} />
      <PublicStack.Screen name="Login" component={LoginScreen} />
      <PublicStack.Screen name="Signup" component={SignupScreen} />
    </PublicStack.Navigator>
  );
}

// --- 3) RendezVous Stack (Appointments) ---
const RendezVousStack = createNativeStackNavigator<{}>();

function RendezVousStackNavigator() {
  return (
    <RendezVousStack.Navigator>
      <RendezVousStack.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{
          title: "Mes rendez-vous",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.white,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTitleStyle: {
            ...typography.h2,
            color: colors.brownDark,
          },
        }}
      />
    </RendezVousStack.Navigator>
  );
}

// --- 4) Journal Stack (JournalHome) ---
const JournalStack = createNativeStackNavigator<{}>();

function JournalStackNavigator() {
  return (
    <JournalStack.Navigator>
      <JournalStack.Screen
        name="JournalHome"
        component={JournalScreen}
        options={{
          title: "Journal Émotionnel",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.white,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTitleStyle: {
            ...typography.h2,
            color: colors.brownDark,
          },
        }}
      />
    </JournalStack.Navigator>
  );
}

// --- 5) Home Stack (HomeMainAuth, SearchPros, ProProfile, Conversations, Chat) ---
const HomeStack = createNativeStackNavigator<{}>();

function HomeStackNavigator() {
  const navigation = useNavigation<any>();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeMainAuth"
        component={HomeScreen}
        options={{
          title: "Accueil",
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("HomeTab", { screen: "Conversations" })
              }
              style={{ marginRight: 14 }}
            >
              <Feather name="message-circle" size={24} color={colors.olive} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: colors.white,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTitleStyle: {
            ...typography.h2,
            color: colors.brownDark,
          },
        }}
      />

      <HomeStack.Screen
        name="SearchPros"
        component={SearchProsScreen}
        options={{
          title: "Trouver un psy",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.white,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTitleStyle: {
            ...typography.h2,
            color: colors.brownDark,
          },
        }}
      />

      <HomeStack.Screen
        name="ProProfile"
        component={ProProfileScreen}
        options={{
          title: "Profil Pro",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.white,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTitleStyle: {
            ...typography.h2,
            color: colors.brownDark,
          },
        }}
      />

      <HomeStack.Screen
        name="Conversations"
        component={ConversationsScreen}
        options={{
          title: "Mes discussions",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.white,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTitleStyle: {
            ...typography.h2,
            color: colors.brownDark,
          },
        }}
      />

      <HomeStack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: "Chat",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.white,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTitleStyle: {
            ...typography.h2,
            color: colors.brownDark,
          },
        }}
      />
    </HomeStack.Navigator>
  );
}

// --- 6) Exercises Stack (ExercisesList, ExerciseDetail, ExerciseFinished) ---
const ExercisesStack = createNativeStackNavigator<{}>();

function ExercisesStackNavigator() {
  return (
    <ExercisesStack.Navigator>
      <ExercisesStack.Screen
        name="ExercisesList"
        component={ExercisesScreen}
        options={{
          title: "Exercices",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.white,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTitleStyle: {
            ...typography.h2,
            color: colors.brownDark,
          },
        }}
      />
      <ExercisesStack.Screen
        name="ExerciseDetail"
        component={ExerciseDetailScreen}
        options={{
          title: "Détail exo",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.white,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTitleStyle: {
            ...typography.h2,
            color: colors.brownDark,
          },
        }}
      />
      <ExercisesStack.Screen
        name="ExerciseFinished"
        component={ExerciseFinishedScreen}
        options={{
          title: "Terminé",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.white,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTitleStyle: {
            ...typography.h2,
            color: colors.brownDark,
          },
        }}
      />
    </ExercisesStack.Navigator>
  );
}

// --- 7) Profile Stack (ProfileHome) ---
const ProfileStack = createNativeStackNavigator<{}>();

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileHome"
        component={ProfileScreen}
        options={{
          title: "Profil",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.white,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTitleStyle: {
            ...typography.h2,
            color: colors.brownDark,
          },
        }}
      />
    </ProfileStack.Navigator>
  );
}

// --- 8) Bottom Tab Navigator for authenticated user ---
const Tab = createBottomTabNavigator<{}>();

function PatientTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === "HomeTab") {
            return <Feather name="home" size={size + 6} color={color} />;
          }
          switch (route.name) {
            case "RendezVousTab":
              return <Feather name="calendar" size={size} color={color} />;
            case "JournalTab":
              return <Feather name="book-open" size={size} color={color} />;
            case "ExercisesTab":
              return <Feather name="edit-2" size={size} color={color} />;
            case "ProfileTab":
              return <Feather name="user" size={size} color={color} />;
            default:
              return null;
          }
        },
        tabBarActiveTintColor: colors.olive,
        tabBarInactiveTintColor: colors.gray500,
        tabBarStyle: {
          backgroundColor: colors.cream,
          borderTopColor: colors.gray200,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
      })}
    >
      <Tab.Screen
        name="RendezVousTab"
        component={RendezVousStackNavigator}
        options={{ title: "Rendez-vous" }}
      />
      <Tab.Screen
        name="JournalTab"
        component={JournalStackNavigator}
        options={{ title: "Journal" }}
      />
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ title: "Accueil" }}
      />
      <Tab.Screen
        name="ExercisesTab"
        component={ExercisesStackNavigator}
        options={{ title: "Exercices" }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{ title: "Profil" }}
      />
    </Tab.Navigator>
  );
}

// --- 9) Main App + InnerApp for auth logic ---
export default function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

function InnerApp() {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
  const notificationListener = useRef<any>(null);
  const responseListener = useRef<any>(null);
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Init push notifications
    registerForPushNotificationsAsync()
      .then((token) => {
        if (token) {
          setExpoPushToken(token);
          apiFetch("/patient", {
            method: "PUT",
            body: JSON.stringify({ expoPushToken: token }),
          }).catch((err) => console.warn("Erreur envoi token :", err));
        }
      })
      .catch((err) => console.warn("Erreur permission push :", err));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        Alert.alert(
          notification.request.content.title ?? "",
          notification.request.content.body ?? ""
        );
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification tap :", response);
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  if (isLoading) {
    return (
      <View
        style={[
          commonStyles.centered,
          { backgroundColor: colors.white },
        ]}
      >
        <ActivityIndicator size="large" color={colors.green700} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <PublicStackNavigator />
      ) : (
        <PatientTabNavigator />
      )}
    </NavigationContainer>
  );
}

// --- 10) Register for push notifications ---
async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  let token: string | undefined;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Alert.alert(
        "Permission refusée",
        "Impossible d’envoyer des notifications push sans autorisation."
      );
      return;
    }
    const pushTokenData = await Notifications.getExpoPushTokenAsync();
    token = pushTokenData.data;
    console.log("[Expo] Push Token :", token);
  } else {
    Alert.alert(
      "Appareil non supporté",
      "Les notifications push ne fonctionnent que sur un véritable appareil physique."
    );
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
}

const styles = StyleSheet.create({
  // (optionnel)
});
