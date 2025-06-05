// src/screens/LoginScreen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { API_HOST } from "../utils/config";
import { typography, colors, commonStyles } from "../styles/theme";

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch(`${API_HOST}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), motDePasse: password }),
      });
      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          "Connexion impossible",
          data?.message || "Identifiants invalides"
        );
        return;
      }

      const { accessToken } = data as { accessToken: string };
      if (!accessToken) {
        Alert.alert("Erreur", "Aucun token renvoyé par le serveur.");
        return;
      }

      await login(accessToken);
      // Vous pouvez naviguer vers l'écran principal après le login si besoin
      // par exemple : navigation.replace("Home");
    } catch (error) {
      console.error("Erreur au login :", error);
      Alert.alert("Erreur", "Impossible de se connecter. Veuillez réessayer.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="exemple@domaine.com"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <Text style={[styles.label, { marginTop: 16 }]}>Mot de passe</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={[commonStyles.buttonPrimary, { marginTop: 24 }]}
        activeOpacity={0.8}
      >
        <Text style={commonStyles.buttonTextPrimary}>Se connecter</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Pas encore de compte ? </Text>
        <TouchableOpacity onPress={() => navigation.replace("Signup")}>
          <Text style={styles.footerLink}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.creamLight,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    ...typography.h2,
    textAlign: "center",
    marginBottom: 32,
    color: colors.brownDark,
  },
  label: {
    ...typography.bodyMedium,
    color: colors.brownDark,
    marginBottom: 8,
  },
  input: {
    ...commonStyles.input,
    backgroundColor: colors.white,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    ...typography.bodyRegular,
    color: colors.gray500,
  },
  footerLink: {
    ...typography.bodyRegular,
    color: colors.olive,
    fontWeight: "600",
  },
});
