// src/screens/ConversationsScreen.tsx

import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { apiFetch } from "../utils/api";
import { colors, typography, commonStyles } from "../styles/theme";
import { useAuth } from "../contexts/AuthContext";

// Structure d’un message tel que renvoyé par votre API
type Message = {
  id: number;
  deUuid: string;
  aUuid: string;
  dateEnvoi: string;
  contenu: { type: string; data: number[] } | string;
};

type ConversationItem = {
  professionnelUuid: string;
  professionnelName: string;
  lastMessage: string;
  lastDate: string;
};

export default function ConversationsScreen() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // `navigation` pour naviguer et pour setOptions(...)
  const navigation = useNavigation<any>();

  // === 1. on ajoute l’icône “bulle” dans le header ===
  useLayoutEffect(() => {
    navigation.setOptions({
      // Cette option dépend de la version de React Navigation que vous utilisez.
      // Ici, on l’écrit comme si vous étiez dans un Stack.Screen (v5/v6).
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            // Redirige vers la même page Conversations (ou vers l’écran de votre liste de convos)
            navigation.navigate("Conversations");
          }}
          style={{ marginRight: 16 }}
          activeOpacity={0.7}
        >
          {/* Vous pouvez remplacer ce Text par une vraie icône */}
          <Text style={{ fontSize: 22, color: colors.olive }}>💬</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // === 2. on va chercher et groupons les conversations ===
  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        setError("Vous devez être connecté(e) pour voir vos conversations.");
        return;
      }

      // 2.1) Récupérer tous les messages
      const allMessages = await apiFetch<Message[]>("/messages");

      // 2.2) Ne garder que ceux du patient connecté
      const messagesPatient = allMessages.filter(
        (m) => m.deUuid === user.uuid || m.aUuid === user.uuid
      );

      // 2.3) Grouper par proUuid → ne garder que le dernier message
      const grouped: Record<string, Message> = {};
      messagesPatient.forEach((msg) => {
        // si le message vient du patient, alors proUuid = destinataire (aUuid)
        // sinon (venant du pro), proUuid = émetteur (deUuid)
        const proUuid = msg.deUuid === user.uuid ? msg.aUuid : msg.deUuid;

        // Convertir le contenu en chaîne de caractères
        let textMsg = "";
        if (typeof msg.contenu === "string") {
          textMsg = msg.contenu;
        } else if (
          msg.contenu &&
          typeof msg.contenu === "object" &&
          Array.isArray(msg.contenu.data)
        ) {
          textMsg = String.fromCharCode(...msg.contenu.data);
        }

        // Garder uniquement le message le plus récent pour ce proUuid
        if (
          !grouped[proUuid] ||
          new Date(msg.dateEnvoi) > new Date(grouped[proUuid].dateEnvoi)
        ) {
          grouped[proUuid] = {
            ...msg,
            contenu: textMsg,
          } as unknown as Message;
        }
      });

      // 2.4) Créer un tableau intermédiaire sans encore le prénom/nom
      const rawConversations: ConversationItem[] = Object.keys(grouped).map(
        (proUuid) => ({
          professionnelUuid: proUuid,
          professionnelName: "",
          lastMessage: grouped[proUuid].contenu as string,
          lastDate: grouped[proUuid].dateEnvoi,
        })
      );

      // 2.5) Pour chaque proUuid, appeler l’API pour récupérer prénom + nom
      const tempNamesMap: Record<string, string> = {};
      await Promise.all(
        rawConversations.map(async (conv) => {
          try {
            // Appelle /professionnels/:proUuid → on suppose que l’API renvoie { uuid, prenom, nom }
            const pro = await apiFetch<any>(
              `/professionnels/${conv.professionnelUuid}`
            );

            // Pour debug : voir la forme exacte de la réponse
            console.log(
              `RÉPONSE /professionnels/${conv.professionnelUuid}`,
              pro
            );

            let displayName: string;
            // a) si le prénom/nom sont à la racine
            if (pro.prenom || pro.nom) {
              displayName = `${pro.prenom ?? ""} ${pro.nom ?? ""}`.trim();
            }
            // b) sinon, si l’API imbrique l’utilisateur dans `utilisateur`
            else if (
              pro.utilisateur &&
              (pro.utilisateur.prenom || pro.utilisateur.nom)
            ) {
              displayName = `${pro.utilisateur.prenom ?? ""} ${
                pro.utilisateur.nom ?? ""
              }`.trim();
            }
            // c) fallback : tronquer l’UUID
            else {
              displayName = conv.professionnelUuid.substring(0, 6);
            }

            tempNamesMap[conv.professionnelUuid] = displayName;
          } catch (e) {
            console.warn(
              `Impossible de récupérer le nom du pro ${conv.professionnelUuid}:`,
              e
            );
            tempNamesMap[conv.professionnelUuid] = conv.professionnelUuid.substring(0, 6);
          }
        })
      );

      // 2.6) Construire la liste finale en injectant `professionnelName`
      const finalConversations: ConversationItem[] = rawConversations.map(
        (conv) => ({
          ...conv,
          professionnelName:
            tempNamesMap[conv.professionnelUuid] ||
            conv.professionnelUuid.substring(0, 6),
        })
      );

      setConversations(finalConversations);
    } catch (e: any) {
      console.error("Erreur fetch convos :", e);
      setError("Impossible de charger vos conversations.");
    } finally {
      setLoading(false);
    }
  };

  // === 3. Affichage en fonction des états ===
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
        <Text style={[typography.bodyMedium, { color: colors.red600 }]}>
          {error}
        </Text>
      </View>
    );
  }

  if (conversations.length === 0) {
    return (
      <View style={commonStyles.centered}>
        <Text style={[typography.bodyMedium, { color: colors.gray500 }]}>
          Vous n’avez pas encore de conversation.
        </Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: ConversationItem }) => {
    const dateObj = new Date(item.lastDate);
    const formatted = `${dateObj.toLocaleDateString("fr-FR")} ${dateObj.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

    return (
      <TouchableOpacity
        style={styles.convoCard}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate("HomeTab", {
            screen: "Chat",
            params: {
              professionnelUuid: item.professionnelUuid,
              professionnelName: item.professionnelName,
            },
          })
        }
      >
        <View>
          <Text style={styles.convoTitle}>{item.professionnelName}</Text>
          <Text style={styles.convoSubtitle} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>
        <Text style={styles.convoDate}>{formatted}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={conversations}
      keyExtractor={(item) => item.professionnelUuid}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingBottom: 80,
    backgroundColor: colors.creamLight,
  },
  convoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray200,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  convoTitle: {
    ...typography.bodyMedium,
    fontWeight: "600",
    color: colors.brownDark,
    marginBottom: 4,
  },
  convoSubtitle: {
    ...typography.bodyRegular,
    color: colors.gray500,
    fontSize: 14,
    width: 200,
  },
  convoDate: {
    ...typography.bodyRegular,
    color: colors.gray300,
    fontSize: 12,
  },
});
