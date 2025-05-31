// src/utils/config.ts
import { Platform } from "react-native";

/**
 * API_HOST doit pointer vers votre machine hôte, selon l'émulateur/appareil :
 * - Sur iOS Simulator  → http://localhost:3000
 * - Sur Android AVD    → http://10.0.2.2:3000
 * - Sur appareil réel  → remplacez par l'IP locale de votre Mac, ex. http://192.168.1.42:3000
 */
export const API_HOST = Platform.select({
  ios: "http://192.168.1.168:3000",
  android: "http://10.0.2.2:3000",
}) as string;
