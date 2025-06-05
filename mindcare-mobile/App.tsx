// mindcare-mobile/App.tsx
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
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";

import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SearchProsScreen from "./src/screens/SearchProsScreen";
import AppointmentsScreen from "./src/screens/AppointmentsScreen";
import JournalScreen from "./src/screens/JournalScreen";
import ExercisesScreen from "./src/screens/ExercisesScreen";
import ExerciseDetailScreen from "./src/screens/ExerciseDetailScreen";
import ExerciseFinishedScreen from "./src/screens/ExerciseFinishedScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

// Nouveaux imports :
import ChatScreen from "./src/screens/ChatScreen";
import ProProfileScreen from "./src/screens/ProProfileScreen";
import ConversationsScreen from "./src/screens/ConversationsScreen";

import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import { apiFetch } from "./src/utils/api";

import { colors, typography, commonStyles } from "./src/styles/theme";

// --- Configuration du handler de notifications push (inchangé) ---
Notifications.setNotificationHandler({
  handleNotification: async (): Promise<Notifications.NotificationBehavior> => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// --- Création des navigateurs ---
const RootStack = createNativeStackNavigator<{}>();
const Drawer = createDrawerNavigator<{}>();
const Tab = createBottomTabNavigator<{}>();
const ExercisesStack = createNativeStackNavigator<{}>();

// --- Stack interne pour la section “Exercices” (liste → détail → fini) ---
function ExercisesStackNavigator() {
  return (
    <ExercisesStack.Navigator screenOptions={{ headerShown: false }}>
      <ExercisesStack.Screen
        name="ExercisesList"
        component={ExercisesScreen}
        options={{ title: "Exercices" }}
      />
      <ExercisesStack.Screen
        name="ExerciseDetail"
        component={ExerciseDetailScreen}
        options={{ title: "Détail de l’exo" }}
      />
      <ExercisesStack.Screen
        name="ExerciseFinished"
        component={ExerciseFinishedScreen}
        options={{ title: "Terminé" }}
      />
    </ExercisesStack.Navigator>
  );
}

// --- Bottom Tab Navigator (écrans principaux) ---
function PatientTabNavigator() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{ marginLeft: 14 }}
          >
            <Feather name="menu" size={24} color={colors.brownDark} />
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
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case "Home":
              return <Feather name="home" size={size} color={color} />;
            case "Conversations":
              return <Feather name="message-circle" size={size} color={color} />;
            case "Appointments":
              return <Feather name="calendar" size={size} color={color} />;
            case "Journal":
              return <Feather name="book-open" size={size} color={color} />;
            case "Exercises":
              return <Feather name="edit-2" size={size} color={color} />;
            case "Profile":
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
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Accueil" }}
      />
      <Tab.Screen
        name="Conversations"
        component={ConversationsScreen}
        options={{ title: "Mes discussions" }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{ title: "Rendez-vous" }}
      />
      <Tab.Screen
        name="Journal"
        component={JournalScreen}
        options={{ title: "Journal" }}
      />
      <Tab.Screen
        name="Exercises"
        component={ExercisesStackNavigator}
        options={{ title: "Exercices" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profil" }}
      />
    </Tab.Navigator>
  );
}

// --- Contenu custom du Drawer (avec "Déconnexion") ---
function PatientDrawerContent(props: any) {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Déconnexion",
      "Voulez-vous vraiment vous déconnecter ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            await logout();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Déconnexion"
        labelStyle={styles.drawerLogoutLabel}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
}

// --- Drawer Navigator (Tabs + SearchPros + ProProfile & Chat + possibilités cachées) ---
function PatientDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <PatientDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        drawerStyle: {
          backgroundColor: colors.creamLight,
        },
        drawerLabelStyle: {
          fontFamily: typography.bodyMedium.fontFamily,
          fontSize: 16,
          color: colors.brownDark,
        },
      }}
    >
      {/* 1) Écran principal : les onglets en bas */}
      <Drawer.Screen
        name="Tabs"
        component={PatientTabNavigator}
        options={{ title: "Menu principal" }}
      />

      {/* 2) Trouver un psy (visible dans le menu burger) */}
      <Drawer.Screen
        name="SearchPros"
        component={SearchProsScreen}
        options={{ title: "Trouver un psy" }}
      />

      {/* 3) ProProfile (caché du menu burger) */}
      <Drawer.Screen
        name="ProProfile"
        component={ProProfileScreen}
        options={{
          drawerItemStyle: { height: 0 },
          title: "Profil du professionnel",
        }}
      />

      {/* 4) ChatScreen (caché du menu burger) */}
      <Drawer.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          drawerItemStyle: { height: 0 },
          title: "Discussion",
        }}
      />
    </Drawer.Navigator>
  );
}

// --- Composant principal App (contexte Auth) ---
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
    // Initialisation des notifications push (inchangé)
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

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        Alert.alert(
          notification.request.content.title ?? "",
          notification.request.content.body ?? ""
        );
      }
    );
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification tap :", response);
      });

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  if (isLoading) {
    // Tant que AuthContext vérifie le token local
    return (
      <View style={[commonStyles.centered, { backgroundColor: colors.white }]}>
        <ActivityIndicator size="large" color={colors.green700} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        // Si non authentifié → Stack Login / Signup
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="Signup" component={SignupScreen} />
        </RootStack.Navigator>
      ) : (
        // Si authentifié → Drawer Navigator (Tabs + SearchPros + ProProfile/Chat cachés)
        <PatientDrawer />
      )}
    </NavigationContainer>
  );
}

/**
 *  Méthode auxiliaire pour obtenir le token Expo Push notifications
 */
async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  let token: string | undefined;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
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
  drawerContainer: {
    flex: 1,
    backgroundColor: colors.creamLight,
  },
  drawerLogoutLabel: {
    color: colors.red600,
    fontFamily: typography.bodyMedium.fontFamily,
    fontSize: 16,
  },
});
