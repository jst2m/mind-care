// mindcare-mobile/src/screens/ExercisesScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { apiFetch } from "../utils/api";

import { colors, typography, commonStyles, fonts } from "../styles/theme";

import officeImg from "../../assets/34D43885-0F23-497F-BC02-FCBC15021C80.jpg";

type Exo = {
  id: number;
  title: string;
  content_markdown: string;
};

export default function ExercisesScreen() {
  const [list, setList] = useState<Exo[]>([]);
  const [error, setError] = useState<string>();
  const navigation = useNavigation<any>();

  useEffect(() => {
    apiFetch<Exo[]>("/exercice")
      .then((data) => setList(data))
      .catch((e) => setError(e.message));
  }, []);

  function startRandom() {
    if (!list.length) return;
    const random = list[Math.floor(Math.random() * list.length)];
    navigation.navigate("ExerciseDetail", { id: random.id });
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ImageBackground
        source={officeImg}
        style={styles.headerImage}
        imageStyle={styles.headerOverlay}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Exercices</Text>
        <Text style={styles.subtitle}>
          Des exercices de relaxation pour vous aider à détendre votre esprit,
          réduire le stress et améliorer votre bien-être quotidien.
        </Text>

        <TouchableOpacity
          onPress={startRandom}
          style={styles.randomButton}
          activeOpacity={0.8}
        >
          <Text style={styles.randomButtonText}>Démarrer un exercice</Text>
        </TouchableOpacity>

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <View style={styles.listContainer}>
          {list.map((e) => (
            <View key={e.id} style={styles.exerciseCard}>
              <Text style={styles.cardTitle}>{e.title}</Text>
              <Text style={styles.cardText} numberOfLines={3}>
                {e.content_markdown}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("ExerciseDetail", { id: e.id })}
                style={styles.cardButton}
                activeOpacity={0.8}
              >
                <Text style={styles.cardButtonText}>Commencer</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.creamLight,
    paddingBottom: 32,
  },
  headerImage: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  headerOverlay: {
    opacity: 0.9,
  },
  content: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
  title: {
    ...typography.h2,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    ...typography.bodyRegular,
    textAlign: "center",
    color: colors.gray500,
    marginBottom: 16,
  },
  randomButton: {
    backgroundColor: colors.olive,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
    alignItems: "center",
    marginBottom: 24,
  },
  randomButtonText: {
    ...typography.buttonText,
    color: colors.white,
  },
  errorText: {
    ...typography.bodyRegular,
    color: colors.red600,
    textAlign: "center",
    marginBottom: 16,
  },
  listContainer: {
    // On affiche les cartes en colonne
  },
  exerciseCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.olive,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    ...typography.h2,
    color: colors.olive,
    marginBottom: 8,
  },
  cardText: {
    ...typography.bodyRegular,
    color: colors.gray500,
    marginBottom: 12,
  },
  cardButton: {
    backgroundColor: colors.olive,
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  cardButtonText: {
    ...typography.buttonText,
    color: colors.white,
  },
});
