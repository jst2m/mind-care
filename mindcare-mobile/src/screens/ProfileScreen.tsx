// mindcare-mobile/src/screens/ProfileScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext";
import { apiFetch } from "../utils/api";

import { colors, typography, commonStyles, fonts } from "../styles/theme";

type UserProfile = {
  uuid: string;
  email: string;
  prenom: string;
  nom: string;
  dateNaissance?: string;
  sexe: "Homme" | "Femme" | "Ne préfère pas dire";
  role: "patient" | "professionnel";
  telephone?: string;
  adresse?: string;
  codePostal?: string;
  ville?: string;
};

export default function ProfileScreen() {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [editing, setEditing] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [form, setForm] = useState<Partial<UserProfile>>({});
  const [saving, setSaving] = useState<boolean>(false);

  const [userUuid, setUserUuid] = useState<string | null>(null);
  useEffect(() => {
    if (!accessToken) return;
    try {
      type JwtPayload = { sub: string; role: string; iat: number; exp: number };
      const payload: JwtPayload = jwtDecode<JwtPayload>(accessToken);
      setUserUuid(payload.sub);
    } catch (err) {
      console.error("Erreur lors du décodage du JWT :", err);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!userUuid) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await apiFetch<UserProfile>(`/utilisateur/${userUuid}`);
        setProfile(data);
        setForm({
          prenom: data.prenom,
          nom: data.nom,
          email: data.email,
          dateNaissance: data.dateNaissance || "",
          sexe: data.sexe,
          telephone: data.telephone || "",
          adresse: data.adresse || "",
          codePostal: data.codePostal || "",
          ville: data.ville || "",
        });
      } catch (err: any) {
        console.error("Erreur fetch profil :", err);
        Alert.alert(
          "Erreur",
          "Impossible de récupérer vos informations. Veuillez réessayer."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userUuid]);

  const toggleEditing = () => {
    if (editing && profile) {
      setForm({
        prenom: profile.prenom,
        nom: profile.nom,
        email: profile.email,
        dateNaissance: profile.dateNaissance || "",
        sexe: profile.sexe,
        telephone: profile.telephone || "",
        adresse: profile.adresse || "",
        codePostal: profile.codePostal || "",
        ville: profile.ville || "",
      });
    }
    setEditing(!editing);
  };

  const saveChanges = async () => {
    if (!userUuid) return;
    setSaving(true);
    try {
      const updated: Partial<UserProfile> = {
        prenom: form.prenom!,
        nom: form.nom!,
        email: form.email!,
        dateNaissance: form.dateNaissance || undefined,
        sexe: form.sexe!,
        telephone: form.telephone || undefined,
        adresse: form.adresse || undefined,
        codePostal: form.codePostal || undefined,
        ville: form.ville || undefined,
      };

      await apiFetch<UserProfile>(`/utilisateur/${userUuid}`, {
        method: "PUT",
        body: JSON.stringify(updated),
      });

      const fresh = await apiFetch<UserProfile>(`/utilisateur/${userUuid}`);
      setProfile(fresh);
      setForm({
        prenom: fresh.prenom,
        nom: fresh.nom,
        email: fresh.email,
        dateNaissance: fresh.dateNaissance || "",
        sexe: fresh.sexe,
        telephone: fresh.telephone || "",
        adresse: fresh.adresse || "",
        codePostal: fresh.codePostal || "",
        ville: fresh.ville || "",
      });
      setEditing(false);
      Alert.alert("Succès", "Vos informations ont bien été mises à jour.");
    } catch (err) {
      console.error("Erreur mise à jour profil :", err);
      Alert.alert(
        "Erreur",
        "Impossible de mettre à jour vos informations. Veuillez réessayer."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={[commonStyles.centered, { backgroundColor: colors.creamLight }]}>
        <ActivityIndicator size="large" color={colors.green700} />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={[commonStyles.centered, { backgroundColor: colors.creamLight, padding: 24 }]}>
        <Text style={[typography.bodyRegular, { color: colors.red600 }]}>
          Profil introuvable.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.avatarContainer}>
        <Image
          source={require("../../assets/FA4D18D6-B703-413D-B718-6841B3CBA35B.jpg")}
          style={styles.avatar}
        />
      </View>

      <Text style={styles.greeting}>
        Bonjour, {profile.prenom} {profile.nom} !
      </Text>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Prénom</Text>
        {editing ? (
          <TextInput
            style={styles.input}
            value={form.prenom}
            onChangeText={(t) => setForm((f) => ({ ...f, prenom: t }))}
          />
        ) : (
          <Text style={styles.fieldValue}>{profile.prenom}</Text>
        )}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Nom</Text>
        {editing ? (
          <TextInput
            style={styles.input}
            value={form.nom}
            onChangeText={(t) => setForm((f) => ({ ...f, nom: t }))}
          />
        ) : (
          <Text style={styles.fieldValue}>{profile.nom}</Text>
        )}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>E-mail</Text>
        {editing ? (
          <TextInput
            style={styles.input}
            value={form.email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(t) => setForm((f) => ({ ...f, email: t }))}
          />
        ) : (
          <Text style={styles.fieldValue}>{profile.email}</Text>
        )}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Téléphone</Text>
        {editing ? (
          <TextInput
            style={styles.input}
            value={form.telephone}
            keyboardType="phone-pad"
            onChangeText={(t) => setForm((f) => ({ ...f, telephone: t }))}
          />
        ) : (
          <Text style={styles.fieldValue}>{profile.telephone || "N/A"}</Text>
        )}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Adresse</Text>
        {editing ? (
          <TextInput
            style={styles.input}
            value={form.adresse}
            onChangeText={(t) => setForm((f) => ({ ...f, adresse: t }))}
          />
        ) : (
          <Text style={styles.fieldValue}>{profile.adresse || "N/A"}</Text>
        )}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Code Postal</Text>
        {editing ? (
          <TextInput
            style={styles.input}
            value={form.codePostal}
            keyboardType="number-pad"
            onChangeText={(t) => setForm((f) => ({ ...f, codePostal: t }))}
          />
        ) : (
          <Text style={styles.fieldValue}>{profile.codePostal || "N/A"}</Text>
        )}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Ville</Text>
        {editing ? (
          <TextInput
            style={styles.input}
            value={form.ville}
            onChangeText={(t) => setForm((f) => ({ ...f, ville: t }))}
          />
        ) : (
          <Text style={styles.fieldValue}>{profile.ville || "N/A"}</Text>
        )}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Date de naissance</Text>
        {editing ? (
          <TextInput
            style={styles.input}
            value={form.dateNaissance}
            placeholder="YYYY-MM-DD"
            onChangeText={(t) =>
              setForm((f) => ({ ...f, dateNaissance: t }))
            }
          />
        ) : (
          <Text style={styles.fieldValue}>
            {profile.dateNaissance
              ? new Date(profile.dateNaissance).toLocaleDateString()
              : "N/A"}
          </Text>
        )}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Sexe</Text>
        {editing ? (
          <TextInput
            style={styles.input}
            value={form.sexe}
            onChangeText={(t) => setForm((f) => ({ ...f, sexe: t as any }))}
            placeholder="Homme, Femme ou Ne préfère pas dire"
          />
        ) : (
          <Text style={styles.fieldValue}>{profile.sexe}</Text>
        )}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Rôle</Text>
        <Text style={styles.fieldValue}>{profile.role}</Text>
      </View>

      <View style={styles.buttonRow}>
        {editing ? (
          <>
            <View style={styles.flex}>
              <Button
                title={saving ? "Enregistrement..." : "Enregistrer"}
                onPress={saveChanges}
                disabled={saving}
                color={colors.olive}
              />
            </View>
            <View style={[styles.flex, { marginLeft: 8 }]}>
              <Button
                title="Annuler"
                onPress={toggleEditing}
                color={colors.red600}
                disabled={saving}
              />
            </View>
          </>
        ) : (
          <Button
            title="Modifier mes informations"
            onPress={toggleEditing}
            color={colors.olive}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: colors.creamLight,
    padding: 24,
    paddingBottom: 32,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 128,
    backgroundColor: colors.gray200,
    borderRadius: 8,
  },
  greeting: {
    ...typography.h2,
    textAlign: "center",
    marginBottom: 24,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    ...typography.bodyRegular,
    color: colors.gray500,
    marginBottom: 4,
  },
  input: {
    ...commonStyles.input,
  },
  fieldValue: {
    fontFamily: fonts.baseSans,
    fontSize: 16,
    color: colors.brownDark,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  flex: {
    flex: 1,
  },
});
