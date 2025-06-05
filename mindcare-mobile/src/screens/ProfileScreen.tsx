// src/screens/ProfileScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { apiFetch } from "../utils/api";
import { typography, colors, commonStyles } from "../styles/theme";

export default function ProfileScreen() {
  const { user, isAuthenticated, logout, refreshUser, isLoading } = useAuth();
  const [editing, setEditing] = useState(false);

  // États locaux des champs du formulaire
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [ville, setVille] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [sexe, setSexe] = useState<"Homme" | "Femme" | "Ne préfère pas dire">(
    "Homme"
  );

  // Dès que `user` change (après chargement initial ou refresh), on remplit les champs
  useEffect(() => {
    if (user) {
      setPrenom(user.prenom || "");
      setNom(user.nom || "");
      setEmail(user.email || "");
      setTelephone(user.telephone || "");
      setAdresse(user.adresse || "");
      setCodePostal(user.codePostal || "");
      setVille(user.ville || "");
      if (user.dateNaissance) {
        const d = new Date(user.dateNaissance);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        setDateNaissance(`${yyyy}-${mm}-${dd}`);
      } else {
        setDateNaissance("");
      }
      setSexe((user.sexe as any) || "Homme");
    }
  }, [user]);

  // Tant qu’on charge le contexte ou que (on n’est pas authentifié), on peut afficher un loader générique
  if (isLoading) {
    return (
      <View
        style={[
          commonStyles.centered,
          { flex: 1, backgroundColor: colors.creamLight },
        ]}
      >
        <ActivityIndicator size="large" color={colors.green700} />
        <Text
          style={[typography.bodyRegular, { color: colors.gray500, marginTop: 8 }]}
        >
          Chargement du profil…
        </Text>
      </View>
    );
  }

  // Si, à ce stade, on n’est PAS authentifié, on affiche “Vous n’êtes pas connecté” :
  if (!isAuthenticated) {
    return (
      <View
        style={[
          commonStyles.centered,
          { flex: 1, backgroundColor: colors.creamLight, paddingHorizontal: 24 },
        ]}
      >
        <Text style={[typography.bodyRegular, { color: colors.gray500 }]}>
          Vous n’êtes pas connecté.
        </Text>
        {/* 
          Ici, vous pouvez rediriger vers le login si besoin
        */}
      </View>
    );
  }

  // À partir d’ici, isAuthenticated === true ET user est non-null
  // (car dans AuthContext, isAuthenticated = !!accessToken && !!user)

  const startEditing = () => {
    setEditing(true);
  };

  const cancelEditing = () => {
    // On remet les valeurs d’origine à partir de `user`
    setPrenom(user.prenom || "");
    setNom(user.nom || "");
    setEmail(user.email || "");
    setTelephone(user.telephone || "");
    setAdresse(user.adresse || "");
    setCodePostal(user.codePostal || "");
    setVille(user.ville || "");
    if (user.dateNaissance) {
      const d = new Date(user.dateNaissance);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      setDateNaissance(`${yyyy}-${mm}-${dd}`);
    } else {
      setDateNaissance("");
    }
    setSexe((user.sexe as any) || "Homme");
    setEditing(false);
  };

  const handleSave = async () => {
    // Validation minimale : prénom, nom, email
    if (!prenom.trim() || !nom.trim() || !email.trim()) {
      Alert.alert("Erreur", "Prénom, nom et email sont obligatoires.");
      return;
    }

    try {
      // On regroupe désormais tous les champs dans un seul payload pour /utilisateur/:uuid
      const payloadComplet = {
        prenom: prenom.trim(),
        nom: nom.trim(),
        email: email.trim(),
        telephone: telephone.trim() || null,
        adresse: adresse.trim() || null,
        codePostal: codePostal.trim() || null,
        ville: ville.trim() || null,
        dateNaissance: dateNaissance.trim() || null, // format YYYY-MM-DD
        sexe,
      };

      await apiFetch(`/utilisateur/${user.uuid}`, {
        method: "PUT",
        body: JSON.stringify(payloadComplet),
      });

      // On rafraîchit l’utilisateur en mémoire pour récupérer les dernières données
      await refreshUser();

      Alert.alert("Succès", "Vos informations ont été mises à jour.", [
        {
          text: "OK",
          onPress: () => setEditing(false),
        },
      ]);
    } catch (err: any) {
      console.warn("Erreur mise à jour profil :", err);
      Alert.alert("Erreur", err.message || "Mise à jour impossible.");
    }
  };

  // --- AFFICHAGE « Lecture SEULE » ---
  if (!editing) {
    return (
      <ScrollView style={styles.container}>
        {/* En‐tête / avatar */}
        <View style={styles.avatarContainer}>
          <Image
            source={require("../../assets/avatar-placeholder.png")}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.greeting}>
          Bonjour{user.prenom || user.nom ? ", " : ""}{" "}
          <Text style={styles.greetingName}>
            {user.prenom} {user.nom}
          </Text>{" "}
          !
        </Text>

        {/* Prénom */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Prénom</Text>
          <Text style={styles.fieldValue}>{user.prenom || "Non communiqué"}</Text>
        </View>

        {/* Nom */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Nom</Text>
          <Text style={styles.fieldValue}>{user.nom || "Non communiqué"}</Text>
        </View>

        {/* E-mail */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>E-mail</Text>
          <Text style={styles.fieldValue}>{user.email || "Non communiqué"}</Text>
        </View>

        {/* Téléphone */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Téléphone</Text>
          <Text style={styles.fieldValue}>{user.telephone || "Non communiqué"}</Text>
        </View>

        {/* Adresse */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Adresse</Text>
          <Text style={styles.fieldValue}>
            {user.adresse && user.codePostal && user.ville
              ? `${user.adresse}, ${user.codePostal} ${user.ville}`
              : "Non communiqué"}
          </Text>
        </View>

        {/* Date de naissance */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Date de naissance</Text>
          <Text style={styles.fieldValue}>
            {user.dateNaissance
              ? new Date(user.dateNaissance).toLocaleDateString("fr-FR")
              : "Non communiqué"}
          </Text>
        </View>

        {/* Sexe */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Sexe</Text>
          <Text style={styles.fieldValue}>{user.sexe || "Non communiqué"}</Text>
        </View>

        {/* Rôle */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Rôle</Text>
          <Text style={styles.fieldValue}>{user.role || "Non communiqué"}</Text>
        </View>

        {/* Bouton « Modifier mes informations » */}
        <TouchableOpacity
          style={[
            commonStyles.buttonSecondary,
            {
              marginTop: 32,
              backgroundColor: colors.white,
              borderColor: colors.brownDark,
              borderWidth: 1,
            },
          ]}
          onPress={startEditing}
        >
          <Text
            style={[
              commonStyles.buttonTextPrimary,
              { color: colors.brownDark },
            ]}
          >
            Modifier mes informations
          </Text>
        </TouchableOpacity>

        {/* Bouton « Déconnexion » */}
        <TouchableOpacity
          style={[commonStyles.buttonPrimary, { marginTop: 12 }]}
          onPress={logout}
        >
          <Text style={commonStyles.buttonTextPrimary}>Déconnexion</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // --- AFFICHAGE mode « ÉDITION » ---
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerEdit}>
        Modifiez vos informations{" "}
        <Text style={{ color: colors.olive }}>– {user.role}</Text>
      </Text>

      <Text style={styles.labelInput}>Prénom *</Text>
      <TextInput
        value={prenom}
        onChangeText={setPrenom}
        placeholder="Votre prénom"
        style={styles.input}
      />

      <Text style={styles.labelInput}>Nom *</Text>
      <TextInput
        value={nom}
        onChangeText={setNom}
        placeholder="Votre nom"
        style={styles.input}
      />

      <Text style={styles.labelInput}>E-mail *</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="exemple@domaine.com"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <Text style={styles.labelInput}>Téléphone</Text>
      <TextInput
        value={telephone}
        onChangeText={setTelephone}
        placeholder="06XXXXXXXX"
        keyboardType="phone-pad"
        style={styles.input}
      />

      <Text style={styles.labelInput}>Adresse</Text>
      <TextInput
        value={adresse}
        onChangeText={setAdresse}
        placeholder="Votre adresse"
        style={styles.input}
      />

      <Text style={styles.labelInput}>Code postal</Text>
      <TextInput
        value={codePostal}
        onChangeText={setCodePostal}
        placeholder="75000"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.labelInput}>Ville</Text>
      <TextInput
        value={ville}
        onChangeText={setVille}
        placeholder="Paris"
        style={styles.input}
      />

      <Text style={styles.labelInput}>Date de naissance</Text>
      <TextInput
        value={dateNaissance}
        onChangeText={setDateNaissance}
        placeholder="YYYY-MM-DD"
        style={styles.input}
      />

      <Text style={styles.labelInput}>Sexe</Text>
      <View style={styles.sexeButtonsContainer}>
        {(["Homme", "Femme", "Ne préfère pas dire"] as const).map((opt) => (
          <TouchableOpacity
            key={opt}
            onPress={() => setSexe(opt)}
            style={[
              styles.sexeButton,
              sexe === opt && styles.sexeButtonSelected,
            ]}
          >
            <Text
              style={[
                typography.bodyRegular,
                sexe === opt
                  ? { color: colors.white }
                  : { color: colors.brownDark },
              ]}
            >
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[commonStyles.buttonPrimary, { marginTop: 16 }]}
        onPress={handleSave}
      >
        <Text style={commonStyles.buttonTextPrimary}>Enregistrer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          commonStyles.buttonSecondary,
          {
            marginTop: 12,
            backgroundColor: colors.white,
            borderColor: colors.brownDark,
            borderWidth: 1,
          },
        ]}
        onPress={cancelEditing}
      >
        <Text style={[commonStyles.buttonTextPrimary, { color: colors.brownDark }]}>
          Annuler
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.creamLight,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#EEE",
  },
  greeting: {
    ...typography.h2,
    textAlign: "center",
    marginBottom: 32,
    color: colors.brownDark,
  },
  greetingName: {
    fontWeight: "700",
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    ...typography.bodyRegular,
    color: colors.gray500,
    marginBottom: 4,
  },
  fieldValue: {
    ...typography.bodyMedium,
    color: colors.brownDark,
  },
  // Styles pour le mode édition
  headerEdit: {
    ...typography.h2,
    color: colors.brownDark,
    marginBottom: 24,
    textAlign: "center",
  },
  labelInput: {
    ...typography.bodyMedium,
    color: colors.brownDark,
    marginBottom: 4,
  },
  input: {
    ...commonStyles.input,
  },
  sexeButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  sexeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gray500,
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: "center",
    marginHorizontal: 4,
    backgroundColor: colors.white,
  },
  sexeButtonSelected: {
    backgroundColor: colors.olive,
    borderColor: colors.olive,
  },
});
