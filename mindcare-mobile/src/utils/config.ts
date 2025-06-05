// src/utils/config.ts
import { Platform } from "react-native";

/**
 * Lorsque vous utilisez Expo sur un appareil (réel ou virtuel),
 * il suffit d’utiliser l’adresse LAN (ici 192.168.1.11) pour atteindre
 * votre serveur NestJS tournant sur le port 3000.
 */
export const API_HOST = Platform.select({
  ios:     "http://192.168.1.11:3000",
  android: "http://192.168.1.11:3000",
}) as string;
