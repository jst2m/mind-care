// src/screens/HomeScreen.tsx

import React from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { commonStyles, typography, colors } from "../styles/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Illustrations statiques pour chaque trouble
const ILLUSTRATIONS: Record<string, any> = {
  anxiete: require("../../assets/anxiete.png"),
  depression: require("../../assets/depression.png"),
  tca: require("../../assets/tca.png"),
  sommeil: require("../../assets/sommeil.png"),
  addictions: require("../../assets/addictions.png"),
};

// Données statiques “Nos spécialités”
const SPECIALTIES = [
  {
    key: "anxiete",
    title: "Anxiété",
    description:
      "Sentiment d’inquiétude ou peur persistante ; le psychologue peut vous aider à gérer vos pensées anxieuses.",
    icon: "😰",
    specialistType: "Psychologue clinicien",
  },
  {
    key: "depression",
    title: "Dépression",
    description:
      "Humeur dépressive durable, perte d’intérêt, fatigue ; un psychiatre ou psychologue peut proposer un suivi adapté.",
    icon: "😔",
    specialistType: "Psychiatre ou Psychologue",
  },
  {
    key: "tca",
    title: "Troubles alimentaires",
    description:
      "Anorexie, boulimie, troubles du comportement alimentaire ; une prise en charge pluridisciplinaire (diététicien + psychologue) est souvent recommandée.",
    icon: "🍽️",
    specialistType: "Diététicien & Psychologue",
  },
  {
    key: "sommeil",
    title: "Troubles du sommeil",
    description:
      "Insomnies, cauchemars, réveils nocturnes ; un psychologue ou médecin du sommeil pourra vous accompagner.",
    icon: "🌙",
    specialistType: "Médecin du sommeil",
  },
  {
    key: "addictions",
    title: "Addictions",
    description:
      "Dépendance à l’alcool, drogues, jeux ; des addictologues et psychologues spécialisés peuvent vous soutenir.",
    icon: "🔗",
    specialistType: "Addictologue",
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { isAuthenticated, logout } = useAuth();

  const handleAuthButton = () => {
    if (isAuthenticated) {
      logout(); // déconnexion
    } else {
      navigation.navigate("Login"); // aller à la page Login
    }
  };

  const handleSignupButton = () => {
    if (!isAuthenticated) {
      navigation.navigate("Signup"); // aller à la page Signup
    } else {
      navigation.navigate("Profile"); // si déjà connecté, aller au profil
    }
  };

  // Nouveau handler pour le bouton "Chercher un professionnel"
  const handleSearchPro = () => {
    navigation.navigate("SearchPros"); 
    // Attention : vous devez avoir défini un écran "SearchPro" dans votre stack navigator
  };

  return (
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
        {/* Image intermédiaire */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/happy.png")}
            style={styles.happyImage}
            resizeMode="contain"
          />
        </View>

        {/* Présentation */}
        <View style={styles.presentationSection}>
          <Text style={styles.presentationTitle}>Pourquoi mindCare ?</Text>
          <Text style={styles.presentationParagraph}>
            Sur mindCare, explorez des exercices de relaxation, tenez votre
            journal émotionnel et suivez votre bien-être au quotidien.
          </Text>
          <Text style={styles.presentationParagraph}>
            Nous avons des spécialistes dans plusieurs domaines : TCA, idées
            suicidaires, anxiété, dépression, stress post-traumatique, et bien
            d’autres.
          </Text>
          <Text style={styles.presentationParagraph}>
            Trouvez un professionnel qui saura vous aider au mieux, grâce à
            notre annuaire sécurisé.
          </Text>
        </View>

        {/* Section “Nos spécialités” */}
        <View style={styles.specialtiesSection}>
          <Text style={styles.specialtiesTitle}>Nos spécialités</Text>
          <Text style={styles.specialtiesIntro}>
            MindCare travaille avec des professionnels compétents sur différents troubles :
          </Text>

          <FlatList
            data={SPECIALTIES}
            keyExtractor={(item) => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 8 }}
            renderItem={({ item }) => (
              <View style={styles.specialtyCard}>
                <Image
                  source={ILLUSTRATIONS[item.key]}
                  style={styles.specialtyImage}
                  resizeMode="cover"
                />
                <Text style={styles.specialtyIcon}>{item.icon}</Text>
                <Text style={styles.specialtyTitleCard}>{item.title}</Text>
                <Text style={styles.specialtyDescCard} numberOfLines={3}>
                  {item.description}
                </Text>
                <Text style={styles.specialtyPro}>
                  Pro recommandé : {item.specialistType}
                </Text>
              </View>
            )}
          />
        </View>

        {/* NOUVEAU : Bouton “Chercher un professionnel” sous la section spécialités */}
        <View style={styles.searchProContainer}>
          <TouchableOpacity
            style={[commonStyles.buttonPrimary, { width: "100%" }]}
            onPress={handleSearchPro}
            activeOpacity={0.8}
          >
            <Text style={commonStyles.buttonTextPrimary}>
              Chercher un professionnel
            </Text>
          </TouchableOpacity>
        </View>

        {/* Boutons Connexion/Inscription ou Déconnexion/Profil */}
        <View style={styles.ctaButtons}>
          <TouchableOpacity
            style={commonStyles.buttonPrimary}
            onPress={handleAuthButton}
            activeOpacity={0.8}
          >
            <Text style={commonStyles.buttonTextPrimary}>
              {isAuthenticated ? "Déconnexion" : "Connexion"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonStyles.buttonSecondary, { marginLeft: 12 }]}
            onPress={handleSignupButton}
            activeOpacity={0.8}
          >
            <Text style={commonStyles.buttonTextPrimary}>
              {isAuthenticated ? "Profil" : "Inscription"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// Styles complémentaires pour HomeScreen
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.creamLight,
    paddingBottom: 48,
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
  imageContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  happyImage: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.5,
  },
  presentationSection: {
    marginBottom: 32,
  },
  presentationTitle: {
    ...typography.h2,
    textAlign: "center",
    marginBottom: 12,
  },
  presentationParagraph: {
    ...typography.bodyRegular,
    color: colors.gray500,
    marginBottom: 12,
    textAlign: "center",
  },
  specialtiesSection: {
    marginBottom: 32,
  },
  specialtiesTitle: {
    ...typography.h2,
    marginBottom: 8,
    textAlign: "center",
  },
  specialtiesIntro: {
    ...typography.bodyRegular,
    textAlign: "center",
    color: colors.gray500,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  specialtyCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    width: SCREEN_WIDTH * 0.6,
    marginRight: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.gray200,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  specialtyImage: {
    width: "100%",
    height: SCREEN_WIDTH * 0.3,
    borderRadius: 8,
    marginBottom: 8,
  },
  specialtyIcon: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 4,
  },
  specialtyTitleCard: {
    ...typography.bodyMedium,
    fontWeight: "600",
    color: colors.brownDark,
    textAlign: "center",
    marginBottom: 4,
  },
  specialtyDescCard: {
    ...typography.bodyRegular,
    color: colors.gray500,
    fontSize: 13,
    marginBottom: 8,
    textAlign: "left",
  },
  specialtyPro: {
    ...typography.bodyRegular,
    fontStyle: "italic",
    color: colors.olive,
    fontSize: 12,
    textAlign: "right",
  },

  // ** Nouveau : conteneur pour le bouton “Chercher un professionnel” **
  searchProContainer: {
    marginBottom: 24,
    alignItems: "center",
  },

  ctaButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
});
