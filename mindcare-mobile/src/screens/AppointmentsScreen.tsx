// src/screens/AppointmentsScreen.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { apiFetch } from "../utils/api";

import { colors, typography, commonStyles } from "../styles/theme";

type RendezVous = {
  id: number;
  patientUuid: string;
  professionnelUuid: string;
  dateProgrammee: string;
  statut: "scheduled" | "done" | "cancelled";
  motif?: string;
  proName?: string;
};

export default function AppointmentsScreen() {
  const { accessToken } = useAuth();
  const [appointments, setAppointments] = useState<RendezVous[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    if (!accessToken) {
      setError("Non authentifié");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const rdvList = await apiFetch<RendezVous[]>("/rendez-vous/me");

      const enriched = await Promise.all(
        rdvList.map(async (rdv) => {
          try {
            const proData = await apiFetch<{
              uuid: string;
              utilisateur: { prenom: string; nom: string };
            }>(`/professionnels/${rdv.professionnelUuid}`);

            const prenom = proData.utilisateur.prenom;
            const nom = proData.utilisateur.nom;
            return {
              ...rdv,
              proName: `${prenom} ${nom}`,
            } as RendezVous;
          } catch {
            return {
              ...rdv,
              proName: "Professionnel introuvable",
            } as RendezVous;
          }
        })
      );

      setAppointments(enriched);
    } catch (e: any) {
      console.error("FetchAppointments Erreur détaillée →", e);
      if (e.message.includes("404")) {
        setError("Endpoint introuvable (404) ou pas de RDV.");
      } else if (e.message.includes("401")) {
        setError("Token invalide ou non autorisé (401).");
      } else {
        setError("Impossible de charger les rendez-vous.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={commonStyles.centered}>
        <ActivityIndicator size="large" color={colors.green700} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={commonStyles.centered}>
        <Text style={[typography.bodyRegular, { color: colors.red600 }]}>
          {error}
        </Text>
      </View>
    );
  }

  if (appointments.length === 0) {
    return (
      <View style={commonStyles.centered}>
        <Text style={[typography.bodyRegular, { color: colors.gray500 }]}>
          Aucun rendez-vous prévu.
        </Text>
      </View>
    );
  }

  const formatDateTime = (iso: string) => {
    const d = new Date(iso);
    return `${d.toLocaleDateString("fr-FR")} à ${d.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const renderItem = ({ item }: { item: RendezVous }) => (
    <View style={styles.appointmentCard}>
      <Text style={[typography.bodyMedium, { color: colors.green700 }]}>
        {formatDateTime(item.dateProgrammee)}
      </Text>

      <Text style={[typography.bodyRegular, { color: colors.brownDark, marginTop: 4 }]}>
        Planifié avec : {item.proName}
      </Text>

      {item.motif ? (
        <Text style={[typography.bodyRegular, { color: colors.gray500, marginTop: 4 }]}>
          Motif : {item.motif}
        </Text>
      ) : null}

      <Text style={[typography.bodyRegular, { color: colors.gray500, marginTop: 4 }]}>
        Statut :{" "}
        {item.statut === "scheduled"
          ? "Planifié"
          : item.statut === "done"
          ? "Terminé"
          : "Annulé"}
      </Text>
    </View>
  );

  return (
    <View style={commonStyles.container}>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  appointmentCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray200,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
});
