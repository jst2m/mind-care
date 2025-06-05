// mindcare-mobile/src/screens/ExerciseFinishedScreen.tsx
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";

import { colors, typography, fonts } from "../styles/theme";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ExerciseFinishedScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/34D43885-0F23-497F-BC02-FCBC15021C80.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* 
          On place un BlurView pour flouter juste la zone du texte 
          afin de conserver l’image visible derrière. 
        */}
        <View style={styles.blurWrapper}>
          <BlurView intensity={60} tint="light" style={styles.blurContainer}>
            <Text style={styles.title}>Félicitations !</Text>
            <Text style={styles.paragraph}>
              Vous avez terminé cet exercice avec succès. Prenez un moment pour
              ressentir les bienfaits de votre pratique.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("ExercisesList")}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Retour à la liste</Text>
            </TouchableOpacity>
          </BlurView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    flex: 1,
  },
  blurWrapper: {
    // On centre le contenu au milieu de l'écran (verticalement et horizontalement)
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  blurContainer: {
    // Dimensions maximales du bloc flouté derrière le texte
    width: "100%",
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    // Légère ombre pour distinguer le bloc du fond
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    ...typography.h1,
    color: colors.brownDark,
    textAlign: "center",
    marginBottom: 12,
  },
  paragraph: {
    ...typography.bodyRegular,
    color: colors.gray500,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    backgroundColor: colors.olive,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 999,
  },
  buttonText: {
    ...typography.buttonText,
    color: colors.white,
  },
});
