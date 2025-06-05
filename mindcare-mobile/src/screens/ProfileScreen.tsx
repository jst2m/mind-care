// src/screens/ProfileScreen.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { apiFetch } from "../utils/api";

import { colors, typography, commonStyles } from "../styles/theme";

type UtilisateurProfile = {
  uuid: string;
  email: string;
  prenom: string;
  nom: string;
  telephone?: string;
  adresse?: string;
  codePostal?: string;
  ville?: string;
  dateNaissance?: string;
  sexe: string;
  role: string;
};

export default function ProfileScreen() {
  const { accessToken, logout } = useAuth();
  const [userData, setUserData] = useState<UtilisateurProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    if (!accessToken) {
      setError("Non authentifié");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const authTest = await apiFetch<{ user: { sub: string; role: string } }>(
        "/auth/test"
      );
      const userUuid = authTest.user.sub;

      const data = await apiFetch<UtilisateurProfile>(
        `/utilisateur/${userUuid}`
      );
      setUserData(data);
    } catch (e: any) {
      console.error("Profile fetch erreur →", e);
      if (e.message.includes("404")) {
        setError("Profil introuvable (404).");
      } else if (e.message.includes("401")) {
        setError("Token invalide ou non autorisé (401).");
      } else {
        setError("Impossible de charger le profil.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Déconnexion",
      "Êtes-vous sûr·e de vouloir vous déconnecter ?",
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

  if (loading) {
    return (
      <View style={commonStyles.centered}>
        <ActivityIndicator size="large" color={colors.olive} />
      </View>
    );
  }

  if (error || !userData) {
    return (
      <View style={commonStyles.centered}>
        <Text style={[typography.bodyRegular, { color: colors.red600 }]}>
          {error || "Erreur lors du chargement des données."}
        </Text>
      </View>
    );
  }

  const formattedBirthDate = userData.dateNaissance
    ? new Date(userData.dateNaissance).toLocaleDateString("fr-FR")
    : "N/A";

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.profileContainer}>
        <Text style={[typography.h2, { color: colors.brownDark }]}>
          Bonjour, {userData.prenom} {userData.nom} !
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Prénom</Text>
          <Text style={styles.value}>{userData.prenom}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nom</Text>
          <Text style={styles.value}>{userData.nom}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.value}>{userData.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Téléphone</Text>
          <Text style={styles.value}>{userData.telephone || "N/A"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Adresse</Text>
          <Text style={styles.value}>{userData.adresse || "N/A"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Code Postal</Text>
          <Text style={styles.value}>{userData.codePostal || "N/A"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Ville</Text>
          <Text style={styles.value}>{userData.ville || "N/A"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Date de naissance</Text>
          <Text style={styles.value}>{formattedBirthDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Sexe</Text>
          <Text style={styles.value}>{userData.sexe}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Rôle</Text>
          <Text style={styles.value}>{userData.role}</Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.creamLight,
    padding: 16,
    paddingBottom: 80,
  },
  profileContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  label: {
    ...typography.bodyRegular,
    color: colors.gray500,
  },
  value: {
    ...typography.bodyRegular,
    color: colors.brownDark,
  },
  logoutButton: {
    marginTop: 32,
    backgroundColor: colors.red600,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutButtonText: {
    ...typography.buttonText,
    color: colors.white,
  },
});
