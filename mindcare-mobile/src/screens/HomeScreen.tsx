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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { commonStyles, typography, colors } from "../styles/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { isAuthenticated, logout } = useAuth();

  const goToAuth = (screen: "Login" | "Signup") => {
    if (isAuthenticated) {
      logout();
    } else {
      navigation.navigate(screen);
    }
  };

  const goToSearchPros = () => {
    if (isAuthenticated) {
      navigation.navigate("SearchPros");
    } else {
      goToAuth("Login");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Rejoignez la communauté mindCare</Text>
          <Text style={styles.introParagraph}>
            Prenez soin de votre santé mentale aux côtés de milliers de membres.
          </Text>
          <View style={styles.ctaButtons}>
            <TouchableOpacity
              style={commonStyles.buttonPrimary}
              onPress={() => goToAuth("Login")}
            >
              <Text style={commonStyles.buttonTextPrimary}>
                {isAuthenticated ? "Déconnexion" : "Connexion"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[commonStyles.buttonSecondary, { marginLeft: 12 }]}
              onPress={() => goToAuth("Signup")}
            >
              <Text style={commonStyles.buttonTextPrimary}>
                {isAuthenticated ? "Profil" : "Inscription"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.findProsContainer}>
          <Text style={styles.findProsIntro}>
            Trouvez un spécialiste dès maintenant
          </Text>
          <TouchableOpacity
            style={commonStyles.buttonPrimary}
            onPress={goToSearchPros}
          >
            <Text style={commonStyles.buttonTextPrimary}>
              Trouver un psy
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/happy.png")}
            style={styles.happyImage}
            resizeMode="contain"
          />
        </View>

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
      </View>
    </ScrollView>
  );
}

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
  introSection: {
    marginBottom: 16,
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
    marginBottom: 16,
  },
  ctaButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  findProsContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  findProsIntro: {
    ...typography.bodyMedium,
    textAlign: "center",
    color: colors.brownDark,
    marginBottom: 8,
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
});
