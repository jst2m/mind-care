import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { commonStyles, typography, colors } from "../styles/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Image hero */}
        <ImageBackground
          source={require("../../assets/hero.jpg")}
          style={styles.heroImage}
          imageStyle={styles.heroOverlay}
        >
          <View style={styles.heroCaptionContainer}>
            <Text style={styles.heroTitle}>Bienvenue sur mindCare</Text>
          </View>
        </ImageBackground>

        <View style={styles.mainContent}>
          {/* Section de présentation */}
          <View style={styles.introSection}>
            <Text style={styles.introTitle}>
              Prenez soin de votre santé mentale
            </Text>
            <Text style={styles.introParagraph}>
              Sur mindCare, explorez des exercices de relaxation, tenez votre
              journal émotionnel et suivez votre bien‐être au quotidien.
            </Text>
          </View>

          <View style={styles.tilesContainer}>
            {/* Bouton Exercices */}
            <TouchableOpacity
              style={[commonStyles.card, styles.tileCard]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Exercises")}
            >
              <Text style={[typography.h2, styles.tileTitle]}>Exercices</Text>
              <Text style={styles.tileSubtitle}>
                Détendez‐vous avec nos exercices guidés de méditation,
                respiration et relaxation.
              </Text>
              <View style={styles.tileButtonContainer}>
                <View style={commonStyles.buttonPrimary}>
                  <Text style={commonStyles.buttonTextPrimary}>Découvrir</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Bouton Journal */}
            <TouchableOpacity
              style={[commonStyles.card, styles.tileCard]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Journal")}
            >
              <Text style={[typography.h2, styles.tileTitle]}>
                Journal de bord
              </Text>
              <Text style={styles.tileSubtitle}>
                Tenez un journal émotionnel pour suivre votre humeur et vos
                pensées.
              </Text>
              <View style={styles.tileButtonContainer}>
                <View style={commonStyles.buttonPrimary}>
                  <Text style={commonStyles.buttonTextPrimary}>Écrire</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Bouton Trouver un psy */}
            <TouchableOpacity
              style={[commonStyles.card, styles.tileCard]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("SearchPros")}
            >
              <Text style={[typography.h2, styles.tileTitle]}>
                Trouver un psy
              </Text>
              <Text style={styles.tileSubtitle}>
                Parcourez notre annuaire de professionnels pour prendre
                contact.
              </Text>
              <View style={styles.tileButtonContainer}>
                <View style={commonStyles.buttonPrimary}>
                  <Text style={commonStyles.buttonTextPrimary}>Rechercher</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Bouton Mes rendez‐vous */}
            <TouchableOpacity
              style={[commonStyles.card, styles.tileCard]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Appointments")}
            >
              <Text style={[typography.h2, styles.tileTitle]}>
                Mes rendez‐vous
              </Text>
              <Text style={styles.tileSubtitle}>
                Consultez vos prochains rendez‐vous et suivez leur statut.
              </Text>
              <View style={styles.tileButtonContainer}>
                <View style={commonStyles.buttonPrimary}>
                  <Text style={commonStyles.buttonTextPrimary}>Voir</Text>
                </View>
              </View>
            </TouchableOpacity>
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
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.creamLight,
    paddingBottom: 48, // marge pour laisser la place au Tab Bar + home indicator
  },
  heroImage: {
    width: SCREEN_WIDTH,
    height: 240,
  },
  heroOverlay: {
    opacity: 0.8,
  },
  heroCaptionContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    ...typography.h1,
    color: colors.white,
    textAlign: "center",
    paddingHorizontal: 12,
  },
  mainContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  introSection: {
    marginBottom: 24,
    alignItems: "center",
  },
  introTitle: {
    ...typography.h2,
    textAlign: "center",
    marginBottom: 8,
  },
  introParagraph: {
    ...typography.bodyRegular,
    textAlign: "center",
    color: colors.gray500,
  },
  tilesContainer: {
    // Vous pouvez adapter flexDirection pour 2 colonnes si besoin
  },
  tileCard: {
    marginBottom: 16,
  },
  tileTitle: {
    marginBottom: 4,
  },
  tileSubtitle: {
    ...typography.bodyRegular,
    color: colors.gray500,
    marginBottom: 12,
  },
  tileButtonContainer: {
    alignItems: "flex-start",
  },
});
