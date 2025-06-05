// src/screens/ProProfileScreen.tsx

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { apiFetch } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

import { colors, typography, commonStyles } from "../styles/theme";

type Professionnel = {
  uuid: string;
  specialite: string;
  description?: string;
  telephonePro?: string;
  siteWeb?: string;
  utilisateur: {
    prenom: string;
    nom: string;
    email?: string;
  };
};

type RendezVousPro = {
  id: number;
  patientUuid: string;
  professionnelUuid: string;
  dateProgrammee: string;
  statut: "scheduled" | "done" | "cancelled";
  motif?: string;
};

type ProProfileRouteProp = RouteProp<
  { ProProfile: { professionnelUuid: string; professionnelName: string } },
  "ProProfile"
>;

export default function ProProfileScreen() {
  const route = useRoute<ProProfileRouteProp>();
  const navigation = useNavigation<any>();
  const { accessToken } = useAuth();

  // Si aucun paramètre n’est passé, on affiche un message d’erreur
  if (!route.params) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <Text style={[typography.bodyRegular, { color: colors.red600 }]}>
            Aucun professionnel sélectionné.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const { professionnelUuid, professionnelName } = route.params;

  const [pro, setPro] = useState<Professionnel | null>(null);
  const [loadingPro, setLoadingPro] = useState<boolean>(true);
  const [errorPro, setErrorPro] = useState<string | null>(null);

  const [rdvList, setRdvList] = useState<RendezVousPro[]>([]);
  const [loadingRdv, setLoadingRdv] = useState<boolean>(true);
  const [errorRdv, setErrorRdv] = useState<string | null>(null);

  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [chosenDate, setChosenDate] = useState<Date>(new Date());

  useEffect(() => {
    navigation.setOptions({ title: professionnelName });
    fetchPro();
    fetchProRdv();
  }, [professionnelUuid]);

  const fetchPro = async () => {
    try {
      setLoadingPro(true);
      setErrorPro(null);
      const data = await apiFetch<Professionnel>(
        `/professionnels/${professionnelUuid}`
      );
      setPro(data);
    } catch (e: any) {
      console.error("Erreur fetch pro :", e);
      setErrorPro("Impossible de charger les informations du professionnel.");
    } finally {
      setLoadingPro(false);
    }
  };

  const fetchProRdv = async () => {
    try {
      setLoadingRdv(true);
      setErrorRdv(null);
      const data = await apiFetch<RendezVousPro[]>(
        `/rendez-vous/pro/${professionnelUuid}`
      );
      setRdvList(data);
    } catch (e: any) {
      console.error("Erreur fetch RDV pro :", e);
      if (e.message.includes("404")) {
        setErrorRdv("Aucun rendez-vous trouvé ou endpoint introuvable.");
      } else {
        setErrorRdv("Impossible de charger les créneaux du professionnel.");
      }
    } finally {
      setLoadingRdv(false);
    }
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setChosenDate(selectedDate);
    }
  };

  const reserveRdv = async () => {
    try {
      const body = {
        professionnelUuid,
        dateProgrammee: chosenDate.toISOString(),
        motif: null,
      };
      await apiFetch("/rendez-vous", {
        method: "POST",
        body: JSON.stringify(body),
      });
      Alert.alert("Succès", "Votre rendez-vous a été réservé.");
      fetchProRdv();
    } catch (e: any) {
      console.error("Erreur réservation RDV :", e);
      Alert.alert(
        "Erreur",
        e.message.includes("404")
          ? "Impossible de trouver l’endpoint de réservation."
          : "Impossible de réserver ce créneau."
      );
    }
  };

  const formatDateTime = (iso: string) => {
    const d = new Date(iso);
    return `${d.toLocaleDateString("fr-FR")} à ${d.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  if (loadingPro) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.olive} />
        </View>
      </SafeAreaView>
    );
  }

  if (errorPro || !pro) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <Text style={[typography.bodyRegular, { color: colors.red600 }]}>
            {errorPro || "Professionnel introuvable."}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.proCard}>
          <Text style={[typography.h2, { color: colors.olive, marginBottom: 4 }]}>
            {pro.utilisateur.prenom} {pro.utilisateur.nom}
          </Text>
          <Text
            style={[
              typography.bodyMedium,
              { color: colors.gray500, marginBottom: 4 },
            ]}
          >
            {pro.specialite}
          </Text>
          {pro.description ? (
            <Text
              style={[
                typography.bodyRegular,
                { color: colors.gray500, marginBottom: 4 },
              ]}
            >
              {pro.description}
            </Text>
          ) : null}
          {pro.telephonePro ? (
            <Text
              style={[
                typography.bodyRegular,
                { color: colors.gray500, marginBottom: 4 },
              ]}
            >
              Tél : {pro.telephonePro}
            </Text>
          ) : null}
          {pro.siteWeb ? (
            <Text
              style={[
                typography.bodyRegular,
                { color: colors.olive, marginBottom: 4 },
              ]}
            >
              {pro.siteWeb}
            </Text>
          ) : null}
        </View>

        <Text style={[typography.h2, { color: colors.olive, marginBottom: 8 }]}>
          Créneaux existants
        </Text>
        {loadingRdv ? (
          <ActivityIndicator size="small" color={colors.olive} />
        ) : errorRdv ? (
          <Text
            style={[typography.bodyRegular, { color: colors.red600, marginBottom: 16 }]}
          >
            {errorRdv}
          </Text>
        ) : rdvList.length === 0 ? (
          <Text style={[typography.bodyRegular, { color: colors.gray500, marginBottom: 16 }]}>
            Aucun créneau planifié.
          </Text>
        ) : (
          rdvList.map((item) => (
            <View key={item.id.toString()} style={styles.rdvItem}>
              <Text style={[typography.bodyRegular, { color: colors.brownDark }]}>
                {formatDateTime(item.dateProgrammee)}
              </Text>
              {item.motif ? (
                <Text
                  style={[typography.bodyRegular, { color: colors.gray500 }]}
                >
                  Motif : {item.motif}
                </Text>
              ) : null}
            </View>
          ))
        )}

        <View style={styles.reserveSection}>
          <Text style={[typography.h2, { color: colors.olive, marginBottom: 8 }]}>
            Réserver un créneau
          </Text>
          <Button
            title="Choisir date et heure"
            onPress={() => setShowPicker(true)}
            color={colors.olive}
          />
          {showPicker && (
            <DateTimePicker
              value={chosenDate}
              mode="datetime"
              display="default"
              minuteInterval={15}
              onChange={onChangeDate}
            />
          )}
          <Text
            style={[typography.bodyRegular, { color: colors.brownDark, marginTop: 8 }]}
          >
            Créneau sélectionné : {formatDateTime(chosenDate.toISOString())}
          </Text>
          <View style={{ marginTop: 12 }}>
            <Button
              title="Réserver ce créneau"
              color={colors.olive}
              onPress={reserveRdv}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.creamLight,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.creamLight,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.creamLight,
    padding: 16,
    paddingBottom: 32,
  },
  proCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  rdvItem: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  reserveSection: {
    marginTop: 24,
  },
});
