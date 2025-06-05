// mindcare-mobile/src/screens/ExerciseDetailScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { apiFetch } from "../utils/api";
import Markdown from "react-native-markdown-display";

import { colors, typography, commonStyles, fonts } from "../styles/theme";

type Exo = {
  id: number;
  title: string;
  content_markdown: string;
};

export default function ExerciseDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { id } = route.params as { id: number };
  const [exo, setExo] = useState<Exo | null>(null);
  const [error, setError] = useState<string>();

  useEffect(() => {
    apiFetch<Exo>(`/exercice/${id}`)
      .then((data) => setExo(data))
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={[typography.bodyRegular, { color: colors.red600 }]}>
          {error}
        </Text>
      </View>
    );
  }

  if (!exo) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.olive} />
        <Text style={[typography.bodyMedium, { color: colors.olive, marginTop: 12 }]}>
          Chargement…
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>{exo.title}</Text>
      <Markdown
        style={{
          body: { ...typography.bodyRegular, color: colors.gray500 },
          heading1: { ...typography.h2, marginBottom: 8 },
          paragraph: { marginBottom: 8 },
        }}
      >
        {exo.content_markdown}
      </Markdown>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ExerciseFinished")}
          style={styles.finishButton}
          activeOpacity={0.8}
        >
          <Text style={styles.finishButtonText}>Terminer l’exercice</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.cream,
    padding: 24,
    paddingBottom: 32,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.cream,
  },
  title: {
    ...typography.h1,
    color: colors.olive,
    marginBottom: 16,
  },
  footer: {
    marginTop: 24,
    alignItems: "center",
  },
  finishButton: {
    backgroundColor: colors.olive,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
  },
  finishButtonText: {
    ...typography.buttonText,
    color: colors.white,
  },
});
