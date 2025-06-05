// mindcare-mobile/src/styles/theme.ts

import { StyleSheet, Platform } from "react-native";

// 1) Définition des familles de polices
export const fonts = {
  titleSerif: Platform.select({
    ios: "Georgia",
    android: "serif",
    default: "serif",
  }),
  baseSans: Platform.select({
    ios: "Arial",
    android: "sans-serif",
    default: "sans-serif",
  }),
};

// 2) Palette de couleurs
export const colors = {
  creamLight: "#F7F4EF",
  cream: "#E6E2D3",
  lavenderGray: "#BFBFCF",
  olive: "#7C7B4A",
  brownDark: "#4C2F0C",
  white: "#FFFFFF",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray500: "#6B7280",
  green700: "#047857",
  green100: "#D1FAE5",
  red600: "#DC2626",
};

// 3) Typographies réutilisables
export const typography = {
  h1: {
    fontFamily: fonts.titleSerif,
    fontSize: 32,
    fontWeight: "700",
    color: colors.olive,
  },
  h2: {
    fontFamily: fonts.titleSerif,
    fontSize: 24,
    fontWeight: "600",
    color: colors.olive,
  },
  bodyMedium: {
    fontFamily: fonts.baseSans,
    fontSize: 16,
    fontWeight: "400",
    color: colors.gray500,
  },
  bodyRegular: {
    fontFamily: fonts.baseSans,
    fontSize: 14,
    fontWeight: "400",
    color: colors.gray500,
  },
  buttonText: {
    fontFamily: fonts.baseSans,
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
  inputText: {
    fontFamily: fonts.baseSans,
    fontSize: 16,
    fontWeight: "400",
    color: colors.brownDark,
  },
};

// 4) Styles communs (cartes, boutons, champs, etc.)
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.creamLight,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.creamLight,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  buttonPrimary: {
    backgroundColor: colors.olive,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: colors.brownDark,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
    alignItems: "center",
  },
  buttonTextPrimary: {
    ...typography.buttonText,
    color: colors.white,
  },
  input: {
    backgroundColor: colors.white,
    borderColor: colors.gray300,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: fonts.baseSans,
    fontSize: 16,
    color: colors.brownDark,
  },
});
