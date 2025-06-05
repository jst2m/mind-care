// src/screens/JournalScreen.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { colors, typography, commonStyles, fonts } from "../styles/theme";
import { apiFetch } from "../utils/api";

type Entry = {
  id: number;
  dateJournal: string;
  titre: string;
  contenu: string;
  humeur: number;
  tags: string;
  confidentiel: boolean;
  dateMaj: string;
};

export default function JournalScreen() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [mood, setMood] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await apiFetch<Entry[]>("/journal-entree");
      const sorted = data.sort(
        (a, b) =>
          new Date(b.dateJournal).getTime() - new Date(a.dateJournal).getTime()
      );
      setEntries(sorted);
    } catch (err: any) {
      console.error("Erreur fetch journal :", err);
      setError("Impossible de charger votre journal émotionnel.");
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async () => {
    const moodNum = Number(mood);
    if (!mood || isNaN(moodNum) || moodNum < 1 || moodNum > 10) {
      Alert.alert("Erreur", "Veuillez entrer une humeur valide entre 1 et 10.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        humeur: moodNum,
        titre: "",                 // champ NOT NULL, envoyé vide
        contenu: notes.trim(),     // on envoie « contenu » au back-end
        tags: "",                  // facultatif
        confidentiel: false,       // facultatif
      };

      const created: Entry = await apiFetch<Entry>("/journal-entree", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setEntries((prev) => [created, ...prev]);
      setMood("");
      setNotes("");
    } catch (err: any) {
      console.error("Erreur ajout entrée :", err);
      Alert.alert(
        "Erreur",
        err.message?.includes("500")
          ? "Erreur interne serveur, vérifiez la configuration du back."
          : "Impossible d’ajouter votre entrée."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const renderItem = ({ item }: { item: Entry }) => {
    const displayDate = new Date(item.dateJournal).toLocaleDateString("fr-FR");
    return (
      <View style={styles.entryCard}>
        <View style={styles.entryHeader}>
          <Text style={styles.entryDate}>{displayDate}</Text>
          <View style={styles.moodBadge}>
            <Text style={styles.moodText}>Humeur : {item.humeur}/10</Text>
          </View>
        </View>
        <Text style={styles.entryNotes}>{item.contenu}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={commonStyles.centered}>
        <ActivityIndicator size="large" color={colors.olive} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={commonStyles.centered}>
        <Text style={[typography.bodyRegular, { color: colors.red600 }]}>
          {error}
        </Text>
        <TouchableOpacity
          onPress={fetchEntries}
          style={[commonStyles.buttonPrimary, { marginTop: 12 }]}
        >
          <Text style={commonStyles.buttonTextPrimary}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.creamLight }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Journal Émotionnel</Text>

        <View style={styles.newEntrySection}>
          <Text style={styles.sectionTitle}>Nouvelle Entrée</Text>

          <Text style={styles.labelText}>Humeur (1–10)</Text>
          <TextInput
            keyboardType="numeric"
            value={mood}
            onChangeText={setMood}
            placeholder="Ex : 7"
            style={styles.input}
            editable={!submitting}
          />

          <Text style={styles.labelText}>Notes</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Écrivez vos pensées…"
            style={[styles.input, styles.textArea]}
            multiline
            textAlignVertical="top"
            editable={!submitting}
          />

          <TouchableOpacity
            onPress={addEntry}
            style={[styles.addButton, submitting && { opacity: 0.6 }]}
            activeOpacity={0.8}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.addButtonText}>Ajouter</Text>
            )}
          </TouchableOpacity>
        </View>

        <FlatList
          data={entries}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>
              Votre journal est vide pour l’instant.
            </Text>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.creamLight,
  },
  screenTitle: {
    ...typography.h2,
    textAlign: "center",
    marginBottom: 24,
  },
  newEntrySection: {
    marginBottom: 32,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.olive,
    marginBottom: 8,
  },
  labelText: {
    ...typography.bodyRegular,
    color: colors.gray500,
    marginBottom: 4,
  },
  input: {
    ...commonStyles.input,
    marginBottom: 16,
    fontFamily: fonts.baseSans,
  },
  textArea: {
    height: 120,
  },
  addButton: {
    backgroundColor: colors.olive,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 8,
  },
  addButtonText: {
    ...typography.buttonText,
    color: colors.white,
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyText: {
    ...typography.bodyRegular,
    color: colors.gray500,
    textAlign: "center",
    marginTop: 32,
  },
  entryCard: {
    ...commonStyles.card,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  entryDate: {
    fontFamily: fonts.baseSans,
    fontSize: 12,
    color: colors.gray500,
  },
  moodBadge: {
    backgroundColor: colors.cream,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  moodText: {
    fontFamily: fonts.baseSans,
    fontSize: 12,
    color: colors.olive,
    fontWeight: "600",
  },
  entryNotes: {
    fontFamily: fonts.baseSans,
    fontSize: 16,
    color: colors.brownDark,
  },
});
