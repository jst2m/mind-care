// mindcare-mobile/src/screens/SignupScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { API_HOST } from "../utils/config";
import { useAuth } from "../contexts/AuthContext";

import { colors, typography, commonStyles, fonts } from "../styles/theme";

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Signup"
>;

export default function SignupScreen() {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const { login } = useAuth();

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [gender, setGender] = useState<"Homme" | "Femme" | "Ne préfère pas dire">(
    "Homme"
  );

  const handleSignup = async () => {
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Erreur", "Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Erreur", "Veuillez entrer une adresse email valide.");
      return;
    }

    try {
      const response = await fetch(`${API_HOST}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: firstname.trim(),
          nom: lastname.trim(),
          email: email.trim(),
          motDePasse: password,
          dateNaissance: birthDate || undefined,
          sexe: gender,
          role: "patient",
        }),
      });

      if (response.status === 409) {
        const data = await response.json();
        Alert.alert("Inscription impossible", data.message || "Email déjà utilisé");
        return;
      }
      if (!response.ok) {
        const data = await response.json();
        Alert.alert("Erreur", data.message || "Problème lors de l’inscription");
        return;
      }

      const data = await response.json();
      const { accessToken } = data as { accessToken: string };
      if (!accessToken) {
        Alert.alert("Erreur", "Aucun token renvoyé par le serveur.");
        return;
      }
      await login(accessToken);
    } catch (error) {
      console.error("Erreur à l’inscription :", error);
      Alert.alert(
        "Erreur réseau",
        "Impossible de contacter le serveur. Vérifiez l’URL et la connexion."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Inscription</Text>

        <Text style={styles.label}>Prénom</Text>
        <TextInput
          value={firstname}
          onChangeText={setFirstname}
          placeholder="Entrez votre prénom"
          autoCapitalize="words"
          style={styles.input}
        />

        <Text style={styles.label}>Nom</Text>
        <TextInput
          value={lastname}
          onChangeText={setLastname}
          placeholder="Entrez votre nom"
          autoCapitalize="words"
          style={styles.input}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="exemple@domaine.com"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
          style={styles.input}
        />

        <Text style={styles.label}>Confirmez le mot de passe</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="••••••••"
          secureTextEntry
          style={styles.input}
        />

        <Text style={styles.label}>Date de naissance (YYYY-MM-DD)</Text>
        <TextInput
          value={birthDate}
          onChangeText={setBirthDate}
          placeholder="1990-05-15"
          style={styles.input}
        />

        <Text style={styles.label}>Sexe</Text>
        <TextInput
          value={gender}
          onChangeText={(text) => {
            if (["Homme", "Femme", "Ne préfère pas dire"].includes(text)) {
              setGender(text as any);
            }
          }}
          placeholder="Homme / Femme / Ne préfère pas dire"
          style={styles.input}
        />

        <TouchableOpacity
          onPress={handleSignup}
          style={styles.submitButton}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>S'inscrire</Text>
        </TouchableOpacity>

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Vous avez déjà un compte ? </Text>
          <TouchableOpacity onPress={() => navigation.replace("Login")}>
            <Text style={styles.switchLink}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.creamLight,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    ...typography.h1,
    textAlign: "center",
    marginBottom: 24,
    color: colors.brownDark,
  },
  label: {
    ...typography.bodyRegular,
    color: colors.gray500,
    marginBottom: 4,
  },
  input: {
    ...commonStyles.input,
    marginBottom: 16,
  },
  submitButton: {
    ...commonStyles.buttonPrimary,
    marginTop: 8,
  },
  submitButtonText: commonStyles.buttonTextPrimary,
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  switchText: {
    ...typography.bodyRegular,
    color: colors.gray500,
  },
  switchLink: {
    ...typography.bodyRegular,
    color: colors.olive,
    fontWeight: "600",
  },
});
